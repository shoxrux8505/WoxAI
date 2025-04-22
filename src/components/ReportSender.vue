<template>
  <div class="report-sender">
    <h2>Send Report</h2>
    <q-input
      v-model="email"
      label="Email Address"
      type="email"
      outlined
      required
    />
    <q-btn @click="sendReport" label="Send Report" color="primary" />
    <q-notification
      v-if="notification"
      :color="notification.type"
      :message="notification.message"
      position="top"
      timeout="3000"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import emailjs from 'emailjs-com';

export default defineComponent({
  name: 'ReportSender',
  data() {
    return {
      email: '',
      notification: null,
    };
  },
  methods: {
    sendReport() {
      const reportContent = this.generateReportContent();
      const templateParams = {
        to_email: this.email,
        message: reportContent,
      };

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(() => {
          this.notification = {
            type: 'positive',
            message: 'Report sent successfully!',
          };
        })
        .catch(() => {
          this.notification = {
            type: 'negative',
            message: 'Failed to send report. Please try again.',
          };
        });
    },
    generateReportContent() {
      // Logic to generate report content goes here
      return 'This is a sample report content.';
    },
  },
});
</script>

<style scoped>
.report-sender {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>