<script setup lang="ts">
const cardType = defineModel<string>("cardType", {
  default: "Card Type",
});
const cardNumber = defineModel<string>("cardNumber");
const expDate = defineModel<string>("expDate");
const ccv = defineModel<string>("ccv");
const paymentMethod = defineModel<string>("paymentMethod", {
  default: "credit-card",
});

defineProps({
  loading: {
    type: Boolean,
  },
});

const emit = defineEmits(["proceed"]);

const { mdAndDown } = useDisplay();

const handlePayment = (val: string) => {
  paymentMethod.value = val;
};

const listPayentMethod = ["credit-card", "paypal", "apple-pay"];
</script>

<template>
  <VRow>
    <VCol :cols="mdAndDown ? '12' : '6'">
      <VTable>
        <thead>
          <tr class="bg-purple-soft-woosh">
            <th class="text-right rounded-tl-lg">Product</th>
            <th class="text-right">Quantity</th>
            <th class="text-right rounded-tr-lg">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 3" :key="item">
            <td class="text-right">{{ item }}</td>
            <td class="text-right">{{ item }}</td>
            <td class="text-right">{{ item }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">Subtotal</td>
            <td class="text-right">$750.00</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right border-none">Taxes</td>
            <td class="text-right border-none">$59.69</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right border-none">Discount</td>
            <td class="text-right border-none">$0.00</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right font-bold">Total</td>
            <td class="text-right font-bold">$999.99</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right font-bold text-purple-woosh border-none">
              I have a promo
            </td>
          </tr>
        </tfoot>
      </VTable>
    </VCol>

    <VCol :cols="mdAndDown ? '12' : '6'">
      <div class="border border-[#ECEFF3] p-6 rounded-lg">
        <p>Payment Method</p>

        <div class="grid grid-cols-3 gap-4 my-4">
          <div
            v-for="(item, index) in listPayentMethod"
            :key="index"
            :class="[
              item === paymentMethod ? 'border-[#80509C]' : 'border-[#ECEFF3]',
              'flex items-center justify-center border-2 rounded-lg p-4',
            ]"
            @click="handlePayment(item)"
          >
            <NuxtImg height="auto" width="50" :src="`/${item}.png`" :alt="item" />
          </div>
        </div>

        <p class="mb-4">Payment Method</p>

        <VSelect
          v-model="cardType"
          variant="outlined"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        />

        <VTextField
          v-model="cardNumber"
          color="#80509C"
          placeholder="Card Number"
          variant="outlined"
        />

        <VRow>
          <VCol cols="6">
            <VTextField
              v-model="expDate"
              color="#80509C"
              type="number"
              placeholder="Exp Date"
              variant="outlined"
            />
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="ccv"
              color="#80509C"
              type="number"
              placeholder="CCV"
              variant="outlined"
            />
          </VCol>
        </VRow>

        <VBtn :loading="loading" color="#80509C" block @click="emit('proceed')"> Proceed </VBtn>
      </div>
    </VCol>
  </VRow>
</template>
