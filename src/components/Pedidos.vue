<template>
  <v-row>
    <v-col cols="12" v-for="(pedido, index) in pedidos" :key="index">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="3">
              <v-avatar tile size="90">
                <v-img :src="pedido.getPedido().avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <v-row>
                <v-col cols="7" class="d-flex align-end">
                  <h2>{{pedido.getPedido().nombreComercio}}</h2>
                </v-col>
                <v-col cols="5" class="d-flex justify-end align-end">
                  <h4 class="font-weight-regular">
                    Folio:
                    <strong>{{pedido.getPedido().folio}}</strong>
                  </h4>
                </v-col>
                <v-col cols="4" class="d-flex justify-center">{{pedido.getPedido().fecha}}</v-col>
                <v-col cols="4" class="d-flex justify-center">{{pedido.getPedido().fecha}}</v-col>
                <v-col cols="4" class="d-flex justify-center">{{pedido.getPedido().total}}</v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn
              block
              color="green"
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