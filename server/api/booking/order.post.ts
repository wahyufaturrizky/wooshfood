export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrl, xOdooApiKey } = runtimeConfig;
  const body = await readBody(event);

  const res = await $fetch(`${coreBaseUrl}/v1/api/booking/order`, {
    method: "POST",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKey,
    },
    body: body,
  }).catch((err) => {
    return err.data;
  });

  return res;
});
