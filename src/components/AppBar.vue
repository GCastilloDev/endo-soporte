<template>
  <div>
    <v-app-bar color="#2C3856" dark dense>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Soporte endo</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer mobile-breakpoint="5000" class="sidebar-menu" v-model="drawer" app>
      <div class="pa-6">
        <v-img src="@/assets/logoEndoRed.svg"></v-img>
      </div>
      <div>
        <v-btn
          class="font-weight-medium"
          block
          depressed
          color="#FE0545"
          outlined
          @click="cerrarSesion"
        >
          <v-icon left>mdi-account-arrow-right</v-icon>Cerrar sesión
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    drawer: false,
  }),
  methods: {
    cerrarSesion() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.sidebar-menu {
  .v-navigation-drawer__content {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>