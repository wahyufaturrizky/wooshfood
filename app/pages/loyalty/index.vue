<script lang="ts" setup>
import StepOneLoyalty from "~/components/StepOneLoyalty.vue";
import type { ResSalesOrder } from "~/interface/common.interface";

const stepper = ref(1);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const termConditionStepOne = ref([]);
const loading = ref(false);

const stepperList = 4;

const handleProceed = async (next) => {
  try {
    loading.value = true;

    const res: ResSalesOrder = await $fetch("/api/booking/order", {
      method: "POST",
      body: {},
    });

    const { result } = res || {};
    const { message: msg, booking_id } = result || {};

    if (res?.status === "success") {
      useSnackbar().sendSnackbar(msg, "success");
      next();
      scrollToActiveStep();
      loading.value = false;
    } else {
      useSnackbar().sendSnackbar(msg, "error");
      loading.value = false;
    }
  } catch (error) {
    console.log("handleProceed", error);

    loading.value = false;
  }
};

const titleStep: { [key: number]: string } = {
  1: "Create Account",
  2: "Create Password",
  3: "Confirm OTP",
  4: "Confirmation",
};

const scrollToActiveStep = () => {
  const activeStep = document.querySelector(".v-stepper-item--selected");
  if (activeStep) {
    activeStep.scrollIntoView({ behavior: "smooth", inline: "start" });
  }
};

const handleNext = (next) => {
  next();
  scrollToActiveStep();
};
</script>

<template>
  <div>
    <HeaderSchedule />

    <div class="mx-auto max-w-7xl py-11 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-balance text-xl font-semibold tracking-tight text-black-500 sm:text-2xl">
          Create your account
        </h1>

        <p class="mt-4 text-pretty mx-12 sm:mx-auto font-medium text-black-400 text-sm sm:text-lg">
          sign Up now and make every purchase more rewarding!
        </p>
      </div>

      <VStepper v-model="stepper" class="mt-4" :flat="true" bg-color="transparent" alt-labels>
        <template #default="{ next }">
          <VStepperHeader class="!shadow-none">
            <template v-for="n in stepperList" :key="`${n}-step`">
              <VStepperItem
                color="#80509C"
                :value="n"
                :step="titleStep[n]"
                :title="titleStep[n]"
                editable
              />

              <div v-if="n !== stepperList" :key="n" class="w-full border-dashed border" />
            </template>
          </VStepperHeader>

          <VStepperWindow>
            <VStepperWindowItem
              v-for="n in stepperList"
              :key="`${n}-content`"
              :value="n"
              class="p-4"
            >
              <div v-if="n === 1" class="mx-auto max-w-5xl">
                <StepOneLoyalty
                  v-model:first-name="firstName"
                  v-model:last-name="lastName"
                  v-model:email="email"
                  v-model:phone="phone"
                  v-model:term-condition-step-one="termConditionStepOne"
                  @next="handleNext(next)"
                />
              </div>

              <div v-if="n === 2" class="mx-auto max-w-2xl">
                <StepTwoLoyalty v-model:password="password" @next="handleNext(next)" />
              </div>

              <div v-if="n === 3" class="mx-auto max-w-2xl">
                <StepThreeLoyalty :loading="loading" @proceed="handleProceed(next)" />
              </div>

              <div v-if="n === 4" class="mx-auto max-w-2xl">
                <StepFourSchedule />
              </div>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
