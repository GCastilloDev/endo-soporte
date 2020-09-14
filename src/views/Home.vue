<template>
  <div>
    <AppBar />
    <v-container>
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
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import Pedidos from "../components/Pedidos";
import MapaRepartidores from "../components/MapaRepartidores";

export default {
  name: "Home",

  components: {
    Pedidos,
    MapaRepartidores,
    AppBar,
  },
};
</script>

<style lang="css" scoped>
.pedidos {
  height: 80vh;
  overflow-y: scroll;
}
</style>
