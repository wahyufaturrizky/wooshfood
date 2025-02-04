<script setup lang="ts">
const emit = defineEmits(["next"]);

const name = defineModel<string>("name");
const email = defineModel<string>("email");
const phone = defineModel<string>("phone");
const check = defineModel<boolean>("check");

const hadnleNext = () => {
  if (!name.value && !email.value && !phone.value) return;

  emit("next");
};
</script>

<template>
  <p class="text-black-500 text-lg mb-4">Your Name</p>

  <VForm @submit.prevent="hadnleNext">
    <VTextField
      v-model="name"
      color="#80509C"
      placeholder="Enter your name"
      variant="outlined"
      :rules="[(val) => requiredField(val, 'You must enter a name.')]"
    />

    <p class="text-black-500 text-lg mb-4">Your E-mail</p>
    <VTextField
      v-model="email"
      color="#80509C"
      type="email"
      placeholder="Enter your email"
      variant="outlined"
      :rules="[(val) => requiredField(val, 'You must enter a email.')]"
    />

    <p class="text-black-500 text-lg mb-4">Your Phone Number</p>
    <VTextField
      v-model="phone"
      color="#80509C"
      type="tel"
      placeholder="Enter your phone number"
      :rules="[(val) => requiredField(val, 'You must enter a phone number.')]"
      variant="outlined"
    />

    <VCheckbox v-model="check" color="#80509C">
      <template #label>
        <span class="text-[#A8A8A8]"
          >Yes, I want to receive exclusive offers, deals and discounts.</span
        >
      </template>
    </VCheckbox>

    <VBtn color="#80509C" block type="submit"> Next </VBtn>
  </VForm>
</template>
