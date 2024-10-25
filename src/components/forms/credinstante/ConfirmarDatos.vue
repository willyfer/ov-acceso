<template>
  <div class="pa-3 confirmar-datos__container">
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
            <v-divider class="mt-2" color="#AAAAAA"></v-divider>
          </h2>
        </v-col>
      </v-row>
      <v-row offset-cols="2">
        <v-col
          cols="12"
          md="8"
          no-gutters
          class="d-flex flex-column justify-center"
          style="padding: 4px"
        >
          <span class="ld-form-p2 label-form">Datos del domicilio</span>
        </v-col>
      </v-row>
      <v-row>
        <!-- <v-col cols="12" md="6" sm="6" style="padding:4px">
          <v-select
            outlined
            dense
            v-model="departamento"
            v-validate="'required'"
            label="Departamento"
            :color="colorForm"
            :items="selectDepartamento"
            data-vv-as="Departamento"
            item-text="dep"
            item-value="id"
            :error-messages="errors.collect('departamento')"
            data-vv-name="departamento"
            required
          />
        </v-col> -->
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-select
            @change="selectDep"
            outlined
            dense
            v-model="departamento"
            v-validate="'required'"
            label="Departamento"
            :color="colorForm"
            :items="selectDepartamento"
            data-vv-as="Departamento"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('departamento')"
            data-vv-name="departamento"
            required
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-select
            @change="selectPro"
            outlined
            dense
            v-model="provincia"
            v-validate="'required'"
            :color="colorForm"
            label="Provincia"
            :items="selectProvincia"
            data-vv-as="Provincia"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('provincia')"
            data-vv-name="provincia"
            required
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-autocomplete
            outlined
            dense
            v-model="distrito"
            v-validate="'required'"
            :color="colorForm"
            :items="selectDistrito"
            label="Distrito"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('ubigeo')"
            data-vv-name="ubigeo"
            data-vv-as="Distrito"
            required
            no-data-text="No existe este distrito"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="direccion"
            v-validate="'required'"
            :error-messages="errors.collect('direccion')"
            data-vv-as="Direccion"
            label="Dirección"
            data-vv-name="direccion"
            required
            :color="colorForm"
          />
        </v-col>
      </v-row>
      <v-row offset-cols="2">
        <v-col
          cols="12"
          md="8"
          no-gutters
          class="d-flex flex-column justify-center"
          style="padding: 4px"
        >
          <span class="ld-form-p2 label-form">Datos complementarios</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-autocomplete
            outlined
            dense
            v-model="sectorEconomico"
            v-validate="'required'"
            :items="selectSectoreconomico"
            data-vv-as="Sector"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('sectorEconomico')"
            label="Sector económico"
            data-vv-name="sectorEconomico"
            required
            :color="colorForm"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-autocomplete
            outlined
            dense
            v-model="actividadEconomica"
            v-validate="'required'"
            :items="selectActividadeconomica"
            data-vv-as="Actividad"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('actividadEconomica')"
            label="Actividad económica"
            data-vv-name="actividadEconomica"
            required
            :color="colorForm"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-autocomplete
            outlined
            dense
            v-model="profesion"
            v-validate="'required'"
            :color="colorForm"
            :items="selectOcupacion"
            data-vv-as="profesion"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('profesion')"
            label="Profesión y ocupación"
            data-vv-name="profesion"
            required
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-text-field
            v-model="email"
            v-validate="'email|max:50|min:6'"
            outlined
            dense
            label="Correo electrónico (Opcional)"
            :error-messages="errors.collect('datos.email')"
            data-vv-name="datos.email"
            type="email"
            :maxlength="50"
            data-vv-as="email"
            :color="colorForm"
          />
        </v-col>
      </v-row>
      <template v-if="datos.codigoProducto !== 35">
        <v-row offset-cols="2">
          <v-col
            cols="12"
            md="8"
            no-gutters
            class="d-flex flex-column justify-center"
            style="padding: 4px"
          >
            <span class="ld-form-p2 label-form">Datos del vehículo</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" sm="6" style="padding: 4px">
            <v-autocomplete
              outlined
              dense
              v-model="marca"
              v-validate="'required'"
              class="ld-form-input"
              label="Marca"
              :items="listaMarca"
              data-vv-as="marca"
              :error-messages="errors.collect('marca')"
              data-vv-name="marca"
              required
              :color="colorForm"
              item-text="no_marcas"
              item-value="co_marcas"
            />
          </v-col>
          <v-col cols="12" md="6" sm="6" style="padding: 4px">
            <v-autocomplete
              :disabled="isDisabledModelo"
              outlined
              dense
              v-model="datos.modelo"
              v-validate="'required'"
              class="ld-form-input"
              label="Modelo"
              :items="listaModel"
              data-vv-as="modelo"
              item-text="no_modelo"
              item-value="co_modelo"
              :error-messages="errors.collect('datos.modelo')"
              data-vv-name="datos.modelo"
              :color="colorForm"
              required
            />
          </v-col>
        </v-row>
      </template>
      <v-row offset-cols="2">
        <v-col
          cols="12"
          md="8"
          no-gutters
          class="d-flex flex-column justify-center"
          style="padding: 4px"
        >
          <span class="ld-form-p2 label-form">Medio de desembolso</span>
        </v-col>
      </v-row>
      <v-bottom-navigation
        v-model="tipoDesembolso"
        grow
        color="#ff7729"
        class="navigation-pagos"
        height="100"
      >
        <v-btn value="1" @click="clickBanco">
          <span
            >Entidad <br />
            Bancaria</span
          >
          <v-icon size="45" class="button-desembolso mb-1">mdi-bank</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <div class="class-tyc">
        <v-row>
          <v-col cols="3"> </v-col>
        </v-row>
        <v-row class="d-flex flex-row justify-center">
          <v-col md="12" sm="12" xs="12" class="d-flex flex-row justify-center">
            <v-btn
              @click="confirmarDatos"
              large
              class="white--text"
              style="border-radius: 5px; background-color: #ff7729"
              dark
              :loading="loading"
              >CONFIRMAR DATOS</v-btn
            >
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
      @modalpagosconfirm="soloNumeros"
    >
      <template slot="inputs-modal">
        <template v-if="tipoPago == -1"></template>
        <template v-else-if="tipoPago === 3 || tipoPago === 2">
          <v-select
            class="input-slot"
            v-model="datos.selectOficina"
            v-validate="'required'"
            :items="oficinas"
            :hint="`Referencia: ${
              datos.selectOficina ? datos.selectOficina.referencia : ''
            }`"
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
          <v-row justify="center">
            <!-- añadido dq -->
            <v-card-text style="padding-top: 0px !important; margin-top: -20px">
              <v-row>
                <v-col class="d-flex" cols="12">
                  <v-select
                    v-model="selectTipoCuenta"
                    :items="listaTipoCuenta"
                    label="Tipo de Cuenta"
                    outlined
                    dense
                    return-object
                    item-text="tipo"
                    item-value="id"
                    v-on:change="changeTipo(`${selectTipoCuenta.id}`)"
                    required
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="12" style="margin-top: -5%">
                  <v-select
                    dense
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
              <!-- <slot name="inputs-modal"></slot> -->
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    dense
                    label="Cuenta Bancaria"
                    outlined
                    v-model="newCI"
                    v-validate="'required'"
                    @keypress="isNumber"
                    required
                    counter
                    :maxlength="longitudMax"
                    :rules="rulesCI"
                    oncopy="return true"
                    onpaste="return true"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    dense
                    label="Cuenta Interbancaria"
                    outlined
                    v-model="newCCI"
                    v-validate="'required'"
                    required
                    @keypress="isNumber"
                    counter
                    :rules="rulesCCI"
                    :maxlength="longitudMaxInterbancaria"
                    oncopy="return true"
                    onpaste="return true"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <p
              style="
                margin-top: -10px !important;
                margin-bottom: -15px !important;
                font-size: 11px;
                margin-left: 12px !important;
                margin-right: 10px !important;
              "
            >
              Registra correctamente tu cuenta bancaria. De lo contrario solo
              tendrás una oportunidad de corregirla, dentro de un plazo de 3
              días desde que se te notifique.
              <br />
              <b style="font-size: 12px !important">
                Si usted, no tiene una cuenta bancaria, no se preocupe, abra una
                en su banco de confianza y regrese a esta pantalla. Lo
                esperamos.
              </b>
            </p>

            <!-- añadido dq -->
          </v-row>
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
import {
  arrayDepartamentos,
  arrayProvincias,
  arrayDistritos,
} from '@/utils/ubigeo.js'
import { getMarca, getModelo, getOficinas, getBancos } from '@/api/catalogue'
import { listSectorEconomico } from '@/utils/catalogo'
import ModalPagos from '@/components/modals/ModalPagos'

export default {
  components: {
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
    ModalPagos,
  },
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [mixins],
  props: ['color'],
  async mounted() {
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
            isReset: true,
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
          isReset: true,
        })
      })

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
            isReset: true,
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
          isReset: true,
        })
      })

    this.selectOcupacion = await this.getOcupacion()
    this.listaActividadeconomica = await this.getActividadeconomica()
    this.listaMarca = await getMarca(this.$axios)
    if (this.datos.marca) {
      await this.getModelo(this.datos.marca)
    }
  },
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', [
      'datos',
      'codigoEvaluacion',
      'body_valida',
      'resElegirOferta',
      'ofertas',
    ]),
    ...mapState('default', ['terms']),
    selectSectoreconomico() {
      return listSectorEconomico
    },
    direccion: {
      get() {
        return this.datos.direccion
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { direccion: v })
      },
    },
    sectorEconomico: {
      get() {
        let newVal = this.datos.sectorEconomico

        if (newVal == null) {
          newVal = 28
        }
        const filterList = this.listaActividadeconomica.filter(
          (val) => val.fk === newVal
        )
        this.selectActividadeconomica = filterList
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { sectorEconomico: v })
      },
    },
    actividadEconomica: {
      get() {
        let newVal = this.datos.actividadEconomica
        // console.log("resultado",newVal)
        //console.log("el tipo de valior", typeof(newVal))
        if (newVal == null) {
          // console.log("dentro del if")
          newVal = 357
        } else {
          //  console.log("dentro del else")
          return newVal
        }
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { actividadEconomica: v })
      },
    },
    profesion: {
      get() {
        if (this.datos.profesion) {
          return this.datos.profesion
        }
        return 111
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { profesion: v })
      },
    },
    marca: {
      get() {
        let newVal = this.datos.marca
        if (!newVal) {
          newVal = null
        }
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { marca: v })
      },
    },
    modelo: {
      get() {
        let newVal = this.datos.modelo
        if (!newVal) {
          newVal = null
        }
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { modelo: v })
      },
    },
    departamento: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('express/UPDATE_DATOS', { departamento: '15' })
          return '15'
        } else {
          return this.datos.departamento
        }
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { departamento: v })
      },
    },
    provincia: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('express/UPDATE_DATOS', { provincia: '1501' })
          return '1501'
        } else {
          return this.datos.provincia
        }
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { provincia: v })
      },
    },
    distrito: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('express/UPDATE_DATOS', {
            distrito: '150101',
            ubigeo: '150101',
          })
          return '150101'
        } else {
          return this.datos.distrito
        }
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { distrito: v, ubigeo: v })
      },
    },
    selectDepartamento() {
      var selectDepartamento = arrayDepartamentos.filter((va) => {
        if (
          this.datos.codigoProducto == 17 ||
          this.datos.codigoProducto == 18
        ) {
          if (va.id == '15' || va.id == '07') {
            return va
          }
        } else {
          return va
        }
      })
      return selectDepartamento
    },
    selectProvincia() {
      var selectProvincias = arrayProvincias.filter((va) => {
        if (va.id.slice(0, 2) == this.datos.departamento) {
          return va
        }
      })
      return selectProvincias
    },
    selectDistrito() {
      var selectDistritos = arrayDistritos.filter((va) => {
        if (va.id.slice(0, 4) == this.datos.provincia) {
          return va
        }
      })
      return selectDistritos
    },
  },
  data() {
    return {
      valiNumeric: false,
      contadorValiNumeric: 0,
      validatedNumCuenta: null,
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
        speech: null,
      },
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
      datosInputCuenta: {
        label: null,
        maxlength: 0,
        minlength: 0,
        counter: 0,
        dataVvAs: null,
      },
      datosInputConfirmCuenta: {
        label: null,
        maxlength: 0,
        minlength: 0,
        counter: 0,
        dataVvAs: null,
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
          text: 'Cuenta Corriente',
        },
        {
          id: 2,
          text: 'Cuenta Ahorros',
        },
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
          'Cantidad de digitos no alcanzada.',
      ],
      rulesCI: [
        (v) => !!v || 'Campo obligatorio',
        (v) =>
          (v && v.length >= this.longitudMax) ||
          (v.length == 10 && this.selectEntidadBancaria.codigoBanco == 3) ||
          'Cantidad de digitos no alcanzada.',
      ],
      rulesCCI: [
        (v) => !!v || 'Campo obligatorio',
        (v) =>
          (v && v.length >= this.longitudMaxInterbancaria) ||
          'Cantidad de digitos no alcanzada',
      ],
      tipoCuentaBancaria: '',
      longitudMax: 0,
      entidadBancariaOrigen: 0,
      longitudMaxInterbancaria: 20,
      isDisabledModelo: false,
      email: null,
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    },
    async marca(val) {
      /* console.log('marca') */

      await this.getModelo(val)
    },
  },
  methods: {
    valiNewCI() {
      var contador = 0
      for (var i = 0; i < this.newCI.length; i++) {
        var num = this.newCI
        if (num.charAt(i) == '-') {
          contador = contador + 1
        }
      }
      if (contador > 0) {
        return true
      } else {
        return false
      }
    },
    valiNewCCI() {
      var contador2 = 0
      for (var j = 0; j < this.newCCI.length; j++) {
        var num2 = this.newCCI
        if (num2.charAt(j) == '-') {
          contador2 = contador2 + 1
        }
      }
      if (contador2 > 0) {
        return true
      } else {
        return false
      }
    },
    soloNumeros() {
      if (this.valiNewCI() || this.valiNewCCI()) {
        this.valiNumeric = true
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: '¡Atención!',
          msgModal: 'Los campos no son válidos, por favor ingrese nuevamente',
          maxWidth: 350,
          estadoModal: true,
        })
      } else {
        //alert("no tiene caract  especiales")
        this.modalPagosConfirm()
      }
    },
    validaNumCuentaCI() {
      if (this.disabledNewCI) {
        if (this.newCI === this.newConfirmCI) {
          this.validatedNumCuenta = true
        }
      }
    },
    selectDep() {
      console.log('change departamento')
      this.$store.commit('express/UPDATE_DATOS', {
        provincia: null,
        distrito: null,
      })
    },
    selectPro() {
      console.log('change distrito')
      this.$store.commit('express/UPDATE_DATOS', {
        distrito: null,
      })
      /* this.ubigeo = null */
    },
    validaNumCuentaCI() {
      if (this.disabledNewCI) {
        if (this.newCI === this.newConfirmCI) {
          this.validatedNumCuenta = true
        }
      }

      if (this.disabledNewCCI) {
        if (this.newCI != this.newConfirmCI) {
          this.validatedNumCuenta = false
        }
      }
    },
    changeEntidadBancaria() {
      this.numeroCuenta = null
      this.numeroCuentaConfirm = null
      this.$validator.reset()
      if (this.selectEntidadBancaria.cuentaInterbancaria) {
        this.datosInputCuenta = {
          maxlength: 20,
          minlength: 20,
          counter: 20,
          label: 'CCI',
          dataVvAs: 'CCI',
        }
        this.datosInputConfirmCuentaCuenta = {
          maxlength: 20,
          minlength: 20,
          counter: 20,
          label: 'Confirmar CCI',
          dataVvAs: 'Confirmar CCI',
        }
      } else {
        this.datosInputCuenta = {
          maxlength: this.selectEntidadBancaria.cantidadDigitos,
          minlength: this.selectEntidadBancaria.cantidadDigitos,
          counter: this.selectEntidadBancaria.cantidadDigitos,
          label: 'Número de Cuenta',
          dataVvAs: 'Número de Cuenta',
        }
        this.datosInputConfirmCuentaCuenta = {
          maxlength: this.selectEntidadBancaria.cantidadDigitos,
          minlength: this.selectEntidadBancaria.cantidadDigitos,
          counter: this.selectEntidadBancaria.cantidadDigitos,
          label: 'Confirmar Número de Cuenta',
          dataVvAs: 'Confirmar Número de Cuenta',
        }
      }
    },
    async getModelo(params) {
      /* console.log('modelo') */
      this.isDisabledModelo = true
      this.listaModel = await getModelo(this.$axios, params)
      this.isDisabledModelo = false
    },
    async getOcupacion() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoOcupacion',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj',
        },
      })
      // console.log(response.data)
      return response.data
    },
    async getActividadeconomica() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoActividadecomomica',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj',
        },
      })
      // console.log(response.data)
      return response.data
    },
    clickBanco() {
      this.resetFormEfectivo()
      this.payloadModal = {
        formaPago: 'Banco',
        speech: `Debes registrar solo la cuenta bancaria del titular del DNI para que el préstamo se active. <br> 
        <b>La cuenta bancaria debe ser en soles.</b>
        <br> <b>No se aceptan en dólares.</b>
        <br> <b>No se aceptan cuentas bancarias de terceros.</b>`,
      }
      this.tipoPago = 1
      this.isModalPagos = true
    },
    clickEfectivo() {
      this.resetFormEntidadBancaria()
      this.payloadModal = {
        formaPago: 'Efectivo',
        speech: 'Selecciona la oficina donde recogerás tu desembolso.',
      }
      this.tipoPago = 3
      this.isModalPagos = true
      /* this.$validator.validateAll().then(async (result) => {
        if (result) {

        }
      }) */
    },
    clickTarjeta() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.payloadModal = {
            formaPago: 'Tarjeta',
            speech: `Para poder recoger la tarjeta favor seleccione una de nuestras oficinas:
              <br />Tiempo de recarga a partir del recojo de la tarjeta :
              <b>30 minutos</b>`,
          }
          this.tipoPago = 2
          this.isModalPagos = true
        }
      })
    },
    openTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    modalPagosClose() {
      ;(this.newCI = ''), (this.newCCI = '')
      this.isModalPagos = false
      ;(this.tipoPago = -1),
        (this.payloadModal = {
          formaPago: null,
          speech: null,
        })
    },
    modalPagosConfirm() {
      var regex_numeros = /^[0-9]+$/
      var validateCI = regex_numeros.exec(this.newCI)
      var validateCII = regex_numeros.exec(this.newCCI)
      //    console.log("CCI", this.disabledNewCCI)
      //    console.log("CI", this.disabledNewCI)
      if (this.newCI == '' || this.newCCI == '') {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: '¡Atención!',
          msgModal: 'Los campos son requeridos, por favor ingrese nuevamente',
          maxWidth: 350,
          estadoModal: true,
        })
      } else {
        if (
          this.newCI.length < this.longitudMax ||
          this.newCCI.length < this.longitudMaxInterbancaria
        ) {
          if (
            this.newCI.length == 10 &&
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
            estadoModal: true,
          })
        } else if (!validateCI) {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Atención!',
            msgModal:
              'La cuenta bancaria debe contener solo números, por favor inténtelo nuevamente',
            maxWidth: 350,
            estadoModal: true,
          })
        } else if (!validateCII) {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Atención!',
            msgModal:
              'La cuenta interbancaria debe contener solo números, por favor inténtelo nuevamente',
            maxWidth: 350,
            estadoModal: true,
          })
        } else {
          //this.modalPagosClose()
          this.isModalPagos = false
        }
      }

      // this.modalPagosClose()
    },
    confirmarDatos() {
      try {
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.loading = true
            if (this.tipoDesembolso == '3' && !this.datos.selectOficina) {
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: '¡Atención!',
                msgModal: 'Debe elegir una oficina para tu desembolso',
                maxWidth: 350,
                estadoModal: true,
              })
              this.loading = false
            } else if (
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
                estadoModal: true,
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
                codigoProspecto: this.datos.codigoProspecto,
                codigoEvaluacion: this.datos.codigoEvaluacion,
                estadoProspecto: this.datos.estadoProspecto,
                channel: this.datos.channel,
                terms: true,
                ubigeo: this.datos.ubigeo,
                direccion: this.direccion,
                sectorEconomico: this.sectorEconomico,
                actividadEconomica: this.actividadEconomica,
                profesion: this.profesion,
                marca: this.marca,
                modelo: this.modelo,
                tipoDesembolso: parseInt(this.tipoDesembolso),
                email: this.email,
              }

              let datosMedioDesembolso = null

              if (this.tipoDesembolso == '3') {
                datosMedioDesembolso = {
                  tipoCuenta: null,
                  entidadBancaria: null,
                  numeroCuentaBancaria: null,
                  numeroCuentaInterbancaria: null,
                  sede: this.datos.selectOficina.id,
                }
              } else if (this.tipoDesembolso == '1') {
                datosMedioDesembolso = {
                  tipoCuenta: this.selectTipoCuenta.id,
                  //entidadBancaria: this.selectEntidadBancaria.codigoBanco,
                  entidadBancariaDestino: this.codigoBanco,
                  entidadBancariaOrigen: this.entidadBancariaOrigen,
                  numeroCuentaBancaria: this.newCI != '' ? this.newCI : null,
                  numeroCuentaInterbancaria:
                    this.newCCI != '' ? this.newCCI : null,
                  sede: null,
                }
              }
              datosForm = {
                ...datosForm,
                ...datosMedioDesembolso,
              }
              //   console.log('datosForm: ', datosForm)
              this.$store
                .dispatch('express/confirmarDatos', JSON.stringify(datosForm))
                .then((res) => {
                  if (res.codRes == '00') {
                    this.$store.commit(
                      'express/UPDATE_DATOS',
                      this.datos.selectOficina
                    )
                    this.$store.commit(
                      'express/SET_TIPO_DESEMBOLSO',
                      this.tipoDesembolso
                    )
                    this.$store.commit('express/SET_CONFIR_DATOS', res)
                    this.$store.commit('ui/UPDATE_STEP', 6)
                  } else if (res.codRes == '99') {
                    this.$store.commit('ui/SET_OPENDIALOGALERT', {
                      imgModal: 'warning',
                      tituloModal: '¡Lo sentimos!',
                      msgModal:
                        'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
                      maxWidth: 350,
                      estadoModal: true,
                      isReset: true,
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
                    isReset: true,
                  })
                })
                .finally(() => {
                  this.loading = false
                })
            }
          }
        })
      } catch (err) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal:
            'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
    resetFormEntidadBancaria() {
      this.selectTipoCuenta = null
      this.selectEntidadBancaria = null
      this.numeroCuenta = null
      this.numeroCuentaConfirm = null
    },
    resetFormEfectivo() {
      this.$store.commit('express/UPDATE_DATOS', { selectOficina: null })
    },

    //añadido por dq
    changeBanco(v) {
      //    console.log("cambio de banco ", v)
      const res = this.listaTipoEntidad.find((r) => r.codigoBanco == v) //bisca la entidad en especifica
      if (res) {
        if (res.cuentaInterbancaria) {
          //       console.log(res.cuentaInterbancaria)
          this.disabledNewCCI = true
          this.disabledNewCI = false
          this.codigoBanco = res.codigoBanco
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          //      console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          //this.longitudMax = 20
          //   console.log("tipo cuenta ", this.tipoCuentaBancaria)
          this.tipoCuentaBancaria == ''
            ? (this.tipoCuentaBancaria = 1)
            : (this.tipoCuentaBancaria = this.tipoCuentaBancaria)
          if (this.tipoCuentaBancaria == 1) {
            this.changeTipoOnBanco(this.tipoCuentaBancaria)
          } else if (this.tipoCuentaBancaria == 2) {
            this.changeTipoOnBanco(this.tipoCuentaBancaria)
          }
        } else {
          //  console.log(res.cuentaInterbancaria)
          this.disabledNewCCI = false
          this.disabledNewCI = true
          this.cantidadDigitosAhorro = res.cantidadDigitosAhorro
          this.cantidadDigitosCorriente = res.cantidadDigitosCorriente
          this.codigoBanco = res.codigoBanco
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          //     console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
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
    touch() {
      this.disabledText = true
    },
    changeTipo(v) {
      //id = 1 corriente id=2 ahorros
      //  console.log("tipo de cuenta", this.selectTipoCuenta.id)

      //   console.log("tipo de cuenta", this.selectEntidadBancaria)
      this.tipoCuentaBancaria = v
      if (v == 2) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        //    console.log(res)
        if (res.cuentaInterbancaria) {
          //this.longitudMax = res.cantidadDigitosCorriente
          this.longitudMax = res.cantidadDigitosCorriente
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          // console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosCorriente)
          //     console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          console.log('codigo de banco', res.codigoBanco)
          if (res.codigoBanco === 3) {
            this.longitudMax = 14
          } else {
            this.longitudMax = res.cantidadDigitosCorriente
          }
          // this.longitudMax = res.cantidadDigitosCorriente
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          //     console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosCorriente)
          //     console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
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
          //  console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosAhorro)
          //  console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          this.entidadBancariaOrigen = res.entidadBancariaOrigen
          //     console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosAhorro)
          //   console.log(" cuando se cambia de entidadBancariaOrigen" ,this.entidadBancariaOrigen)
          this.longitudMax = res.cantidadDigitosAhorro
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
      }
    },
    changeTipoOnBanco(t) {
      if (t == 2) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        //   console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosCorriente)
        if (res.cuentaInterbancaria) {
          this.longitudMax = res.cantidadDigitosCorriente
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        } else {
          console.log('codigo de banco', res.codigoBanco)
          if (res.codigoBanco === 3) {
            this.longitudMax = 14
          } else {
            this.longitudMax = res.cantidadDigitosCorriente
          }
          //this.longitudMax = res.cantidadDigitosCorriente
          this.newConfirmCI = ''
          this.newCI = ''
          this.newCCI = ''
          this.newConfirmCCI = ''
        }
      } else if (t == 1) {
        const res = this.listaTipoEntidad.find(
          (r) => r.codigoBanco == this.codigoBanco
        )
        //   console.log(" cuando se cambia de tipoi de cuenta" ,res.cantidadDigitosAhorro)
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
  },
}
</script>
<style scoped>
.confirmar-datos__container {
  max-width: 600px !important;
  margin: 0 auto;
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
.label-form {
  font-size: 15px;
  color: #005092;
}
.button-desembolso {
  border: 1.5px solid #aaaaaa;
  border-radius: 100%;
  padding: 5px;
}
</style>
