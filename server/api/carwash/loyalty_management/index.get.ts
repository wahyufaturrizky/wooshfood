export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrlQR, xOdooApiKeyQR } = runtimeConfig;

  const res = await $fetch(`${coreBaseUrlQR}/v1/api/carwash/loyalty_management`, {
    method: "GET",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKeyQR,
    },
  }).catch((err) => {
    return err.data;
  });

  return res;
});
