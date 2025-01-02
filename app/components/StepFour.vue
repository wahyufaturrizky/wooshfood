<template>
  <VRow>
    <VCol cols="6">
      <VTable>
        <thead>
          <tr class="bg-purple-soft-woosh">
            <th class="text-left rounded-tl-lg">Product</th>
            <th class="text-left">Quantity</th>
            <th class="text-left rounded-tr-lg">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 3" :key="item">
            <td>{{ item }}</td>
            <td>{{ item }}</td>
            <td>{{ item }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">Subtotal</td>
            <td class="text-right">$750.00</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right">Taxes</td>
            <td class="text-right">$59.69</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right">Discount</td>
            <td class="text-right">$0.00</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right font-bold">Total</td>
            <td class="text-right font-bold">$999.99</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right font-bold text-purple-woosh">I have a promo</td>
          </tr>
        </tfoot>
      </VTable>
    </VCol>

    <VCol cols="6">
      <div class="border border-[#ECEFF3] p-6 rounded-lg">
        <p>Payment Method</p>

        <div class="grid grid-cols-3 gap-4 my-4">
          <div class="flex items-center justify-center border border-[#ECEFF3] rounded-lg p-4">
            <NuxtImg height="auto" width="50" src="/credit-card.png" alt="apple-pay" />
          </div>
          <div class="flex items-center justify-center border border-[#ECEFF3] rounded-lg p-4">
            <NuxtImg height="auto" width="50" src="/paypal.png" alt="apple-pay" />
          </div>
          <div class="flex items-center justify-center border border-[#ECEFF3] rounded-lg p-4">
            <NuxtImg height="auto" width="50" src="/apple-pay.png" alt="apple-pay" />
          </div>
        </div>

        <p>Payment Method</p>

        <VSelect
          variant="outlined"
          placeholder="Card Type"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        />

        <VTextField color="#80509C" placeholder="Card Number" variant="outlined" />

        <VRow>
          <VCol cols="6">
            <VTextField color="#80509C" type="number" placeholder="Exp Date" variant="outlined" />
          </VCol>
          <VCol cols="6">
            <VTextField color="#80509C" type="number" placeholder="CCV" variant="outlined" />
          </VCol>
        </VRow>

        <VBtn color="#80509C" block> Proceed </VBtn>
      </div>
    </VCol>
  </VRow>
</template>
