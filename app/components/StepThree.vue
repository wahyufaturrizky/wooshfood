<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  regNumber: {
    type: String,
    default: "",
  },
});

const { email, name, regNumber } = props || {};

const plan = ref();
const isOpenDialog = ref(false);

const loyalPlan = ref();
const loading = ref();

const emit = defineEmits(["next", "update:plan"]);

const { mdAndUp } = useDisplay();

const { data, status } = await useAsyncData("product", async () => {
  const [product] = await Promise.all([$fetch("/api/carwash/product")]);

  return { product };
});

const { data: dataLoyaltyManagement, status: statusLoyaltyManagement } = await useAsyncData(
  "loyalty-management",
  async () => {
    const [loyaltyManagementTemp] = await Promise.all([$fetch("/api/carwash/loyalty_management")]);

    const loyaltyManagement = loyaltyManagementTemp.result.result.find(
      (item) => item.name === "Loyalty Program"
    );

    return { loyaltyManagement };
  }
);

const handleRedeem = async () => {
  try {
    const pointsProcessed = dataLoyaltyManagement.value?.loyaltyManagement?.redeem_rule_list.find(
      (item) => item.id === loyalPlan.value
    )?.point_end;

    loading.value = true;

    const payload = {
      params: {
        customer: {
          name: name,
          email: email,
          registration_number: regNumber,
        },
        loyalty_id: loyalPlan.value,
        date: formatDate(new Date()),
        points_processed: pointsProcessed,
        reference: "test-123",
      },
    };

    const res = await $fetch("/api/carwash/redeem_points", {
      method: "POST",
      body: payload,
    });

    if (res?.status === "success") {
      const { msg } = res || {};
      useSnackbar().sendSnackbar(msg, "success");
      resetForm();
      loading.value = false;
    } else {
      useSnackbar().sendSnackbar(res.msg, "error");
      loading.value = false;
    }
  } catch (error) {
    console.log("handleProceed", error);

    loading.value = false;
  }
};
</script>

<template>
  <div
    class="rounded-[32px] py-4 mb-4 px-6 flex items-center justify-center border border-[#DFE1E7] w-64 mx-auto"
  >
    <p class="font-medium">My Reward Points:</p>
    <p class="text-purple-woosh font-bold ml-2">01234</p>
  </div>

  <p class="text-2xl text-center">
    Have a <span><b>NEW</b></span> car!
  </p>

  <p class="mb-4 mt-1 text-pretty text-lg font-medium text-black-400 sm:text-base text-center">
    Our Services are what you want! Choose one of them
  </p>

  <VRadioGroup
    v-if="status === 'success'"
    v-model="plan"
    color="#80509C"
    :inline="mdAndUp"
    @update:model-value="emit('update:plan', $event)"
  >
    <template
      v-for="({ id, name: namePlan, list_price }, index) in (data as any).product.result.result"
      :key="index"
    >
      <div
        :class="[
          id === plan ? 'border-[#80509C]' : 'border-black-400',
          mdAndUp ? 'mb-0' : 'mb-4',
          'rounded-lg p-6 mx-auto border-2 w-64',
        ]"
      >
        <VRadio :value="id">
          <template #label>
            <div>
              <p class="text-base">
                {{ namePlan.length > 19 ? namePlan.substring(0, 19) + "..." : namePlan }}
              </p>
              <div class="mt-2">
                <b class="text-4xl">{{ formatCurrency(list_price) }}</b>
              </div>

              <!-- <VList>
                <VListItem v-for="subitem in 4" :key="subitem" class="!p-0 !min-h-0 mt-2">
                  <template #prepend>
                    <VIcon :icon="'mdi-check'" />
                    <VListItemTitle v-text="'Test'" />
                  </template>
                </VListItem>
              </VList> -->
            </div>
          </template>
        </VRadio>
      </div>
    </template>
  </VRadioGroup>

  <VSkeletonLoader
    v-else
    class="mx-auto"
    elevation="12"
    type="table-heading, list-item-two-line, image, table-tfoot"
  />

  <VBtn color="#80509C" block @click="emit('next')"> Next </VBtn>

  <p
    class="mt-4 underline text-pretty text-lg font-medium text-purple-woosh sm:text-base cursor-pointer text-center"
    @click="isOpenDialog = true"
  >
    Redeem Royalty
  </p>

  <VDialog v-model="isOpenDialog" scrollable max-width="500">
    <div v-if="statusLoyaltyManagement === 'success'" class="bg-white rounded-lg shadow-lg">
      <div class="py-4 px-6 flex items-center justify-between">
        <p>{{ dataLoyaltyManagement?.loyaltyManagement.product_id.name }}</p>

        <VIcon icon="mdi-close" @click="isOpenDialog = false" />
      </div>

      <div class="bg-[#FCF8FF] py-4 px-6 flex items-center">
        <p class="font-medium">My Reward Points:</p>
        <p class="text-purple-woosh font-bold ml-2">01234</p>
      </div>

      <div class="px-3 pt-4 h-[400px] overflow-y-auto">
        <VRadioGroup v-model="loyalPlan" color="#80509C">
          <VRadio
            v-for="({ name: namePoint, product_ids, id }, index) in dataLoyaltyManagement
              ?.loyaltyManagement.redeem_rule_list"
            :key="index"
            :value="id"
          >
            <template #label>
              <div class="flex flex-col mt-6">
                <p class="text-base font-semibold text-black-500">
                  {{ namePoint }}
                </p>
                <p class="text-base text-[#4A4C56] font-light">
                  {{ product_ids[0].name }}
                </p>
              </div>
            </template>
          </VRadio>
        </VRadioGroup>
      </div>

      <div class="py-4 px-6">
        <VBtn :loading="loading" color="#80509C" @click="handleRedeem"> Redeem now </VBtn>
      </div>
    </div>

    <VSkeletonLoader
      v-else
      class="mx-auto"
      elevation="12"
      type="table-heading, list-item-two-line, image, table-tfoot"
    />
  </VDialog>
</template>
