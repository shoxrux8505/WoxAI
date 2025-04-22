<template>
  <div class="csv-uploader">
    <q-file
      filled
      v-model="file"
      label="Upload CSV File"
      @added="handleFileUpload"
      accept=".csv"
      lazy-rules
      :rules="[fileRequired]"
    />
  </div>
</template>

<script>
export default {
  name: 'CsvUploader',
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload() {
      if (this.file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          this.$emit('file-uploaded', content);
        };
        reader.readAsText(this.file);
      }
    },
    fileRequired(value) {
      return !!value || 'File is required';
    },
  },
};
</script>

<style scoped>
.csv-uploader {
  margin: 16px 0;
}
</style>