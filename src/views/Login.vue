<template>
  <v-container class="pa-0">
    <v-row class="red contenido d-flex justify-center align-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="10">
                <v-text-field
                  v-model="usuario.username"
                  label="Usuario"
                  color="green"
                  placeholder="Ingrese su usuario"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  v-model="usuario.password"
                  type="password"
                  label="Contraseña"
                  color="green"
                  placeholder="Ingrese su contraseña"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="10" v-if="errorMessage != ''">
                <v-alert text type="error">
                  <strong>{{ errorMessage }}</strong>
                </v-alert>
              </v-col>
              <v-col cols="4">
                <v-btn
                  block
                  depressed
                  :loading="loading"
                  color="green"
                  dark
                  @click="ingresar"
                >Ingresar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auth from "../common/Auth";

export default {
  name: "Login",
  data: () => ({
    loading: false,
    usuario: {
      username: "thaeron@soporte.com",
      password: "12345678",
    },
    errorMessage: "",
  }),
  methods: {
    async ingresar() {
      this.loading = true;
      try {
        const { data, status } = await auth.login(this.usuario);

        if (status == 200) this.ingresarSistema(data.Token);

        if (status == 202) {
          this.errorMessage = data;
          this.hideErrorMessage(5000);
        }
      } catch (error) {
        console.warn(error.response);
      } finally {
        this.loading = false;
      }
    },
    hideErrorMessage(time) {
      setTimeout(() => {
        this.errorMessage = "";
      }, time);
    },
    ingresarSistema(token) {
      localStorage.setItem("token", token);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.contenido {
  height: 100vh;
}
</style>