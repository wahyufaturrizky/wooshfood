export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { coreBaseUrlQR, xOdooApiKeyQR } = runtimeConfig;

  const { registration_number } = (await getQuery(event)) as {
    registration_number: string;
  };

  let params = {};

  if (registration_number !== "") {
    params["registration_number"] = registration_number;
  }

  const res = await $fetch(`${coreBaseUrlQR}/v1/api/carwash/customer_point`, {
    method: "GET",
    headers: {
      "X-Odoo-Api-Key": xOdooApiKeyQR,
    },
    params,
  }).catch((err) => {
    return err.data;
  });

  return res;
});
