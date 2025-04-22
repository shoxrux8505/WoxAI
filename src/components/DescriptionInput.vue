<template>
  <div class="description-input">
    <q-input
      filled
      v-model="description"
      type="textarea"
      label="Describe the current business situation"
      rows="5"
      :rules="[val => val.length > 0 || 'Description is required']"
    />
  </div>
</template>

<script>
export default {
  name: 'DescriptionInput',
  data() {
    return {
      description: ''
    };
  },
  watch: {
    description(newValue) {
      this.$emit('update:description', newValue);
    }
  }
};
</script>

<style scoped>
.description-input {
  margin: 16px 0;
}
</style>