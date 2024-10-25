<template>
  <div>
    <v-form
      ref="form1"
      autocomplete="nope"
      @submit.prevent="actualizarProspecto"
    >
      <v-row dense>
        <v-col cols="12" md="12">
          <h4 class="ld-h2-title-form" :class="`${color}--text`">
            Por favor, completa tus datos para continuar
          </h4>
        </v-col>
        <v-col cols="12" md="12" pb-2>
          <p class="ld-form-p2">Completa tu información personal</p>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field
            v-model="datos.apellidoPaterno"
            v-validate="'required'"
            data-vv-as="Apellido Paterno"
            :error-messages="errors.collect('datos.apellidoPaterno')"
            label="Apellido paterno"
            data-vv-name="datos.apellidoPaterno"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field
            v-model="datos.apellidoMaterno"
            v-validate="'required'"
            data-vv-as="Apellido Materno"
            :error-messages="errors.collect('datos.apellidoMaterno')"
            label="Apellido materno"
            data-vv-name="datos.apellidoMaterno"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field
            v-model="datos.nombres"
            v-validate="'required'"
            label="Nombres"
            data-vv-as="Nombre"
            :error-messages="errors.collect('datos.nombres')"
            data-vv-name="datos.nombres"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select
            v-model="datos.nivelEducacion"
            v-validate="'required'"
            :items="selectNivelEducacion"
            data-vv-as="Educación"
            item-text="nivedu"
            item-value="id"
            :error-messages="errors.collect('datos.nivelEducacion')"
            label="Nivel de educación"
            data-vv-name="datos.nivelEducacion"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select
            v-model="datos.genero"
            v-validate="'required'"
            :color="color"
            :items="selectGenero"
            data-vv-as="Genero"
            item-text="gen"
            item-value="id"
            :error-messages="errors.collect('datos.genero')"
            label="Género"
            data-vv-name="datos.genero"
            required
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select
            v-model="datos.situacionLaboral"
            v-validate="'required'"
            :items="selectSituacionLaboral"
            item-text="sitlab"
            item-value="id"
            :error-messages="errors.collect('datos.situacionLaboral')"
            label="Situación laboral"
            data-vv-name="datos.situacionLaboral"
            data-vv-as="Situación laboral"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="12" py-2>
          <p class="ld-form-p2">Ingresa tu dirección completa</p>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select
            v-model="departamento"
            v-validate="'required'"
            label="Departamento"
            :color="color"
            :items="selectDepartamento"
            data-vv-as="Departamento"
            item-text="dep"
            item-value="id"
            :error-messages="errors.collect('departamento')"
            data-vv-name="departamento"
            required
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select
            v-model="provincia"
            v-validate="'required'"
            :color="color"
            label="Provincia"
            :items="selectProvincia"
            data-vv-as="Provincia"
            item-text="pro"
            item-value="id"
            :error-messages="errors.collect('provincia')"
            data-vv-name="provincia"
            required
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-autocomplete
            v-model="ubigeo"
            v-validate="'required'"
            :color="color"
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
        <v-col cols="12" md="12">
          <v-text-field
            v-model="datos.direccion"
            v-validate="'required'"
            :error-messages="errors.collect('datos.direccion')"
            data-vv-as="Direccion"
            label="Dirección"
            data-vv-name="datos.direccion"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="12" class=" text-center mt-3">
          <v-btn class="ld-btn" type="submit" :color="color">CONTINUAR</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['color'],
  data() {
    return {
      dialogCasado: false,
      departamento: {
        dep: 'Lima',
        id: '15'
      },
      selectNivelEducacion: [
        {
          nivedu: 'Secundaria Completa',
          id: 'SC'
        },
        {
          nivedu: 'Secundaria Incompleta',
          id: 'SI'
        },
        {
          nivedu: 'Técnico Completo',
          id: 'TC'
        },
        {
          nivedu: 'Técnico Incompleto',
          id: 'TI'
        },
        {
          nivedu: 'Universitario Completo',
          id: 'UC'
        },
        {
          nivedu: 'Universitario Incompleto',
          id: 'UI'
        }
      ],
      selectGenero: [
        {
          gen: 'Femenino',
          id: 'F'
        },
        {
          gen: 'Masculino',
          id: 'M'
        }
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
      selectDepartamento: [
        {
          dep: 'Lima',
          id: '15'
        }
      ],
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
      selectSituacionLaboral: [
        {
          sitlab: 'Dependiente formal',
          id: 'DF'
        },
        {
          sitlab: 'Dependiente informal',
          id: 'DI'
        },
        {
          sitlab: 'Independiente formal',
          id: 'IF'
        },
        {
          sitlab: 'Independiente informal',
          id: 'II'
        }
      ]
    }
  },
  computed: {
    datos() {
      return this.$store.state.default.datos
    },
    ubigeo: {
      get() {
        if (this.$store.state.default.datos.ubigeo) {
          return this.$store.state.default.datos.ubigeo
        }
        return null
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { ubigeo: v })
      }
    },
    provincia: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo.slice(0, 4)
        }
        return '1501'
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { ubigeo: v })
      }
    },
    selectDistrito() {
      if (this.provincia === '1501') {
        return selectDistritoLima
      }
      if (this.provincia === '0701') {
        return selectDistritoCallao
      }
      return []
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  mounted() {
    this.$ga.event('Expediente', 'Visualización')
  },
  methods: {
    actualizarProspecto() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event('Expediente', 'Formulario Completo')
          this.$store.dispatch('default/actualizarProspecto')
        } else {
          this.$ga.event('Expediente', 'Formulario Incompleto')
        }
      })
    }
  }
}
</script>
