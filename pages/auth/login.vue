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
  <div class="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 bg-gray-50">
    <div class="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
      <img
        src="/favicon.ico"
        class="object-contain"
      />
    </div>
    <div class="w-full md:w-1/2 md:pl-6 lg:pl-12 max-w-md">
      <FormKit
        type="form"
        id="registration-example"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
        :actions="false"
        incomplete-message="Введите данные"
      >
        <h1 class="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6">
          Вход
        </h1>
        
        <FormKit
          type="email"
          name="email"
          label="Email"
          placeholder="Misha@example.com"
          help="Введите вашу почту"
          validation="required|email"
          label-class="text-sm sm:text-base md:text-lg"
          input-class="text-sm sm:text-base md:text-lg py-2 px-4 w-full border rounded-lg"
          outer-class="mb-4"
          help-class="text-xs sm:text-sm"
        />

        <FormKit
          type="password"
          name="password"
          label="Пароль"
          validation="required|length:6|matches:/[a-zA-Z0-9]/"
          placeholder="Пароль"
          help="Введите пароль (минимум 6 символов)"
          label-class="text-sm sm:text-base md:text-lg"
          input-class="text-sm sm:text-base md:text-lg py-2 px-4 w-full border rounded-lg"
          outer-class="mb-6"
          help-class="text-xs sm:text-sm"
        />

        <FormKit 
          type="submit"
          input-class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors text-sm sm:text-base"
        >
          Продолжить >
        </FormKit>
      </FormKit>

      <div class="mt-4">
        <NuxtLink 
          to="/auth/register"
          class="text-xs sm:text-sm text-blue-600 hover:underline"
        >
          Создать аккаунт
        </NuxtLink>
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
