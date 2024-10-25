<template>
  <v-form
    ref="form"
    autocomplete="nope"
    class="pa-2 pa-sm-4 pa-lg-5"
    @submit.prevent="sendRabbit"
  >
    <v-row dense>
      <v-col cols="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">
          ¡Completa tus datos en el formulario!
        </h2>
      </v-col>
      <v-col cols="12" style="padding-bottom:0; padding-top:0">
        <v-select
          v-model="datos.tipoDocumento"
          v-validate="'required'"
          solo
          flat
          :items="selectTipoDocumento"
          item-text="tipdoc"
          item-value="id"
          :error-messages="errors.collect('datos.tipoDocumento')"
          label="Tipo de documento"
          data-vv-name="datos.tipoDocumento"
          data-vv-as="Tipo"
          :color="color"
          required
        />
      </v-col>
      <v-col cols="12" no-gutters>
        <v-text-field
          v-model="datos.documento"
          v-validate="'required|digits:' + docLen"
          :maxlength="docLen"
          :minlength="docLen"
          :error-messages="errors.collect('datos.documento')"
          solo
          flat
          label="Número de documento"
          data-vv-name="datos.documento"
          required
          data-vv-as="Documento"
          :counter="docLen"
          type="tel"
          :color="color"
          @keypress="isNumber"
        />
      </v-col>
      <v-col v-if="showfecha" cols="12" no-gutters>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="formatFechaNacimiento"
              v-validate="{ required: showfecha }"
              data-vv-delay="1000"
              label="Fecha de nacimiento"
              prepend-inner-icon="event"
              :color="color"
              solo
              flat
              required
              data-vv-name="formatFechaNacimiento"
              data-vv-as="fecha"
              :error-messages="errors.collect('formatFechaNacimiento')"
              maxlength="10"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            v-model="datos.fechaNacimiento"
            locale="es"
            max="2000-01-01"
            min="1930-01-01"
            no-title
            @input="menu = false"
          />
        </v-menu>
      </v-col>
      <v-col v-if="showfecha" cols="12" no-gutters>
        <v-text-field
          v-model="datos.nombres"
          v-validate="'required|digits:8'"
          :error-messages="errors.collect('datos.nombres')"
          label="Nombres"
          data-vv-name="datos.nombres"
          required
          data-vv-as="nombres"
          :color="color"
          solo
          flat
        />
      </v-col>
      <v-col v-if="showfecha" cols="12" no-gutters>
        <v-text-field
          v-model="datos.apellidoPaterno"
          v-validate="'required'"
          :error-messages="errors.collect('datos.apellidoPaterno')"
          label="Apellido Paterno"
          data-vv-name="datos.apellidoPaterno"
          required
          data-vv-as="apellidoPaterno"
          :color="color"
          solo
          flat
        />
        <v-text-field
          v-model="datos.apellidoMaterno"
          v-validate="'required'"
          :error-messages="errors.collect('datos.apellidoMaterno')"
          label="Apellido Materno"
          data-vv-name="datos.apellidoMaterno"
          required
          data-vv-as="apellidoMaterno"
          :color="color"
          solo
          flat
        />
      </v-col>

      <v-col
        v-if="showingresomensual"
        cols="12"
        md="12"
        lg="12"
        style="padding-bottom:0; padding-top:0"
      >
        <v-text-field
          v-model="datos.ingresoMensual"
          v-validate="'required'"
          :error-messages="errors.collect('datos.ingresoMensual')"
          label="Ingreso Mensual"
          data-vv-name="datos.ingresoMensual"
          required
          data-vv-as="Ingreso mensual"
          type="num"
          :color="color"
          solo
          flat
          @keypress="isNumber"
        />
      </v-col>
      <v-col
        v-if="showSituacionLaboral"
        cols="12"
        md="12"
        lg="12"
        style="padding-bottom:0; padding-top:0"
      >
        <v-select
          v-model="datos.situacionLaboral"
          v-validate="'required'"
          :items="selectSituacionLaboral"
          item-text="sitlab"
          item-value="id"
          :error-messages="errors.collect('situacionLaboral')"
          label="Situacion Laboral"
          data-vv-name="situacionLaboral"
          data-vv-as="situacionLaboral"
          :color="color"
          required
          solo
          flat
        />
      </v-col>
      <!--       <v-col cols="12"  no-gutters>
        <v-select
          v-model="datos.condicionAuto"
          v-validate="'required'"
          :items="selectEstadoAuto"
          item-text="label"
          item-value="id"
          :error-messages="errors.collect('new_car')"
          label="Estado del automóvil"
          data-vv-name="new_car"
          data-vv-as="Tipo"
          :color="color"
          required
          solo
          flat
        />
      </v-col>
      <v-col
        v-if="!datos.condicionAuto"
        cols="12"
        md="12"
        lg="12"
        style="padding-bottom:0; padding-top:0"
      >
        <v-text-field
          v-model="placa"
          v-validate="{
            required: true,
            regex: /^([a-zA-Z][A-Za-z0-9][A-Za-z0-9][0-9][0-9][0-9]+)$/
          }"
          v-mask="'AXX-XXX'"
          onkeyup="this.value = this.value.toUpperCase();"
          label="Placa"
          data-vv-as="placa"
          data-vv-name="placa"
          required
          solo
          flat
          :error-messages="errors.collect('placa')"
          :color="color"
          maxlength="7"
          minlength="7"
        />
      </v-col>-->
      <v-col cols="12" no-gutters>
        <v-autocomplete
          v-model="marca"
          v-validate="'required'"
          class="ld-form-input"
          label="Marca"
          :items="listaMarca"
          data-vv-as="marca"
          :error-messages="errors.collect('marca')"
          data-vv-name="marca"
          required
          :color="color"
          item-text="no_marcas"
          item-value="co_marcas"
          solo
          flat
        />
      </v-col>
      <!--       <v-col cols="12"  no-gutters>
        <v-autocomplete
          v-model="datos.modelo"
          v-validate="'required'"
          class="ld-form-input"
          label="Modelo"
          :items="listaModel"
          data-vv-as="modelo"
          item-text="replace"
          item-value="co_modelo"
          :error-messages="errors.collect('datos.modelo')"
          data-vv-name="datos.modelo"
          :color="color"
          required
          solo
          flat
        />
      </v-col>-->
      <v-text-field
        v-model="datos.precioVehiculo"
        v-validate="{
          required: true
        }"
        label="Precio del vehículo"
        data-vv-as="datos.precioVehiculo"
        data-vv-name="datos.precioVehiculo"
        required
        solo
        flat
        :error-messages="errors.collect('datos.precioVehiculo')"
        :color="color"
        maxlength="7"
        minlength="7"
      />
      <v-col cols="12">
        <v-text-field
          v-model="datos.telefono"
          v-validate="
            'required|numeric|regex:^([9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)$'
          "
          label="Número de telefono"
          :error-messages="errors.collect('datos.telefono')"
          data-vv-name="datos.telefono"
          type="tel"
          maxlength="9"
          minlength="9"
          required
          :counter="9"
          data-vv-as="Telf."
          :color="color"
          solo
          flat
          @keypress="isNumber"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="datos.email"
          v-validate="'email|max:50|min:6'"
          label="Correo electrónico (Opcional)"
          :error-messages="errors.collect('datos.email')"
          data-vv-name="datos.email"
          type="email"
          :maxlength="50"
          :counter="50"
          data-vv-as="email"
          :color="color"
          solo
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="datos.terms"
          v-validate="'required'"
          required
          value="1"
          :error-messages="errors.collect('datos.terms')"
          data-vv-name="datos.terms"
          data-vv-as="Terminos y condiciones"
          type="checkbox"
          :color="color"
        >
          <div slot="label">
            Acepto los
            <a slot="activator" :class="color + '--text'" @click="openTerms"
              >Términos y Condiciones</a
            >
          </div>
        </v-checkbox>
      </v-col>
      <v-col cols="12">
        <span v-if="showError" class="body-2 red--text"
          >*Completa todos los campos por favor</span
        >
      </v-col>

      <v-col cols="12" class="text-center">
        <v-btn
          class="ld-btn"
          type="submit"
          :color="color"
          :loading="loading"
          :disbaled="loading"
          :class="color"
          >Solicítalo</v-btn
        >
      </v-col>
      <v-dialog v-model="terms" persistent max-width="700">
        <TerminosCondiciones :color="color" />
      </v-dialog>
      <!-- <modal-token :color="color"></modal-token> -->
    </v-row>
    <v-dialog v-model="showdialogloader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Validando DNI
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-form>
</template>
<script>
import { format, parseISO } from 'date-fns'
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { getMarca, getModelo } from '@/api/catalogue'
import { listSectorEconomico } from '@/utils/catalogo'
export default {
  components: {
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones')
  },
  mixins: [mixins],
  props: ['color'],
  data() {
    return {
      listaModel: [],
      listaMarca: [],
      showdialogloader: false,
      showingresomensual: false,
      showSituacionLaboral: false,
      car_state: 'Usado',
      selectTipoCliente: [
        {
          id: 1,
          text: 'Particular'
        },
        {
          id: 2,
          text: 'Consumo'
        }
      ],
      selectEstadoAuto: [
        { id: true, label: 'Auto Nuevo' },
        { id: false, label: 'Auto Usado' }
      ],
      selectSituacionLaboral: [
        /*         {
          sitlab: 'Dependiente formal',
          id: 'DF'
        },
        {
          sitlab: 'Dependiente informal',
          id: 'DI'
        }, */
        {
          sitlab: 'Independiente formal',
          id: 'IF'
        },
        {
          sitlab: 'Independiente informal',
          id: 'II'
        }
      ],
      duplicateDoc: false,
      showError: false,
      dialog: false,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1
        },
        {
          tipdoc: 'CE',
          id: 2
        }
      ],
      menu: false,
      loading: false
    }
  },
  computed: {
    ...mapState('prospeccion', ['datos', 'terms']),
    ...mapState('users', ['promotor']),
    marca: {
      get() {
        let newVal = this.datos.marca
        if (!newVal) {
          newVal = null
        }
        return newVal
      },
      set(v) {
        this.$store.commit('prospeccion/UPDATE_DATOS', { marca: v })
      }
    },
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length === 7) {
          this.$store.commit('prospeccion/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', '')
          })
        }
      }
    },
    documento: {
      get() {
        return this.datos.documento ? this.datos.documento : null
      },
      set(v) {
        this.$store.commit('prospeccion/UPDATE_DATOS', { documento: v })
      }
    },
    showfecha() {
      if (this.datos.tipoDocumento == 1) {
        return false
      } else {
        return true
      }
    },
    telefono() {
      return this.datos.telefono
    },
    codigoReferidos() {
      return this.datos.codigoReferidos
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      } else {
        return null
      }
    },
    docLen() {
      switch (this.datos.tipoDocumento) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
      }
    }
    /*     new_car() {
      if (this.car_state == 'Usado') {
        return true
      } else {
        return false
      }
    } */
  },
  watch: {
    /*     async marca(val) {
      console.log('marca')
      console.log(val)
      await this.getModelo(val)
    }, */
    async documento(val) {
      this.showingresomensual = false
      this.showSituacionLaboral = false
      this.$store.commit('prospeccion/UPDATE_DATOS', {
        ingresoMensual: null
      })
      if (val.length == 8) {
        this.showdialogloader = true

        const response = await this.$axios({
          url: '/v6/externos/v2.0/essalud/info',
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: process.env.BASIC_AUTH
          },
          data: { dni: this.datos.documento }
        })
        console.log(response.data)
        this.showdialogloader = false
        if (response.data.estado === '00') {
          if (response.data.data.length > 1) {
            let montoMayor = 0
            response.data.data.forEach((element) => {
              if (montoMayor < element.im_ingbru) {
                montoMayor = element.im_ingbru
              }
            })
            this.$store.commit('prospeccion/UPDATE_DATOS', {
              ingresoMensual: montoMayor,
              situacionLaboral: 'DF'
            })
          } else {
            if (response.data.data[0].im_ingbru === 0) {
              this.showingresomensual = true
              this.$store.commit('prospeccion/UPDATE_DATOS', {
                situacionLaboral: 'DF'
              })
            } else {
              this.$store.commit('prospeccion/UPDATE_DATOS', {
                ingresoMensual: response.data.data[0].im_ingbru
              })
            }
          }
        } else if (response.data.estado == '01') {
          this.showingresomensual = true
          this.showSituacionLaboral = true
        }
      }
    }
  },
  async mounted() {
    this.$ga.event('Prospecciones', 'Preevaluate')
    this.listaMarca = await getMarca(this.$axios)
  },
  methods: {
    async getModelo(params) {
      /* console.log('modelo') */
      this.listaModel = await getModelo(this.$axios, params)
    },
    sendRabbit() {
      console.log('1')
      this.$validator.validateAll().then(async (result) => {
        console.log('2')

        if (result) {
          console.log('3  ')

          this.$store.commit('ui/UPDATE_STEP', 2, {
            root: true
          })
        }
      })
    },
    openTerms() {
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    }
  }
}
</script>
