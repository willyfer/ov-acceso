<template>
  <div class="pre-evaluation-credinstante">
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <RegistrationPersonalDataHeaderContent />
    </SharedHeaderWithStepper>
    <div class="registration-personal-data-form">
      <v-row>
        <v-col cols="12" xs="12">
          <InformationContainer title="Datos del domicilio" align="flex-start">
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
          </InformationContainer>
        </v-col>
        <v-col cols="12" xs="12">
          <InformationContainer
            title="Datos complementarios"
            align="flex-start"
          >
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
          </InformationContainer>
        </v-col>
        <v-col cols="12" xs="12">
          <InformationContainer title="Datos del vehículo" align="flex-start">
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
          </InformationContainer>
        </v-col>
        <div class="button-registration-personal-data">
          <SharedButton
            text="Confirmar datos"
            :buttonOrange="true"
            :totalWidth="60"
            :loading="loading"
            @click="confirmarDatos"
          />
        </div>
      </v-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import InformationContainer from '@/components/shared/InformationContainer'
import SharedButton from '@/components/shared/SharedButton'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import RegistrationPersonalDataHeaderContent from '@/components/shared/registrationPersonalData/RegistrationPersonalDataHeaderContent'
import { mixins } from '@/mixins/mixin.js'
import { codPage } from '@/enums/credinstante-enums'
import {
  arrayDepartamentos,
  arrayProvincias,
  arrayDistritos,
} from '@/utils/ubigeo.js'
import { getMarca, getModelo } from '@/api/catalogue'
import { listSectorEconomico } from '@/utils/catalogo'

export default {
  components: {
    InformationContainer,
    SharedButton,
    SharedHeaderWithStepper,
    RegistrationPersonalDataHeaderContent,
  },
  $_veeValidate: {
    validator: 'new',
  },
  mixins: [mixins],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  async mounted() {
    this.selectOcupacion = await this.getOcupacion()
    this.listaActividadeconomica = await this.getActividadeconomica()
    this.listaMarca = await getMarca(this.$axios)
    if (this.datos.marca) {
      await this.getModelo(this.datos.marca)
    }
  },
  computed: {
    ...mapState('credinstante', ['datos']),
    selectSectoreconomico() {
      return listSectorEconomico
    },
    direccion: {
      get() {
        return this.datos.direccion
      },
      set(v) {
        this.$store.commit('credinstante/UPDATE_DATOS', { direccion: v })
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
        this.$store.commit('credinstante/UPDATE_DATOS', { sectorEconomico: v })
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
        this.$store.commit('credinstante/UPDATE_DATOS', {
          actividadEconomica: v,
        })
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
        this.$store.commit('credinstante/UPDATE_DATOS', { profesion: v })
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
        this.$store.commit('credinstante/UPDATE_DATOS', { marca: v })
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
        this.$store.commit('credinstante/UPDATE_DATOS', { modelo: v })
      },
    },
    departamento: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('credinstante/UPDATE_DATOS', {
            departamento: '15',
          })
          return '15'
        } else {
          return this.datos.departamento
        }
      },
      set(v) {
        this.$store.commit('credinstante/UPDATE_DATOS', { departamento: v })
      },
    },
    provincia: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('credinstante/UPDATE_DATOS', { provincia: '1501' })
          return '1501'
        } else {
          return this.datos.provincia
        }
      },
      set(v) {
        this.$store.commit('credinstante/UPDATE_DATOS', { provincia: v })
      },
    },
    distrito: {
      get() {
        if (!this.datos.ubigeo) {
          this.$store.commit('credinstante/UPDATE_DATOS', {
            distrito: '150101',
            ubigeo: '150101',
          })
          return '150101'
        } else {
          return this.datos.distrito
        }
      },
      set(v) {
        this.$store.commit('credinstante/UPDATE_DATOS', {
          distrito: v,
          ubigeo: v,
        })
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
      colorForm: '#005092',
      loading: false,
      selectActividadeconomica: [],
      listaActividadeconomica: [],
      selectOcupacion: [],
      listaMarca: [],
      listaModel: [],
      isDisabledModelo: false,
    }
  },
  methods: {
    selectDep() {
      console.log('change departamento')
      this.$store.commit('credinstante/UPDATE_DATOS', {
        provincia: null,
        distrito: null,
      })
    },
    selectPro() {
      console.log('change distrito')
      this.$store.commit('credinstante/UPDATE_DATOS', {
        distrito: null,
      })
      /* this.ubigeo = null */
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
    confirmarDatos() {
      try {
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.loading = true
            const dataForm = {
              codigoProducto: this.datos.codigoProducto,
              tipoDocumento: this.datos.tipoDocumento == 'D' ? 1 : 1,
              documento: this.datos.documento,
              placa: this.datos.placa,
              canalAtencion: this.datos.canalAtencion,
              origen: this.datos.origen,
              canal: 1,
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
            }
            this.$store.commit(
              'credinstante/SET_DATA_CREATE_PROCEEEDINGS',
              dataForm
            )
            this.$store.commit('credinstante/SET_STEP', codPage.CHOOSE_PAYMENT)
            this.loading = false
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
  },
  watch: {
    async marca(val) {
      await this.getModelo(val)
    },
  },
}
</script>
<style scoped lang='scss'>
.pre-evaluation-credinstante {
  padding: 4px 8px 8px 8px;
  .button-registration-personal-data {
    width: 100%;
    text-align: center;
    margin: 50px 0;
  }
}
</style>
