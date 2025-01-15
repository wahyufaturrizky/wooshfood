<script lang="ts" setup>
import type { ResSalesOrder } from "~/interface/common.interface";

const stepper = ref(1);

const regNumber = ref("");
const name = ref("");
const email = ref("");
const phone = ref("");
const check = ref(false);
const loading = ref(false);
const plan = ref(2);
const loyalPlan = ref();

const cardType = ref("");
const cardNumber = ref("");
const expDate = ref("");
const ccv = ref("");
const paymentMethod = ref("credit-card");

const stepperList = 4;

const resetForm = () => {
  regNumber.value = "";
  name.value = "";
  email.value = "";
  phone.value = "";
  check.value = false;
};

const handleProceed = async () => {
  try {
    loading.value = true;

    const res: ResSalesOrder = await $fetch("/api/submit", {
      method: "POST",
      body: {
        params: {
          customer: {
            name: name.value,
            email: email.value,
            phone: phone.value,
            registration_number: regNumber.value,
          },
          date_order: formatDate(new Date()),
          order_line: [],
        },
      },
    });

    if (res?.status === "success") {
      const { msg } = res || {};
      useSnackbar().sendSnackbar(msg, "success");
      resetForm();
      loading.value = false;
    } else {
      useSnackbar().sendSnackbar(res.msg, "error");
      loading.value = false;
    }
  } catch (error) {
    console.log("handleProceed", error);

    loading.value = false;
  }
};
</script>

<template>
  <div>
    <HeaderComp />

    <div class="mx-auto max-w-7xl py-11 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-balance text-5xl font-semibold tracking-tight text-black-500 sm:text-2xl">
          Quick Car Wash Registration
        </h1>
        <p class="mt-4 text-pretty text-lg font-medium text-black-400 sm:text-base">
          Get Started with Quick Car Wash: A Simple, Step-by-Step Registration Process!
        </p>
      </div>

      <VStepper v-model="stepper" class="mt-4" :flat="true" bg-color="transparent" alt-labels>
        <template #default="{ next }">
          <VStepperHeader class="!shadow-none">
            <template v-for="n in stepperList" :key="`${n}-step`">
              <VStepperItem
                color="#80509C"
                :value="n"
                :step="`Step {{ n }}`"
                :title="n === 4 ? 'Payment' : `Step ${n}`"
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
              <div v-if="n === 1" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <StepOne @update:regnumber="regNumber = $event.target.value" @next="next" />
              </div>

              <div v-if="n === 2" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <StepTwo
                  @next="next"
                  @update:name="name = $event.target.value"
                  @update:email="email = $event.target.value"
                  @update:phone="phone = $event.target.value"
                  @update:check="check = $event.target.value"
                />
              </div>

              <div v-if="n === 3" class="mx-auto max-w-4xl p-6">
                <StepThree
                  @update:loyalplan="loyalPlan = $event"
                  @update:plan="plan = $event"
                  @next="next"
                />
              </div>

              <div v-if="n === 4">
                <StepFour
                  :loading="loading"
                  @update:cardtype="cardType = $event"
                  @update:cardnumber="cardNumber = $event"
                  @update:expdate="expDate = $event"
                  @update:ccv="ccv = $event"
                  @update:paymentmethod="paymentMethod = $event"
                  @proceed="handleProceed"
                />
              </div>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
