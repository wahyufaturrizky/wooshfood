<script setup lang="ts">
const emit = defineEmits(["next"]);

const firstName = defineModel<string>("firstName");
const lastName = defineModel<string>("lastName");
const email = defineModel<string>("email");
const phone = defineModel<string>("phone");
const termConditionStepOne = defineModel<[]>("termConditionStepOne");

const { mdAndDown } = useDisplay();

const handleNext = () => {
  if (firstName.value && lastName.value && phone.value && email.value) emit("next");
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <div class="border border-[#ECEFF3] p-4 rounded-lg">
      <VRow>
        <VCol :cols="mdAndDown ? '12' : '6'">
          <VTextField
            v-model="firstName"
            color="#80509C"
            label="First Name"
            placeholder="Enter your first name"
            variant="outlined"
            type="text"
            :rules="[(val) => requiredField(val, 'You must enter a first name.')]"
          />
        </VCol>
        <VCol :cols="mdAndDown ? '12' : '6'">
          <VTextField
            v-model="lastName"
            label="Last Name"
            color="#80509C"
            placeholder="Enter your last name"
            variant="outlined"
            type="text"
            :rules="[(val) => requiredField(val, 'You must enter a last name.')]"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="mdAndDown ? '12' : '6'">
          <VTextField
            v-model="email"
            label="Enter Email Address"
            color="#80509C"
            placeholder="Enter your email"
            variant="outlined"
            type="email"
            :rules="[(val) => requiredField(val, 'You must enter a email.')]"
          />
        </VCol>
        <VCol :cols="mdAndDown ? '12' : '6'">
          <VTextField
            v-model="phone"
            label="Phone"
            color="#80509C"
            placeholder="Enter your phone"
            variant="outlined"
            type="tel"
            :rules="[(val) => requiredField(val, 'You must enter a phone.')]"
          />
        </VCol>
      </VRow>

      <VCheckbox v-model="termConditionStepOne" value="agree_receive_marketing" color="#80509C">
        <template #label>
          <span class="text-[#A8A8A8]"
            >I want to receive marketing communications and special offers</span
          >
        </template>
      </VCheckbox>

      <VCheckbox v-model="termConditionStepOne" value="agree_tnc" color="#80509C">
        <template #label>
          <span class="text-[#A8A8A8]">I Agree to the terms & conditions, Privacy policy</span>
        </template>
      </VCheckbox>

      <VBtn color="#80509C" block type="submit"> Continue </VBtn>

      <p class="text-[#A8A8A8] text-center my-2">or continue with</p>
    </div>
  </VForm>
</template>
