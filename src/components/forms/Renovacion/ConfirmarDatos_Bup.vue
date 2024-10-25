<template>
  <div class="pa-3">
    <v-form ref="form1" autocomplete="nope" class="from-datos">
      <v-row>
        <v-col cols="12" md="12" lg="12" class="d-flex flex-column" style="padding:4px">
          <h2 class="h2-titulo">
            Vamos a confirmar tus datos {{codigoEvaluacion}}
            <v-divider></v-divider>
          </h2>
        </v-col>
      </v-row>
      <v-row justify="center" style="padding:4px">
        <v-col cols="12" style="padding:4px; ">
          <v-text-field
            outlined
            dense
            v-model="resElegirOferta.telefono"
            v-validate="'required|numeric|max:9|min:7'"
            data-vv-as="Telf."
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
        <v-col cols="12" style="padding:4px">
          <v-text-field
            outlined
            dense
            v-model="resElegirOferta.email"
            label="Email"
            data-vv-name="resElegirOferta.email"
            :color="'#005092'"

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
        <v-btn @click="clickEfectivo" class="btn-pagos">
          <img :src="require('@/assets/boton-efectivo.png')" alt />
        </v-btn>
        <v-btn class="btn-pagos">
          <img :src="require('@/assets/boton-Tarjeta.png')" alt />
        </v-btn>
        <v-btn class="btn-pagos">
          <img :src="require('@/assets/boton-transferencia.png')" alt />
        </v-btn>
      </v-bottom-navigation>
      <div class="class-tyc">
        <v-row>
          <v-col cols="3">
            <!--v-checkbox
              v-model="tyc"
              v-validate="'required'"
              required
              value="1"
              :error-messages="errors.collect('tyc')"
              data-vv-name="tyc"
              data-vv-as="Términos y condiciones"
              type="checkbox"
              :color="colorCkeckBox"
            >
              Al continuar acepto la
            </v-checkbox-->
            <v-switch
            v-model="tyc"
            style="float: right !important; margin-left:10px"
            v-validate="'required'"
              required
              value="1"
              :error-messages="errors.collect('tyc')"
              data-vv-name="tyc"
              data-vv-as="Políticas"
              :color="colorCkeckBox"
              ></v-switch>

          </v-col>
          <v-col cols="9" >
             Al continuar acepto la
              <a @click.prevent="openTerms">Política de Privacidad de Datos</a>

          </v-col>
        </v-row>




      </div>
    </v-form>
    <ModalPagos
      :isModalPagos="isModalPagos"
      :formaPago="payloadModal.formaPago"
      :speech="payloadModal.speech"
      :loading="loading"
      @modalpagosclose="modalPagosClose"
      @modalpagosconfirm="modalPagosConfirm"
    >
      <template slot="inputs-modal">
        <template v-if="tipoPago == -1"></template>
        <template v-else-if="tipoPago === 3 || tipoPago === 2">
          <v-select
            class="input-slot"
            v-model="datos.selectOficina"
            v-validate="'required'"
            :items="oficinas"
            :hint="`Referencia: ${datos.selectOficina ? datos.selectOficina.referencia : ''}`"
            data-vv-as="Oficinas"
            return-object
            item-text="nombre"
            item-value="id"
            :error-messages="errors.collect('selectOficina')"
            label="Nuestras Oficinas"
            data-vv-name="selectOficina"
            required
            :color="color"
          />
        </template>
        <template v-else-if="tipoPago === 1">
          <v-select
            class="input-slot"
            v-model="selectCuenta"
            v-validate="'required'"
            :items="cuentasBancos"
            data-vv-as="Cuentas Bancarias"
            item-text="cuentasBancos"
            item-value="id"
            :error-messages="errors.collect('cuentasBancos')"
            label="Cuentas Bancarias"
            data-vv-name="cuentasBancos"
            required
            :color="color"
          />
          <v-text-field
            v-model="cuentaBanco"
            v-validate="'required|max:20|min:20|numeric'"
            data-vv-name="cuentaBanco"
            :error-messages="errors.collect('CCI')"
            maxlength="20"
            minlength="20"
            :counter="20"
            color="express2"
            class="express2-text"
            label="CCI"
            placeholder
            required
            @keypress="isNumber"
          ></v-text-field>
        </template>
      </template>
    </ModalPagos>
    <v-dialog v-model="terms" persistent max-width="700">
      <TerminosCondiciones :color="color" />
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { getOficinas } from '@/api/catalogue'
import ModalPagos from '@/components/modals/ModalPagos'

export default {
  components: {
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones'),
    ModalPagos
  },
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: ['color'],
  mounted() {
    getOficinas(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.oficinas = res.lugares
        } else if( res.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener las oficinas, por favor inténtelo más tarde.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true
          })
          setTimeout( () => {
            this.$store.commit('ui/UPDATE_STEP', 1)
          }, 4000)
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
  },
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', [
      'datos',
      'codigoEvaluacion',
      'body_valida',
      'resElegirOferta',
      'ofertas'
    ]),
    ...mapState('default', ['terms'])
  },
  data() {
    return {
      loader: null,
      loading: false,
      cuentasBancos: [],
      oficinas: [],
      activeBtn: -1,
      tyc: '1',
      colorCkeckBox: '#005092',
      isModalPagos: false,
      tipoPago: -1,
      payloadModal: {
        formaPago: null,
        speech: null
      }
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    }
  },
  methods: {
    clickEfectivo() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.payloadModal = {
            formaPago: 'Efectivo',
            speech: 'Selecciona la oficina donde recogerás tu desembolso.'
          }
          this.tipoPago = 3
          this.isModalPagos = true
        }
      })
    },
    clickTarjeta() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.payloadModal = {
            formaPago: 'Tarjeta',
            speech: `Para poder recoger la tarjeta favor seleccione una de nuestras oficinas:
              <br />Tiempo de recarga a partir del recojo de la tarjeta :
              <b>30 minutos</b>`
          }
          this.tipoPago = 2
          this.isModalPagos = true
        }
      })
    },
    clickTransferencia() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.payloadModal = {
            formaPago: 'Transferencia',
            speech: ` Favor complete los siguientes datos para poder realizar la transferencia a tu cuenta bancaria:
            <br />Tiempo aproximado de desembolso:
            <b>48 a 72 horas.</b>`
          }
          this.tipoPago = 1
          this.isModalPagos = true
        }
      })
    },
    openTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    modalPagosClose() {
      this.isModalPagos = false
      ;(this.tipoPago = -1),
        (this.payloadModal = {
          formaPago: null,
          speech: null
        })
    },
    modalPagosConfirm() {
      try {
        this.$validator.validateAll().then(async (result) => {
          if (this.tyc != 1) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal:
                'Debe aceptar la Política de Privacidad de Datos para continuar',
              maxWidth: 350,
              estadoModal: true
            })
            this.isModalPagos = false
          } else {
            if (result) {
              if (this.tyc == 1) {
                this.loading = true
                const datosForm = {
                  codigoProducto: this.resElegirOferta.codigoProducto,
                  tipoDocumento: this.resElegirOferta.tipoDocumento,
                  documento: this.resElegirOferta.documento,
                  placa: this.resElegirOferta.placa,
                  canalAtencion: this.resElegirOferta.canalAtencion,
                  origen: this.resElegirOferta.origen,
                  canal: 1, //añadido
                  codigoProspecto: this.resElegirOferta.codigoProspecto,
                  codigoEvaluacion: this.resElegirOferta.codigoEvaluacion,
                  estadoProspecto: this.resElegirOferta.estadoProspecto,
                  channel: this.resElegirOferta.channel,
                  tipoDesembolso: this.tipoPago, // añadido
                  terms: true,
                  telefono: this.resElegirOferta.telefono, //this.resElegirOferta.telefono,
                  email: this.resElegirOferta.email, //this.resElegirOferta.email,
                  sede: this.datos.selectOficina.id
                }
                this.$store
                  .dispatch('express/confirmarDatos', JSON.stringify(datosForm))
                  .then((res) => {
                    if (res.codRes == '00') {
                      this.$store.commit(
                        'express/UPDATE_DATOS',
                        this.datos.selectOficina
                      )
                      this.$store.commit('express/SET_CONFIR_DATOS', res)
                      this.$store.commit('ui/UPDATE_STEP', 5)

                    } else if( res.codRes == '99') {
                      this.$store.commit('ui/SET_OPENDIALOGALERT', {
                        imgModal: 'warning',
                        tituloModal: '¡Lo sentimos!',
                        msgModal: 'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
                        maxWidth: 350,
                        estadoModal: true,
                        isReset: true
                      })
                      setTimeout( () => {
                        this.$store.commit('ui/UPDATE_STEP', 1)
                      }, 4000)

                    }else{
                      throw new Error(
                        'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
                      )
                    }
                  })
                  .catch((err) => {
                    throw new Error(err.message)
                  })
                  .finally(() => {
                    this.loading = false
                  })
              }
            }
          }
        })
      } catch (err) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal: err.message,
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
      }
    }
  }
}
</script>
<style>
.container {
  width: 35% !important;
}
.from-datos {
  padding: 40px;
  /* border: 1px solid #ff7729 !important; */
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
.btn-pagos span {
  font-size: 14px;
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
