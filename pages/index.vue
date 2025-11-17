<script setup lang="ts">
const $api = useApi();
const config = useRuntimeConfig();

const sub = async (): Promise<void> => {
  try {
    const response = await $api(config.public.apiBaseUrl + "auth/me", {
      method: "GET",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
const data = ref([{ name: "name" }, { name: "name1" }]);
</script>

<template>
  <div>
    <div>
      <FeaturesHeader />
      <div class="margin_header">
        <!--<FeaturesBanner style="margin-top: 3vw" :data="data"></FeaturesBanner>-->
      </div>
    </div>
  </div>
</template>
<style scoped>
.margin_header {
  padding-top: 5vw;
}
</style>
