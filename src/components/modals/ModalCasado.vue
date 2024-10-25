<template>
  <v-dialog v-model="casadoModal" max-width="480">
    <v-form ref="form2" autocomplete="nope">
      <v-card class="ld-modal">
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              class="ld-modal-title"
              :class="color + '--text'"
              text-center
              >Completa los datos de tu conyuge</v-col
            >
            <v-col cols="12" md="6" lg="6">
              <v-select
                v-model="datos.tipoDocumentoConyuge"
                v-validate="'required'"
                :items="selectTipoDocumento"
                item-text="tipdoc"
                item-value="id"
                :error-messages="errors.collect('datos.tipoDocumentoConyuge')"
                label="Tipo de documento"
                data-vv-name="datos.tipoDocumentoConyuge"
                data-vv-as="Tipo"
                :color="color"
                required
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="datos.documentoConyuge"
                v-validate="'required|digits:' + docLen"
                data-vv-as="DNI"
                :maxlength="docLen"
                :minlength="docLen"
                :counter="docLen"
                :error-messages="errors.collect('datos.documentoConyuge')"
                label="DNI del conyuge"
                data-vv-name="datos.documentoConyuge"
                required
                type="tel"
                :color="color"
                @keypress="isNumber"
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="edadConyuge"
                v-validate="'required|numeric|max:2|min:2|between:18,70'"
                type="tel"
                :counter="2"
                :error-messages="errors.collect('edadConyuge')"
                label="Edad conyuge (años) "
                :maxlength="2"
                data-vv-name="edadConyuge"
                required
                :color="color"
                data-vv-as="edad"
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="datos.nombreConyuge"
                v-validate="'required'"
                :error-messages="errors.collect('datos.nombreConyuge')"
                label="Nombres"
                data-vv-name="datos.nombreConyuge"
                required
                :color="color"
                data-vv-as="nombres"
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="datos.apellidoPaternoConyuge"
                v-validate="'required'"
                :error-messages="errors.collect('datos.apellidoPaternoConyuge')"
                label="Apellido Paterno"
                data-vv-name="datos.apellidoPaternoConyuge"
                required
                :color="color"
                data-vv-as="apellidoPaterno"
              />
            </v-col>
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="datos.apellidoMaternoConyuge"
                v-validate="'required'"
                :error-messages="errors.collect('datos.apellidoMaternoConyuge')"
                label="Apellido Materno"
                data-vv-name="datos.apellidoMaternoConyuge"
                required
                :color="color"
                data-vv-as="apellidoMaterno"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col cols="6" class="text-center">
              <v-btn class="ld-btn-secondary" right @click="closeDialog"
                >Cancelar</v-btn
              >
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn
                :class="color"
                dark
                class="ld-btn"
                @click.native="setFormConyuge"
                >Continuar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { differenceInCalendarYears, getYear } from 'date-fns'

import { mixins } from '@/mixins/mixin.js'
export default {
  mixins: [mixins],
  props: ['color'],
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      snackbar: false,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1
        },
        { tipdoc: 'CE', id: 2 }
      ]
    }
  },
  computed: {
    docLen() {
      switch (this.datos.tipoDocumentoConyuge) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
      }
    },
    casadoModal() {
      return this.$store.state.default.casadoModal
    },
    datos() {
      return this.$store.state.default.datos
    },
    edadConyuge: {
      get() {
        const f = this.$store.state.default.datos.fechaNacimientoConyuge
        if (f) {
          const edad = differenceInCalendarYears(new Date(), f)
          return edad
        }
        return null
      },
      set(v) {
        const year = getYear(new Date())
        const f = `${year - v}-01-01`

        this.$store.commit('default/UPDATE_DATOS', {
          fechaNacimientoConyuge: f
        })
      }
    }
  },
  watch: {
    documentoConyuge(val) {
      if (val === this.datos.documento) {
        this.snackbar = true
      }
    }
  },
  methods: {
    setFormConyuge() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('default/UPDATE_MODAL_CASADO', false)
        }
      })
    },
    closeDialog() {
      this.$store.commit('default/UPDATE_MODAL_CASADO', false)
      this.$store.commit('default/UPDATE_DATOS', {
        estadoCivil: null
      })
    }
  }
}
</script>
<style scoped>
.ld-btn {
  min-width: 100px !important;
}
.ld-btn-secondary {
  min-width: 100px !important;
}
</style>
