<template>
  <p class="text-black-500 text-lg mb-4">Your Name</p>
  <VTextField color="#80509C" placeholder="Enter your name" variant="outlined" />

  <p class="text-black-500 text-lg mb-4">Your E-mail</p>
  <VTextField color="#80509C" type="email" placeholder="Enter your email" variant="outlined" />

  <p class="text-black-500 text-lg mb-4">Your Phone Number</p>
  <VTextField
    color="#80509C"
    type="number"
    placeholder="Enter your phone number"
    variant="outlined"
  />

  <VCheckbox color="#80509C">
    <template #label>
      <span class="text-[#A8A8A8]"
        >Yes, I want to receive exclusive offers, deals and discounts.</span
      >
    </template>
  </VCheckbox>

  <VBtn color="#80509C" block> Next </VBtn>
</template>
