<template>
  <div class="pa-3">
    <v-form ref="form1" autocomplete="nope" @submit.prevent="actualizarProspecto">
      <v-row dense class="d-flex flex-column">
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
            lg="8"
            class="d-flex flex-column justify-center"
            style="padding:4px"
          >
            <h2
              class="ld-h2-title-form display-1"
              :class="`${color}--text`"
            >Porfavor, completa y verifica los datos del cliente</h2>
          </v-col>
        </v-row>
        <v-row offset-cols="2">
          <v-col
            cols="12"
            md="8"
            no-gutters
            class="d-flex flex-column justify-center"
            style="padding:4px"
          >
            <span class="ld-form-p2 font-weight-black">Completa tu información personal</span>
          </v-col>
        </v-row>
        <v-row justify="center" style="padding:4px">
          <v-col cols="12" md="4" style="padding:4px; ">
            <v-text-field
              v-model="datos.apellidoPaterno"
              v-validate="'required'"
              data-vv-as="Apellido Paterno"
              :error-messages="errors.collect('datos.apellidoPaterno')"
              label="Apellido paterno"
              data-vv-name="datos.apellidoPaterno"
              readonly
              :color="color"
            />
          </v-col>
          <v-col cols="12" md="4" style="padding:4px">
            <v-text-field
              v-model="datos.apellidoMaterno"
              v-validate="'required'"
              data-vv-as="Apellido Materno"
              :error-messages="errors.collect('datos.apellidoMaterno')"
              label="Apellido materno"
              data-vv-name="datos.apellidoMaterno"
              readonly
              :color="color"
            />
          </v-col>
          <v-col cols="12" md="4" style="padding:4px">
            <v-text-field
              v-model="datos.nombres"
              v-validate="'required'"
              label="Nombres"
              data-vv-as="Nombre"
              :error-messages="errors.collect('datos.nombres')"
              data-vv-name="datos.nombres"
              readonly
              :color="color"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" style="padding:4px">
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
          <v-col cols="12" md="6" style="padding:4px">
            <v-text-field
              v-model="datos.telefono"
              v-validate="
                'required|numeric|regex:^([9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)$'
              "
              label="Número de telefono"
              :error-messages="errors.collect('datos.telefono')"
              data-vv-name="datos.telefono"
              type="phone"
              maxlength="9"
              minlength="9"
              required
              :counter="9"
              data-vv-as="Telf."
              :color="color"
              @keypress="isNumber"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" style="padding:4px">
            <v-select
              v-model="nivelEducacion"
              v-validate="'required'"
              :items="selectnivelEducacion"
              data-vv-as="Educación"
              item-text="nivedu"
              item-value="id"
              :error-messages="errors.collect('nivelEducacion')"
              label="Nivel de educación"
              data-vv-name="nivelEducacion"
              required
              :color="color"
            />
          </v-col>
          <v-col cols="12" md="3" lg="3" style="padding:4px">
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
              disabled
            />
          </v-col>
          <v-col cols="12" md="3" lg="3" style="padding:4px">
            <v-select
              v-model="estadoCivil"
              v-validate="'required'"
              :items="selectestadoCivil"
              item-text="estciv"
              item-value="id"
              :error-messages="errors.collect('estadoCivil')"
              label="Estado civil"
              data-vv-name="estadoCivil"
              data-vv-as="estado civil"
              disabled
              :color="color"
            />
          </v-col>
        </v-row>
        <v-row offset-cols="2">
          <v-col
            cols="12"
            md="8"
            no-gutters
            class="d-flex flex-column justify-center"
            style="padding:4px"
          >
            <span class="ld-form-p2 font-weight-black">Datos Complementarios</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" style="padding:4px">
            <v-autocomplete
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
              :color="color"
            />
          </v-col>
          <v-col cols="12" md="6" style="padding:4px">
            <v-autocomplete
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
              :color="color"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" style="padding:4px">
            <v-autocomplete
              v-model="profesion"
              v-validate="'required'"
              :color="color"
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
          <v-col cols="12" md="6" style="padding:4px">
            <v-select
              v-model="pep"
              v-validate="'required'"
              label="PEP"
              :color="color"
              :items="selectPep"
              data-vv-as="Pep"
              item-text="name"
              item-value="id"
              :error-messages="errors.collect('pep')"
              data-vv-name="pep"
              required
              hint="PEP = Persona expuesta politicamentte"
            />
          </v-col>
        </v-row>
        <v-row offset-cols="2">
          <v-col
            cols="12"
            md="8"
            no-gutters
            class="d-flex flex-column justify-center"
            style="padding:4px"
          >
            <span class="ld-form-p2 font-weight-black">Datos del vehículo</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" :md="showAnioFabricacion ? 4 : 6" style="padding:4px">
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
            />
          </v-col>
          <v-col cols="12" :md="showAnioFabricacion ? 4 : 6" style="padding:4px">
            <v-autocomplete
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
              :color="color"
              required
            />
          </v-col>
          <v-col v-if="showAnioFabricacion" cols="12" md="4" style="padding:4px">
            <v-text-field
              v-model="datos.anioFabricacion"
              v-validate="'required|numeric'"
              label="Año de fabricación"
              :error-messages="errors.collect('datos.anioFabricacion ')"
              data-vv-name="datos.anioFabricacion "
              type="text"
              maxlength="4"
              minlength="4"
              required
              :counter="4"
              data-vv-as="Año de Fabricacion "
              :color="color"
            />
          </v-col>
        </v-row>
        <v-row offset-cols="2">
          <v-col
            cols="12"
            md="8"
            no-gutters
            class="d-flex flex-column justify-center"
            style="padding:4px"
          >
            <span class="ld-form-p2 font-weight-black">Ingresa tu dirección completa</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" style="padding:4px">
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
          <v-col cols="12" md="6" style="padding:4px">
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
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" style="padding:4px">
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
          <v-col cols="12" md="6" style="padding:4px">
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
        </v-row>

        <v-col cols="12" md="12" class="text-center" mt-3>
          <v-btn class="ld-btn" :loading="loading" type="submit" :color="color">CONTINUAR</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js'
import { getMarca, getModelo } from '@/api/catalogue'
import { listSectorEconomico } from '@/utils/catalogo'
import { mixins } from '@/mixins/mixin.js'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: ['color'],
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', ['datos']),
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length > 3) {
          this.$store.commit('express/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', '')
          })
        }
      }
    },
    pep: {
      get() {
        if (this.datos.pep) {
          return this.datos.pep
        }
        return false
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { pep: v })
      }
    },
    ubigeo: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo
        }
        return null
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
      }
    },
    sectorEconomico: {
      get() {
        let newVal = this.datos.sectorEconomico
        if (!newVal) {
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
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
      }
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
    },
    selectSectoreconomico() {
      return listSectorEconomico
    },
    actividadEconomica: {
      get() {
        if (this.datos.actividadEconomica) {
          return this.datos.actividadEconomica
        } else {
          return 357
        }
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { actividadEconomica: v })
      }
    },
    estadoCivil: {
      get() {
        if (this.datos.estadoCivil) {
          return this.datos.estadoCivil
        }
        return 'SO'
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { estadoCivil: v })
      }
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
      }
    },
    nivelEducacion: {
      get() {
        if (this.datos.nivelEducacion) {
          return this.datos.nivelEducacion
        }
        return 'SC'
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { nivelEducacion: v })
      }
    }
  },
  data() {
    return {
      showAnioFabricacion: false,
      loginModalExpediente: false, //true
      loader: null,
      loading4: false,
      selectActividadeconomica: [],
      loading: false,
      loginLoading: false, //true
      listaModel: [],
      listaMarca: [],
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
      selectnivelEducacion: [
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
      selectestadoCivil: [
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
      selectOcupacion: [],
      listaActividadeconomica: [],
      selectPep: [
        {
          id: true,
          name: 'SI'
        },
        {
          id: false,
          name: 'NO'
        }
      ]
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    async marca(val) {
      /* console.log('marca') */

      await this.getModelo(val)
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    }
  },
  async mounted() {
    this.$ga.event('Activacion', 'Expediente')

    this.listaMarca = await getMarca(this.$axios)

    this.listaActividadeconomica = await this.getActividadeconomica()
    this.selectOcupacion = await this.getOcupacion()
  },
  methods: {
    async getModelo(params) {
      /* console.log('modelo') */
      this.listaModel = await getModelo(this.$axios, params)
    },

    async getOcupacion() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoOcupacion',
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
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
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      // console.log(response.data)
      return response.data
    },
    async actualizarProspecto() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const datosFichaReniec = {
            codigoProducto: this.datos.codigoProducto,
            tipoDocumento: this.datos.tipoDocumento,
            documento: this.datos.documento,
            placa: this.datos.placa,
            fechaNacimiento: this.datos.fechaNacimiento,
            estadoProspecto: this.datos.estadoProspecto,
            canalAtencion: this.datos.channel,
            codigoProspecto: this.datos.codigoProspecto,
            codigoEvaluacion: this.datos.codigoEvaluacion,
            codigoUsuario: this.promotor.codigoUsuario,
            apellidoPaterno: this.datos.apellidoPaterno,
            apellidoMaterno: this.datos.apellidoMaterno,
            anioFabricacion: this.datos.anioFabricacion,
            nombres: this.datos.nombres,
            email: this.datos.email,
            nivelEducacion: this.nivelEducacion,
            genero: this.datos.genero,
            estadoCivil: this.estadoCivil,
            sectorEconomico: this.sectorEconomico,
            actividadEconomica: this.actividadEconomica,
            profesion: this.profesion,
            pep: this.datos.pep,
            marca: this.datos.marca,
            modelo: this.datos.modelo,
            telefono: this.datos.telefono,
            ubigeo: this.ubigeo,
            direccion: this.datos.direccion,
            jsonReniec: this.datos.jsonReniec
          }
          const respFichaReniec = await this.$store.dispatch(
            'express/enviarFichaReniec',
            datosFichaReniec
          )

          /* console.log('resp ficha reniec: ', respFichaReniec) */
          if (respFichaReniec.codigoRespuesta == '00') {
            this.$store.commit('express/UPDATE_DATOS', respFichaReniec)
            this.$store.commit('ui/UPDATE_STEP', 5)
          } else {
            this.$store.commit(
              'ui/SET_OPENDIALOG',
              {
                estado: true,
                mensaje: respFichaReniec.detalleRespuesta
              },
              { root: true }
            )
          }
        }
      })
    }
  }
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
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
</style>
