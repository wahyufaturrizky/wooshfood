<script setup lang="ts">
const emit = defineEmits(["next"]);
</script>

<template>
  <p class="text-black-500 text-lg mb-4">Registration Number</p>
  <VTextField color="#80509C" placeholder="Enter your registration number" variant="outlined" />

  <VBtn @click="emit('next')" color="#80509C" block> Next </VBtn>
</template>
