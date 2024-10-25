<template>
  <div>
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
      <v-checkbox v-model="datos.terminosCondiciones" type="checkbox" :color="color">
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
          <b>FIRMAR</b>
        </v-btn>
      </div>

      <div v-if="FirmaReady === 3">
        <v-btn class="ld-btn" :color="color" @click="Procesar()">
          <b>FINALIZAR</b>
        </v-btn>
      </div>
    </v-col>

    <v-dialog v-if="tokenInvalido" v-model="modalTokenInvalid" max-width="360" height="auto">
      <v-card class="ld-modal">
        <v-card-title>
          <h2 :class="`${color}--text`" class="text-center">Token Invalido*</h2>
        </v-card-title>
      </v-card>
    </v-dialog>
    <v-dialog v-model="enviarTokenDialog" persistent max-width="500" height="auto">
      <form @submit.prevent="validarToken">
        <v-card class="ld-modal">
          <v-card-title
            style="word-break: break-word"
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
            <v-row no-gutters>
              <v-col cols="12" order-md="2" md="7" class="text-center pa-1">
                <v-btn
                  type="submit"
                  class="ld-btn"
                  :color="color"
                  :loading="loading"
                >FIRMAR DOCUMENTOS</v-btn>
              </v-col>
              <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
                <v-btn class="ld-btn-secondary" @click="closeModal">CANCELAR</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="2000" color="primary">Token Invalido</v-snackbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { async } from 'q'
import DocumentoFirmar from '@/components/forms/Activacion/DocumentoFirmar'
import { sendToken, validateToken } from '@/api/authentication'
import { getNameUsers } from '@/api/user';
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
      snackbar: false,
      loading: false,
      items: [
        {
          id: 1,
          doc: 'gethoja_resumen_ws',
          title: 'HojaResumen',
          title2: 'Hoja Resumen'
        },
        {
          id: 2,
          doc: 'getsolicitud_ws',
          title: 'SolicitudDeCredito',
          title2: 'Solicitud de Crédito'
        },
        { id: 3, doc: 'getcontrato_ws', title: 'Contrato', title2: 'Contrato' },
        {
          id: 4,
          doc: 'getcronograma_ws',
          title: 'Cronograma',
          title2: 'Cronograma'
        },
        {
          id: 5,
          doc: 'getcarta_fr_ws',
          title: 'CartaInstruccionFactorRecaudo',
          title2: 'Carta de Instrucción de Factor de Recaudo'
        },
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
    ...mapState('express', ['datos', 'terms']),
    ...mapState('users', ['promotor']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    },
    isSelectALL() {
      if (this.isCheckValorados.length === 5) {
        this.$store.commit('express/UPDATE_DATOS', {
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
        this.$store.commit('express/UPDATE_DATOS', {
          isCheckValorados: this.items
        })
        this.FirmaReady = 2
        this.enviarTokenDialog = true
        await this.enviarToken()
      } else {
        this.FirmaReady = 1
      }
    }
  },
  async mounted() {
    this.$ga.event('Activacion', 'DOcumentosValorados')
    this.$store.commit('express/UPDATE_DATOS', {
      codigoExpediente: this.datos.codigoExpediente
    })
    // console.log(`${this.datos.codigoExpediente}`)
  },
  methods: {
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
      try {
        this.arcadjarray = []
        for (const iterator of this.items) {
          const element = iterator.doc
          const arca = await this.generarArcadj(
            `${process.env.DEFAULT_URL}/api/acr/${element}/${this.datos.codigoExpediente}/${this.arcardj}`
          )
          this.arcadjarray.push(arca)
        }
      } catch (error) {
        throw new Error('some error')
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje:
            '<h4>¡OH!</h4> <br>Ha ocurrido un error interno!<br> intentalo en unos minutos'
        })
      }
    },
    async generarArcadj(urlPdfArca) {
      try {
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
        /* console.log('############### End Function ARCADJ ###############') */
        /* console.log(responseArca.data) */
        return responseArca.data
        // console.log(responseArca.data.co_archiv)
      } catch (error) {
        throw new Error('some error')
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje:
            '<h4>¡OH!</h4> <br>Ha ocurrido un error interno!<br> intentalo en unos minutos'
        })
      }
    },
    async Procesar() {
      /* console.log('Ejecutando Funcion Procesar') */
      /* console.log(this.arcadjarray) */
      // console.log('Los arca de Documentos estan aqui abajo')
      this.$store.commit('express/UPDATE_DATOS', {
        fi_hojres: this.arcadjarray[0],
        fi_solcre: this.arcadjarray[1],
        fi_contra: this.arcadjarray[2],
        fi_cronog: this.arcadjarray[3],
        fi_carins: this.arcadjarray[4],
        tokenSMS: this.arcardj
      })

      await this.$store.dispatch('express/enviarDocValorados')
    },
    async generarQr() {
      try {
        // console.log('Se ejecuto generar QR')
        const data = {
          code: `${this.datos.documento}${this.datos.nombres}${this.datos.apellidoPaterno}${this.datos.apellidoMaterno}${this.datos.codigoExpediente}${this.datos.telefono}`
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
        this.$store.commit('express/UPDATE_DATOS', {
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
        throw new Error('some error')
        /* console.log('Error co el servicio de generar QR') */
        /* console.log(e) */
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje:
            '<h4>¡OH!</h4> <br>Ha ocurrido un error interno!<br> intentalo en unos minutos'
        })
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
      this.$store.dispatch('express/enviarDocumentos', { oficina: false })
    },
    enviarDocumentos() {
      this.$store.dispatch('express/enviarDocumentos', {
        oficina: true,
        documentos: this.documentos
      })
    },
    async enviarToken() {
      /* console.log('Entro a enviar el token') */

      const dataToken = {
        codigoToken: 'LD_DOC',
        documento: this.datos.documento,
        telefono: this.datos.telefono,
        mensaje: `Acceso: Su codigo de confirmacion es: ######. Nunca compartas con nadie esta clave. Evita el fraude.`
      }

      const respSendToken = await sendToken(this.$axios, dataToken)

      const tokenSms = respSendToken
      /* console.log('Token: ', tokenSms) */
      this.fechaToken = new Date()
    },
    closeModal() {
      this.enviarTokenDialog = false
      this.loading = false
    },
    async validarToken() {
      /* console.log('Inicia proceso de validación...') */
      const result = await getNameUsers(this.$axios, this.datos.codigoProspecto)
      const { usuProcurador } = result
      try {
        this.loading = true
        const dataValidate = {
          token: this.tokenenviado,
          co_resbio: this.datos.jsonReniec.co_resbio,
          fi_huella: this.datos.jsonReniec.fi_huella,
          no_usupro: usuProcurador ? usuProcurador.no_usuper : 'No aplica',
          apellidoPaterno: this.datos.apellidoPaterno,
          apellidoMaterno: this.datos.apellidoMaterno,
          nombres: this.datos.nombres,
          codigoExpediente: this.datos.codigoExpediente,
          codigoCredito: this.datos.codigoCredito,
          telefono: this.datos.telefono,
          email: this.datos.email,
          placa: this.datos.placa,
          contratos: this.items,
          documento: this.datos.documento,
          codigoProducto: this.datos.codigoProducto,
          codigoProspecto: this.datos.codigoProspecto,
          estadoProspecto: this.datos.estadoProspecto,
          codigoUsuario: this.promotor.codigoUsuario,
          importeFinanciar: this.datos.importeFinanciar
        }
        /* console.log('Realizando validación...', dataValidate) */
        const respValToken = await validateToken(this.$axios, dataValidate)
        /* console.log('Repuesta validación: ', respValToken) */

        if (respValToken.codRes == '00') {
          this.$store.commit('ui/UPDATE_STEP', 6)
        } else if (respValToken.codRes == '01') {
          this.$store.commit('ui/SET_OPENDIALOG', {
            estado: true,
            mensaje: 'Token invalido, reintentar',
            isReset: true
          })
          this.loading = false
        } else if (respValToken.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOG', {
            estado: true,
            mensaje: 'Ocurrió un error en el sistema'
          })
        } else {
          this.$store.commit('ui/SET_OPENDIALOG', {
            estado: true,
            mensaje: 'Ocurrió un error en el sistema'
          })
        }
      } catch (e) {
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje:
            '<h4>¡OH!</h4> <br>Ha ocurrido un error interno!<br> intentalo en unos minutos'
        })
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
