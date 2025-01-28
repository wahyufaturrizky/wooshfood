<template>
  <header class="shadow-md bg-white">
    <nav class="flex items-center sm:justify-evenly p-6 lg:px-8" aria-label="Global">
      <NuxtImg height="25" width="136" src="/woosh-logo.png" alt="logo" />
      <div class="hidden sm:items-center sm:gap-4 sm:flex">
        <p class="font-normal text-[#525B66] hover:text-purple-woosh cursor-pointer">Order Now</p>
        <p class="font-normal text-[#525B66] hover:text-purple-woosh cursor-pointer">Booking</p>
        <p class="font-normal text-[#525B66] hover:text-purple-woosh cursor-pointer">
          Order History
        </p>
      </div>
      <div class="hidden sm:items-center sm:gap-4 sm:flex">
        <NuxtImg height="24" width="24" src="/cart.png" alt="logo" />
        <NuxtImg height="24" width="24" src="/favorite.png" alt="logo" />
        <NuxtImg height="24" width="24" src="/search.png" alt="logo" />
        <NuxtImg height="24" width="24" src="/profile.png" alt="logo" />
      </div>
    </nav>
  </header>
</template>
