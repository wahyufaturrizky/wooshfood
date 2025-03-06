<script setup lang="ts">
const emit = defineEmits(["next"]);

const password = defineModel<string>("password");
const newPassword = ref("");

const handleNext = () => {
  if (password.value) emit("next");
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <div class="border border-[#ECEFF3] p-4 rounded-lg">
      <VRow>
        <VCol cols="12">
          <VTextField
            v-model="password"
            color="#80509C"
            label="New Password"
            placeholder="Enter your password"
            variant="outlined"
            type="password"
            :rules="[(val) => requiredField(val, 'You must enter a password.')]"
          />
        </VCol>
        <VCol cols="12">
          <VTextField
            v-model="newPassword"
            label="Confirm Password"
            color="#80509C"
            placeholder="Confirm password"
            variant="outlined"
            type="text"
            :rules="[(val) => requiredField(val, 'You must enter a confirm password.')]"
          />
        </VCol>
      </VRow>

      <VBtn color="#80509C" block type="submit"> Continue </VBtn>
    </div>
  </VForm>
</template>
