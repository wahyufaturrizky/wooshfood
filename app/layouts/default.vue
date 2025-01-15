<script setup lang="ts">
const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
</script>

<template>
  <VApp class="bg-[#FBFBFC]" :theme="'light'">
    <VMain>
      <VSnackbar v-model="isSnackbarVisible" location="top" :color="snackColor" :timeout="5000">
        <VIcon color="white" :icon="snackColor === 'success' ? 'mdi-check' : 'mdi-alert'" />
        {{ snackMessage }}
      </VSnackbar>

      <slot />
    </VMain>
  </VApp>
</template>
