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

// const cardType = ref("");
// const cardNumber = ref("");
// const expDate = ref("");
// const ccv = ref("");
// const paymentMethod = ref("credit-card");

const stepperList = 3;

const resetForm = () => {
  regNumber.value = "";
  name.value = "";
  email.value = "";
  phone.value = "";
  check.value = false;
};

const handleProceed = async (order) => {
  try {
    const { name: nameOrder, list_price } = order;

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
          order_line: [
            {
              name: nameOrder,
              product_qty: 1.0,
              price_unit: 123.0,
            },
          ],
          reference: formatDate(new Date()),
        },
      },
    });
    console.log("res", res);

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
        <h1 class="text-balance font-semibold tracking-tight text-black-500 text-2xl sm:text-5xl">
          Quick Car Wash Registration
        </h1>
        <p class="mt-4 text-pretty mx-12 sm:mx-auto font-medium text-black-400 text-sm sm:text-lg">
          Get Started with Quick Car Wash: A Simple, Step-by-Step Registration Process!
        </p>
      </div>

      <VStepper
        v-model="stepper"
        mobile
        class="mt-4"
        :flat="true"
        bg-color="transparent"
        alt-labels
      >
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
                <StepOne v-model:reg-number="regNumber" @next="next" />
              </div>

              <div v-if="n === 2" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <StepTwo
                  v-model:name="name"
                  v-model:email="email"
                  v-model:phone="phone"
                  v-model:check="check"
                  @next="next"
                />
              </div>

              <div v-if="n === 3" class="mx-auto max-w-6xl p-6">
                <StepThree
                  :name="name"
                  :email="email"
                  :reg-number="regNumber"
                  :loading-proceed="loading"
                  @update:plan="plan = $event"
                  @proceed="handleProceed"
                />
              </div>

              <!-- <div v-if="n === 4">
                <StepFour
                  v-model:card-type="cardType"
                  v-model:card-number="cardNumber"
                  v-model:exp-date="expDate"
                  v-model:ccv="ccv"
                  v-model:payment-method="paymentMethod"
                  :loading="loading"
                  @proceed="handleProceed"
                />
              </div> -->
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
