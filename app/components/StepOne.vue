<script setup lang="ts">
const regNumber = ref("");
const emit = defineEmits(["next", "update:regnumber"]);
</script>

<template>
  <p class="text-black-500 text-lg mb-4">Registration Number</p>
  <VTextField
    v-model="regNumber"
    color="#80509C"
    placeholder="Enter your registration number"
    variant="outlined"
    @input="emit('update:regnumber', $event)"
  />

  <VBtn color="#80509C" block @click="emit('next')"> Next </VBtn>
</template>
