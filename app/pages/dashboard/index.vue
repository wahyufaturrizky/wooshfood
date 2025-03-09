<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="pa-12 bg-[#FBFBFC]">
    <div class="flex justify-between items-center">
      <p class="text-h6">Dashboard</p>
      <div class="flex gap-2 items-center">
        <p class="text-h6">Logo</p>
        <p class="text-h6">Company Name</p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div
        v-for="item in 3"
        :key="item"
        class="p-4 bg-white rounded-md flex flex-col justify-center items-center"
      >
        <div class="mb-2"><NuxtImg height="32" width="32" src="/star.png" alt="star" /></div>
        <p class="text-h7 font-weight-bold text-center">Point Balance</p>
        <p class="text-h7 text-center">36</p>
      </div>
    </div>

    <div class="flex justify-between items-center mt-4">
      <p class="text-h6">Available Rewards</p>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div
        v-for="item in 3"
        :key="item"
        class="p-4 bg-white rounded-md flex flex-col justify-center items-center"
      >
        <div class="mb-2"><NuxtImg height="32" width="32" src="/star.png" alt="star" /></div>
        <p class="text-h7 font-weight-bold text-center">Point Balance</p>
        <p class="text-h7 text-center">36</p>
      </div>
    </div>
  </div>
</template>
