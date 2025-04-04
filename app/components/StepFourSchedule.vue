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
  time: {
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

      <p class="text-black-500 text-center text-lg mb-4 font-medium">
        Thank you for booking with WooshCompany!
      </p>
      <p class="text-[#525B66] text-base text-center mb-12 font-normal">
        Your booking is scheduled for {{ formatDateTimeBooking(dateTime, time) }}
      </p>

      <div class="flex items-center justify-center">
        <div>
          <p class="text-[#525B66]">Booking ID</p>
          <p class="text-[#525B66]">Name</p>
          <p class="text-[#525B66]">Email</p>
          <p class="text-[#525B66]">Phone</p>
          <p class="text-[#525B66]">Message</p>
        </div>

        <div>
          <p class="font-light ml-1">: {{ bookingId }}</p>
          <p class="font-light ml-1">: {{ firstName }} {{ lastName }}</p>
          <p class="font-light ml-1">: {{ email }}</p>
          <p class="font-light ml-1">: {{ phone }}</p>
          <p class="font-light ml-1">: {{ message }}</p>
        </div>
      </div>
    </VCol>
  </VRow>
</template>
