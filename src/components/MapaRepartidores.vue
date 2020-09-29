<template>
  <v-row>
    <v-col cols="12" class="pl-0 pr-0 pt-0">
      <ContadorRepartidores
        :repartidores="tiposRepartidores"
        @actualizarMapa="buscarRepartidores"
      />
    </v-col>
    <v-col cols="12" class="white mapa--contenedor">
      <div ref="map" class="map"></div>
    </v-col>
    
  </v-row>
</template>

<script>
import mapboxgl from "mapbox-gl";
import repartidores from "../common/Repartidores";
import ContadorRepartidores from "./ContadorRepartidores";
import Map from "../common/maps/Map";
import Repartidor from "../common/maps/Repartidor";

export default {
  name: "MapaRepartidores",
  mounted() {
    this.init();

    this.$el.addEventListener("click", (e) => {
      console.log(e.target.dataset.repartidor);
    });
  },
  components: {
    ContadorRepartidores,
  },
  data: () => ({
    loading: false,
    map: "",
    repartidores: [],
    marcadores: [],
    tiposRepartidores: {
      disponible: 0,
      noDisponible: 0,
      enEntrega: 0,
      confirmando: 0,
    },
  }),
  methods: {
    async init() {
      this.$emit("overlay");
      let map = new Map(
        this.$refs.map,
        mapboxgl,
        "pk.eyJ1IjoiZ3VzdGF2b2NteCIsImEiOiJja2JicHRwOTAwM2xvMzBtb2Y5YXE1dmR5In0.pBZI2pb23_lbx7bH52MJnA"
      );
      map.drawMap();
      await this.getRepartidores();
      // await this.drawMap();
      await this.drawRepartidores(map);
      this.$emit("overlay");
    },
    async getRepartidores() {
      let token = localStorage.token;

      try {
        const { data, status } = await repartidores.getAll(token);
        console.warn(data);
        if (status == 200) this.repartidores = data;
      } catch (error) {
        console.warn(error.response);
      }
    },
    drawMap() {
      //Token mapbox
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ3VzdGF2b2NteCIsImEiOiJja2JicHRwOTAwM2xvMzBtb2Y5YXE1dmR5In0.pBZI2pb23_lbx7bH52MJnA";

      // let center = this.repartidores[0].ubicacion.coordinates;
      let center = [0, 0];

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 12,
      });
    },
    drawRepartidores(map) {
      this.repartidores.forEach((e, index) => {
        
        let repartidor = new Repartidor(
          e._id,
          e.nombres,
          e.apellidos,
          e.urlFotos,
          e.telefono,
          e.ubicacion.coordinates,
          e.ubicacion.delivery_status
        );

        if (index == 0) {
          map.fly(repartidor.get().ubicacion);
          map.drawMarker(repartidor);
        }

        if (index != 0) map.drawMarker(repartidor);
      });
    },
    removerMarcadores() {
      this.marcadores.forEach((e) => {
        e.remove();
      });
    },
    async buscarRepartidores() {
      this.loading = true;
      this.$emit("overlay");
      this.reiniciarRepartidores();
      await this.getRepartidores();
      await this.removerMarcadores();
      // await this.map.setCenter(this.repartidores[0].ubicacion.coordinates);
      await this.drawRepartidores();
      this.$emit("overlay");
      this.loading = false;
    },
    contarRepartidores(tipoRepartidor) {
      if (tipoRepartidor == "DISPONIBLE") this.tiposRepartidores.disponible++;
      if (tipoRepartidor == "NO DISPONIBLE")
        this.tiposRepartidores.noDisponible++;
      if (tipoRepartidor == "INVITADO") this.tiposRepartidores.confirmando++;
      if (tipoRepartidor == "EN RUTA") this.tiposRepartidores.enEntrega++;
    },
    reiniciarRepartidores() {
      this.tiposRepartidores.disponible = 0;
      this.tiposRepartidores.noDisponible = 0;
      this.tiposRepartidores.confirmando = 0;
      this.tiposRepartidores.enEntrega = 0;
    },
    verRepartidor(repartidor) {
      alert("EWNTRE");
      console.log(repartidor);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.css");

.map {
  height: 60vh;
  border-radius: 15px;
}

.mapa--contenedor {
  border-radius: 15px;
}
</style>