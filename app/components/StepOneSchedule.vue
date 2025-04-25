<script setup lang="ts">
const emit = defineEmits(["next"]);
const service = defineModel("service");

const showDesc = ref(false);
const showDescId = ref();

defineProps({
  loadingSlot: {
    type: Boolean,
  },
});

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
    databookingProduct.value.bookingProduct?.result?.result.filter((item) =>
      service.value?.includes(item.id)
    )
  );
};

const listProduct = databookingProduct.value.bookingProduct?.result?.result;

const filterBookingProduct = () => listProduct?.filter((item) => service.value?.includes(item.id));

const handleShowDesc = (id: string) => {
  if (id === showDescId.value) {
    showDescId.value = null;
  } else {
    showDescId.value = id;
  }
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <VRow>
      <VCol :cols="mdAndDown || filterBookingProduct()?.length === 0 ? '12' : '7'">
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
              v-for="({ booking_categories_id, product }, index) in formatBookingProduct(
                listProduct
              )"
              :key="index"
            >
              <VExpansionPanelTitle>
                <p>{{ booking_categories_id?.name }}</p>
              </VExpansionPanelTitle>
              <VExpansionPanelText
                v-for="(
                  { name: subName, id, list_price, description_sale, duration }, subIndex
                ) in product"
                :key="subIndex"
              >
                <div class="flex justify-space-between">
                  <VCheckbox v-model="service" :hide-details="true" color="#80509C" :value="id">
                    <template #label>
                      <p class="text-xs sm:text-base text-[#1D1F2C]">{{ subName }}</p>
                    </template>
                  </VCheckbox>

                  <VIcon
                    icon="mdi-alert-circle-outline cursor-pointer"
                    @click="handleShowDesc(id)"
                  />
                </div>

                <div class="ml-10">
                  <b class="text-xs sm:text-xl text-[#1B223C]">{{ formatCurrency(list_price) }}</b>
                  <p class="text-xs sm:text-sm text-[#525B66] font-normal">{{ duration }} mins</p>
                  <p
                    v-if="description_sale && showDescId === id"
                    class="text-xs sm:text-base text-[#4A4C56] mt-2"
                  >
                    {{ description_sale }}
                  </p>
                </div>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </div>
      </VCol>

      <VCol v-if="filterBookingProduct()?.length" :cols="mdAndDown ? '12' : '5'">
        <VTable>
          <thead>
            <tr class="bg-purple-soft-woosh">
              <th class="text-right rounded-tl-lg">Product</th>
              <th class="text-right">Time</th>
              <th class="text-right rounded-tr-lg">Price</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="({ name, list_price, duration }, index) in filterBookingProduct()"
              :key="index"
            >
              <tr>
                <td class="text-xs sm:text-base text-right">{{ name }}</td>
                <td class="text-xs sm:text-base text-right">{{ duration }} Min</td>
                <td class="text-xs sm:text-base text-right">{{ formatCurrency(list_price) }}</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-xs sm:text-base text-right font-bold">Total</td>
              <td class="text-xs sm:text-base text-right font-bold">
                {{
                  formatCurrency(
                    (databookingProduct as any).bookingProduct?.result?.result
                      .filter((item) => service?.includes(item.id))
                      .reduce(
                        (accumulator, currentValue) => accumulator + currentValue.list_price,
                        0
                      )
                  )
                }}
              </td>
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
      <VBtn color="#80509C" :loading="loadingSlot" :disabled="!service?.length" block type="submit">
        Next
      </VBtn>
    </div>
  </VForm>
</template>
