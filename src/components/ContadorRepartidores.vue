<template>
  <div class="contenedor">
    <v-container>
      <v-row>
        <v-col cols="12" class="font-weight-bold d-flex align-end text-h5"
          >Mapa de repartidores</v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="3" class="pr-0 d-flex justify-center">
          <div>
            <v-icon color="#3FB523" large>mdi-map-marker</v-icon>
            Disponible
            <span class="font-weight-bold disponible">{{
              repartidoresDisponibles
            }}</span>
          </div>
        </v-col>
        <v-col cols="3" class="pl-0 pr-0 d-flex justify-center">
          <div>
            <v-icon color="#EF0049" large>mdi-map-marker</v-icon>
            No disponible
            <span class="font-weight-bold no-disponible">{{
              repartidoresNoDisponibles
            }}</span>
          </div>
        </v-col>
        <v-col cols="3" class="pr-0 pl-0 d-flex justify-center">
          <div>
            <v-icon color="#000000" large>mdi-map-marker</v-icon>
            En entrega
            <span class="font-weight-bold">{{ repartidoresEnEntrega }}</span>
          </div>
        </v-col>
        <v-col cols="3" class="pl-0 d-flex justify-center">
          <div>
            <v-icon color="#F69400" large>mdi-map-marker</v-icon>
            Confirmando
            <span class="font-weight-bold confirmando">{{
              repartidoresConfirmando
            }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "contadorRepartidores",
  data: () => ({
  }),
  computed: {
    ...mapState([
      "repartidoresDisponibles",
      "repartidoresNoDisponibles",
      "repartidoresEnEntrega",
      "repartidoresConfirmando",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.contenedor {
  background-color: #ffff;
  border-radius: 15px;
}

.disponible {
  color: #4ab930;
}

.no-disponible {
  color: #ef0049;
}

.confirmando {
  color: #f69400;
}
</style>