<script lang="ts" setup>
const stepper = ref(3);
const plan = ref(2);

const stepperList = 4;
</script>

<template>
  <div class="bg-[#FBFBFC] h-dvh">
    <header class="shadow-md bg-white">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <NuxtImg height="25" width="136" src="/woosh-logo.png" alt="logo" />
        </div>
      </nav>
    </header>

    <div class="mx-auto max-w-4xl py-11 sm:py-48 lg:py-56">
      <div class="text-center">
        <h1 class="text-balance text-5xl font-semibold tracking-tight text-black-500 sm:text-2xl">
          Quick Car Wash Registration
        </h1>
        <p class="mt-4 text-pretty text-lg font-medium text-black-400 sm:text-base">
          Get Started with Quick Car Wash: A Simple, Step-by-Step Registration Process!
        </p>
      </div>

      <VStepper class="mt-4 !shadow-none !bg-[#FBFBFC]" alt-labels v-model="stepper">
        <template #default="{}">
          <VStepperHeader class="!shadow-none">
            <template v-for="n in stepperList" :key="`${n}-step`">
              <VStepperItem
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
                <p class="text-black-500 text-lg mb-4">Registration Number</p>
                <VTextField placeholder="Enter your registration number" variant="outlined" />

                <VBtn color="#80509C" block> Next </VBtn>
              </div>

              <div v-if="n === 2" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <p class="text-black-500 text-lg mb-4">Your Name</p>
                <VTextField placeholder="Enter your name" variant="outlined" />

                <p class="text-black-500 text-lg mb-4">Your E-mail</p>
                <VTextField type="email" placeholder="Enter your email" variant="outlined" />

                <p class="text-black-500 text-lg mb-4">Your Phone Number</p>
                <VTextField
                  type="number"
                  placeholder="Enter your phone number"
                  variant="outlined"
                />

                <VCheckbox color="#80509C">
                  <template #label>
                    <span class="text-[#A8A8A8]"
                      >Yes, I want to receive exclusive offers, deals and discounts.</span
                    >
                  </template>
                </VCheckbox>

                <VBtn color="#80509C" block> Next </VBtn>
              </div>

              <div v-if="n === 3" class="mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <p class="text-2xl text-center mb-4">
                  Have a <span><b>NEW</b></span> car!
                </p>

                <VRadioGroup v-model="plan" color="#80509C" inline>
                  <template v-for="item in 3" :key="item">
                    <div class="rounded-lg border border-[#D2D2D5] p-6 ml-6">
                      <VRadio :value="item">
                        <template #label>
                          <div>
                            <p class="text-base">Great Carwash</p>
                            <div class="mt-2"><b class="text-4xl">$350.00</b></div>

                            <VList>
                              <VListItem
                                v-for="subitem in 4"
                                :key="subitem"
                                class="!p-0 !min-h-0 mt-2"
                              >
                                <template v-slot:prepend>
                                  <VIcon :icon="'mdi-check'" />
                                  <VListItemTitle v-text="'Test'" />
                                </template>
                              </VListItem>
                            </VList>
                          </div>
                        </template>
                      </VRadio>
                    </div>
                  </template>
                </VRadioGroup>

                <VBtn color="#80509C" block> Next </VBtn>
              </div>

              <div v-if="n === 4" class="mx-auto max-w-xl bg-white p-6 rounded-lg shadow-lg">
                <p class="text-black-500 text-lg mb-4">Registration Number</p>
                <VTextField placeholder="Enter your registration number" variant="outlined" />

                <VBtn color="#80509C" block> Next </VBtn>
              </div>
            </VStepperWindowItem>
          </VStepperWindow>
        </template>
      </VStepper>
    </div>
  </div>
</template>
