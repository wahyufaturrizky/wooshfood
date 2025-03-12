<script setup lang="ts">
import { VTimePicker } from "vuetify/labs/VTimePicker";

const { productId } = defineProps({
  loading: {
    type: Boolean,
  },
  productId: {
    type: Array,
  },
});

const emit = defineEmits(["next"]);

const dateTime = defineModel("dateTime");
const time = defineModel("time");

const { mdAndDown } = useDisplay();

const hadnleNext = () => {
  emit("next");
};
</script>

<template>
  <VForm @submit.prevent="hadnleNext">
    <VRow>
      <VCol :cols="mdAndDown ? '12' : '8'">
        <div class="border border-[#ECEFF3] p-4 rounded-lg">
          <VDatePicker v-model="dateTime" width="auto" />

          <VTimePicker v-model="time" />
        </div>
      </VCol>

      <VCol :cols="mdAndDown ? '12' : '4'">
        <VTable>
          <thead>
            <tr class="bg-purple-soft-woosh">
              <th class="text-right rounded-tl-lg">Product</th>
              <th class="text-right">Time</th>
              <th class="text-right rounded-tr-lg">Price</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="({ name, list_price, duration }, index) in productId" :key="index">
              <tr>
                <td class="text-right">{{ name }}</td>
                <td class="text-right">{{ duration }} Min</td>
                <td class="text-right">{{ formatCurrency(list_price) }}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right font-bold">Total</td>
              <td class="text-right font-bold">
                {{
                  formatCurrency(
                    productId.reduce(
                      (accumulator, currentValue) => accumulator + currentValue.list_price,
                      0
                    )
                  )
                }}
              </td>
            </tr>
          </tfoot>
        </VTable>
      </VCol>
    </VRow>

    <div class="mt-4">
      <VBtn :disabled="!dateTime || !time" color="#80509C" block type="submit"> Next </VBtn>
    </div>
  </VForm>
</template>
