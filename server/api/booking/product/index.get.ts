export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrlBooking, xOdooApiKeyBooking } = runtimeConfig;

  const res = await $fetch(`${coreBaseUrlBooking}/v1/api/booking/product`, {
    method: "GET",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKeyBooking,
    },
  }).catch((err) => {
    return err.data;
  });

  return res;
});
