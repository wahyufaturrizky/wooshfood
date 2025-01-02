<script lang="ts" setup>
const stepper = ref(1);

const stepperList = 4;
</script>

<template>
  <div class="bg-[#FBFBFC] h-dvh">
    <Header />

    <div class="mx-auto max-w-7xl py-11 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-balance text-5xl font-semibold tracking-tight text-black-500 sm:text-2xl">
          Quick Car Wash Registration
        </h1>
        <p class="mt-4 text-pretty text-lg font-medium text-black-400 sm:text-base">
          Get Started with Quick Car Wash: A Simple, Step-by-Step Registration Process!
        </p>
      </div>

      <VStepper class="mt-4" :flat="true" bg-color="transparent" alt-labels v-model="stepper">
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

              <div class="w-full border-dashed border" v-if="n !== stepperList" :key="n" />
            </template>
          </VStepperHeader>

          <VStepperWindow>
            <VStepperWindowItem
              class="p-4"
              v-for="n in stepperList"
              :key="`${n}-content`"
              :value="n"
            >
              <div v-if="n === 1" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <StepOne @next="next" />
              </div>

              <div v-if="n === 2" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <StepTwo @next="next" />
              </div>

              <div v-if="n === 3" class="mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <StepThree @next="next" />
              </div>

              <div v-if="n === 4">
                <StepFour />
              </div>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
