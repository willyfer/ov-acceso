<template>
  <div
    class="d-flex justify-center align-center container-principal__confirmar"
  >
    <v-form ref="form1" autocomplete="nope" class="from-datos">
      <v-row>
        <v-col
          cols="12"
          md="12"
          lg="12"
          class="d-flex flex-column"
          style="padding: 4px"
        >
          <h2 class="h2-titulo">
            Vamos a confirmar tus datos
            <v-divider></v-divider>
          </h2>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding: 4px">
        <v-col cols="12" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="form.telefono"
            v-validate="'required|numeric|max:9|min:7'"
            data-vv-as="Teléfono"
            :error-messages="errors.collect('form.telefono')"
            label="Teléfono"
            type="tel"
            data-vv-name="form.telefono"
            :color="'#005092'"
            required
            maxlength="9"
            minlength="9"
            :counter="9"
            :messages="[
              'Recuerde que tienes que validar el número de celular que aparece en el registro, sino lo es, coloca el número de celular que estas usando en este momento.',
            ]"
          />
        </v-col>
        <v-col cols="12" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="form.correo"
            data-vv-as="Email"
            label="Email"
            v-validate="'email'"
            data-vv-name="form.correo"
            :color="'#005092'"
            :error-messages="errors.collect('form.correo')"
          />
        </v-col>
      </v-row>
      <h3 class="h3-titulo">Elige tu forma de pago</h3>
      <v-bottom-navigation
        :value="activeBtn"
        grow
        color="#ff7729"
        class="navigation-pagos"
        height="100"
      >
        <v-btn value="1" @click="confirmarDatos" class="btn-pagos">
          <span
            >Entidad <br />
            Bancaria</span
          >
          <v-icon size="45" class="button-desembolso mb-1 btn-pagos-icon"
            >mdi-bank</v-icon
          >
        </v-btn>
      </v-bottom-navigation>
      <div class="class-tyc">
        <v-row>
          <v-col cols="3">
            <v-switch
              v-model="terms"
              style="float: right !important; margin-left: 10px"
              v-validate="'required'"
              required
              value="1"
              :error-messages="errors.collect('terms')"
              data-vv-name="terms"
              data-vv-as="Políticas"
              :color="colorCkeckBox"
            ></v-switch>
          </v-col>
          <v-col cols="9">
            Al continuar acepto la
            <a @click.prevent="openTerms">Política de Privacidad de Datos</a>
          </v-col>
        </v-row>
      </div>
    </v-form>
    <v-dialog v-model="isModalPagoBanco" max-width="400" persistent>
      <FormPagoBanco
        :listaTipoCuenta="listaTipoCuenta"
        :listaTipoEntidad="listaTipoEntidad"
        :loading="loading"
        @confirmPagoBanco="confirmPagoBanco"
        @closePagoBanco="closePagoBanco"
      />
    </v-dialog>
    <v-dialog v-model="isModalTerm" persistent max-width="700">
      <TerminosCondiciones
        :color="color"
        :tituloCabecera="tituloCabeceraT"
        :contenido="contenidoTyC"
        @close="closeTerms"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FormLayout from '@/components/FormLayout'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import { getBancos } from '@/api/catalogue'

export default {
  components: {
    FormLayout,
    FormPagoBanco: () => import('@/components/pagosforms/FormPagoBanco'),
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
  },
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [actionsByCodeMixin],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
    color: { type: String, default: null },
  },
  async mounted() {
    getBancos(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.listaTipoEntidad = res.arrayBancos
        } else if (res.codRes == '99') {
          throw new Error(
            'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.'
          )
        }
      })
      .catch((err) => {
        this.$emit('open-modal-menssage-prospectus', {
          titulo: '¡Lo sentimos!',
          message:
            'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.',
          reset: 'extraefectivo',
        })
      })
  },
  computed: {
    ...mapGetters('users', ['productCode']),
    ...mapGetters('extraefectivo', ['datos', 'estadoProspecto']),
  },
  data() {
    return {
      activeBtn: -1,
      tipoDesembolso: '1',
      colorForm: '#005092',
      colorCkeckBox: '#005092',
      loader: null,
      loading: false,
      listaTipoCuenta: [
        {
          id: 1,
          tipo: 'Cuenta de Ahorros',
        },
        {
          id: 2,
          tipo: 'Cuenta Corriente',
        },
      ],
      listaTipoEntidad: [],
      isModalBim: false,
      isModalPagoBanco: false,
      logoBIM: require('@/assets/img/Bim/bimNavLogo.png'),
      terms: null,
      isModalTerm: false,
      tituloCabeceraT:
        '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyC: '',
      form: {
        telefono: null,
        correo: null,
      },
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    },
  },
  methods: {
    confirmarDatos() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          switch (this.tipoDesembolso) {
            case '1': {
              this.isModalPagoBanco = true
              break
            }
            case '2':
              this.isModalBim = true
              break
            default:
              console.log('Debe elegir su tipo de desembolso')
          }
        }
      })
    },
    async confirmSoloDatos() {
      const DATOS_FORMULARIO = this.obtenerDatosForm(0, null)
      await this.sendDatos(DATOS_FORMULARIO)
    },
    async confirmPagoBanco(payload) {
      const DATOS_FORMULARIO = this.obtenerDatosForm(1, payload)
      await this.sendDatos(DATOS_FORMULARIO)
    },
    async confirmModalBIM(e) {
      const DATOS_FORMULARIO = this.obtenerDatosForm(2, {
        cuentaBIM: this.datos.telefono,
      })
      await this.sendDatos(DATOS_FORMULARIO)
    },
    closePagoBanco() {
      this.isModalPagoBanco = false
    },
    closeModalBIM() {
      this.isModalBim = false
    },
    async sendDatos(payload) {
      console.log("sendDatos: ", payload)
      this.loading = true
      await this.$store.dispatch('extraefectivo/actionCrearExpediente', payload)
      this.analyzeProspectStatus()
      this.loading = false
    },
    obtenerDatosForm(tipoDesembolso, payload) {
      let datosMedioDesembolso = null
      let datosForm = {
        codigoProducto: this.datos.codigoProducto,
        tipoDocumento: this.datos.tipoDocumento == 'D' ? 1 : 1,
        documento: this.datos.documento,
        placa: this.datos.placa,
        canalAtencion: this.datos.canalAtencion,
        origen: this.datos.origen,
        canal: 1, //añadido
        codigoProspecto: this.datos.codigoProspecto,
        codigoEvaluacion: this.datos.codigoEvaluacion,
        estadoProspecto: this.datos.estadoProspecto,
        channel: this.datos.channel,
        terms: true,
        tipoDesembolso: parseInt(this.tipoDesembolso),
        email: this.form.email,
        telefono: this.form.telefono,
      }
      switch (tipoDesembolso) {
        case 1:
          datosMedioDesembolso = {
            tipoCuenta: payload.tipoCuenta,
            entidadBancariaOrigen: payload.entidadBancariaOrigen,
            entidadBancariaDestino: payload.entidadBancariaDestino,
            numeroCuentaBancaria: payload.numeroCuentaBancaria,
            numeroCuentaInterbancaria: payload.numeroCuentaInterbancaria,
            sede: null,
          }
          break

        case 2:
          datosMedioDesembolso = {
            cuentaBIM: payload.cuentaBIM,
            tipoCuenta: null,
            entidadBancaria: null,
            numeroCuentaBancaria: null,
            numeroCuentaInterbancaria: null,
            sede: null,
          }
          break

        default:
          datosMedioDesembolso = {
            tipoCuenta: null,
            entidadBancaria: null,
            numeroCuentaBancaria: null,
            numeroCuentaInterbancaria: null,
            sede: null,
          }
      }
      datosForm = {
        ...datosForm,
        ...datosMedioDesembolso,
      }
      return datosForm
    },
    openTerms() {
      this.isModalTerm = true
    },
    closeTerms() {
      this.isModalTerm = false
    },
  },
}
</script>
<style scoped>
.navigation-pagos {
  box-shadow: none !important;
  background-color: transparent !important;
  margin-bottom: 20px;
}
.container-principal__confirmar {
  max-width: 500px !important;
  min-width: 250px !important;
  margin: 20px 25px;
}
.form-datos {
  padding: 30px;
  border-radius: 10px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.class-tyc {
  color: #005092;
}
.h2-titulo {
  text-align: left !important;
  font-size: 26px !important;
  margin-bottom: 10px;
  font-weight: bold;
  color: #005092;
}
.h3-titulo {
  text-align: left !important;
  font-size: 20px !important;
  margin-bottom: 10px;
  font-weight: 10;
  color: #005092;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.label-form {
  font-size: 15px;
  font-weight: bold;
}
.radio-BIM {
  display: flex;
  align-items: center;
}
.span-bim {
  font-size: 13px;
}
@media screen and (min-width: 768px) {
  .tipos-pagos {
    display: flex;
    justify-content: space-around;
  }
}
@media (max-width: 375px) {
  .container-principal__confirmar {
    padding: 0 !important;
  }
  #ldForm {
    padding: 0 !important;
  }
}
</style>
