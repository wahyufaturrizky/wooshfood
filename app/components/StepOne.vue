<script setup lang="ts">
const regNumber = defineModel<string>("regNumber");

const emit = defineEmits(["next"]);

const hadnleNext = () => {
  if (!regNumber.value) return;

  emit("next");
};
</script>

<template>
  <p class="text-black-500 text-lg mb-4">Registration Number</p>
  <VForm @submit.prevent="hadnleNext">
    <VTextField
      v-model="regNumber"
      color="#80509C"
      placeholder="Enter your registration number"
      variant="outlined"
      :rules="[(val) => requiredField(val, 'You must enter a registration number.')]"
    />

    <VBtn color="#80509C" block type="submit"> Next </VBtn>
  </VForm>
</template>
