<template>
  <v-container class="d-flex flex-column pt-1">
    <form @submit.prevent="validarToken">
      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <SharedHeaderWithStepper
            :numberSteps="currentComponent.numberSteps"
            :imgVehiculo="currentComponent.imgProductStep"
          >
            <div class="headerElectronicSignature">
              <p class="mb-0">
                Por último, enviaremos por mensaje de texto (SMS) un código de 6
                dígitos a tu celular
              </p>
              <p class="headerElectronicSignature__number mb-0">
                {{ datos.telefono }}
              </p>
            </div>
          </SharedHeaderWithStepper>
          <div class="contentElectronicSignature">
            <div class="contentElectronicSignature__token">
              <label
                for="inputToken"
                class="contentElectronicSignature__text mb-1"
                >Ingresa el código aquí</label
              >
              <v-text-field
                v-model="tokenenviado"
                v-validate="'required|max:6|min:6|numeric'"
                data-vv-name="token"
                :error-messages="errors.collect('token')"
                maxlength="6"
                minlength="6"
                :counter="6"
                color="#005092"
                class="secondary--text"
                placeholder
                hint="Te enviamos un código  vía SMS"
                @keypress="isNumber"
              ></v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <SharedButton
            text="Firmar documentos"
            :buttonOrange="true"
            :totalWidth="80"
            type="submit"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" class="text-center">
          <SharedButton
            text="Cancelar"
            :buttonSilver="true"
            :totalWidth="80"
            @click="cancelSignElectronic"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <SharedContentInfo typeInfo="sms">
            <div v-show="!loading2">
              Si no recibiste un mensaje de texto (SMS), dale
              <span class="text-info" @click="reSignElectronic"
                >click aquí</span
              >
              para volver a recibirlo.
            </div>
            <div v-show="loading2">
              Si no recibiste un mensaje de texto (SMS), dale
              <span class="text-info">enviando </span>
              <img class="imgLoading" width="10" src="@/assets/img/firma/loading.gif" />
              para volver a recibirlo.
            </div>
          </SharedContentInfo>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import SharedButton from '@/components/shared/SharedButton'
import SharedContentInfo from '@/components/shared/SharedContentInfo'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import { sendToken, validateToken } from '@/api/authentication'
import { codPage } from '@/enums/credinstante-enums';

export default {
  name: 'ElectronicSignature',
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [actionsByCodeMixin],
  components: {
    SharedHeaderWithStepper,
    SharedButton,
    SharedContentInfo,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('credinstante', [
      'datos',
      'terms',
      'codProspecto',
      'resConfirmarDatos'
    ]),
  },
  data() {
    return {
      tokenenviado: null,
      loading: false,
      loading2: false,
      enviarTokenDialog: false,
    }
  },
  methods: {
    cancelSignElectronic() {      
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
    async reSignElectronic() {
      try {
      this.loading2 = true
      const dataToken = {
        documento: this.datos.documento, //this.datos.documento,
        telefono: this.datos.telefono //this.datos.telefono
      }
      sendToken(this.$axios, dataToken)
        .then((res) => {
          if (res.codRes == '00') {
            console.log('Se envió correctamente el token')
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
          this.loading2 = false
        })
      } catch (error) {
        this.$showError(error);
      }
    },
    validarToken() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          const validarTokenGenerarContractuales = {
            token: this.tokenenviado,
            apellidoPaterno: this.datos.apellidoPaterno,
            apellidoMaterno: this.datos.apellidoMaterno,
            nombres: this.datos.nombres,
            codigoExpediente: this.datos.codigoExpediente,
            codigoCredito: this.datos.codigoCredito,
            telefono: this.datos.telefono,
            email: this.datos.email,
            placa: this.datos.placa,
            contratos: this.datos.isCheckValorados,
            documento: this.datos.documento,
            codigoProducto: this.datos.codigoProducto,
            codigoProspecto: this.datos.codigoProspecto,
            estadoProspecto: this.datos.estadoProspecto,
            importeFinanciar: this.datos.importeFinanciar,
            tipoDesembolso: this.datos.tipoDesembolso //añadido por dq
          }
          this.$store
            .dispatch(
              'credinstante/validarGenerarContractuales',
              JSON.stringify(validarTokenGenerarContractuales)
            )
            .then((res) => {
              if (res.codRes == '00') {
                this.$fb.track('Activado')
                this.tipoDesembolso = this.datos.tipoDesembolso
                this.$store.commit('credinstante/SET_STEP', codPage.FELICITACION_PAGE);
              } else if (res.codRes == '01') {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: 'Token Incorrecto!',
                  msgModal: 'Por favor vuelva a intentarlo',
                  maxWidth: 350,
                  estadoModal: true
                })
              } else if (res.codRes == '99') {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: '¡Lo sentimos!',
                  msgModal:
                    'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.',
                  maxWidth: 350,
                  estadoModal: true,
                  isReset: true
                })
                setTimeout(() => {
                  this.$store.commit('credinstante/SET_STEP', 1)
                }, 4000)
              } else {
                throw new Error(
                  'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.'
                )
              }
            })
            .catch((err) => {
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'error',
                tituloModal: '¡Error!',
                msgModal: err.message,
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
            })
            .finally(() => {
              this.loading = false
              this.enviarTokenDialog = false
              this.tokenenviado = null
            })
        }
      })
    }
  },
}
</script>

<style scoped>
.headerElectronicSignature {
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.1em;
}
.contentElectronicSignature {
  margin: 0 22px 20px 22px;
  padding: 20px 10px;
  border-bottom: 1px solid #ff4e00;
  border-left: 1px solid #ff4e00;
  border-right: 1px solid #ff4e00;
  border-radius: 0 0 20px 20px;
}
.headerElectronicSignature__number {
  margin: 10px auto;
  width: 170px;
  border-radius: 10px;
  background-color: white;
  color: #ff4e00;
}
.contentElectronicSignature__token {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.contentElectronicSignature__text {
  font-size: 0.8em;
  color: #ff4e00;
}
.contentElectronicSignature__input input {
  margin-top: 5px;
  border: 1px solid #ff4e00;
  border-radius: 20px;
}
.text-info {
  color: #0a4e88;
}
.imgLoading {
  position: relative;
  top: 2px;
}
</style>