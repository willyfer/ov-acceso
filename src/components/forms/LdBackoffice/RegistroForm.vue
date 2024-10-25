<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column">
      <h3 class="pa-2">{{ titulo }}</h3>
      <h3 class="pa-2">Completa la información de tu cliente</h3>
    </div>
    <v-form class="pa-2" fluids>
      <v-row>
        <v-col>
          <v-text-field
            v-model="datos.apellidoPaterno"
            v-validate="'required'"
            data-vv-as="Apellido Paterno"
            label="Apellido paterno"
            data-vv-name="datos.apellidoPaterno"
            required
            :color="color"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="datos.apellidoMaterno"
            v-validate="'required'"
            data-vv-as="Apellido Materno"
            label="Apellido Materno"
            data-vv-name="datos.apellidoMaterno"
            required
            :color="color"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="datos.nombres"
            v-validate="'required'"
            data-vv-as="Nombres"
            label="Nombres"
            data-vv-name="datos.nombres"
            required
            :color="color"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="datos.email"
            v-validate="'required'"
            data-vv-as="Correo Electrónico"
            label="Correo Electrónico"
            data-vv-name="datos.email"
            required
            :color="color"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="datos.telefono"
            v-validate="'required'"
            data-vv-as="Teléfono"
            label="Teléfono"
            data-vv-name="datos.telefono"
            required
            :color="color"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="datos.nivelEducacion"
            v-validate="'required'"
            :items="selectNivelEduca"
            data-vv-as="Educación"
            item-text="nivedu"
            item-value="id"
            label="Nivel de educación"
            data-vv-name="datos.nivelEducacion"
            required
            :color="color"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="datos.genero"
            v-validate="'required'"
            :color="color"
            :items="selectGenero"
            data-vv-as="Genero"
            item-text="gen"
            item-value="id"
            label="Género"
            data-vv-name="datos.genero"
            required
          />
        </v-col>
        <v-col>
          <v-select
            v-model="datos.estadoCivil"
            v-validate="'required'"
            :items="selectEstadoCivil"
            item-text="estciv"
            item-value="id"
            label="Estado civil"
            data-vv-name="datos.estadoCivil"
            data-vv-as="estado civil"
            required
            :color="color"
          />
        </v-col>
      </v-row>
      <h3>Datos Complementarios</h3>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="datos.sectorEconomico"
            v-validate="'required'"
            :items="listSectorEconomico"
            data-vv-as="Sector Economico"
            item-text="name"
            item-value="id"
            :error-messages="errors.collect('sectorEconomico')"
            label="Sector Economico"
            data-vv-name="datos.sectorEconomico"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-autocomplete
            v-model="actividadEconomica"
            v-validate="'required'"
            :items="selectActividadeconomica"
            data-vv-as="Actividad"
            item-text="name"
            item-value="id"
            label="Actividad económica"
            data-vv-name="actividadEconomica"
            required
            :color="color"
          />
        </v-col>
      </v-row>
    </v-form>
    <div></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import {
  selectNivelEducacion,
  selectGenero,
  selectEstadoCivil,
  listSectorEconomico
} from '@/utils/catalogo'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    titulo: {
      type: String,
      default: 'Por favor, completa tus datos para continuar'
    }
  },
  data() {
    return {
      nivelEducacion: [''],
      listaActividadeconomica: []
    }
  },
  methods: {
    async getActividadeconomica() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoActividadecomomica',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      // console.log(response.data)
      return response.data
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    selectNivelEduca() {
      return selectNivelEducacion
    },
    selectGenero() {
      return selectGenero
    },
    selectEstadoCivil() {
      return selectEstadoCivil
    },
    listSectorEconomico() {
      return listSectorEconomico
    },
    selectActividadeconomica() {
      if (this.datos.sectorEconomico) {
        const filterList = this.listaActividadeconomica.filter(
          (val) => val.fk === this.datos.sectorEconomico
        )
        return filterList
      }
    }
  },
  async mounted() {
    this.listaActividadeconomica = await this.getActividadeconomica()
  }
}
</script>
