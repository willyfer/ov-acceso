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
    <v-col cols="12" align="center" class="d-flex flex-center justify-center">
      <h4 class="secondary--text">{{ footerText_2 }}</h4>
    </v-col>
    <ModalDocumentos
      :modal-documentos="estadoModal"
      :imagen-titulo="tituloModal"
      :items="itemsModal"
      @onclickOk="cerraModal"
    />
  </v-row>
</template>
<script>
import ModalDocumentos from '@/components/modals/ModalDocumentos'
export default {
  name:'Banner',
  components: {
    ModalDocumentos
  },
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
    return {
      estadoModal: false,
      tituloModal: null,
      itemsModal: [],
      itemsInfo: [
        {
          imagenTitulo: require('@/assets/boton--asistencia.png'),
          info: [
            {
              imagen: require('@/assets/Asistencia-1.png'),
              texto:
                '<b>TU PRÉSTAMO <br/> VIENE CON ASISTENCIA <br/> MÉDICA GRATUITA<b/>'
            },
            {
              imagen: require('@/assets/Asistencia-2.png'),
              texto: '<b>INCLUYE 3  <br/>FAMILIARES <br/> DEPENDIENTES<b/>'
            }
          ]
        }
      ]
    }
  },
  methods: {
    verInfo() {
      this.estadoModal = true
      this.itemsModal = this.itemsInfo
    },
    cerraModal() {
      this.estadoModal = false
      this.tituloModal = null
      this.itemsModal = []
      this.fotterModal = null
    }
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
  max-width: 320px;
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
</style>
