<template>
  <q-page class="q-pa-md column items-center bg-grey-2" style="min-height:100vh;">
    <div class="q-gutter-md" style="width:100%;max-width:600px;">
      <q-select
        v-model="selectedProcess"
        :options="processOptions"
        label="Выберите бизнес-процесс"
        outlined
        dense
        emit-value
        map-options
        class="q-mb-md"
      />
      <q-input
        v-model="description"
        label="Описание текущей ситуации"
        type="textarea"
        outlined
        dense
        autogrow
        class="q-mb-md"
      />
      <q-file
        v-model="csvFile"
        label="Загрузить CSV-файл с деталями"
        outlined
        dense
        accept=".csv"
        @added="onCsvUpload"
        class="q-mb-md"
      />
      <div class="row q-gutter-sm q-mb-md">
        <q-btn color="primary" label="Получить советы от ИИ" @click="getAiAdvice" :loading="loading" :disable="!selectedProcess || !description" />
        <q-btn color="secondary" label="Скачать PDF" @click="downloadPdf" :disable="!recommendation" />
        <q-btn color="accent" label="Отправить на Email" @click="sendEmail" :disable="!recommendation" />
      </div>
      <q-toggle v-model="saveHistory" label="Сохранять историю запросов" class="q-mb-md" />
      <q-card v-if="recommendation" class="q-mb-md">
        <q-card-section>
          <div class="text-h6">Рекомендации ИИ</div>
          <div class="q-mt-sm">{{ recommendation }}</div>
        </q-card-section>
      </q-card>
      <q-card v-if="history.length && showHistory" class="q-mb-md">
        <q-card-section>
          <div class="text-h6">История запросов</div>
          <q-list bordered separator>
            <q-item v-for="item in history" :key="item.time">
              <q-item-section>
                <div class="text-caption text-grey">{{ item.time }}</div>
                <div><b>Процесс:</b> {{ item.process }}</div>
                <div><b>Описание:</b> {{ item.description }}</div>
                <div><b>Рекомендации:</b> {{ item.recommendation }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-btn flat dense icon="history" @click="showHistory = !showHistory" :label="showHistory ? 'Скрыть историю' : 'Показать историю'" />
      <q-notify
        position="top"
        :message="notifyMsg.message"
        v-if="notifyMsg.show"
        :color="notifyMsg.color"
        :timeout="notifyMsg.timeout"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import emailjs from 'emailjs-com';

export default {
  name: 'IndexPage',
  setup() {
    const processOptions = [
      'Продажи',
      'Обслуживание клиентов',
      'Маркетинг',
      'Финансы',
      'HR',
      'Логистика'
    ];
    const selectedProcess = ref('');
    const description = ref('');
    const csvFile = ref(null);
    const recommendation = ref('');
    const loading = ref(false);
    const history = ref([]);
    const saveHistory = ref(true);
    const showHistory = ref(false);
    const notifyMsg = ref({
      show: false,
      message: '',
      color: 'positive',
      timeout: 2000
    });

    onMounted(() => {
      validateEnvironmentVars();
    });

    function validateEnvironmentVars() {
      const requiredVars = [
        'OPENAI_API_KEY',
        'EMAILJS_SERVICE_ID',
        'EMAILJS_TEMPLATE_ID',
        'EMAILJS_USER_ID'
      ];
      
      for (const varName of requiredVars) {
        if (!process.env[varName]) {
          showNotification(`Missing environment variable: ${varName}`, 'negative');
        }
      }
    }

    function showNotification(message, color = 'positive', timeout = 2000) {
      notifyMsg.value = {
        show: true,
        message,
        color,
        timeout
      };
    }

    function onCsvUpload(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          if (!content.trim()) {
            throw new Error('CSV file is empty');
          }
          description.value = content;
        } catch (error) {
          showNotification('Error reading CSV file: ' + error.message, 'negative');
        }
      };
      reader.onerror = () => {
        showNotification('Failed to read CSV file', 'negative');
      };
      reader.readAsText(file);
    }

    async function getAiAdvice() {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        showNotification('OpenAI API key is not configured', 'negative');
        return;
      }
      
      loading.value = true;
      try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',  // Changed from gpt-4 to gpt-3.5-turbo
          messages: [
            { role: 'system', content: 'You are a business process optimization expert.' },
            { role: 'user', content: `Process: ${selectedProcess.value}\nDescription: ${description.value}` }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        recommendation.value = response.data.choices[0].message.content;
        if (saveHistory.value) {
          history.value.unshift({
            time: new Date().toLocaleString(),
            process: selectedProcess.value,
            description: description.value,
            recommendation: recommendation.value
          });
        }
      } catch (e) {
        let errorMsg = 'Ошибка получения рекомендаций';
        if (e.response && e.response.data && e.response.data.error) {
          errorMsg += ': ' + (e.response.data.error.message || JSON.stringify(e.response.data.error));
        } else if (e.message) {
          errorMsg += ': ' + e.message;
        }
        console.error('OpenAI API Error:', e.response?.data || e.message);
        showNotification(errorMsg, 'negative');
      } finally {
        loading.value = false;
      }
    }

    async function downloadPdf() {
      try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595.28, 841.89]);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 12;
        const lineHeight = 14;
        const margin = 40;
        const maxWidth = 515; // page width - 2*margin

        let y = 800;
        
        // Helper function for text wrapping
        function drawWrappedText(text, x, y, options) {
          const words = text.split(' ');
          let line = '';
          const lines = [];
          
          for (const word of words) {
            const testLine = line + (line ? ' ' : '') + word;
            const width = font.widthOfTextAtSize(testLine, fontSize);
            
            if (width > maxWidth && line) {
              lines.push(line);
              line = word;
            } else {
              line = testLine;
            }
          }
          if (line) lines.push(line);
          
          lines.forEach((textLine) => {
            page.drawText(textLine, { ...options, x, y });
            y -= lineHeight;
          });
          
          return y;
        }

        y = drawWrappedText(`Process: ${selectedProcess.value}`, margin, y, { font, size: fontSize });
        y -= 10;
        y = drawWrappedText(`Description: ${description.value}`, margin, y, { font, size: fontSize });
        y -= 10;
        drawWrappedText(`Recommendations: ${recommendation.value}`, margin, y, { font, size: fontSize });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'recommendation.pdf';
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        showNotification('Error generating PDF: ' + error.message, 'negative');
      }
    }

    async function sendEmail() {
      if (!process.env.EMAILJS_SERVICE_ID || !process.env.EMAILJS_TEMPLATE_ID || !process.env.EMAILJS_USER_ID) {
        showNotification('Email service is not properly configured', 'negative');
        return;
      }

      try {
        loading.value = true;
        await emailjs.send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_TEMPLATE_ID,
          {
            process: selectedProcess.value,
            description: description.value,
            recommendation: recommendation.value
          },
          process.env.EMAILJS_USER_ID
        );
        showNotification('Report successfully sent to email!');
      } catch (e) {
        showNotification('Error sending email: ' + e.message, 'negative');
      } finally {
        loading.value = false;
      }
    }

    return {
      processOptions,
      selectedProcess,
      description,
      csvFile,
      recommendation,
      loading,
      history,
      saveHistory,
      showHistory,
      notifyMsg,
      onCsvUpload,
      getAiAdvice,
      downloadPdf,
      sendEmail
    };
  }
};
</script>

<style scoped>
.q-page {
  min-height: 100vh;
}
</style>
