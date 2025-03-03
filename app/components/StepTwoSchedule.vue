<script setup lang="ts">
const emit = defineEmits(["next"]);

const dateTime = defineModel<string>("dateTime");

const { mdAndDown } = useDisplay();

const hadnleNext = () => {
  if (!dateTime.value) return;
  emit("next");
};
</script>

<template>
  <VForm @submit.prevent="hadnleNext">
    <VRow>
      <VCol :cols="mdAndDown ? '12' : '8'">
        <div class="border border-[#ECEFF3] p-4 rounded-lg">
          <p class="text-black-500 text-lg mb-4">Select Date & Time</p>

          <VExpansionPanels>
            <VTextField
              v-model="dateTime"
              color="#80509C"
              placeholder="Select date & time"
              variant="outlined"
              type="datetime-local"
              :rules="[(val) => requiredField(val, 'You must enter a date time.')]"
            />
          </VExpansionPanels>
        </div>
      </VCol>

      <VCol :cols="mdAndDown ? '12' : '4'">
        <VTable>
          <thead>
            <tr class="bg-purple-soft-woosh">
              <th class="text-right rounded-tl-lg">Product</th>
              <th class="text-right rounded-tr-lg">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-right">Wash - Large SUV</td>
              <td class="text-right">$150.00</td>
            </tr>
            <tr>
              <td class="text-right">Wash - Large SUV</td>
              <td class="text-right">$150.00</td>
            </tr>
            <tr>
              <td class="text-right">Wash - Large SUV</td>
              <td class="text-right">$150.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="1" class="text-right font-bold">Total</td>
              <td class="text-right font-bold">$999.99</td>
            </tr>
          </tfoot>
        </VTable>
      </VCol>
    </VRow>

    <div class="mt-4"><VBtn color="#80509C" block type="submit"> Next </VBtn></div>
  </VForm>
</template>
