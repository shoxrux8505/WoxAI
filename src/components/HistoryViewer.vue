<template>
  <div class="history-viewer">
    <h2>Request History</h2>
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Business Process</th>
          <th>Recommendations</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in history" :key="index">
          <td>{{ entry.timestamp }}</td>
          <td>{{ entry.process }}</td>
          <td>{{ entry.recommendations }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistoryViewer',
  props: {
    history: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.history-viewer {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}
</style>