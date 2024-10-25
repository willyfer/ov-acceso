<template>
  <v-row no-gutters>
    <v-col cols="12" align="center">
      <br /><br />
      <h1 class="display-1 secondary--text titulo-cabecera">
        <b>{{ tituloCabecera }}</b>
      </h1>
      <h1 class="headline secondary--text font-weight-bold">
        {{ subtituloCabecera }}
      </h1>
    </v-col>
    <v-col v-if="logoCredi ? true : false" cols="12" align="center">
      <img :src="logoCredi" alt="amigo conductor" />
    </v-col>
    <v-col cols="12" align="center">
      <img :src="logo" alt class="imgPerson" />
    </v-col>
    <v-col v-if="subLogo ? true : false" cols="12" align="center">
      <img :src="subLogo" alt class="imgPerson" />
    </v-col>

    <v-col cols="7" align="center" class="d-flex align-center justify-center">
      <h3 class="secondary--text speech-info">
        <i>Para conocer más Click en:</i>
      </h3>
    </v-col>
    <v-col cols="5" align="center">
      <v-row justify="space-between">
        <v-col class="d-flex align-center">
          <img
            :src="require('@/assets/Boton-informacion.png')"
            alt
            width="80%"
            style="cursor:pointer"
            @click="onclickInfo"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" align="center" class="d-flex flex-center justify-center">
      <h4 class="secondary--text">{{ footerText }}</h4>
    </v-col>
    <v-col cols="12" align="center">
      <div class="container-recuerda">
        <div class="text-recuerda">
          <p class="text__white">Recuerda <b>ACCESO</b></p>
          <p class="text__orange"><b>NO COBRA NINGÚN TIPO DE COMISIÓN</b></p>
          <p class="text__white">por evaluación o desembolso de tu crédito.</p>
        </div>
        <div class="footer-recuerda text__orange">
          <b>NO TE DEJES ENGAÑAR.</b>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    logoCredi: {},
    tituloCabecera: {
      type: String,
      default: 'Relájate de tus deudas'
    },
    subtituloCabecera: {
      type: String,
      default: 'Te prestamos hasta S/1,800'
    },
    logo: {},
    subLogo: {},
    footerText: {
      type: String,
      default: 'Solo para propietarios de auto a GNV'
    }
  },
  methods: {
    onclickInfo() {
      this.$emit('onclickInfo')
    }
  }
}
</script>
<style scoped>
.imgPerson {
  min-width: 320px !important;
  min-height: 100px !important;
  width: -moz-max-content;
  width: -webkit-max-content;
  width: -o-max-content;
  width: 100% !important;
  max-width: 360px !important;
  height: auto !important;
  max-height: 100% !important;
}

.titulo-cabecera {
  font-size: 1.8em !important;
}

.speech-info {
  font-size: 16px;
}

.container-recuerda {
  margin: 10px 0;
  padding: 0 10px;
  max-width: 320px;
}

.container-recuerda p {
  margin-bottom: 0px;
}

.text-recuerda {
  font-size: 13px;
  background-color: #005197;
  padding: 10px 20px 20px;
  border-radius: 50px;
}

.footer-recuerda {
  font-size: 14px;
  margin: auto;
  width: 220px;
  background-color: #ebebeb;
  border-radius: 50px;
  border: 2px solid #005197;
  position: relative;
  top: -12px;
}

.text__white {
  color: white;
}

.text__orange {
  color: #ff7727;
}

@media screen and (max-width: 425px) {
  .speech-info {
    font-size: 13px;
    padding-left: 6px;
  }
}
</style>
