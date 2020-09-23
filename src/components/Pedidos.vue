<template>
  <v-row>
    <v-col cols="12" v-for="(pedido, index) in pedidos" :key="index" class="pb-0">
      <v-card>
        <v-container class="pt-0 mt-0 pb-0">
          <v-row class="mb-0 pb-0">
            <v-col cols="3"  class="pb-0 mb-0 pt-2">
              <v-avatar tile size="60">
                <v-img :src="pedido.getPedido().avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="9" class="pb-0 mb-0 pt-2">
              <v-row>
                <v-col cols="7" class="d-flex align-end pb-0 pt-0">
                  <h2>{{pedido.getPedido().nombreComercio}}</h2>
                </v-col>
                <v-col cols="5" class="d-flex justify-end align-end pb-0 pt-0">
                  <h4 class="font-weight-regular">
                    Folio:
                    <strong>{{pedido.getPedido().folio}}</strong>
                  </h4>
                </v-col>
                <v-col cols="4" class="d-flex justify-center pb-0 pt-1">{{pedido.getPedido().hora}}</v-col>
                <v-col cols="4" class="d-flex justify-center pb-0 pt-1">{{pedido.getPedido().fecha}}</v-col>
                <v-col cols="4" class="d-flex justify-center pb-0 pt-1">{{pedido.getPedido().total}}</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-card-actions class="pt-1 mt-0">
            <v-btn
              block
              color="#FE0545"
              dark
              depressed
              @click="buscarRepartidor(index)"
            >Asignar repartidor</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SinRepartidor from "../common/socket/SinRepartidor";
import { mapState } from "vuex";
export default {
  name: "Pedidos",
  mounted() {
    const sinRepartidor = new SinRepartidor();
    sinRepartidor.listen();
  },
  methods: {
    buscarRepartidor(index) {
      this.pedidos[index].buscarRepartidor();
    },
  },
  computed: {
    ...mapState(["pedidos"]),
  },
};
</script>

<style lang="scss" scoped>
</style>