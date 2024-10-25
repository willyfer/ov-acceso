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
                  >FIRMAR DOCUMENTOS</v-btn
                >
              </v-col>
              <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
                <v-btn
                  class="ld-btn-secondary"
                  :loading="loading"
                  @click.prevent="resend"
                  >Reenviar</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
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
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
export default {
  name: 'ElectronicSignature',
  props: ['color'],
  components: {
    LoadingComponent,
  },
  computed: {
    ...mapGetters('extraefectivo', ['datos']),
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
    }
  },
  methods: {
    async enviarToken() {
      try {
        this.loading = true
        const dataToken = {
          documento: this.datos.documento,
          telefono: this.datos.telefono,
        }
        await this.$store.dispatch('extraefectivo/actionSendToken', dataToken)
        this.loading = false
      } catch (error) {
        this.$emit('open-modal-menssage-prospectus', {
          titulo: '¡Lo sentimos!',
          message:
            'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.',
        })
      }
    },
    validarToken() {
      try {
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
              tipoDesembolso: this.datos.tipoDesembolso,// tipo de desembolso
            }
            const responseActionGenerarContractuales = await this.$store.dispatch(
              'extraefectivo/actionGenerarContractuales',
              validarTokenGenerarContractuales
            )
            
            if (responseActionGenerarContractuales.codRes == '00') {
              this.$fb.track('Activado')
              this.tipoDesembolso = this.datos.tipoDesembolso
              this.estadoModalFinal = true
              this.enviarTokenDialog = false
            } else {
              this.$emit('open-modal-menssage-prospectus', {
                titulo: 'Token Incorrecto!',
                message: 'Por favor vuelva a intentarlo',
              })
            }
            this.loading = false
            this.tokenenviado = null
          }
        })
      } catch (error) {
        this.$emit('open-modal-menssage-prospectus', {
          titulo: '¡Lo sentimos!',
          message:
            'En estos momentos no podemos generar tus contratos, por favor inténtalo en unos minutos.',
        })
      }
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
</style>