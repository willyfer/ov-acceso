<template>
  <div class="container-form-datos pa-3">
    <v-form ref="form1" autocomplete="nope" class="from-datos">
      <v-row>
        <v-col
          cols="12"
          md="12"
          lg="12"
          class="d-flex flex-column"
          style="padding:4px"
        >
          <h2 class="h2-titulo">
            Vamos a confirmar tus datos {{ codigoEvaluacion }}
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
        <v-col cols="12" style="padding:4px">
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
        :value="activeBtn"
        grow
        color="#ff7729"
        class="navigation-pagos"
        height="100"
      >
        <!-- <v-btn @click="clickTransferencia" class="btn-pagos">
          <img :src="require('@/assets/boton-efectivo.png')" alt />
        </v-btn> -->
        <v-btn value="1" @click="clickTransferencia" class="btn-pagos">
          <span
            >Entidad <br />
            Bancaria</span
          >
          <v-icon size="45" class="button-desembolso mb-1 btn-pagos-icon"
            >mdi-bank</v-icon
          >
        </v-btn>
        <!--v-btn class="btn-pagos">
          <img :src="require('@/assets/boton-Tarjeta.png')" alt />
        </v-btn>
        <v-btn class="btn-pagos">
          <img :src="require('@/assets/boton-transferencia.png')" alt />
        </v-btn-->
      </v-bottom-navigation>
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
        <form>
          <template v-if="tipoPago == -1"></template>
          <template v-else-if="tipoPago === 3 || tipoPago === 2">
            <v-select
              class="input-slot"
              v-model="datos.selectOficina"
              v-validate="'required'"
              :items="oficinas"
              :hint="
                `Referencia: ${
                  datos.selectOficina ? datos.selectOficina.referencia : ''
                }`
              "
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
            <!--v-select
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
          ></v-text-field-->

            <v-row justify="center">
              <!-- añadido dq -->
              <v-card-text
                style="padding-top: 0px !important; margin-top: -40px "
              >
                <v-row>
                  <v-col class="d-flex" cols="12">
                    <v-select
                      :error-messages="errors.collect('cuentasBancos')"
                      v-validate="'required'"
                      class="input-slot"
                      v-model="selectTipoCuenta"
                      :items="listaTipoCuenta"
                      label="Tipo de Cuenta"
                      outlined
                      return-object
                      item-text="tipo"
                      item-value="id"
                      v-on:change="changeTipo(`${selectTipoCuenta.id}`)"
                      required
                      data-vv-name="cuentasBancos"
                      :color="color"
                    ></v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" style="margin-top: -5%">
                    <v-select
                      v-model="selectEntidadBancaria"
                      :items="listaTipoEntidad"
                      label="Entidad Bancaria"
                      outlined
                      return-object
                      item-text="siglas"
                      item-value="codigoBanco"
                      v-on:change="
                        changeBanco(`${selectEntidadBancaria.codigoBanco}`)
                      "
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-text
                style="padding-top: 0px !important; margin-top: -10px "
              >
                <!-- <slot name="inputs-modal"></slot> -->
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      type="tel"
                      label="Cuenta Bancaria"
                      outlined
                      v-model="newCI"
                      v-validate="'required'"
                      @keypress="isNumber"
                      required
                      counter
                      :maxlength="longitudMax"
                      :rules="rulesCI"
                      :error-messages="errors.collect('CI')"
                      onpaste="return true"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="tel"
                      label="Cuenta Interbancaria"
                      outlined
                      v-model="newCCI"
                      v-validate="'required'"
                      required
                      @keypress="isNumber"
                      counter
                      :rules="rulesCCI"
                      :maxlength="longitudMaxInterbancaria"
                      onpaste="return true"
                      :error-messages="errors.collect('CCI')"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <p
                style="margin-top: -10px !important; margin-bottom: -15px !important; font-size: 11px; margin-left: 12px !important; margin-right: 10px !important"
              >
                Registra correctamente tu cuenta bancaria. De lo contrario solo
                tendrás una oportunidad de corregirla, dentro de un plazo de 3
                días desde que se te notifique.
                <br />
                <b style="font-size: 12px !important;">
                  Si usted, no tiene una cuenta bancaria, no se preocupe, abra
                  una en su banco de confianza y regrese a esta pantalla. Lo
                  esperamos.
                </b>
              </p>
              <!-- añadido dq -->
            </v-row>
          </template>
        </form>
      </template>
    </ModalPagos>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { getOficinas, getBancos } from '@/api/catalogue'
import ModalPagos from '@/components/modals/ModalPagos'

export default {
  components: {
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
        } else if (res.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener las oficinas, por favor inténtelo más tarde.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true
          })
          setTimeout(() => {
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
      }),
      getBancos(this.$axios)
        .then((res) => {
          if (res.codRes == '00') {
            this.listaTipoEntidad = res.arrayBancos
            // this.selectEntidadBancaria = this.listaTipoEntidad[0]
            this.cantidadDigitosAhorro = this.listaTipoEntidad[0].cantidadDigitosAhorro
            this.cantidadDigitosCorriente = this.listaTipoEntidad[0].cantidadDigitosCorriente
            this.codigoBanco = this.listaTipoEntidad[0].codigoBanco
          } else if (res.codRes == '99') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal:
                'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.',
              maxWidth: 350,
              estadoModal: true,
              isReset: true
            })
            setTimeout(() => {
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
        }),
      console.log('datos de respuesta ', this.datos)
    console.log('datos de respuesta2 ', this.resElegirOferta)
    console.log('datos de respuesta3 ', this.codigoEvaluacion)
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
      // cuentasBancos: [],

      /** añadido por dq */
      validatedNumCuenta: null,
      //profesion: '',
      //actividadEconomica: '',
      //ubigeo: '',
      isValidaNumCuenta: false,
      selectTipoCuenta: null,
      selectEntidadBancaria: null,
      numeroCuenta: null,
      numeroCuentaConfirm: null,
      tipoDesembolso: 0,
      colorForm: '#005092',
      loader: null,
      loading: false,
      oficinas: [],
      activeBtn: -1,
      tyc: '1',
      colorCkeckBox: '#005092',
      isModalPagos: false,
      tipoPago: -1,
      payloadModal: {
        formaPago: null,
        speech: null
      },
      listaTipoCuenta: [
        {
          id: 1,
          tipo: 'Cuenta de Ahorros'
        },
        {
          id: 2,
          tipo: 'Cuenta Corriente'
        }
      ],
      listaTipoEntidad: [],
      selectActividadeconomica: [],
      listaActividadeconomica: [],
      selectOcupacion: [],
      listaMarca: [],
      listaModel: [],
      selectDepartamento: [
        {
          dep: 'Lima',
          id: '15'
        }
      ],
      departamento: {
        dep: 'Lima',
        id: '15'
      },
      selectProvincia: [
        {
          pro: 'Lima',
          id: '1501'
        },
        {
          pro: 'Callao',
          id: '0701'
        }
      ],
      datosInputCuenta: {
        label: null,
        maxlength: 0,
        minlength: 0,
        counter: 0,
        dataVvAs: null
      },
      datosInputConfirmCuenta: {
        label: null,
        maxlength: 0,
        minlength: 0,
        counter: 0,
        dataVvAs: null
      },
      disabledText: true,

      CI: '',
      newCI: '',
      newConfirmCI: '',
      newConfirmCCI: '',
      newCCI: '',
      disabledNewCI: true,
      disabledNewCCI: false,
      itemsTipoBancario: [
        {
          id: 1,
          text: 'Cuenta Corriente'
        },
        {
          id: 2,
          text: 'Cuenta Ahorros'
        }
      ],
      itemsEntidadBancaria: [],
      selectEntidadBancaria: {},

      cantidadDigitosAhorro: 0,
      cantidadDigitosCorriente: 0,
      entidadBancariaOrigen: 0,
      codigoBanco: 0,
      rules: [
        (v) => v.length <= this.longitudMax || `Cantidad de digitos superada.`,
        (v) => !!v || 'Campo obligatorio.',
        (v) =>
          (v && v.length == this.longitudMax) ||
          'Cantidad de digitos no alcanzada.'
      ],
      rulesCI: [
        (v) => !!v || 'Campo obligatorio',
        (v) =>
          (v && v.length >= this.longitudMax) ||
          (v.length == 10 && this.selectEntidadBancaria.codigoBanco == 3) ||
          'Cantidad de digitos no alcanzada.'
      ],
      rulesCCI: [
        (v) => !!v || 'Campo obligatorio',
        (v) =>
          (v && v.length >= this.longitudMaxInterbancaria) ||
          'Cantidad de digitos no alcanzada'
      ],
      tipoCuentaBancaria: '',
      longitudMax: 0,
      entidadBancariaOrigen: 0,
      longitudMaxInterbancaria: 20

      /** fin de añadido por dq */
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
    changeTipoOnBanco(t) {
      if (t == 2) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        console.log(
          ' cuando se cambia de tipoi de cuenta',
          res.cantidadDigitosCorriente
        )
        if (res.cuentaInterbancaria) {
          this.longitudMax = res.cantidadDigitosCorriente
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          this.longitudMax = res.cantidadDigitosCorriente
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
      } else if (t == 1) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        console.log(
          ' cuando se cambia de tipoi de cuenta',
          res.cantidadDigitosAhorro
        )
        if (res.cuentaInterbancaria) {
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
      }
    },
    changeBanco(v) {
      console.log('cambio de banco ', v)
      const res = this.listaTipoEntidad.find((r) => r.codigoBanco == v) //bisca la entidad en especifica
      if (res) {
        if (res.cuentaInterbancaria) {
          console.log(res.cuentaInterbancaria)
          this.disabledNewCCI = true
          this.disabledNewCI = false
          this.codigoBanco = res.codigoBanco
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          console.log(
            ' cuando se cambia de entidadBancariaOrigen',
            this.entidadBancariaOrigen
          )
          //this.longitudMax = 20
          console.log('tipo cuenta ', this.tipoCuentaBancaria)
          this.tipoCuentaBancaria == ''
            ? (this.tipoCuentaBancaria = 1)
            : (this.tipoCuentaBancaria = this.tipoCuentaBancaria)
          if (this.tipoCuentaBancaria == 1) {
            this.changeTipoOnBanco(this.tipoCuentaBancaria)
          } else if (this.tipoCuentaBancaria == 2) {
            this.changeTipoOnBanco(this.tipoCuentaBancaria)
          }
        } else {
          console.log(res.cuentaInterbancaria)
          this.disabledNewCCI = false
          this.disabledNewCI = true
          this.cantidadDigitosAhorro = res.cantidadDigitosAhorro
          this.cantidadDigitosCorriente = res.cantidadDigitosCorriente
          this.codigoBanco = res.codigoBanco
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          console.log(
            ' cuando se cambia de entidadBancariaOrigen',
            this.entidadBancariaOrigen
          )
          // console.log(res.cantidadDigitosAhorro+' '+res.cantidadDigitosCorriente)
          this.tipoCuentaBancaria == ''
            ? (this.tipoCuentaBancaria = 1)
            : (this.tipoCuentaBancaria = this.tipoCuentaBancaria)
          if (this.tipoCuentaBancaria == 1) {
            this.changeTipoOnBanco(this.tipoCuentaBancaria)
          } else if (this.tipoCuentaBancaria == 2) {
            this.changeTipoOnBanco(this.tipoCuentaBancaria)
          }
        }
      }
    },

    changeTipo(v) {
      //id = 1 corriente id=2 ahorros
      console.log('tipo de cuenta', this.selectTipoCuenta.id)

      console.log('tipo de cuenta', this.selectEntidadBancaria)
      this.tipoCuentaBancaria = v
      if (v == 2) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        console.log(res)
        if (res.cuentaInterbancaria) {
          //this.longitudMax = res.cantidadDigitosCorriente
          this.longitudMax = res.cantidadDigitosCorriente
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          console.log(
            ' cuando se cambia de tipoi de cuenta',
            res.cantidadDigitosCorriente
          )
          console.log(
            ' cuando se cambia de entidadBancariaOrigen',
            this.entidadBancariaOrigen
          )
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          this.longitudMax = res.cantidadDigitosCorriente
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          console.log(
            ' cuando se cambia de tipoi de cuenta',
            res.cantidadDigitosCorriente
          )
          console.log(
            ' cuando se cambia de entidadBancariaOrigen',
            this.entidadBancariaOrigen
          )
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
      } else if (v == 1) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        if (res.cuentaInterbancaria) {
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          //this.entidadBancariaOrigen = 20
          console.log(
            ' cuando se cambia de tipoi de cuenta',
            res.cantidadDigitosAhorro
          )
          console.log(
            ' cuando se cambia de entidadBancariaOrigen',
            this.entidadBancariaOrigen
          )
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          console.log(
            ' cuando se cambia de tipoi de cuenta',
            res.cantidadDigitosAhorro
          )
          console.log(
            ' cuando se cambia de entidadBancariaOrigen',
            this.entidadBancariaOrigen
          )
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
      }
    },
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
            formaPago: 'Banco',
            speech: `Debes registrar solo la cuenta bancaria del DNI del titular para que el préstamo se active.
            <br><b>No se acepta cuentas bancarias de terceros.</b>`
          }
          this.tipoPago = 1
          this.isModalPagos = true
        }
      })
    },
    modalPagosClose() {
      ;(this.newCI = ''), (this.newCCI = '')
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
              var regex_numeros = /^[0-9]+$/
              var validateCI = regex_numeros.exec(this.newCI)
              var validateCII = regex_numeros.exec(this.newCCI)
              if (this.tyc == 1) {
                //this.loading = true
                /*  const datosForm = {
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
                  //sede: this.datos.selectOficina.id
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
                  }) */
                if (this.newCI == '' || this.newCCI == '') {
                  this.$store.commit('ui/SET_OPENDIALOGALERT', {
                    imgModal: 'warning',
                    tituloModal: '¡Atención!',
                    msgModal:
                      'Los campos son requeridos, por favor ingrese nuevamente',
                    maxWidth: 350,
                    estadoModal: true
                  })
                } else {
                  if (
                    (this.newCI.length < this.longitudMax &&
                      !(this.newCI.length == 10)) ||
                    this.newCCI.length < this.longitudMaxInterbancaria
                  ) {
                    if (
                      this.newCCI.length == this.longitudMaxInterbancaria &&
                      this.codigoBanco == 3
                    ) {
                      //this.modalPagosClose()
                      this.isModalPagos = false
                      return true
                    }

                    this.$store.commit('ui/SET_OPENDIALOGALERT', {
                      imgModal: 'warning',
                      tituloModal: '¡Atención!',
                      msgModal:
                        'Cantidad de digitos no alcanzada, por favor asegúrese de ingresar correctamente los datos',
                      maxWidth: 350,
                      estadoModal: true
                    })
                  } else {
                    this.loading = true
                    //this.modalPagosClose()
                    if (
                      this.tipoDesembolso == '1' &&
                      (this.selectTipoCuenta === null ||
                        this.selectEntidadBancaria === null ||
                        this.newCI == '' ||
                        this.newCCI ==
                          '') /* ||
                              this.isValidaNumCuenta === false */
                    ) {
                      this.$store.commit('ui/SET_OPENDIALOGALERT', {
                        imgModal: 'warning',
                        tituloModal: '¡Atención!',
                        msgModal:
                          'Debe completar todos los campos de la entidad bancaria',
                        maxWidth: 350,
                        estadoModal: true
                      })
                      this.loading = false
                    } else if (!validateCI) {
                      this.$store.commit('ui/SET_OPENDIALOGALERT', {
                        imgModal: 'warning',
                        tituloModal: '¡Atención!',
                        msgModal:
                          'La cuenta bancaria debe contener solo números, por favor inténtelo nuevamente',
                        maxWidth: 350,
                        estadoModal: true
                      })
                      this.loading = false
                    } else if (!validateCII) {
                      this.$store.commit('ui/SET_OPENDIALOGALERT', {
                        imgModal: 'warning',
                        tituloModal: '¡Atención!',
                        msgModal:
                          'La cuenta interbancaria debe contener solo números, por favor inténtelo nuevamente',
                        maxWidth: 350,
                        estadoModal: true
                      })
                      this.loading = false
                    } else {
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
                        telefono: this.resElegirOferta.telefono
                      }

                      let datosMedioDesembolso = null

                      if (this.tipoDesembolso == '3') {
                        datosMedioDesembolso = {
                          tipoCuenta: null,
                          entidadBancaria: null,
                          numeroCuentaBancaria: null,
                          numeroCuentaInterbancaria: null,
                          sede: this.datos.selectOficina.id
                        }
                      } else if (this.tipoPago == 1) {
                        datosMedioDesembolso = {
                          tipoCuenta: this.selectTipoCuenta.id,
                          //entidadBancaria: this.selectEntidadBancaria.codigoBanco,
                          entidadBancariaDestino: this.codigoBanco,
                          entidadBancariaOrigen: this.entidadBancariaOrigen,
                          numeroCuentaBancaria:
                            this.newCI != '' ? this.newCI : null,
                          numeroCuentaInterbancaria:
                            this.newCCI != '' ? this.newCCI : null,
                          sede: null
                        }
                      }
                      datosForm = {
                        ...datosForm,
                        ...datosMedioDesembolso
                      }
                      /*  console.log('datosForm: ', datosForm) */
                      this.$store
                        .dispatch(
                          'express/confirmarDatos',
                          JSON.stringify(datosForm)
                        )
                        .then((res) => {
                          if (res.codRes == '00') {
                            this.$store.commit(
                              'express/UPDATE_DATOS',
                              this.datos.selectOficina
                            )
                            this.isModalPagos = false
                            this.$store.commit('express/SET_CONFIR_DATOS', res)
                            console.log('respuesta de store ', res)
                            this.$store.commit('ui/UPDATE_STEP', 5)
                          } else if (res.codRes == '99') {
                            this.$store.commit('ui/SET_OPENDIALOGALERT', {
                              imgModal: 'warning',
                              tituloModal: '¡Lo sentimos!',
                              msgModal:
                                'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
                              maxWidth: 350,
                              estadoModal: true,
                              isReset: true
                            })
                            setTimeout(() => {
                              this.$store.commit('ui/UPDATE_STEP', 1)
                            }, 4000)
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
                            isReset: true
                          })
                        })
                        .finally(() => {
                          this.loading = false
                        })
                    }
                  }
                }
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
    },
    isNumber(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
</script>
<style>
.container {
  width: 30% !important;
  min-width: 250px !important;
}
.from-datos {
  /* padding: 40px; */
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
