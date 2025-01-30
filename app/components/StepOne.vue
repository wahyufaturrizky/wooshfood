<script setup lang="ts">
const regNumber = defineModel<string>("regNumber");

const emit = defineEmits(["next"]);
</script>

<template>
  <p class="text-black-500 text-lg mb-4">Registration Number</p>
  <VTextField
    v-model="regNumber"
    color="#80509C"
    placeholder="Enter your registration number"
    variant="outlined"
  />

  <VBtn color="#80509C" block @click="emit('next')"> Next </VBtn>
</template>
