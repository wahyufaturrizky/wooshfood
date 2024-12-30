<script lang="ts" setup>
const { data, clear, status } = useFetch("/api/hello");
</script>

<template>
  <VBtn @click="clear()"> Button </VBtn>
  <pre v-if="status === 'success'">{{ data }}</pre>
  <pre v-if="status !== 'success'">{{ "Loading..." }}</pre>
</template>
