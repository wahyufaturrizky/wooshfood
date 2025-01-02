<script setup lang="ts">
const plan = ref(2);

const emit = defineEmits(["next", "update:plan"]);
</script>

<template>
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

  <VBtn @click="emit('next')" color="#80509C" block> Next </VBtn>
</template>
