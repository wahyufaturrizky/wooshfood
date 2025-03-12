export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrlQR, xOdooApiKeyQR } = runtimeConfig;
  const body = await readBody(event);

  const res = await $fetch(`${coreBaseUrlQR}/v1/api/carwash/redeem_points`, {
    method: "POST",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKeyQR,
    },
    body: body,
  }).catch((err) => {
    return err.data;
  });

  return res;
});
