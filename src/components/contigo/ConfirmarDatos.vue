<template>
  <div class="container-form-datos pa-3">
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
            Vamos a confirmar tus datos {{ codigoEvaluacion }}
            <v-divider></v-divider>
          </h2>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding: 4px">
        <v-col cols="12" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="resElegirOferta.telefono"
            v-validate="'required|numeric|max:9|min:7'"
            data-vv-as="Teléfono"
            :error-messages="errors.collect('resElegirOferta.telefono')"
            label="Teléfono"
            type="tel"
            data-vv-name="resElegirOferta.telefono"
            :color="'#005092'"
            required
            maxlength="9"
            minlength="9"
            :counter="9"
          />
        </v-col>
        <v-col cols="12" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="resElegirOferta.email"
            data-vv-as="Email"
            label="Email"
            v-validate="'email'"
            data-vv-name="resElegirOferta.email"
            :color="'#005092'"
            :error-messages="errors.collect('resElegirOferta.email')"
          />
        </v-col>
      </v-row>
      <h3 class="h3-titulo">Elige tu forma de pago</h3>
      <v-bottom-navigation
        :value="tipoDesembolso"
        grow
        color="#ff7729"
        class="navigation-pagos"
        height="100"
      >
        <v-btn @click="clickTransferencia(1)" class="btn-pagos">
          <span
            >Entidad <br />
            Bancaria</span
          >
          <v-icon size="45" class="button-desembolso mb-1 btn-pagos-icon"
            >mdi-bank</v-icon
          >
        </v-btn>
      </v-bottom-navigation>
    </v-form>
    <v-dialog v-model="isModalPagoBanco" max-width="500" persistent>
      <FormPagoBanco
        :listaTipoCuenta="listaTipoCuenta"
        :listaTipoEntidad="listaTipoEntidad"
        :loading="loading"
        @confirmPagoBanco="confirmPagoBanco"
        @closePagoBanco="closePagoBanco"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { getBancos } from '@/api/catalogue'

export default {
  components: {
    FormPagoBanco: () => import('@/components/pagosforms/FormPagoBanco'),
  },
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [mixins],
  props: ['color'],
  mounted() {
    getBancos(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.listaTipoEntidad = res.arrayBancos
        } else if (res.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
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
  },
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('contigo', [
      'datos',
      'codigoEvaluacion',
      'body_valida',
      'resElegirOferta',
      'ofertas',
    ]),
  },
  data() {
    return {
      tipoDesembolso: 1,
      colorForm: '#005092',
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
      selectActividadeconomica: [],
      listaActividadeconomica: [],
      selectOcupacion: [],
      listaMarca: [],
      listaModel: [],
      isDisabledModelo: false,
      isModalBim: false,
      isModalPagoBanco: false,
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
    async confirmPagoBanco(payload) {
      const DATOS_FORMULARIO = this.obtenerDatosForm(
        this.tipoDesembolso,
        payload
      )
      await this.sendDatos(DATOS_FORMULARIO)
    },
    closePagoBanco() {
      this.isModalPagoBanco = false
    },
    clickTransferencia(value) {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.tipoDesembolso = value
          switch (this.tipoDesembolso) {
            case 1: {
              this.isModalPagoBanco = true
              break
            }
            default:
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Estimado Cliente!',
                msgModal: 'Debe elegir su tipo de desembolso',
                maxWidth: 350,
                estadoModal: true,
              })
          }
        }
      })
    },
    async sendDatos(payload) {
      this.loading = true
      this.$store
        .dispatch('contigo/confirmarDatos', payload)
        .then((res) => {
          if (res.codRes == '00') {
            this.$store.commit('contigo/UPDATE_DATOS', this.datos.selectOficina)
            this.$store.commit('contigo/SET_CONFIR_DATOS', res)
            console.log('respuesta de store ', res)
            this.$store.commit('contigo/SET_STEP', 5)
          } else if (res.codRes == '99') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal:
                'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
              maxWidth: 350,
              estadoModal: true,
            })
          } else {
            throw new Error(
              'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
            )
          }
        })
        .catch((err) => {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'error',
            tituloModal: '¡Error!',
            msgModal:
              'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
            maxWidth: 350,
            estadoModal: true,
          })
        })
        .finally(() => {
          this.loading = false
        })
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
        codigoProspecto: this.resElegirOferta.codigoProspecto, //this.datos.codigoProspecto,
        codigoEvaluacion: this.resElegirOferta.codigoEvaluacion,
        estadoProspecto: this.resElegirOferta.estadoProspecto, //this.datos.estadoProspecto,
        channel: this.datos.channel,
        terms: true,
        ubigeo: this.ubigeo,
        direccion: this.direccion,
        sectorEconomico: this.sectorEconomico,
        actividadEconomica: this.actividadEconomica,
        profesion: this.profesion,
        marca: this.marca,
        modelo: this.modelo,
        tipoDesembolso: parseInt(this.tipoDesembolso),
        email: this.resElegirOferta.email,
        telefono: this.resElegirOferta.telefono,
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
  },
}
</script>
<style>
.container {
  width: 30% !important;
  min-width: 250px !important;
}
.from-datos {
  border-radius: 10px;
  font-family: 'Exo+2', sans-serif !important;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.class-tyc {
  color: #005092;
}
.class-tyc p {
  font-size: 15px;
}
.slot-tyc {
  color: #005092;
}
.row-btn {
  padding-left: 20% !important;
  padding-right: 20% !important;
}
.btn-pagos-icon {
  border: 1.5px solid #aaaaaa !important;
  border-radius: 100% !important;
  padding: 5px !important;
}
.btn-pagos span {
  font-size: 12px;
}
.btn-pagos img {
  width: 80px !important;
}
.navigation-pagos {
  box-shadow: none !important;
  background-color: transparent !important;
  margin-bottom: 20px;
}
.h2-titulo {
  text-align: left !important;
  font-size: 26px !important;
  margin-bottom: 10px;
  font-weight: 10;
  color: #005092;
}
.h3-titulo {
  text-align: left !important;
  font-size: 20px !important;
  margin-bottom: 10px;
  font-weight: 10;
  color: #005092;
}
.input-slot {
  padding-top: 0px;
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
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 16px !important;
}
</style>
