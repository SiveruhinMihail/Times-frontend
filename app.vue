<script setup>
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initTokens();
});
</script>

<template>
  <div class="app">
    <NuxtPage />
  </div>
</template>

<style>
@import url("~/assets/css/index.css");
</style>
