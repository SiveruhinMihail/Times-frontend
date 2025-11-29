<script setup>
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.initTokens();
});
</script>

<template>
  <div class="app" style="font-family: JetBrainsMonoNL">
    <NuxtPage />
  </div>
</template>

<style>
@import url("./assets/css/index.css");
@font-face {
  font-family: "JetBrainsMonoNL";
  src: url("/fonts/JetBrainsMonoNL-Regular.ttf");
}
</style>
