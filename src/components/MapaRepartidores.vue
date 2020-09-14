<template>
  <v-row>
    <v-col cols="12" class="pb-0 pt-0">
      <div ref="map" class="map"></div>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn depressed color="#FE0545" dark block :loading="loading" @click="buscarRepartidores">
        <v-icon left>mdi-map-search</v-icon>Buscar repartidores
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import mapboxgl from "mapbox-gl";
import repartidores from "../common/Repartidores";

export default {
  name: "MapaRepartidores",
  mounted() {
    this.init();
  },
  data: () => ({
    loading: false,
    map: "",
    repartidores: [],
    marcadores: [],
  }),
  methods: {
    async init() {
      await this.getRepartidores();
      await this.drawMap();
      await this.drawRepartidores();
    },
    async getRepartidores() {
      let token = localStorage.token;

      try {
        const { data, status } = await repartidores.getAll(token);
        if (status == 200) this.repartidores = data;
      } catch (error) {
        console.warn(error.response);
      }
    },
    drawMap() {
      //Token mapbox
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ3VzdGF2b2NteCIsImEiOiJja2JicHRwOTAwM2xvMzBtb2Y5YXE1dmR5In0.pBZI2pb23_lbx7bH52MJnA";

      let center = this.repartidores[0].ubicacion.coordinates;

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 11.5,
      });
    },
    drawRepartidores() {
      this.repartidores.forEach((e) => {
        let marker = new mapboxgl.Marker();
        let LngLat = e.ubicacion.coordinates;
        let color =
          e.ubicacion.delivery_status == "DISPONIBLE" ? "#FE0545" : "#F6BB33";

        let popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 33,
        }).setHTML(
          `<h1 style="font-family: 'Poppins'; font-weight: bold; font-size: .9rem;">${e.nombres}</h1><h2 style="font-family: 'Poppins'; font-weight: normal; font-size: .8rem;">${e.telefono}</h2>`
        );

        marker.setLngLat(LngLat).setPopup(popup).addTo(this.map);

        let markerHTML = marker.getElement();
        markerHTML.children[0].children[0].children[1].style.fill = `${color}`;
        markerHTML.children[0].children[0].children[2].style.fill = `${color}`;
        markerHTML.click();
        markerHTML.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        this.marcadores.push(marker);
      });
    },
    removerMarcadores() {
      this.marcadores.forEach((e) => {
        e.remove();
      });
    },
    async buscarRepartidores() {
      this.loading = true;
      await this.getRepartidores();
      await this.removerMarcadores();
      await this.map.setCenter(this.repartidores[0].ubicacion.coordinates);
      await this.drawRepartidores();
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://api.mapbox.com/mapbox-gl-js/v1.11.0/mapbox-gl.css");

.map {
  height: 73vh;
}
</style>