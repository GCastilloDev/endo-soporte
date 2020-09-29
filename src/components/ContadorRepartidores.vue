<template>
  <div class="contenedor">
    <v-container>
      <v-row>
        <v-col cols="4" class="font-weight-bold d-flex align-end"
          >Mapa de repartidores</v-col
        >
        <v-col
          cols="4"
          class="d-flex justify-center align-end text-subtitle-2 text"
          ref="repartidores"
          >{{ repartidores.disponible }} Repartidores disponibles</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="3" class="pr-0">
          <v-btn
            text
            block
            class="btn"
            @click="contadorRepartidores('disponibles')"
          >
            <v-icon color="#3FB523" left large>mdi-map-marker</v-icon>
            Disponible</v-btn
          >
        </v-col>
        <v-col cols="3" class="pl-0 pr-0"
          ><v-btn
            text
            block
            class="btn"
            @click="contadorRepartidores('no disponibles')"
            ><v-icon color="#EF0049" large left>mdi-map-marker</v-icon>No
            disponible</v-btn
          ></v-col
        >
        <v-col cols="3" class="pr-0 pl-0"
          ><v-btn
            text
            block
            class="btn"
            @click="contadorRepartidores('en entrega')"
            ><v-icon color="#000000" large left>mdi-map-marker</v-icon>En
            entrega</v-btn
          ></v-col
        >
        <v-col cols="3" class="pl-0"
          ><v-btn
            text
            block
            class="btn"
            @click="contadorRepartidores('confirmando')"
            ><v-icon color="#F69400" large left>mdi-map-marker</v-icon
            >Confirmando</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "contadorRepartidores",
  props: {
    repartidores: {
      type: Object,
    },
  },
  data: () => ({
    cantidad: 0,
    status: "",
    color: "text-red",
  }),
  methods: {
    contadorRepartidores(tipo) {
      if (tipo == "disponibles") {
        console.log(this.$refs.repartidores);
        this.$refs.repartidores.innerHTML = `${this.repartidores.disponible} repartidores disponibles`;
        this.$refs.repartidores.style.color = "#4AB930";
      }

      if (tipo == "no disponibles") {
        console.log(this.$refs.repartidores);
        this.$refs.repartidores.innerHTML = `${this.repartidores.noDisponible} repartidores no disponibles`;
        this.$refs.repartidores.style.color = "#EF0049";
      }

      if (tipo == "en entrega") {
        console.log(this.$refs.repartidores);
        this.$refs.repartidores.innerHTML = `${this.repartidores.enEntrega} repartidores en entrega`;
        this.$refs.repartidores.style.color = "#000000";
      }

      if (tipo == "confirmando") {
        console.log(this.$refs.repartidores);
        this.$refs.repartidores.innerHTML = `${this.repartidores.confirmando} repartidores confirmando`;
        this.$refs.repartidores.style.color = "#F69400";
      }
    },
    actualizarMapa() {
        this.$emit("actualizarMapa")
    }
  },
};
</script>

<style lang="scss" scoped>
.contenedor {
  background-color: #ffff;
  border-radius: 15px;
}

.btn {
  text-transform: none;
}

.text {
  color: #4ab930;
}
</style>