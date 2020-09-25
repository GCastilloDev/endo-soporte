<template>
  <v-app>
    <v-main class="fondo">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>

<style lang="css">

.fondo {
  background-color: #F4F4F6;
}
</style>
