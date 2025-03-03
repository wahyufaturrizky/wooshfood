<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
  },
});

const emit = defineEmits(["proceed"]);

const firstName = defineModel<string>("firstName");
const lastName = defineModel<string>("lastName");
const email = defineModel<string>("email");
const phone = defineModel<string>("phone");
const regNumber = defineModel<string>("regNumber");
const message = defineModel<string>("message");

const { mdAndDown } = useDisplay();

const handleNext = () => {
  emit("proceed");
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <VRow>
      <VCol :cols="mdAndDown ? '12' : '8'">
        <div class="border border-[#ECEFF3] p-4 rounded-lg">
          <p class="text-black-500 text-lg mb-4">Confirm Your Details</p>

          <VRow>
            <VCol :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="firstName"
                color="#80509C"
                placeholder="Enter your first name"
                variant="outlined"
                type="text"
              />
            </VCol>
            <VCol :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="lastName"
                color="#80509C"
                placeholder="Enter your last name"
                variant="outlined"
                type="text"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="email"
                color="#80509C"
                placeholder="Enter your email"
                variant="outlined"
                type="email"
              />
            </VCol>
            <VCol :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="phone"
                color="#80509C"
                placeholder="Enter your phone"
                variant="outlined"
                type="tel"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol :cols="'12'">
              <VTextField
                v-model="regNumber"
                color="#80509C"
                placeholder="Enter your car registration number"
                variant="outlined"
                type="text"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol :cols="'12'">
              <VTextarea
                v-model="message"
                color="#80509C"
                placeholder="Enter your message"
                variant="outlined"
                type="text"
              />
            </VCol>
          </VRow>
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
      <VBtn :loading="loading" color="#80509C" block type="submit"> Book Now </VBtn>
    </div>
  </VForm>
</template>
