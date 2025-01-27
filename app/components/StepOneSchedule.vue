<script setup lang="ts">
const emit = defineEmits(["next", "update:regnumber"]);

const service = ref();

const tabPabel = [
  {
    title: "Basic Wash",
    opt: [
      {
        title: "Wash - Large SUV",
        price: 150,
        time: 30,
        desc: "Our SUV wash service offers a comprehensive cleaning experience tailored to larger vehicles. From exterior washing and waxing to interior vacuuming and detailing, we ensure your SUV looks its best inside and out.",
      },
      {
        title: "Super Wash",
        price: 150,
        time: 30,
        desc: "Our SUV wash service offers a comprehensive cleaning experience tailored to larger vehicles. From exterior washing and waxing to interior vacuuming and detailing, we ensure your SUV looks its best inside and out.",
      },
    ],
  },
  {
    title: "Good Wash",
    opt: [
      {
        title: "Wash - Large SUV",
        price: 150,
        time: 30,
        desc: "Our SUV wash service offers a comprehensive cleaning experience tailored to larger vehicles. From exterior washing and waxing to interior vacuuming and detailing, we ensure your SUV looks its best inside and out.",
      },
      {
        title: "Super Wash",
        price: 150,
        time: 30,
        desc: "Our SUV wash service offers a comprehensive cleaning experience tailored to larger vehicles. From exterior washing and waxing to interior vacuuming and detailing, we ensure your SUV looks its best inside and out.",
      },
    ],
  },
  {
    title: "Great Wash",
    opt: [
      {
        title: "Wash - Large SUV",
        price: 150,
        time: 30,
        desc: "Our SUV wash service offers a comprehensive cleaning experience tailored to larger vehicles. From exterior washing and waxing to interior vacuuming and detailing, we ensure your SUV looks its best inside and out.",
      },
      {
        title: "Super Wash",
        price: 150,
        time: 30,
        desc: "Our SUV wash service offers a comprehensive cleaning experience tailored to larger vehicles. From exterior washing and waxing to interior vacuuming and detailing, we ensure your SUV looks its best inside and out.",
      },
    ],
  },
];

const { mdAndDown } = useDisplay();
</script>

<template>
  <VRow>
    <VCol :cols="mdAndDown ? '12' : '8'">
      <div class="border border-[#ECEFF3] p-4 rounded-lg">
        <p class="text-black-500 text-lg mb-4">Select Your Service</p>

        <VExpansionPanels>
          <VExpansionPanel v-for="({ title, opt }, index) in tabPabel" :key="index" :title="title">
            <VExpansionPanelText>
              <VRadioGroup v-model="service" color="#80509C">
                <template v-for="({ title, price, time, desc }, subindex) in opt" :key="subindex">
                  <div :class="['rounded-lg p-6 mb-4']">
                    <VRadio :value="title">
                      <template #label>
                        <div>
                          <p class="text-base text-[#1D1F2C]">{{ title }}</p>
                          <div class="mt-2">
                            <div class="flex gap-2 items-center">
                              <b class="text-xl text-[#1B223C]">$ {{ price }}</b>
                              <b class="text-sm text-[#525B66] font-normal">{{ time }}</b>
                            </div>
                          </div>
                          <p class="text-base text-[#4A4C56] mt-2">{{ desc }}</p>
                        </div>
                      </template>
                    </VRadio>
                  </div>
                </template>
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

  <div class="mt-4"><VBtn color="#80509C" block @click="emit('next')"> Next </VBtn></div>
</template>
