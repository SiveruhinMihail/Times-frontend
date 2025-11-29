// pages/debug.vue
<template>
  <div>
    <h1>Debug Info</h1>
    <pre>{{ config }}</pre>
    <pre>{{ env }}</pre>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const env = {
  NUXT_PUBLIC_API_URL: process.env.NUXT_PUBLIC_API_URL,
  NUXT_PUBLIC_FILES_URL: process.env.NUXT_PUBLIC_FILES_URL,
  NODE_ENV: process.env.NODE_ENV,
};
</script>
