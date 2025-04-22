<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-md">
      <h1>Business Process Optimizer</h1>
      <business-process-selector @process-selected="onProcessSelected" />
      <description-input v-model="description" />
      <csv-uploader @file-uploaded="onFileUploaded" />
      <q-btn label="Get AI Recommendations" @click="getRecommendations" />
      <recommendation-viewer :recommendations="recommendations" />
      <history-viewer :history="history" />
      <report-sender @report-sent="onReportSent" />
    </div>
  </q-page>
</template>

<script>
import BusinessProcessSelector from '../components/BusinessProcessSelector.vue';
import DescriptionInput from '../components/DescriptionInput.vue';
import CsvUploader from '../components/CsvUploader.vue';
import RecommendationViewer from '../components/RecommendationViewer.vue';
import HistoryViewer from '../components/HistoryViewer.vue';
import ReportSender from '../components/ReportSender.vue';

export default {
  components: {
    BusinessProcessSelector,
    DescriptionInput,
    CsvUploader,
    RecommendationViewer,
    HistoryViewer,
    ReportSender,
  },
  data() {
    return {
      description: '',
      recommendations: [],
      history: [],
    };
  },
  methods: {
    onProcessSelected(process) {
      // Handle the selected business process
    },
    onFileUploaded(fileContent) {
      this.description = fileContent; // Assuming fileContent is the text from the CSV
    },
    getRecommendations() {
      // Logic to call OpenAI API and get recommendations
    },
    onReportSent() {
      // Logic to handle report sent notification
    },
  },
};
</script>

<style scoped>
.q-page {
  padding: 20px;
}
</style>