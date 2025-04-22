<template>
  <div class="business-process-selector">
    <q-select
      v-model="selectedProcess"
      :options="processOptions"
      label="Select a Business Process"
      outlined
      emit-value
      map-options
    />
  </div>
</template>

<script>
export default {
  name: 'BusinessProcessSelector',
  data() {
    return {
      selectedProcess: null,
      processOptions: [
        { label: 'Sales', value: 'sales' },
        { label: 'Customer Service', value: 'customer_service' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Finance', value: 'finance' },
        { label: 'HR', value: 'hr' },
        { label: 'Logistics', value: 'logistics' }
      ]
    };
  },
  watch: {
    selectedProcess(newValue) {
      this.$emit('process-selected', newValue);
    }
  }
};
</script>

<style scoped>
.business-process-selector {
  margin: 16px 0;
}
</style>