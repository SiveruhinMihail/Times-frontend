<script setup>
const $api = useApi();
const config = useRuntimeConfig();

const sub = async () => {
  try {
    const response = await $api(
      config.public.apiBaseUrl + "auth/get_user?email=userrrrr@example.com",
      {
        method: "GET",
      }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <NuxtLink to="/auth/login"><div>Вход</div></NuxtLink>
    <NuxtLink to="/auth/register"><div>Регистрация</div></NuxtLink>
    <div @click="sub">запрос на себя</div>
  </div>
</template>
