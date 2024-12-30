<script lang="ts" setup>
const { data, refresh } = await useFetch("/api/hello");
</script>

<template>
  <VBtn @click="refresh()"> Button </VBtn>
  <pre>{{ data }}</pre>
</template>
