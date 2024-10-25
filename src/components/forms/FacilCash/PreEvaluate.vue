<template>
  <v-form ref="form" autocomplete="nope" @submit.prevent="setCaptcha">
    <v-row dense>
      <v-col cols="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">
          ¡Pide tu dinero en efectivo ahora!
        </h2>
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Ingresa tus datos básicos:</label>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-select
          v-model="datos.tipoDocumento"
          v-validate="'required'"
          :items="selectTipoDocumento"
          item-text="tipdoc"
          item-value="id"
          :error-messages="errors.collect('datos.tipoDocumento')"
          label="Tipo de documento"
          data-vv-name="datos.tipoDocumento"
          data-vv-as="Tipo"
          :color="color"
          required
          readonly
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-text-field
          v-model="datos.documento"
          v-validate="'required|digits:8'"
          :error-messages="errors.collect('datos.documento')"
          label="Número de documento"
          data-vv-name="datos.documento"
          required
          data-vv-as="Documento"
          :counter="8"
          type="tel"
          maxlength="8"
          :color="color"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
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
              v-validate="'required'"
              label="Fecha de nacimiento"
              prepend-icon="event"
              color="soat"
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
      <v-col cols="12" md="6" lg="6">
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
          flat
          :error-messages="errors.collect('placa')"
          :color="color"
          maxlength="7"
          minlength="7"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-select
          v-model="datos.estadoCivil"
          v-validate="'required'"
          :color="color"
          :items="selectEstadoCivil"
          item-text="estciv"
          item-value="id"
          :error-messages="errors.collect('datos.estadoCivil')"
          label="Estado civil"
          data-vv-name="datos.estadoCivil"
          data-vv-as="estado civil"
          required
        />
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2"
          >Selecciona si tienes auto propio o alquilado:</label
        >
      </v-col>
      <v-col cols="12">
        <v-radio-group
          v-model="datos.propietario"
          v-validate="'required'"
          required
          class="ld-radio-group"
          colum
          :error-messages="errors.collect('datos.propietario')"
          data-vv-name="datos.propietario"
          data-vv-as="Propietario"
        >
          <v-radio
            class="ld-radio-p"
            :color="color"
            label="Tengo un auto propio"
            :value="true"
          />
          <v-radio
            class="ld-radio-p"
            :color="color"
            label="Alquilo un auto"
            :value="false"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Ingresa la información del vehículo:</label>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-text-field
          v-model="kilometraje"
          v-validate="'required|min:2|max:7|numeric'"
          label="Kilometraje total"
          :error-messages="errors.collect('datos.kilometraje')"
          data-vv-name="datos.kilometraje"
          required
          maxlength="7"
          data-vv-as="Kilometraje"
          :color="color"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-text-field
          v-model="datos.anioFabricacion"
          v-validate="'required|max:4|min:4'"
          :maxlength="4"
          :counter="4"
          data-vv-as="Año de Fabricación"
          :error-messages="errors.collect('datos.anioFabricacion')"
          label="Año de Fabricación"
          data-vv-name="datos.anioFabricacion"
          required
          type="tel"
          :color="color"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-autocomplete
          v-model="datos.marcaVehiculoAcceso"
          v-validate="'required'"
          label="Marca"
          :items="selectMarcaVehiculo"
          data-vv-as="marca"
          :error-messages="errors.collect('datos.marcaVehiculoAcceso')"
          data-vv-name="datos.marcaVehiculoAcceso"
          required
          :color="color"
          item-text="marca"
          item-value="coMarca"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <v-autocomplete
          v-model="datos.modeloVehiculoAcceso"
          v-validate="'required'"
          label="Modelo"
          :items="selectModeloVehiculo"
          data-vv-as="modelo"
          item-text="modelo"
          item-value="coModelo"
          :error-messages="errors.collect('datos.modeloVehiculoAcceso')"
          data-vv-name="datos.modeloVehiculoAcceso"
          :color="color"
          required
        />
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Ingresa tu información de contacto:</label>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="datos.telefono"
          v-validate="'required|numeric|max:9|min:9'"
          label="Número de telefono"
          :error-messages="errors.collect('datos.telefono')"
          data-vv-name="datos.telefono"
          type="tel"
          :maxlength="9"
          required
          :counter="9"
          data-vv-as="Telf."
          :color="color"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="datos.email"
          v-validate="'required|email|max:50|min:6'"
          label="Correo electrónico"
          :error-messages="errors.collect('datos.email')"
          data-vv-name="datos.email"
          type="email"
          :maxlength="50"
          :counter="50"
          required
          data-vv-as="email"
          :color="color"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="datos.terminosCondiciones"
          v-validate
          required
          value="1"
          :error-messages="errors.collect('datos.terminosCondiciones')"
          data-vv-name="datos.terminosCondiciones"
          data-vv-as="Terminos y condiciones"
          type="checkbox"
          :color="color"
        >
          <div slot="label">
            Acepto los
            <a
              slot="activator"
              :class="color + '--text'"
              @click="terms = !terms"
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
      <v-col cols="12" text-center>
        <!--
          <vue-recaptcha
            v-if="!promotor.state"
            ref="recaptcha"
            size="invisible"
            @verify="evaluarProspecto"
            @expired="onCaptchaExpired"
            :sitekey="sitekey"
          ></vue-recaptcha>
        -->
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
      <TerminosCondiciones :color="color" />
      <v-dialog v-model="terms" persistent max-width="700">
        <TerminosCondiciones :color="color" />
      </v-dialog>
    </v-row>
  </v-form>
</template>
<script>
/* import VueRecaptcha from "vue-recaptcha"; */
import { format, parseISO } from 'date-fns'
import numeral from 'numeral'
import ModalCasado from '@/components/modals/ModalCasado'

import { mixins } from '@/mixins/mixin.js'

export default {
  components: {
    ModalCasado,
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones')
  },
  mixins: [mixins],
  data() {
    return {
      showError: false,
      dialog: false,

      sitekey: process.env.SITEKEY_CAPTCHA,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1
        }
        /* {tipdoc: "CE", id: "3"} */
      ],
      selectEstadoCivil: [
        {
          estciv: 'Soltero',
          id: 'SO'
        },
        {
          estciv: 'Casado',
          id: 'CA'
        },
        {
          estciv: 'Viudo',
          id: 'VI'
        },
        {
          estciv: 'Divorciado',
          id: 'DI'
        }
      ],
      menu: false,
      loading: false,
      listVehiculos: []
    }
  },
  computed: {
    ...mapState('default', ['datos', 'terms']),
    ...mapState('users', ['promotor']),
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length === 7) {
          this.$store.commit('default/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', '')
          })
        }
      }
    },
    kilometraje: {
      get() {
        const newValue = this.$store.state.default.datos.kilometraje
        if (parseInt(newValue)) {
          return numeral(newValue).format('0,0')
        }
        return null
      },
      set(v) {
        //console.log("code " + v);
        if (parseInt(v)) {
          const decode = numeral(v).value()
          //console.log("decode " + decode);
          this.$store.commit('default/UPDATE_DATOS', { kilometraje: decode })
        } else {
          this.$store.commit('default/UPDATE_DATOS', { kilometraje: v })
        }
      }
    },

    estadoCivil() {
      return this.$store.state.default.datos.estadoCivil
    },

    documento() {
      return this.$store.state.default.datos.documento
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      } else {
        return null
      }
    },
    selectMarcaVehiculo() {
      return this.listVehiculos
    },
    selectModeloVehiculo() {
      return this.listVehiculos
        .filter((v) => v.coMarca === this.datos.marcaVehiculoAcceso)
        .sort()
    }
  },
  watch: {
    documento(newValue) {
      const doc = newValue
      if (doc && doc.length === 8) {
        this.getClient(doc)
      }
    },
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    estadoCivil(newValue) {
      if (newValue === 'CA' || newValue === 'CO') {
        this.$store.commit('default/UPDATE_MODAL_CASADO', true)
      }
    }
  },
  async mounted() {
    const response = await this.$axios({
      url: '/api/private/v1.0/detallevehiculoacceso',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      }
    })
    //console.log(response.data);
    this.listVehiculos = response.data
  },
  methods: {
    openTerms() {
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    async evaluarProspecto() {
      this.loading = true
      await this.$store.dispatch('default/preEvaluate', {
        codigoProducto: 34,
        codigoSubProducto: 2
      })

      this.loading = false
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    financial(x) {
      const r = Number.parseFloat(x || 0).toFixed(0)
      return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async getClient(documento) {
      const responseCliente = await this.$axios({
        url: '/api/private/v1.0/validarCliente',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          documento
        }
      })
      if (responseCliente.data.cliente) {
        this.$store.commit('default/UPDATE_DATOS', responseCliente.data)
      }
    }
  }
}
</script>
