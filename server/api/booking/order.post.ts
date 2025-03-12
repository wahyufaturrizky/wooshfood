export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrlBooking, xOdooApiKeyBooking } = runtimeConfig;
  const body = await readBody(event);

  const res = await $fetch(`${coreBaseUrlBooking}/v1/api/booking/order`, {
    method: "POST",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKeyBooking,
    },
    body: body,
  }).catch((err) => {
    return err.data;
  });

  return res;
});
