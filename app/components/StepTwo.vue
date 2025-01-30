<script setup lang="ts">
const emit = defineEmits(["next"]);

const name = defineModel<string>("name");
const email = defineModel<string>("email");
const phone = defineModel<string>("phone");
const check = defineModel<boolean>("check");
</script>

<template>
  <p class="text-black-500 text-lg mb-4">Your Name</p>
  <VTextField v-model="name" color="#80509C" placeholder="Enter your name" variant="outlined" />

  <p class="text-black-500 text-lg mb-4">Your E-mail</p>
  <VTextField
    v-model="email"
    color="#80509C"
    type="email"
    placeholder="Enter your email"
    variant="outlined"
  />

  <p class="text-black-500 text-lg mb-4">Your Phone Number</p>
  <VTextField
    v-model="phone"
    color="#80509C"
    type="number"
    placeholder="Enter your phone number"
    variant="outlined"
  />

  <VCheckbox v-model="check" color="#80509C">
    <template #label>
      <span class="text-[#A8A8A8]"
        >Yes, I want to receive exclusive offers, deals and discounts.</span
      >
    </template>
  </VCheckbox>

  <VBtn color="#80509C" block @click="emit('next')"> Next </VBtn>
</template>
