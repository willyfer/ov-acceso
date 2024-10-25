<template>
  <v-row no-gutters class="form-left">
    <v-col cols="12" align="center">
      <h1 class="display-1 secondary--text titulo-cabecera">
        {{ tituloCabecera }}
      </h1>
      <h1 class="headline secondary--text font-weight-bold">
        <b>{{ subtituloCabecera }}</b>
      </h1>
    </v-col>
    <v-col cols="12" align="center">
      <img :src="logo" alt class="imgPrincipal" />
    </v-col>

    <v-col cols="12" align="center">
      <h3 class="secondary--text">{{ footerText_1 }}</h3>
    </v-col>
    <v-col cols="12" align="center"></v-col>
    <v-col cols="12" align="center" class="d-flex flex-center justify-center">
      <h4 class="secondary--text">{{ footerText_2 }}</h4>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    logoCredi: {},
    tituloCabecera: {
      type: String,
      default: ''
    },
    subtituloCabecera: {
      type: String,
      default: ''
    },
    logo: {},
    footerText_1: {
      type: String,
      default: ''
    },
    footerText_2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.imgPrincipal {
  width: -moz-max-content;
  width: -webkit-max-content;
  width: -o-max-content;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
  max-width: 390px;
}
.form-left {
  max-height: 100% !important;
}
.titulo-cabecera {
  font-size: 1.8em !important;
}
.btn-asistencia {
  cursor: pointer;
}
.btn-asistencia img {
  margin: auto;
}

@media (max-width: 360px) {
  .imgPrincipal{
    max-width: 350px;
  }
}
</style>
