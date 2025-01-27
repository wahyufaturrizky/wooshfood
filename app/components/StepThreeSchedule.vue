<script setup lang="ts">
const emit = defineEmits([
  "next",
  "update:firstName",
  "update:lastName",
  "update:email",
  "update:phone",
  "update:carReg",
  "update:message",
]);

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  carReg: "",
  message: "",
});

const { mdAndDown } = useDisplay();
</script>

<template>
  <VRow>
    <VCol :cols="mdAndDown ? '12' : '8'">
      <div class="border border-[#ECEFF3] p-4 rounded-lg">
        <p class="text-black-500 text-lg mb-4">Confirm Your Details</p>

        <VRow>
          <VCol :cols="mdAndDown ? '12' : '6'">
            <VTextField
              v-model="form.firstName"
              color="#80509C"
              placeholder="Enter your first name"
              variant="outlined"
              type="text"
              @input="emit('update:firstName', $event)"
            />
          </VCol>
          <VCol :cols="mdAndDown ? '12' : '6'">
            <VTextField
              v-model="form.lastName"
              color="#80509C"
              placeholder="Enter your last name"
              variant="outlined"
              type="text"
              @input="emit('update:lastName', $event)"
            />
          </VCol>
        </VRow>

        <VRow>
          <VCol :cols="mdAndDown ? '12' : '6'">
            <VTextField
              v-model="form.email"
              color="#80509C"
              placeholder="Enter your email"
              variant="outlined"
              type="email"
              @input="emit('update:email', $event)"
            />
          </VCol>
          <VCol :cols="mdAndDown ? '12' : '6'">
            <VTextField
              v-model="form.phone"
              color="#80509C"
              placeholder="Enter your phone"
              variant="outlined"
              type="tel"
              @input="emit('update:phone', $event)"
            />
          </VCol>
        </VRow>

        <VRow>
          <VCol :cols="'12'">
            <VTextField
              v-model="form.carReg"
              color="#80509C"
              placeholder="Enter your car registration number"
              variant="outlined"
              type="text"
              @input="emit('update:carReg', $event)"
            />
          </VCol>
        </VRow>

        <VRow>
          <VCol :cols="'12'">
            <VTextarea
              v-model="form.message"
              color="#80509C"
              placeholder="Enter your message"
              variant="outlined"
              type="text"
              @input="emit('update:message', $event)"
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

  <div class="mt-4"><VBtn color="#80509C" block @click="emit('next')"> Book Now </VBtn></div>
</template>
