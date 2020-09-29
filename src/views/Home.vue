<template>
  <div>
    <AppBar />
    <v-container class="pt-0">
      <v-row class="mt-6">
        <v-col cols="5" class="pedidos mt-0 pt-0">
          <!-- <h3>Pedidos pendientes</h3> -->
          <Pedidos />
        </v-col>
        <v-col cols="7" class="pa-0">
          <MapaRepartidores @overlay="changeOverlay" />
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import Pedidos from "../components/Pedidos";
import MapaRepartidores from "../components/MapaRepartidores";

// import Socket from "../common/socket/Socket";


export default {
  name: "Home",
  mounted() {
    // let emitter = require("emitter-io");
    // let socket = new Socket(
    //   "ZhsnL8uQ9szZ-F7aaDChbtFEaXLNGLyM",
    //   emitter,
    //   "endo-soporte-repartidores"
    // );
    // socket.connect();
    // socket.listen();
    // socket.publish();
  },
  components: {
    Pedidos,
    MapaRepartidores,
    AppBar,
  },
  data: () => ({
    overlay: false,
  }),
  methods: {
    changeOverlay() {
      this.overlay = !this.overlay;
    },
  },
};
</script>

<style lang="css" scoped>
.pedidos {
  height: 85vh;
  overflow-y: scroll;
}
</style>
