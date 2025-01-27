<script lang="ts" setup>
import type { ResSalesOrder } from "~/interface/common.interface";

const stepper = ref(1);

const regNumber = ref("");
const name = ref("");
const email = ref("");
const phone = ref("");
const check = ref(false);
const loading = ref(false);

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

const titleStep: { [key: number]: string } = {
  1: "Services",
  2: "Date & Time",
  3: "Details",
  4: "Complete",
};
</script>

<template>
  <div>
    <HeaderSchedule />

    <div class="mx-auto max-w-7xl py-11 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-balance text-5xl font-semibold tracking-tight text-black-500 sm:text-2xl">
          Schedule Your Car Wash Quick & Easy!
        </h1>
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
                <StepOneSchedule @update:regnumber="regNumber = $event.target.value" @next="next" />
              </div>

              <div v-if="n === 2" class="mx-auto max-w-5xl">
                <StepTwoSchedule @next="next" />
              </div>

              <div v-if="n === 3" class="mx-auto max-w-5xl">
                <StepThreeSchedule @next="next" />
              </div>

              <div v-if="n === 4" class="mx-auto max-w-2xl">
                <StepFourSchedule :loading="loading" @proceed="handleProceed" />
              </div>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
