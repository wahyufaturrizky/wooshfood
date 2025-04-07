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

      <div class="flex sm:ml-40">
        <p class="text-[#525B66] w-40">Booking ID</p>
        <p class="font-light ml-1 w-10">:</p>
        <p class="font-light ml-1 break-all w-50">{{ bookingId }}</p>
      </div>
      <div class="flex sm:ml-40">
        <p class="text-[#525B66] w-40">Name</p>
        <p class="font-light ml-1 w-10">:</p>
        <p class="font-light ml-1 break-all w-50">{{ firstName }} {{ lastName }}</p>
      </div>
      <div class="flex sm:ml-40">
        <p class="text-[#525B66] w-40">Email</p>
        <p class="font-light ml-1 w-10">:</p>
        <p class="font-light ml-1 break-all w-50">{{ email }}</p>
      </div>
      <div class="flex sm:ml-40">
        <p class="text-[#525B66] w-40">Phone</p>
        <p class="font-light ml-1 w-10">:</p>
        <p class="font-light ml-1 break-all w-50">{{ phone }}</p>
      </div>
      <div class="flex sm:ml-40">
        <p class="text-[#525B66] w-40">Message</p>
        <p class="font-light ml-1 w-10">:</p>
        <p class="font-light ml-1 break-all w-50">{{ message }}</p>
      </div>
    </VCol>
  </VRow>
</template>
