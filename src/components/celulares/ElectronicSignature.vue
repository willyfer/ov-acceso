<template>
  <div>
    <v-dialog
      v-model="enviarTokenDialog"
      persistent
      max-width="500"
      height="auto"
    >
      <form @submit.prevent="validarToken">
        <v-card class="ld-modal">
          <v-card-title
            style="word-break: break-word"
            class="secondary--text headlineclass text-center font-weight-bold"
          >
            Ingresa el código de 6 dígitos que enviaremos a tu celular
            {{ datos.telefono }}
          </v-card-title>
          <v-card-text>
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
          </v-card-text>
          <v-card-actions>
            <v-row no-gutters>
              <v-col cols="12" order-md="2" md="7" class="text-center pa-1">
                <v-btn
                  type="submit"
                  class="ld-btn"
                  :color="color"
                  :loading="loading"
                  :disabled="loadingLlamada"
                  >FIRMAR DOCUMENTOS</v-btn
                >
              </v-col>
              <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
                <v-btn
                  class="ld-btn-secondary"
                  :loading="loading"
                  :disabled="loadingLlamada"
                  @click.prevent="resend"
                  >Reenviar</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <!-- <div class="text-center pa-1 mt-2">
            <v-btn
              class="btn-llamar"
              text
              :loading="loadingLlamada"
              @click="llamadaToken"
            >
              No recibo el código,<br />
              deseo que me llamen
            </v-btn>
          </div> -->
        </v-card>
      </form>
    </v-dialog>
    <v-dialog v-model="estadoModalFinal" persistent :max-width="'350'">
      <v-card>
        <v-card-title class="titulo-modalFinal__banco pb-2">
          <p>¡Felicidades!</p>
        </v-card-title>
        <v-card-text class="text-modalFinal__banco pt-2">
          <div class="text-parrafo__primero">
            En 72 horas hábiles como máximo realizaremos la transferencia de tu
            préstamo en la cuenta bancaria registrada.
          </div>
          <div class="text-parrafo__segundo">
            Hemos enviado los documentos contractuales a los medios de contacto
            que registraste.
          </div>
          <div
            v-if="
              datos.codigoProducto == 17 ||
              datos.codigoProducto == 18 ||
              datos.codigoProducto == 26 ||
              datos.codigoProducto == 27
            "
            class="text-parrafo__tercero"
          >
            Una vez que hayas recibido el dinero en tu cuenta podrás acercarte a
            nuestra sede de Jesús María, donde te entregaremos el POS y stickers
            para pegar en el auto.<br />
            Dirección: Av. 28 de Julio 338, Jesús María (referencia: a 3 cuadras
            del Hospital del Niño).<br />
            Horario de atención: 9:00 am a 5:30 pm<br />
            Debes acercarte al módulo de Acceso con Niubiz. Es obligatorio ir a
            recogerlo.
          </div>
        </v-card-text>
        <v-card-actions class="d-flex flex-row justify-center">
          <v-btn color="#005092" class="white--text" @click="closeModal2"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendToken } from '@/api/authentication'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
export default {
  name: 'ElectronicSignature',
  props: ['color'],
  components: {
    LoadingComponent,
  },
  computed: {
    ...mapGetters('express', ['datos', 'resConfirmarDatos']),
  },
  async mounted() {
    await this.enviarToken()
  },
  data() {
    return {
      tokenenviado: null,
      loading: false,
      enviarTokenDialog: true,
      estadoModalFinal: false,
      loadingLlamada: false,
    }
  },
  methods: {
    async enviarToken() {
      try {
        this.loading = true
        const dataToken = {
          documento: this.resConfirmarDatos.documento, //this.datos.documento,
          telefono: this.resConfirmarDatos.telefono, //this.datos.telefono
        }
        const responseSendToken = await sendToken(this.$axios, dataToken)
        if (responseSendToken.codRes !== '00') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        }
        this.loading = false
      } catch (error) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: '¡Lo sentimos!',
          msgModal:
            'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
    validarToken() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          const validarTokenGenerarContractuales = {
            token: this.tokenenviado,
            apellidoPaterno: this.resConfirmarDatos.apellidoPaterno,
            apellidoMaterno: this.resConfirmarDatos.apellidoMaterno,
            nombres: this.resConfirmarDatos.nombres,
            codigoExpediente: this.resConfirmarDatos.codigoExpediente,
            codigoCredito: this.resConfirmarDatos.codigoCredito,
            telefono: this.resConfirmarDatos.telefono,
            email: this.resConfirmarDatos.email,
            placa: this.resConfirmarDatos.placa,
            contratos: this.datos.isCheckValorados,
            documento: this.resConfirmarDatos.documento,
            codigoProducto: this.resConfirmarDatos.codigoProducto,
            codigoProspecto: this.resConfirmarDatos.codigoProspecto,
            estadoProspecto: this.resConfirmarDatos.estadoProspecto,
            importeFinanciar: this.resConfirmarDatos.importeFinanciar,
            tipoDesembolso: this.resConfirmarDatos.tipoDesembolso, //añadido por dq
          }
          /* console.log("validarTokenGenerarContractuales: ", validarTokenGenerarContractuales) */
          this.$store
            .dispatch(
              'express/validarGenerarContractuales',
              JSON.stringify(validarTokenGenerarContractuales)
            )
            .then((res) => {
              if (res.codRes == '00') {
                this.$fb.track('Activado')
                this.tipoDesembolso = this.resConfirmarDatos.tipoDesembolso
                this.estadoModalFinal = true
                this.enviarTokenDialog = false
              } else if (res.codRes == '01') {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: 'Token Incorrecto!',
                  msgModal: 'Por favor vuelva a intentarlo',
                  maxWidth: 350,
                  estadoModal: true,
                })
              } else if (res.codRes == '99') {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: '¡Lo sentimos!',
                  msgModal:
                    'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.',
                  maxWidth: 350,
                  estadoModal: true,
                  isReset: true,
                })
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
                isReset: true,
              })
            })
            .finally(() => {
              this.loading = false
              this.tokenenviado = null
            })
        }
      })
    },
    async llamadaToken() {
      const dataToken = {
        grupo: 'CREDINSTANTE',
        documento: this.datos.documento, //this.datos.documento,
        celular: this.datos.telefono, //this.datos.celular
        tipo: 3,
      }
      this.loadingLlamada = true
      await this.$store.dispatch('express/actionLlamadaToken', dataToken)
      this.loadingLlamada = false
    },
    async resend() {
      await this.enviarToken()
    },
    closeModal2() {
      this.estadoModalFinal = false
      this.$router.push('/')
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
  },
}
</script>

<style scoped>
.titulo-modalFinal__banco {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.titulo-modalFinal__banco p {
  margin-bottom: 0;
  width: 100%;
  text-align: center;
  border: 1.5px solid #005092;
  border-radius: 20px;
  font-weight: bold;
  color: #ff7729;
}
.text-parrafo__primero {
  padding: 20px 5px;
  background-color: #e3e3e3;
  color: #005092;
  border-radius: 15px;
  text-align: center;
}
.text-parrafo__segundo {
  margin: 15px 0;
  text-align: center;
}
.btn-llamar {
  color: #ff7729 !important;
  font-weight: bold;
  text-decoration: underline !important;
}
</style>