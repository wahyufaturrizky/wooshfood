export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrl } = runtimeConfig;
  const body = await readBody(event);

  const res = await $fetch(`${coreBaseUrl}/v1/api/carwash/sales_order`, {
    method: "POST",
    headers: {
      "X-Odoo-Api-Key": "d2198e1b0034501d96b08843f262dec99c5d386614879455af8e47d94cf37b78",
    },
    body: body,
  }).catch((err) => {
    return err.data;
  });

  return res;
});
