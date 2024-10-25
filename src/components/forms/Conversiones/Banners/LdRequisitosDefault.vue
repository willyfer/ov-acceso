<template>
  <v-row no-gutters>
    <v-col cols="12" class="d-flex flex-column justify-center align-center">
      <div class="container-imgHeader">
        <v-img :src="imgHeader" alt="imgHeader" class="imgHeader" />
      </div>
      <div class="container-imgPrincipal">
        <v-img :src="logo" alt="imgPrincipal" class="imgPrincipal" />
      </div>
      <div class="container-imgFooter">
        <v-img :src="imgFooter" alt="imgFooter" class="imgFooter" />
      </div>
    </v-col>
    <v-col
      cols="12"
      align="center"
      class="d-flex align-center justify-center mt-4 mb-2"
    >
      <h3 class="secondary--text speech-info">
        Para conocer más Click en:
      </h3>
    </v-col>
    <v-row>
      <v-col
        cols="4"
        align="center"
        class="container-btn  d-flex justify-center align-center"
      >
        <img
          :src="require('@/assets/img/Conversiones/boton-requisitos.png')"
          alt
          class="btn-conocer-mas"
          style="cursor:pointer"
          @click="onclickRequisitos"
        />
      </v-col>
      <v-col
        cols="4"
        align="center"
        class="container-btn d-flex justify-center align-center"
      >
        <img
          :src="require('@/assets/img/Conversiones/boton-Beneficios.png')"
          alt
          class="btn-conocer-mas"
          style="cursor:pointer"
          @click="onclickBeneficios"
        />
      </v-col>
      <v-col
        cols="4"
        align="center"
        class="container-btn  d-flex justify-center align-center"
      >
        <img
          :src="require('@/assets/img/Conversiones/boton-ahorro.png')"
          alt
          class="btn-conocer-mas"
          style="cursor:pointer"
          @click="onclickAhorro"
        />
      </v-col>
    </v-row>

    <v-col cols="12" align="center" class="d-flex flex-center justify-center">
      <h4 class="secondary--text">{{ footerText }}</h4>
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
    imgHeader: {},
    imgFooter: {},
    subLogo: {},
    footerText: {
      type: String,
      default: 'Solo para propietarios de auto a GNV'
    }
  },
  data() {
    return {
      logoBim: require('@/assets/img/Bim/bimNavLogo.png')
    }
  },
  methods: {
    onclickRequisitos() {
      this.$emit('onclickRequisitos')
    },
    onclickBeneficios() {
      this.$emit('onclickBeneficios')
    },
    onclickAhorro() {
      this.$emit('onclickAhorro')
    }
  }
}
</script>
<style scoped>
.imgHeader,
.imgPrincipal,
.imgFooter {
  max-width: 300px !important;
}

.speech-info {
  font-size: 16px;
  text-transform: uppercase;
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
  padding: 5px 20px 15px;
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

.container-btn {
  padding: 0 !important;
}

.btn-conocer-mas {
  max-width: 100px;
}

@media screen and (max-width: 425px) {
  .speech-info {
    font-size: 13px;
    padding-left: 6px;
  }
}

@media screen and (min-width: 425px) {
  .btn-conocer-mas {
    max-width: 130px;
  }
}

@media screen and (min-width: 1024px) {
  .imgHeader,
  .imgPrincipal,
  .imgFooter {
    max-width: 400px !important;
  }

  .btn-conocer-mas {
    max-width: 150px;
  }
}
</style>
