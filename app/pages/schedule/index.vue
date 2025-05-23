<script lang="ts" setup>
import type { ResSalesOrder } from "~/interface/common.interface";

const stepper = ref(1);

const service = ref([]);
const dateTime = ref();
const time = ref();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const regNumber = ref("");
const street = ref("");
const street2 = ref("");
const city = ref("");
const state_id = ref("");
const country_id = ref("");
const productId = ref();
const bookingId = ref("");
const loading = ref(false);
const loadingSlot = ref(false);
const dataSlot = ref();

const stepperList = 4;

const handleProceed = async (next) => {
  try {
    loading.value = true;

    const res: ResSalesOrder = await $fetch("/api/booking/order", {
      method: "POST",
      body: {
        params: {
          customer: {
            name: `${firstName.value} ${lastName.value}`,
            registration_number: regNumber.value,
            email: email.value,
            phone: phone.value,
            street: street.value,
            street2: street2.value,
            city: city.value,
            state_id: state_id.value,
            country_id: country_id.value,
          },
          date_booking: formatDateTime(dateTime.value, time.value),
          message: message.value,
          product_id: productId.value.map(({ id, name }) => ({
            id,
            name,
          })),
        },
      },
    });

    const { result } = res || {};
    const { message: msg, booking_id } = result || {};

    if (res?.status === "success") {
      // useSnackbar().sendSnackbar(msg, "success");
      next();
      scrollToActiveStep();
      loading.value = false;
      bookingId.value = booking_id;
    } else {
      useSnackbar().sendSnackbar(msg, "error");
      loading.value = false;
    }
  } catch (error) {
    console.log("handleProceed", error);

    loading.value = false;
  }
};

const handleGetSlots = async (products, next) => {
  try {
    loadingSlot.value = true;

    const res = await $fetch("/api/booking/slots", {
      method: "POST",
      body: {
        params: {
          product_id: products.map(({ id, name }) => ({
            id,
            name,
          })),
        },
      },
    });

    const { result, status } = res || {};
    const { message: msg } = result || {};

    if (status === "success") {
      // useSnackbar().sendSnackbar(msg, "success");
      dataSlot.value = res;
      next();
      scrollToActiveStep();

      loadingSlot.value = false;
    } else {
      useSnackbar().sendSnackbar(msg, "error");
      loadingSlot.value = false;
    }
  } catch (error) {
    loadingSlot.value = false;
  }
};

const titleStep: { [key: number]: string } = {
  1: "Services",
  2: "Date & Time",
  3: "Details",
  4: "Complete",
};

const scrollToActiveStep = () => {
  const activeStep = document.querySelector(".v-stepper-item--selected");
  if (activeStep) {
    activeStep.scrollIntoView({ behavior: "smooth", inline: "start" });
  }
};

const handleNextStepOne = (next, val) => {
  productId.value = val;
  handleGetSlots(val, next);
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
                <StepOneSchedule
                  v-model:service="service"
                  :loading-slot="loadingSlot"
                  @next="(val) => handleNextStepOne(next, val)"
                />
              </div>

              <div v-if="n === 2" class="mx-auto max-w-5xl">
                <StepTwoSchedule
                  v-model:date-time="dateTime"
                  v-model:time="time"
                  :product-id="productId"
                  :data-slot="dataSlot"
                  @next="handleNext(next)"
                />
              </div>

              <div v-if="n === 3" class="mx-auto max-w-5xl">
                <StepThreeSchedule
                  v-model:first-name="firstName"
                  v-model:last-name="lastName"
                  v-model:email="email"
                  v-model:phone="phone"
                  v-model:reg-number="regNumber"
                  v-model:message="message"
                  :loading="loading"
                  :product-id="productId"
                  @proceed="handleProceed(next)"
                />
              </div>

              <div v-if="n === 4" class="mx-auto max-w-2xl">
                <StepFourSchedule
                  :date-time="dateTime"
                  :time="time"
                  :first-name="firstName"
                  :last-name="lastName"
                  :email="email"
                  :phone="phone"
                  :message="message"
                  :booking-id="bookingId"
                />
              </div>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
