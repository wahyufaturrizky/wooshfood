<script setup lang="ts">
const { productId, dataSlot } = defineProps({
  loading: {
    type: Boolean,
  },
  productId: {
    type: Array,
  },
  dataSlot: {
    type: Object,
  },
});

const emit = defineEmits(["next"]);

const dateTime = defineModel("dateTime");
const time = defineModel("time");

const { mdAndDown } = useDisplay();

const adapter = useDate();

const hadnleNext = () => {
  emit("next");
};

const allowedDates = (val) => {
  // Convert the `val` date to ISO format (YYYY-MM-DD)
  const isoDate = adapter.toISO(val).split("T")[0]; // Extract only the date part

  // Extract allowed dates from the JSON data
  const extractAllowedDates = (data) => {
    const allowedDatesSet = new Set();

    data.result.slots.slots.forEach((month) => {
      month.weeks.forEach((week) => {
        week.forEach((day) => {
          if (day.slots && day.slots.length > 0) {
            allowedDatesSet.add(day.day); // Add the day to the allowed dates set
          }
        });
      });
    });

    return allowedDatesSet;
  };

  // Get the allowed dates set
  const allowedDatesSet = extractAllowedDates(dataSlot);

  // Check if the date exists in the allowed dates set
  const resAllowedDates = allowedDatesSet.has(isoDate);

  return resAllowedDates;
};

// Extract time slots for the selected date
const getTimeSlotsForDate = (selectedDate) => {
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(selectedDate.getDate()).padStart(2, "0");
  const isoDate = `${year}-${month}-${day}`;

  let slots = [];

  dataSlot?.result.slots.slots.forEach((month) => {
    month.weeks.forEach((week) => {
      week.forEach((day) => {
        if (day.day === isoDate && day.slots.length) {
          slots = day.slots.map((slot) => slot.hours); // Extract hours
        }
      });
    });
  });

  return slots;
};

// Compute time slots based on the selected date
const timeSlots = computed(() => {
  if (!dateTime.value) return { morning: [], afternoon: [] };

  const slots = getTimeSlotsForDate(dateTime.value);

  // Separate into morning and afternoon
  const morning = slots.filter((time) => {
    const hour = parseInt(time.split(":")[0], 10);
    return hour < 12; // Morning is before 12:00
  });

  const afternoon = slots.filter((time) => {
    const hour = parseInt(time.split(":")[0], 10);
    return hour >= 12; // Afternoon is 12:00 and later
  });

  return { morning, afternoon };
});

// Watch for changes in selected time
watch(time, (newTime) => {
  console.log("Selected time:", newTime);
});
</script>

<template>
  <VForm @submit.prevent="hadnleNext">
    <VRow>
      <VCol :cols="mdAndDown ? '12' : '8'">
        <div class="border border-[#ECEFF3] p-4 rounded-lg">
          <VDatePicker
            v-model="dateTime"
            :min="minDateBooking()"
            :allowed-dates="allowedDates"
            width="auto"
          />

          <VRadioGroup
            v-if="timeSlots.morning.length || timeSlots.afternoon.length"
            v-model="time"
            color="#80509C"
          >
            <div class="flex justify-evenly px-auto sm:px-12">
              <div>
                <p class="ml-2">Morning</p>
                <div
                  v-if="timeSlots.morning.length"
                  class="sm:flex sm:flex-col sm:h-[400px] sm:flex-wrap"
                >
                  <VRadio
                    v-for="(time, index) in timeSlots.morning"
                    :key="'morning-' + index"
                    :label="time"
                    :value="time"
                    :class="[index > 9 ? 'sm:ml-10 sm:!flex-none' : '']"
                  />
                </div>
              </div>

              <div class="mr-4">
                <p class="ml-2">Afternoon</p>
                <div
                  v-if="timeSlots.afternoon.length"
                  class="sm:flex sm:flex-col sm:h-[400px] sm:flex-wrap"
                >
                  <VRadio
                    v-for="(time, index) in timeSlots.afternoon"
                    :key="'afternoon-' + index"
                    :label="time"
                    :value="time"
                    :class="[index > 9 ? 'sm:ml-10 sm:!flex-none' : '']"
                  />
                </div>
              </div>
            </div>
          </VRadioGroup>
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
