<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
  },
  productId: {
    type: Array,
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
  if (firstName.value && lastName.value && phone.value && email.value && regNumber.value)
    emit("proceed");
};
</script>

<template>
  <VForm @submit.prevent="handleNext">
    <VRow>
      <VCol :cols="mdAndDown ? '12' : '7'">
        <div class="border border-[#ECEFF3] p-4 rounded-lg">
          <p class="text-black-500 text-lg mb-4">Confirm Your Details</p>

          <VRow>
            <VCol class="pb-0" :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="firstName"
                color="#80509C"
                placeholder="Enter your first name"
                variant="outlined"
                type="text"
                :rules="[(val) => requiredField(val, 'You must enter a first name.')]"
              />
            </VCol>
            <VCol class="pb-0" :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="lastName"
                color="#80509C"
                placeholder="Enter your last name"
                variant="outlined"
                type="text"
                :rules="[(val) => requiredField(val, 'You must enter a last name.')]"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol class="pt-0 pb-0" :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="email"
                color="#80509C"
                placeholder="Enter your email"
                variant="outlined"
                type="email"
                :rules="[(val) => requiredField(val, 'You must enter a email.')]"
              />
            </VCol>
            <VCol class="pt-0 pb-0" :cols="mdAndDown ? '12' : '6'">
              <VTextField
                v-model="phone"
                color="#80509C"
                placeholder="Enter your phone"
                variant="outlined"
                type="tel"
                :rules="[(val) => requiredField(val, 'You must enter a phone.')]"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol class="pt-0 pb-0" :cols="'12'">
              <VTextField
                v-model="regNumber"
                color="#80509C"
                placeholder="Enter your car registration number"
                variant="outlined"
                :rules="[(val) => requiredField(val, 'You must enter a reg number.')]"
                type="text"
              />
            </VCol>
          </VRow>

          <VRow>
            <VCol class="pt-0 pb-0" :cols="'12'">
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

      <VCol :cols="mdAndDown ? '12' : '5'">
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
