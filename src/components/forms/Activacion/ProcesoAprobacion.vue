<template>
  <div class="mainLayout">
    <v-row no-gutters align-center>
      <v-col cols="12" sm="4" text-center>
        <img src="@/assets/time.png" class="mainImage" />
      </v-col>
      <v-col cols="12" sm="8">
        <div>
          <h4 class="ld-title py-2">{{ tituloAprobracion }}</h4>

          <p class="ld-subtitle py-2" v-html="subTituloAprobacion"></p>
          <p>Codigo de crédito es: {{ datos.codigoCredito }}</p>
        </div>
      </v-col>
      <v-col cols="12" class="text-center" mt-3>
        <v-btn :color="color" class="ld-btn" to="/">Finalizar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: '¡Felicitaciones!'
    },
    subTituloAprobacion: {
      type: String,
      default:
        'El cliente ya puede pasar a caja <br/> mostrando su documento de identidad.'
    }
  },
  computed: {
    ...mapState('express', ['datos'])
  },

  async mounted() {},
  methods: {
    async enviarCorreo() {
      console.info(`Correo a enviar: ${this.datos.email}`)
      const jsoncorreo = {
        de: 'Acceso Corp <workflow@acceso.com.pe>',
        para: `${this.datos.email}`,
        asunto: '¡Felicitaciones por tu crédito! - Acceso',
        html: `<img src='${process.env.DEFAULT_URL}/apiacr/file?co_arcadj=${process.env.arcaDJ}&idf=y' height='500' width='800'>`,
        adjuntos: [
          {
            filename: 'HojaResumen.pdf',
            path: `${process.env.DEFAULT_URL}/api/acr/gethoja_resumen_ws/${this.datos.codigoExpediente}/${this.datos.tokenSMS}`
          },
          {
            filename: 'SolicitudDeCredito.pdf',
            path: `${process.env.DEFAULT_URL}/api/acr/getsolicitud_ws/${this.datos.codigoExpediente}/${this.datos.tokenSMS}`
          },
          {
            filename: 'Contrato.pdf',
            path: `${process.env.DEFAULT_URL}/api/acr/getcontrato_ws/${this.datos.codigoExpediente}/${this.datos.tokenSMS}`
          },
          {
            filename: 'Cronograma.pdf',
            path: `${process.env.DEFAULT_URL}/api/acr/getcronograma_ws/${this.datos.codigoExpediente}/${this.datos.tokenSMS}`
          },
          {
            filename: 'CartaInsruccionFactorRecaudo.pdf',
            path: `${process.env.DEFAULT_URL}/api/acr/getcarta_fr_ws/${this.datos.codigoExpediente}/${this.datos.tokenSMS}`
          }
        ]
      }
      /* console.log(jsoncorreo) */
      this.$axios
        .post(`/api/private/v1.0/correosAdjuntos`, jsoncorreo, {
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })
        .then((response) => {
          /* console.log('Correo Enviado') */
          /* console.log(response.data) */
        })
        .catch((error) => {
          /* console.log('No se envio correo') */
          /* console.log(error) */
        })
    }
  }
}
</script>

<style scoped>
.ld-title {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: -1px;
}

.ld-subtitle {
  font-size: 18px;

  margin-bottom: 0px;
}

.mainLayout {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.mainImage {
  width: 80%;
  height: auto;
}
@media (max-width: 991px) {
  .mainImage {
    max-width: 200px;
    width: 100%;
  }
  .ld-final {
    display: flex;
    justify-content: center;
  }
}
</style>
