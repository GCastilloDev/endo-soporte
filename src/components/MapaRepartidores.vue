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
    <!-- <v-col cols="12" class="pt-0">
      <v-btn
        depressed
        color="#FE0545"
        dark
        block
        :loading="loading"
        @click="buscarRepartidores"
        tile
      >
        <v-icon left>mdi-map-search</v-icon>Buscar repartidores
      </v-btn>
    </v-col> -->
  </v-row>
</template>

<script>
import mapboxgl from "mapbox-gl";
import repartidores from "../common/Repartidores";
import ContadorRepartidores from "./ContadorRepartidores";

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
      await this.getRepartidores();
      await this.drawMap();
      await this.drawRepartidores();
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

      let center = this.repartidores[0].ubicacion.coordinates;

      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 12,
      });
    },
    drawRepartidores() {
      this.repartidores.forEach((e) => {
        this.contarRepartidores(e.ubicacion.delivery_status);
        // let marker = new mapboxgl.Marker();
        // let LngLat = e.ubicacion.coordinates;
        // let color =
        //   e.ubicacion.delivery_status == "DISPONIBLE"
        //     ? "41B883"
        //     : e.ubicacion.delivery_status == "EN RUTA"
        //     ? "#F6BB33"
        //     : "#FE0545";

        let popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 33,
        }).setHTML(
          `<h1 style="font-family: 'Poppins'; font-weight: bold; font-size: .9rem;">${e.nombres}</h1><h2 style="font-family: 'Poppins'; font-weight: normal; font-size: .8rem;">${e.telefono}</h2>`
        );

        // marker.setLngLat(LngLat).setPopup(popup).addTo(this.map);

        // let markerHTML = marker.getElement();
        // markerHTML.children[0].children[0].children[1].style.fill = `${color}`;
        // markerHTML.children[0].children[0].children[2].style.fill = `${color}`;

        // this.marcadores.push(marker);

        let color =
          e.ubicacion.delivery_status == "DISPONIBLE"
            ? "#3FB523"
            : e.ubicacion.delivery_status == "EN RUTA"
            ? "#000000"
            : e.ubicacion.delivery_status == "INVITADO"
            ? "#F69400"
            : "#EF0049";

        let el = document.createElement("div");
        el.className = "marker";
        el.dataset.repartidor = `${e._id}`;
        el.style.display = `block`;
        el.style.backgroundSize = `50px 50px`;
        el.style.backgroundImage = `url(https://endoback.prbs.li/${e.urlFotos})`;
        el.style.borderRadius = `50%`;
        el.style.border = `5px solid ${color}`;
        el.style.width = `50px`;
        el.style.height = `50px`;

        let marker = new mapboxgl.Marker(el);
        let LngLat = e.ubicacion.coordinates;
        marker.setLngLat(LngLat).setPopup(popup).addTo(this.map);
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