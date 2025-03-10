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
  loadingProceed: {
    type: Boolean,
  },
});

const { email, name, regNumber } = props || {};

const plan = ref();
const isOpenDialog = ref(false);

const loyalPlan = ref();
const loading = ref();

const emit = defineEmits(["proceed"]);

const { mdAndUp } = useDisplay();

const { data, status } = await useAsyncData("product", async () => {
  const [product, customerPoint] = await Promise.all([
    $fetch("/api/carwash/product"),
    $fetch("/api/carwash/customer_point", {
      params: {
        registration_number: regNumber,
      },
    }),
  ]);

  return { product, customerPoint };
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
    if (!loyalPlan.value) return;

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
        reference: formatDate(new Date()),
      },
    };

    const res = await $fetch("/api/carwash/redeem_points", {
      method: "POST",
      body: payload,
    });

    if (res?.status === "success") {
      const { msg } = res || {};
      isOpenDialog.value = false;
      useSnackbar().sendSnackbar(msg, "success");
      loading.value = false;
    } else {
      isOpenDialog.value = false;
      useSnackbar().sendSnackbar(res.msg, "error");
      loading.value = false;
    }
  } catch (error) {
    console.log("handleProceed", error);
    isOpenDialog.value = false;

    loading.value = false;
  }
};

const handleNext = () => {
  if (!plan.value) return;
  emit(
    "proceed",
    data.value.product.result.result.find((item) => item.id === plan.value)
  );
};
</script>

<template>
  <div
    class="rounded-[32px] py-4 mb-4 px-6 flex items-center justify-center border border-[#DFE1E7] w-64 mx-auto"
  >
    <p class="font-medium">My Reward Points:</p>
    <p class="text-purple-woosh font-bold ml-2">
      {{ data?.customerPoint?.result?.wk_website_loyalty_points || "" }}
    </p>
  </div>

  <p class="text-center text-2xl sm:text-5xl">
    Have a <span><b>NEW</b></span> car!
  </p>

  <p class="mb-4 mt-1 text-pretty font-medium text-black-400 text-center text-sm sm:text-lg">
    Our Services are what you want! Choose one of them
  </p>

  <VForm @submit.prevent="handleNext">
    <VSkeletonLoader
      v-if="status !== 'success'"
      class="mx-auto"
      elevation="12"
      type="table-heading, list-item-two-line, image, table-tfoot"
    />

    <VRadioGroup
      v-else
      v-model="plan"
      color="#80509C"
      :inline="mdAndUp"
      :rules="[(val) => requiredField(val, 'You must choose a service.')]"
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

    <VBtn color="#80509C" block :loading="loadingProceed" type="submit"> Proceed </VBtn>
  </VForm>

  <p
    class="mt-4 underline text-pretty text-lg font-medium text-purple-woosh sm:text-base cursor-pointer text-center"
    @click="isOpenDialog = true"
  >
    Redeem Loyalty
  </p>

  <VDialog v-model="isOpenDialog" scrollable max-width="500">
    <VSkeletonLoader
      v-if="statusLoyaltyManagement !== 'success'"
      class="mx-auto"
      elevation="12"
      type="table-heading, list-item-two-line, image, table-tfoot"
    />

    <div v-else class="bg-white rounded-lg shadow-lg">
      <div class="py-4 px-6 flex items-center justify-between">
        <p>{{ dataLoyaltyManagement?.loyaltyManagement.product_id.name }}</p>

        <VIcon icon="mdi-close" @click="isOpenDialog = false" />
      </div>

      <div class="bg-[#FCF8FF] py-4 px-6 flex items-center">
        <p class="font-medium">My Reward Points:</p>
        <p class="text-purple-woosh font-bold ml-2">
          {{ data?.customerPoint?.result?.wk_website_loyalty_points }}
        </p>
      </div>

      <VForm @submit.prevent="handleRedeem">
        <div class="px-3 pt-4 h-[400px] overflow-y-auto">
          <VRadioGroup
            v-model="loyalPlan"
            :rules="[(val) => requiredField(val, 'You must choose a point.')]"
            color="#80509C"
          >
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
          <VBtn :loading="loading" color="#80509C" type="submit"> Redeem now </VBtn>
        </div>
      </VForm>
    </div>
  </VDialog>
</template>
