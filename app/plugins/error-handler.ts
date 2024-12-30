export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // handle error, e.g. report to a service
    console.error("Error:", error);
    console.error("Vue instance:", instance);
    console.error("Info:", info);
  };
});
