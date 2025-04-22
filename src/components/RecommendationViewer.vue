<template>
  <div class="recommendation-viewer">
    <h2>Recommendations</h2>
    <div v-if="recommendations.length === 0">
      <p>No recommendations available. Please request recommendations from AI.</p>
    </div>
    <ul v-else>
      <li v-for="(recommendation, index) in recommendations" :key="index">
        {{ recommendation }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RecommendationViewer',
  props: {
    recommendations: {
      type: Array,
      required: true
    }
  }
});
</script>

<style scoped>
.recommendation-viewer {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>