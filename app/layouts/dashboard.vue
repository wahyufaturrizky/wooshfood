<script setup lang="ts">
const { isSnackbarVisible, snackColor, snackMessage } = useSnackbar();
</script>

<template>
  <VApp class="bg-[#FBFBFC]" :theme="'light'">
    <VAppBar>
      <VAppBarTitle>
        <NuxtImg height="25" width="136" src="/woosh-logo.png" alt="logo" />
      </VAppBarTitle>
    </VAppBar>

    <VNavigationDrawer>
      <VList density="compact" nav>
        <VListItem class="bg-grey-lighten-4" :border="true" title="Dashboard" value="dashboard" />
      </VList>
    </VNavigationDrawer>

    <VMain>
      <VSnackbar v-model="isSnackbarVisible" location="top" :color="snackColor" :timeout="5000">
        <VIcon color="white" :icon="snackColor === 'success' ? 'mdi-check' : 'mdi-alert'" />
        {{ snackMessage }}
      </VSnackbar>

      <slot />
    </VMain>
  </VApp>
</template>
