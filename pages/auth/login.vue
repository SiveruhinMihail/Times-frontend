<script setup>
const submitted = ref(false);
const formErrors = ref({});
const config = useRuntimeConfig();
const authStore = useAuthStore();

const submitHandler = async (data) => {
  try {
    const response = await $fetch(config.public.apiBaseUrl + "auth/login", {
      method: "POST",
      body: data,
    });

    if (response.error) {
      formErrors.value = response.error;
    } else {
      console.log(response);
      authStore.setTokens(
        response.data.accessToken,
        response.data.refreshToken
      );
      submitted.value = true;
      formErrors.value = {};
      await navigateTo("/");
    }
  } catch (error) {
    formErrors.value = {
      general:
        error.data?.detail ||
        error.data?.message ||
        "Произошла ошибка при авторизации",
    };
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen min-h-screen">
    <div class="w-1/2">
      <img
        src="/favicon.ico"
        class="object-contain"
        style="height: 90vh; width: 90vw"
      />
    </div>
    <div class="flex-grow" style="margin-left: 6vw">
      <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
        :actions="false"
        incomplete-message="Введите данные"
      >
        <h1 class="font-bold" style="font-size: 3.2vw; margin-bottom: 2vw">
          Вход
        </h1>
        <FormKit
          type="email"
          name="email"
          label="Email"
          placeholder="Misha@example.com"
          help="Введите вашу почту"
          validation="required|email"
          label-class="text-lg"
          input-class="text-lg py-2 px-4 w-full"
          :validation-messages="{
            required: 'Пожалуйста, введите ваш email.',
            email: 'Пожалуйста, введите корректный email адрес.',
          }"
        />
        <FormKit
          type="password"
          name="password"
          label="Пароль"
          validation="required|length:6|matches:/[a-zA-Z-Z]/"
          :validation-messages="{
            required: 'Пожалуйста, введите пароль.',
            length: 'Пароль должен содержать не менее 6 символов.',
            matches: 'Пароль должен содержать хотя бы одну букву или цифру.',
          }"
          placeholder="Пароль"
          help="Введите пароль"
          label-class="text-lg"
          input-class="text-lg py-2 px-4 w-full"
        />
        <FormKit type="submit">Продолжить ></FormKit>
      </FormKit>
      <!-- Вывод общей ошибки -->
      <div v-if="formErrors.general" class="text-red-500">
        {{ formErrors.general }}
      </div>
      <NuxtLink :to="{ path: '/auth/register' }"
        ><div style="font-size: 1vw">Создать аккаунт</div></NuxtLink
      >
      <div v-if="submitted">
        <h2 class="text-xl text-green-500">Регистрация прошла успешно!</h2>
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-size: calc(24px + (16 + 16 * 0.7) * ((110vw - 320px) / 1280));
}
h2 {
  font-size: calc(12px + (16 + 16 * 0.7) * ((110vw - 320px) / 1280));
}
h3 {
  font-size: calc(8px + (16 + 16 * 0.7) * ((110vw - 320px) / 1280));
}
h4 {
  font-size: calc((5 + 4 * 0.7) * ((110vw - 320px) / 1280) + 2px);
  align-content: center;
}
h5 {
  font-size: calc((6 + 4 * 0.7) * ((110vw - 320px) / 1280) + 3px);
  align-content: center;
}
p {
  font-size: calc((10 + 4 * 0.7) * ((110vw - 320px) / 1280) + 5px);
  align-content: center;
}
h6 {
  font-size: calc((14 + 4 * 0.7) * ((110vw - 320px) / 1280) + 6px);
  align-content: center;
}
</style>
