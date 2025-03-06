<script setup lang="ts">
const emit = defineEmits(["proceed"]);

const otp = ref("");
const isOpenDialog = ref(false);

const handleNext = () => {
  emit("proceed");
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <div class="border border-[#ECEFF3] p-4 rounded-lg">
      <VRow>
        <VCol cols="12">
          <VOtpInput
            v-model="otp"
            length="4"
            :rules="[(val) => requiredField(val, 'You must enter a password.')]"
          />
        </VCol>
      </VRow>

      <p class="text-center text-[#A8A8A8]">
        Didn’t get the OTP <span class="text-blue cursor-pointer">Resend</span>
      </p>

      <VBtn color="#80509C" class="mt-4" block type="submit"> Continue </VBtn>
    </div>
  </VForm>

  <VDialog v-model="isOpenDialog" max-width="500">
    <div class="bg-white rounded-lg shadow-lg p-4">
      <p class="font-medium text-center">Account Creation Successful!</p>
      <p class="text-[#A8A8A8] text-sm text-center">You're in! Start earning rewards now</p>

      <VBtn color="#80509C" class="mt-4" block> Go to home </VBtn>
    </div>
  </VDialog>
</template>
