<script setup lang="ts">
const plan = ref(2);
const loyalPlan = ref();

const emit = defineEmits(["next", "update:plan", "update:loyalplan"]);

const isOpenDialog = ref(false);

const listLoyal = [
  {
    title: "Chai Latte - Regular",
    desc: "11 Points will be reduced from your account",
  },
  {
    title: "Acai Smoothie",
    desc: "3 Points will be reduced from your account",
  },
  {
    title: "Wash products",
    desc: "1 Points will be reduced from your account",
  },
];
</script>

<template>
  <div
    class="rounded-[32px] py-4 mb-4 px-6 flex items-center justify-center border border-[#DFE1E7] w-64 mx-auto"
  >
    <p class="font-medium">My Reward Points:</p>
    <p class="text-purple-woosh font-bold ml-2">01234</p>
  </div>

  <p class="text-2xl text-center">
    Have a <span><b>NEW</b></span> car!
  </p>

  <p class="mb-4 mt-1 text-pretty text-lg font-medium text-black-400 sm:text-base text-center">
    Our Services are what you want! Choose one of them
  </p>

  <VRadioGroup
    v-model="plan"
    color="#80509C"
    inline
    @update:model-value="emit('update:plan', $event)"
  >
    <template v-for="item in 3" :key="item">
      <div
        :class="[
          item === plan ? 'border-[#80509C]' : 'border-black-400',
          'rounded-lg p-6 mx-auto border-2',
        ]"
      >
        <VRadio :value="item">
          <template #label>
            <div>
              <p class="text-base">Great Carwash</p>
              <div class="mt-2"><b class="text-4xl">$350.00</b></div>

              <VList>
                <VListItem v-for="subitem in 4" :key="subitem" class="!p-0 !min-h-0 mt-2">
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

  <VBtn color="#80509C" block @click="emit('next')"> Next </VBtn>

  <p
    class="mt-4 underline text-pretty text-lg font-medium text-purple-woosh sm:text-base cursor-pointer text-center"
    @click="isOpenDialog = true"
  >
    Redeem Royalty
  </p>

  <VDialog v-model="isOpenDialog" max-width="500">
    <div class="bg-white rounded-lg shadow-lg">
      <div class="py-4 px-6 flex items-center justify-between">
        <p>Loyal Benefits</p>

        <VIcon icon="mdi-close" @click="isOpenDialog = false" />
      </div>

      <div class="bg-[#FCF8FF] py-4 px-6 flex items-center">
        <p class="font-medium">My Reward Points:</p>
        <p class="text-purple-woosh font-bold ml-2">01234</p>
      </div>

      <div class="px-3 pt-4">
        <VRadioGroup
          v-model="loyalPlan"
          color="#80509C"
          @update:model-value="emit('update:loyalplan', $event)"
        >
          <VRadio v-for="(item, index) in listLoyal" :key="index" :value="item.title">
            <template #label>
              <div class="flex flex-col mt-6">
                <p class="text-base font-semibold text-black-500">
                  {{ item.title }}
                </p>
                <p class="text-base text-[#4A4C56] font-light">
                  {{ item.desc }}
                </p>
              </div>
            </template>
          </VRadio>
        </VRadioGroup>
      </div>

      <div class="py-4 px-6">
        <VBtn color="#80509C" @click="isOpenDialog = false"> Redeem now </VBtn>
      </div>
    </div>
  </VDialog>
</template>
