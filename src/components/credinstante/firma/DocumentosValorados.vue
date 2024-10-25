<template>
  <v-container class="d-flex flex-column pt-1">
    <form @submit.prevent="enviarToken">
      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <SharedHeaderWithStepper
            :numberSteps="currentComponent.numberSteps"
            :imgVehiculo="currentComponent.imgProductStep"
          >
            <div class="headerContractDocuments">
              En los siguientes cuadros revisa tus documentos contractuales
            </div>
          </SharedHeaderWithStepper>
          <div class="contentContractDocuments">
            <div class="d-flex flex-wrap justify-center mb-5">
              <div v-for="(item, key) in items" :key="key">
                <DocumentoFirmar
                  :item="item"
                  :maxItems="items.length"
                ></DocumentoFirmar>
              </div>
            </div>
            <div v-if="!isSelectALL">
              <v-checkbox
                v-model="datos.terminosCondiciones"
                type="checkbox"
                :color="color"
              >
                <template slot="label">
                  <p class="contentContractDocuments__term mb-0">
                    ¡Visualiza los contractuales y procede a firmarlos de forma
                    inmediata!
                  </p>
                </template>
              </v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <SharedButton
            text="Firmar"
            type="submit"
            :buttonOrange="true"
            :totalWidth="50"
            :loading="loading"
          />
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { async } from 'q'
import DocumentoFirmar from '@/components/credinstante/firma/DocumentoFirmar'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import SharedButton from '@/components/shared/SharedButton'
import { sendToken, validateToken } from '@/api/authentication'
import { getNameUsers } from '@/api/user'
import ModalAlert from '@/components/modals/ModalAlert'
import { codPage } from '@/enums/credinstante-enums';
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    DocumentoFirmar,
    ModalAlert,
    SharedHeaderWithStepper,
    SharedButton,
  },
  props: ['color', 'documentos', 'currentComponent'],
  mounted() {
    if (
      this.datos.codigoProducto == 17 ||
      this.datos.codigoProducto == 18 ||
      this.datos.codigoProducto == 26 ||
      this.datos.codigoProducto == 27
    ) {
      this.items = [
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
          doc: 'getcarta_inspos_ws',
          title: 'CartaInstruccionIrrevocable',
          title2: 'Carta de Instrucción Irrevocable'
        },
        {
          id: 6,
          doc: 'getcarta_fr_pos_ws',
          title: 'AcuerdoCanalizacionPagos',
          title2: 'Acuerdo de Canalización de Pagos'
        }
      ]
    } else {
      this.items = [
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
        }
      ]
    }
  },
  data() {
    return {
      tipoDesembolso: null,
      loading: false,
      items: [],
      dialog: false,
      FirmaReady: 1,
      tokenenviado: null,
      telefono: null,
      enviarTokenDialog: false,
      estadoModalFinal: false
    }
  },
  computed: {
    ...mapState('credinstante', [
      'datos',
      'terms',
      'codProspecto',
      'resConfirmarDatos'
    ]),
    ...mapState('users', ['promotor']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    },
    isSelectALL() {
      if (
        this.isCheckValorados.length === this.items.length &&
        this.items.length !== 0
      ) {
        this.$store.commit('credinstante/UPDATE_DATOS', {
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
      if (val) {
        this.$store.commit('credinstante/UPDATE_DATOS', {
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
  methods: {
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
    enviarToken() {
      this.loading = true
      const dataToken = {
        documento: this.datos.documento, //this.datos.documento,
        telefono: this.datos.telefono //this.datos.telefono
      }
      sendToken(this.$axios, dataToken)
        .then((res) => {
          if (res.codRes == '00') {
            console.log('Se envió correctamente el token')
            this.$store.commit('credinstante/SET_STEP', codPage.ELECTRONIC_SIGNATURE);
          } else if (res.codRes == '99') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal:
                'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.',
              maxWidth: 350,
              estadoModal: true,
              isReset: true
            })
          } else {
            throw new Error(
              'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.'
            )
          }
        })
        .catch((err) => {
          this.enviarTokenDialog = false
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'error',
            tituloModal: '¡Error!',
            msgModal: err.message,
            maxWidth: 350,
            estadoModal: true
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  }
}
</script>

<style scoped>
.headerContractDocuments {
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.1em;
}
.contentContractDocuments {
  margin: 0 22px 30px 22px;
  padding: 20px 10px;
  border-bottom: 1px solid #ff4e00;
  border-left: 1px solid #ff4e00;
  border-right: 1px solid #ff4e00;
  border-radius: 0 0 20px 20px;
}
.contentContractDocuments__term {
  font-size: 0.7em !important;
  line-height: 1.2;
}
</style>
