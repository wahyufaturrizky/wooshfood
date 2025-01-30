export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrl, xOdooApiKey } = runtimeConfig;

  const res = await $fetch(`${coreBaseUrl}/v1/api/carwash/product`, {
    method: "GET",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKey,
    },
  }).catch((err) => {
    return err.data;
  });

  return res;
});
