<script setup lang="ts">
const emit = defineEmits(["next"]);
const service = defineModel<string>("service");

const { data: databookingProduct, status: statusbookingProduct } = await useAsyncData(
  "booking-product",
  async () => {
    const [bookingProduct] = await Promise.all([$fetch("/api/booking/product")]);

    return { bookingProduct };
  }
);

const { mdAndDown } = useDisplay();

const handleNext = () => {
  if (!service.value) return;
  emit(
    "next",
    databookingProduct.value.bookingProduct?.result.result.find((item) => item.id === service.value)
  );
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <VRow>
      <VCol :cols="mdAndDown ? '12' : '8'">
        <div class="border border-[#ECEFF3] p-4 rounded-lg">
          <p class="text-black-500 text-lg mb-4">Select Your Service</p>

          <VSkeletonLoader
            v-if="statusbookingProduct !== 'success'"
            class="mx-auto"
            elevation="12"
            type="table-heading, list-item-two-line, image, table-tfoot"
          />

          <VExpansionPanels v-else>
            <VExpansionPanel
              v-for="(
              { name,id, booking_categories_id, list_price, description_sale, duration }, index
            ) in (databookingProduct as any)?.bookingProduct?.result?.result"
              :key="index"
              :title="name"
            >
              <VExpansionPanelText>
                <VRadioGroup v-model="service" color="#80509C">
                  <div :class="['rounded-lg p-6 mb-4']">
                    <VRadio :value="id">
                      <template #label>
                        <div>
                          <p class="text-base text-[#1D1F2C]">{{ booking_categories_id?.name }}</p>
                          <div class="mt-2">
                            <div class="flex gap-2 items-center">
                              <b class="text-xl text-[#1B223C]">{{ formatCurrency(list_price) }}</b>
                              <b class="text-sm text-[#525B66] font-normal">{{ duration }}</b>
                            </div>
                          </div>
                          <p class="text-base text-[#4A4C56] mt-2">{{ description_sale }}</p>
                        </div>
                      </template>
                    </VRadio>
                  </div>
                </VRadioGroup>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
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
            <tr>
              <td class="text-right">Wash - Large SUV</td>
              <td class="text-right">30 Min</td>
              <td class="text-right">$150.00</td>
            </tr>
            <tr>
              <td class="text-right">Wash - Large SUV</td>
              <td class="text-right">30 Min</td>
              <td class="text-right">$150.00</td>
            </tr>
            <tr>
              <td class="text-right">Wash - Large SUV</td>
              <td class="text-right">30 Min</td>
              <td class="text-right">$150.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right font-bold">Total</td>
              <td class="text-right font-bold">$999.99</td>
            </tr>
          </tfoot>
        </VTable>

        <p class="font-normal text-sm text-[#777980]">
          Prices are provided as estimates and are not fixed.
        </p>
        <p class="font-normal text-sm text-[#777980]">
          Timing provided as estimates and are not fixed.
        </p>
      </VCol>
    </VRow>

    <div class="mt-4">
      <VBtn color="#80509C" :disabled="!service" block type="submit"> Next </VBtn>
    </div>
  </VForm>
</template>
