<template>
  <v-container>
    <h1>Soporte Endo</h1>

    <v-row class="mt-6">
      <v-col cols="5" class="pedidos">
        <h3>Pedidos pendientes</h3>
        <Pedidos />
      </v-col>
      <v-col cols="7">
        <MapaRepartidores />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pedidos from "../components/Pedidos";
import MapaRepartidores from "../components/MapaRepartidores";

export default {
  name: "Home",

  components: {
    Pedidos,
    MapaRepartidores,
  },
};
</script>

<style lang="css" scoped>
.pedidos {
  height: 80vh;
  overflow-y: scroll;
}
</style>
