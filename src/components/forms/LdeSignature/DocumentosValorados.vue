6<template>
  <div>
    <!--     <v-col cols="12" md="12"  text-center >
      <h2 class="acceso--text">CREDINSTANTE EXPRESS</h2>
    </v-col>
    <v-col cols="12"  text-center >
      <h2 class="express--text">Estás a un solo click de obtener tu dinero en efectivo!</h2>
    </v-col>-->
    <!--   <v-col cols="12" pt-3 pl-2>
      <p>*Haz click en cada documento para realizar la firma electrónica</p>
    </v-col>-->
    <v-col cols="12" pb-3>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" pt-2>
      <v-row
        no-gutters
        wrap
        align-content-center
        style="display: flex; justify-content: space-around;"
      >
        <v-col v-for="(item, key) in items" :key="key" cols="4" sm="4">
          <DocumentoFirmar :item="item"></DocumentoFirmar>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-if="!isSelectALL" cols="12" class="text-center">
      <v-checkbox
        v-model="datos.terminosCondiciones"
        type="checkbox"
        :color="color"
      >
        <div slot="label">
          <span slot="activator" :class="color + '--text'">
            ¡Visualiza los contractuales y procede a firmarlos de forma
            inmediata!
          </span>
        </div>
      </v-checkbox>
    </v-col>
    <v-col cols="12" py-3>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="text-center" order-xs="1" order-sm="2">
      <div v-if="FirmaReady === 1">
        <v-btn class="ld-btn" disabled :color="color">
          <!-- <v-btn class="ld-btn" disabled="FirmaReady" :color="color" @click.stop="enviarTokenDialog=true,  enviarToken()"> -->
          <b>{{ buttonDinamic }}</b>
        </v-btn>
      </div>

      <div v-if="FirmaReady === 2">
        <v-btn
          class="ld-btn"
          :loading="loading"
          :color="color"
          @click.stop=";(enviarTokenDialog = true), enviarToken()"
        >
          <!--<v-btn class="ld-btn" :color="color" @click.stop="enviarTokenDialog=true,  Procesar()">-->
          <!-- <v-btn text color="express" @click.stop="modalSolicitudCredito=true,  enviarToken()"> -->
          <b>FIRMAR</b>
        </v-btn>
      </div>

      <div v-if="FirmaReady === 3">
        <v-btn class="ld-btn" :color="color" @click="Procesar()">
          <!-- <v-btn text color="express" @click.stop="modalSolicitudCredito=true,  enviarToken()"> -->
          <b>FINALIZAR</b>
        </v-btn>
      </div>
    </v-col>

    <v-dialog
      v-if="tokenInvalido"
      v-model="modalTokenInvalid"
      max-width="360"
      height="auto"
    >
      <v-card class="ld-modal">
        <v-card-title>
          <h2 :class="`${color}--text`" class="text-center">Token Invalido*</h2>
        </v-card-title>
      </v-card>
    </v-dialog>
    <!--     <h4 v-if="tokenInvalido" :class="`${color}--text`">Token Invalido*</h4> -->
    <v-dialog
      v-model="enviarTokenDialog"
      persistent
      max-width="360"
      height="auto"
    >
      <form @submit.prevent="validarToken">
        <v-card class="ld-modal">
          <v-card-title
            class="express--text headlineclass text-center font-weight-bold"
          >
            Te enviamos un código SMS a tu celular
            {{ this.datos.telefono }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="tokenenviado"
              v-validate="'required|max:6|min:6|numeric'"
              data-vv-name="tokenenviado"
              :error-messages="errors.collect('tokenenviado')"
              maxlength="6"
              minlength="6"
              :counter="6"
              color="express2"
              class="express2-text"
              label="Código digital"
              placeholder
              hint="Te enviamos un código  vía SMS"
              required
              @keypress="isNumber"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-row dense>
              <v-col
                cols="12"
                order-cols="2"
                order-md="1"
                md="5"
                class="text-center pa-1"
              >
                <v-btn
                  text
                  class="ld-btn-secondary"
                  @click="enviarTokenDialog = false"
                  >CANCELAR</v-btn
                >
              </v-col>
              <v-col
                cols="12"
                order-xs="1"
                order-md="2"
                md="7"
                class="text-center pa-1"
              >
                <v-btn
                  type="submit"
                  class="ld-btn"
                  :color="color"
                  :loading="loading"
                  >FIRMAR DOCUMENTOS</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <!--{{ $data }}-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { async } from 'q'
import DocumentoFirmar from '@/components/DocumentoFirmar'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    DocumentoFirmar
  },
  props: ['color', 'documentos'],
  data() {
    return {
      loading: false,
      items: [
        { id: 1, doc: 'gethoja_resumen_ws', title: 'Hoja Resumen' },
        { id: 2, doc: 'getsolicitud_ws', title: 'Solicitud de Préstamo' },
        { id: 3, doc: 'getcontrato_ws', title: 'Contrato' },
        { id: 4, doc: 'getcronograma_ws', title: 'Cronograma' },
        { id: 5, doc: 'getcarta_fr_ws', title: 'Carta Instrucción FR' }
      ],
      dialog: false,
      fechaToken: '',
      fechaFirma: '',
      tokenInvalido: false,
      arcardj: null,
      FirmaReady: 1,
      ProcesarReady: false,
      vistasPre: [],
      arcadjarray: [],
      tokenenviado: '',
      code: null,
      actions1: true,
      signature1: false,
      actions2: true,
      telefono: null,
      signature2: false,
      actions3: true,
      signature3: false,
      actions4: true,
      signature4: false,
      enviarTokenDialog: false,
      modalTokenInvalid: false,
      hojaResumen: '',
      cronograma: '',
      contrato: '',
      solicitudCredito: {
        title: 'Solicitud de Préstamo',
        subtitle: 'Solicitud de Préstamo',
        pos: 3,
        obligatorio: 1,
        items: [
          {
            title: 'Solicitud de Préstamo'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('default', ['datos', 'arrayDocuments', 'terms']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    },
    isSelectALL() {
      if (this.isCheckValorados.length === 5) {
        this.$store.commit('default/UPDATE_DATOS', {
          terminosCondiciones: true
        })
        return true
      } else {
        return false
      }
    },
    terminosCondiciones() {
      return this.datos.terminosCondiciones
    },
    buttonDinamic() {
      if (this.isSelectALL) {
        this.FirmaReady = 2
      }
      return 'FIRMAR'
    }
  },
  watch: {
    async terminosCondiciones(val) {
      // console.log('valor: ' + val)
      if (val) {
        this.$store.commit('default/UPDATE_DATOS', {
          isCheckValorados: this.items
        })
        this.FirmaReady = 2
        this.enviarTokenDialog = true
        await this.enviarToken()
      } else {
        // this.$store.commit('default/UPDATE_DATOS', { isCheckValorados: [] })
        this.FirmaReady = 1
      }
    }
  },
  async mounted() {
    this.$store.commit('default/UPDATE_DATOS', {
      codigoExpediente: this.datos.codigoExpediente
    })
    // console.log(`${this.datos.codigoExpediente}`)
  },
  methods: {
    openTerms() {
      this.FirmaReady = 2
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },

    allSignature() {
      this.FirmaReady = 2
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    async contador() {
      // console.log('setting_code_archi')
      const items = this.items
      for (let index = 0; index < items.length; index++) {
        const element = items[index].doc
        await this.generarArcadj(
          `${process.env.DEFAULT_URL}/api/acr/${element}/${this.datos.codigoExpediente}/${this.arcardj}`
        )
      }
    },
    async generarArcadj(urlPdfArca) {
      const responseArca = await this.$axios({
        method: 'post',
        url: '/api/private/v1.0/arcadjUrl',
        data: {
          url: urlPdfArca
        },
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      console.log('############### End Function ARCADJ ###############')
      console.log(responseArca.data)
      this.arcadjarray.push(responseArca.data)
      // console.log(responseArca.data.co_archiv)
    },
    async Procesar() {
      console.log('Ejecutando Funcion Procesar')
      console.log(this.arcadjarray)
      // console.log('Los arca de Documentos estan aqui abajo')
      this.$store.commit('default/UPDATE_DATOS', {
        revisionTecnica: this.datos.codigoArcSoat,
        hojaResumen: this.arcadjarray[0],
        solicitudDelCredito: this.arcadjarray[1],
        contrato: this.arcadjarray[2],
        cronograma: this.arcadjarray[3],
        arcardj: this.arcardj,
        codigoEnviodeSMSValidacionDeDocumentos: this.arcardj
      })
      await this.$store.dispatch('default/enviarDocValorados', {
        revisionTecnica: this.datos.codigoArcSoat,
        hojaResumen: this.arcadjarray[0],
        solicitudDelCredito: this.arcadjarray[1],
        contrato: this.arcadjarray[2],
        cronograma: this.arcadjarray[3],
        arcardj: this.arcardj,
        codigoEnviodeSMSValidacionDeDocumentos: this.arcardj
      })
      // this.$store.commit('default/UPDATE_STEP', 2)
      // this.$store.dispatch('default/guardarEmisionSoat')
      // this.emitirSoat()
    },
    async generarQr() {
      try {
        // console.log('Se ejecuto generar QR')
        const data = {
          code: `${this.datos.documento}${this.datos.nombres}${this.datos.apellidoMaterno}${this.datos.apellidoPaterno}${this.datos.codigoExpediente}${this.datos.telefono}`
        }
        // console.log(data)

        const response = await this.$axios({
          url: '/api/private/v1.0/qrgerate',
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          },
          data
        })

        // console.log(response.data.co_archiv)
        this.$store.commit('default/UPDATE_DATOS', {
          codigoArcSoat: response.data.co_archiv
        })
        this.arcardj = response.data.co_archiv
        // console.log(`Arcardj: ${response.data.co_archiv}`)
        this.actions1 = false
        this.actions2 = false
        this.actions3 = false
        this.actions4 = false
        await this.contador()
      } catch (e) {
        // console.log('Error co el servicio de generar QR')
        // console.log(e)
      }
    },
    vistaPrevia(arg) {
      // console.log(this.datos.codigoExpediente)
      //console.log(`${process.env.DEFAULT_URL}/api/acr/${this.vistasPre[arg].name}/${this.datos.codigoExpediente}/0`);
      window.open(
        `${process.env.DEFAULT_URL}/api/acr/${this.vistasPre[arg].name}/${this.datos.codigoExpediente}/0`,
        '_black'
      )
    },
    vistaPreviaFirmada(arg) {
      //console.log(arg);
      //console.log(`${process.env.DEFAULT_URL}/api/acr/${this.vistasPre[arg].name}/${this.datos.codigoExpediente}/${this.arcardj}`);
      // console.log(`ArcaDj: ${this.arcardj}`)
      window.open(
        `${process.env.DEFAULT_URL}/api/acr/${this.vistasPre[arg].name}/${this.datos.codigoExpediente}/${this.arcardj}`,
        '_black'
      )
    },
    goOficina() {
      this.$store.dispatch('default/enviarDocumentos', { oficina: false })
    },
    enviarDocumentos() {
      this.$store.dispatch('default/enviarDocumentos', {
        oficina: true,
        documentos: this.documentos
      })
    },
    async enviarToken() {
      // console.log('Entro a enviar el token')
      const reponseToken = await this.$axios({
        url: '/api/private/v1.0/generarTokenNew',
        method: 'POST',
        data: {
          codigoToken: 'LD_DOC',
          documento: this.datos.documento,
          telefono: this.datos.telefono
        },
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      const tokenSms = reponseToken.data.resultado[0].co_toksms
      this.fechaToken = new Date()
      // console.log(tokenSms)
      this.enviarSms(tokenSms)
    },
    enviarSms(token) {
      // console.log('enviando msj')
      const msg = {
        mensaje: `Acceso: Su codigo de confirmacion es: ${token}. Nunca compartas con nadie esta clave. Evita el fraude.`,
        telefono: this.datos.telefono
      }
      this.$axios
        .post(`/api/private/v1.0/smsDirecto`, msg, {
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })
        .then((response) => {
          // console.log(response.data)
        })
        .catch((error) => {
          // console.log(error)
        })
    },
    async validarToken() {
      try {
        this.loading = true
        const token = this.tokenenviado
        // const token = this.$store.dispatch('default/validateToken', this.tokenenviado)
        // console.log(token)
        const data = {
          codigoToken: 'LD_DOC',
          documento: this.datos.documento,
          token: this.tokenenviado
        }

        const response = await this.$axios({
          url: '/api/private/v1.0/validarTokenNew',
          method: 'POST',
          data,
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })

        // console.log(response.data)
        if (response.data.resultado[0].co_estado === '00') {
          this.FirmaReady = 3
          this.fechaFirma = new Date()
          // console.log('Estoy en validarToken')
          this.tokenInvalido = false
          await this.generarQr()
          // console.log('procesando')
          await this.Procesar()
          this.enviarTokenDialog = false
          this.loading = false
        } else {
          this.loading = false
          this.enviarTokenDialog = false
          this.tokenInvalido = true
          // console.log(response.data.resultado.co_estado)
          // console.log('Token es invalido')
        }
      } catch (e) {
        // console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.ld-btn {
  min-width: 100px !important;
}
.ld-btn-secondary {
  min-width: 100px !important;
}
.docvaloricon {
  font-size: 75px !important;
}
.docvalorcard {
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 991px) {
  .ld-final {
    display: flex;
    justify-content: center;
  }
}

.file_uploader {
  background: red;
  padding: 4px;
}
</style>
