<script setup lang="ts">
defineProps({
  dateTime: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
  bookingId: {
    type: String,
  },
});
</script>

<template>
  <VRow>
    <VCol>
      <div class="flex items-center justify-center mb-2">
        <NuxtImg height="100" width="100" src="/complete.png" alt="logo" />
      </div>

      <p class="text-black-500 text-lg text-center mb-4 font-medium">
        Thank you for booking with WooshCompany!
      </p>
      <p class="text-[#525B66] text-base text-center mb-12 font-normal">
        Your booking is scheduled for {{ formatDateTimeBooking(dateTime) }}
      </p>

      <p class="text-black-500 text-lg mb-4 font-medium">
        Thank you for booking with WooshCompany!
      </p>

      <div v-if="bookingId" class="flex items-center">
        <p class="text-[#525B66]">Booking ID :</p>
        <p class="font-light ml-1">{{ bookingId }}</p>
      </div>
      <div v-if="firstName || lastName" class="flex items-center">
        <p class="text-[#525B66]">Name :</p>
        <p class="font-light ml-1">{{ firstName }} {{ lastName }}</p>
      </div>
      <div v-if="email" class="flex items-center">
        <p class="text-[#525B66]">Email :</p>
        <p class="font-light ml-1">{{ email }}</p>
      </div>
      <div v-if="phone" class="flex items-center">
        <p class="text-[#525B66]">Phone :</p>
        <p class="font-light ml-1">{{ phone }}</p>
      </div>
      <div v-if="message" class="flex items-center">
        <p class="text-[#525B66]">Message :</p>
        <p class="font-light ml-1">{{ message }}</p>
      </div>
    </VCol>
  </VRow>
</template>
