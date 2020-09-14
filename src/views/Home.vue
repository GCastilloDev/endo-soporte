<template>
  <v-container>
    <h1>Soporte Endo</h1>

    <v-row class="mt-6">
      <v-col cols="6">
        <h3>Pedidos pendientes</h3>

        <Pedidos />

        <!-- <v-row>
          <v-col cols="12" v-for="(pedido, index) in pedidos" :key="index">
            <v-card>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-avatar tile size="90">
                      <v-img :src="pedido.getPedido().avatar"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="5">
                    <h2>{{ pedido.getPedido().nombreComercio }}</h2>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-end">
                    <h4 class="font-weight-regular">Folio: <strong>{{pedido.getPedido().folio}}</strong></h4>
                  </v-col>
                  <v-col cols="3">{{pedido.getPedido().fecha}}</v-col>
                  <v-col cols="3">{{pedido.getPedido().hora}}</v-col>
                  <v-col cols="3">{{pedido.getPedido().total}}</v-col>
                </v-row>
                <v-card-actions>
                  <v-btn block>Buscar repartidor</v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-col>
        </v-row>-->
      </v-col>
      <v-col cols="6" class="red">d</v-col>
    </v-row>
  </v-container>
</template>

<script>
import Pedidos from "../components/Pedidos";

export default {
  name: "Home",

  components: {
    Pedidos,
  },
};
</script>
