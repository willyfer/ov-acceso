<template>
  <v-form ref="form" autocomplete="nope" @submit.prevent="setCaptcha">
    <v-row dense>
      <v-col cols="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">{{ title }}</h2>
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2 color--text">Ingresa tus datos básicos:</label>
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
          readonly
          required
        />
      </v-col>

      <v-col cols="12" md="6" lg="6">
        <v-text-field
          v-model="datos.documento"
          v-validate="'required|digits:' + docLen"
          :maxlength="docLen"
          :minlength="docLen"
          :error-messages="errors.collect('datos.documento')"
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
      <v-col cols="12" md="6" lg="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-validate="{ required: true }"
              :value="formatFechaNacimiento"
              label="Fecha de nacimiento"
              prepend-icon="event"
              color="soat"
              required
              data-vv-name="formatFechaNacimiento"
              data-vv-as="fecha"
              :error-messages="errors.collect('formatFechaNacimiento')"
              data-vv-delay="1000"
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
        <label class="ld-form-p2">¿La categoria de tu vehiculo es M1?</label>
      </v-col>
      <v-col cols="12">
        <v-radio-group
          v-model="datos.isCategory"
          v-validate="'required'"
          required
          class="ld-radio-group"
          colum
          :error-messages="errors.collect('datos.isCategory')"
          data-vv-name="datos.isCategory"
          data-vv-as="Propietario"
        >
          <v-radio class="ld-radio-p" :color="color" label="Si" :value="true" />
          <v-radio
            class="ld-radio-p"
            :color="color"
            label="No"
            :value="false"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Recorrido por día ( aprox ) :</label>
      </v-col>
      <v-col cols="12">
        <v-radio-group
          v-model="datos.recorridoxDia"
          v-validate="'required'"
          colum
          required
          class="ld-radio-group"
          :error-messages="errors.collect('datos.recorridoxDia')"
          data-vv-name="datos.recorridoxDia"
          data-vv-as="Recorrido"
        >
          <v-radio
            :color="color"
            class="ld-radio-p"
            label="0 - 50 Km"
            :value="1"
          />
          <v-radio
            :color="color"
            class="ld-radio-p"
            label="51 - 100 Km"
            :value="2"
          />
          <v-radio
            :color="color"
            class="ld-radio-p"
            label="más de 100 Km"
            :value="3"
          />
        </v-radio-group>
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Ingresa la información del vehículo:</label>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="datos.kilometraje"
          v-validate="'required|numeric'"
          label="Kilometraje total"
          :error-messages="errors.collect('datos.kilometraje')"
          data-vv-name="datos.kilometraje"
          type="tel"
          required
          data-vv-as="Kilometraje"
          :color="color"
          @keypress="isNumber"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="datos.anioFabricacion"
          v-validate="'required|digits:4'"
          label="Año de fabricación"
          :error-messages="errors.collect('datos.anioFabricacion')"
          data-vv-name="datos.anioFabricacion"
          type="tel"
          :maxlength="4"
          required
          data-vv-as="Año de fabricación"
          :color="color"
          @keypress="isNumber"
        />
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Ingresa tu información de contacto:</label>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="datos.telefono"
          v-validate="'required|numeric|max:9|min:9'"
          label="Número de celular"
          :error-messages="errors.collect('datos.telefono')"
          data-vv-name="datos.telefono"
          type="tel"
          :maxlength="9"
          required
          ccc
          data-vv-as="Telf."
          :color="color"
          @keypress="isNumber"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="datos.email"
          v-validate="'email|max:50|min:6'"
          label="Correo electrónico"
          :error-messages="errors.collect('datos.email')"
          data-vv-name="datos.email"
          type="email"
          :maxlength="50"
          :counter="50"
          data-vv-as="email"
          :color="color"
        />
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="datos.terminosCondiciones"
          v-validate="'required'"
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
    </v-row>
  </v-form>
</template>
<script>
import { format, parseISO } from 'date-fns'
import numeral from 'numeral'
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'

export default {
  components: {
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones')
  },
  mixins: [mixins],
  props: ['color', 'title'],
  data() {
    return {
      showError: false,
      dialog: false,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1
        }
        /* { tipdoc: 'CE', id: 2 } */
      ],
      menu: false,
      loading: false
    }
  },
  computed: {
    ...mapState('default', ['datos', 'terms']),
    ...mapState('users', ['promotor']),
    docLen() {
      switch (this.datos.tipoDocumento) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
      }
    },
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
    documento() {
      return this.datos.documento
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      } else {
        return null
      }
    }
  },
  methods: {
    openTerms() {
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    financial(x) {
      const r = Number.parseFloat(x || 0).toFixed(0)
      return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
