 <template>
  <div class="pa-3 confirmar-datos__container">
    <!-- <v-form ref="form" autocomplete="nope" class="from-datos"> -->
    <form class="from-datos">
      <v-row>
        <v-col
          cols="12"
          md="12"
          lg="12"
          class="d-flex flex-column"
          style="padding: 4px"
        >
          <h2 class="h2-titulo">
            Datos adicionales
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
          <span class="ld-form-p2 label-form"
            >Completa tu información personal</span
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="form.apellidoPaterno"
            v-validate="'required'"
            :error-messages="errors.collect('form.apellidoPaterno')"
            data-vv-as="Apellido Paterno"
            label="Apellido Paterno"
            data-vv-name="form.apellidoPaterno"
            required
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="form.apellidoMaterno"
            v-validate="'required'"
            :error-messages="errors.collect('form.apellidoMaterno')"
            data-vv-as="Apellido Materno"
            label="Apellido Materno"
            data-vv-name="form.apellidoMaterno"
            required 
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="form.nombres"
            v-validate="'required'"
            :error-messages="errors.collect('form.nombres')"
            data-vv-as="Nombres"
            label="Nombres"
            data-vv-name="form.nombres"
            required
            :color="colorForm"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12" style="padding: 4px">
          <v-select
            v-model="form.educationLevel"
            :items="listaNivelesEducacion"
            item-text="name"
            item-value="id"
            label="Selecciona tu nivel de educación"
            outlined
            dense
            required
            :error-messages="educationLevelErrors"
            @change="$v.form.educationLevel.$touch()"
            @blur="$v.form.educationLevel.$touch()"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" sm="12" style="padding: 4px">
          <v-select
            v-model="form.genero"
            :items="selectGenero"
            item-text="gen"
            item-value="id"
            label="Selecciona tu género"
            required
             v-validate="'required'"
            outlined
            dense
            data-vv-as="Genero"
            :error-messages="errors.collect('form.genero')"
            data-vv-name="form.genero"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6" sm="12" style="padding: 4px">
          <v-select
            v-model="form.maritalStatus"
            :items="listaEstadosCiviles"
            item-text="name"
            item-value="id"
            label="Selecciona tu estado civil"
            outlined
            dense
            required
            :error-messages="maritalStatusErrors"
            @change="$v.form.maritalStatus.$touch()"
            @blur="$v.form.maritalStatus.$touch()"
          ></v-select>
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
          <span class="ld-form-p2 label-form"
            >Ingresa tu dirección completa</span
          >
        </v-col>
      </v-row>
      <v-row>
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
        <v-col cols="12" md="12" sm="12" style="padding: 4px">
          <v-text-field
            outlined
            dense
            v-model="form.direccion"
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
    </form>
    <!-- </v-form>  -->
    <v-dialog v-model="terms" persistent max-width="700">
      <TerminosCondiciones :color="color" />
    </v-dialog>
  </div>
</template>
<script>
import { mapState ,mapGetters} from 'vuex'
import {
  arrayDepartamentos,
  arrayProvincias,
  arrayDistritos,
} from '@/utils/ubigeo.js'
import { listSectorEconomico } from '@/utils/catalogo'
import ModalPagos from '@/components/modals/ModalPagos'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import preEvaluationMixin from '@/mixins/preEvaluationMixin'
import { getSchematicRegistrationData } from '@/validationSchemes/celulares'
export default {
  components: {
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
    ModalPagos,
  },
  $_veeValidate: {
    validator: 'new',
  },

  mixins: [actionsByCodeMixin, preEvaluationMixin],

  props: {
    color: String,
    currentComponent: { type: Object, default: () => ({}) },
  },
  async mounted() {
    try {
      const { catalogs: consulta } = this.currentComponent
      // console.log('consulta', consulta)
      // console.log('this.currentComponent', this.currentComponent)
      const { codigoEntidad } = this.$store.state.users.promotor
      await this.$store.dispatch('catalogue/getCatalogs', {
        tipoProducto: this.productCode,
        consulta,
      })
    } catch (error) {
      this.$showError(error)
    }
  },
  validations() {
    return getSchematicRegistrationData()
  },
  data() {
    return {
      form: {
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        maritalStatus: '',
        educationLevel: '',
        genero: '',
        direccion: '',
        provincia:'',
        departamento:'',
        distrito:''
      },
      selectGenero: [
        {
          gen: 'Femenino',
          id: 'F',
        },
        {
          gen: 'Masculino',
          id: 'M',
        },
      ], 
      colorForm: '#005092',
      loader: null,
      loading: false, 
      tyc: '1', 
      listaMarca: [],
      listaModel: [],
      email: null,
    }
  },

  computed: {
    ...mapState('celulares', ['additionalDataForm']),
    ...mapState('users', ['promotor']),
    ...mapState('default', ['terms']),
    selectSectoreconomico() {
      return listSectorEconomico
    },
    maritalStatusErrors() {
      const errors = []
      if (!this.$v.form.maritalStatus.$dirty) return errors
      !this.$v.form.maritalStatus.required && errors.push('Campo requerido')
      return errors
    },
    educationLevelErrors() {
      const errors = []
      if (!this.$v.form.educationLevel.$dirty) return errors
      !this.$v.form.educationLevel.required && errors.push('Campo requerido')
      return errors
    },
     

    departamento: {
      get() {
        if (!this.additionalDataForm.ubigeo) {
          this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', { departamento: '15' })
          return '15'
        } else {
          return this.additionalDataForm.departamento
        }
      },
      set(v) {
        this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', { departamento: v })
      },
    },
    provincia: {
      get() {
        if (!this.additionalDataForm.ubigeo) {
          this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', { provincia: '1501' })
          return '1501'
        } else {
          return this.additionalDataForm.provincia
        }
      },
      set(v) {
        this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', { provincia: v })
      },
    },
    distrito: {
      get() {
        if (!this.additionalDataForm.ubigeo) {
          this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', {
            distrito: '150101',
            ubigeo: '150101',
          })
          return '150101'
        } else {
          return this.additionalDataForm.distrito
        }
      },
      set(v) {
        this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', { distrito: v, ubigeo: v })
      },
    },
    selectDepartamento() {
      var selectDepartamento = arrayDepartamentos.filter((va) => {
        if (
          this.additionalDataForm.codigoProducto == 17 ||
          this.additionalDataForm.codigoProducto == 18
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
        // console.log('aditional slice',va.id.slice(0, 2))

        if (va.id.slice(0, 2) == this.additionalDataForm.departamento) {
          return va
        }
      })
      return selectProvincias
    },
    selectDistrito() {
      var selectDistritos = arrayDistritos.filter((va) => {
        if (va.id.slice(0, 4) == this.additionalDataForm.provincia) {
          return va
        }
      })
      return selectDistritos
    },
  },

  methods: {
    selectDep() {
      console.log('change departamento')
      this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', {
        provincia: null,
        distrito: null,
      })
    },
    selectPro() {
      console.log('change distrito')
      this.$store.commit('celulares/SET_ADDITIONAL_DATA_FORM', {
        distrito: null,
      })
      /* this.ubigeo = null */
    },
    

    openTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
     
    confirmarDatos() {
      try {
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.loading = true

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
              email: this.email,
            }

            let datosMedioDesembolso = null

            // datosForm = {
            //   ...datosForm,
            //   ...datosMedioDesembolso,
            // }
            this.$store.commit('celulares/SET_STEP', 7)
            //   console.log('datosForm: ', datosForm)
            // this.$store
            //   .dispatch('express/confirmarDatos', JSON.stringify(datosForm))
            //   .then((res) => {
            //     if (res.codRes == '00') {
            //       this.$store.commit(
            //         'express/UPDATE_DATOS',
            //         this.datos.selectOficina
            //       )
            //       this.$store.commit(
            //         'express/SET_TIPO_DESEMBOLSO',
            //         this.tipoDesembolso
            //       )
            //       this.$store.commit('express/SET_CONFIR_DATOS', res)
            //       this.$store.commit('ui/UPDATE_STEP', 6)
            //     } else if (res.codRes == '99') {
            //       this.$store.commit('ui/SET_OPENDIALOGALERT', {
            //         imgModal: 'warning',
            //         tituloModal: '¡Lo sentimos!',
            //         msgModal:
            //           'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
            //         maxWidth: 350,
            //         estadoModal: true,
            //         isReset: true,
            //       })
            //       setTimeout(() => {
            //         this.$store.commit('ui/UPDATE_STEP', 1)
            //       }, 4000)
            //     } else {
            //       throw new Error(
            //         'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
            //       )
            //     }
            //   })
            //   .catch((err) => {
            //     this.$store.commit('ui/SET_OPENDIALOGALERT', {
            //       imgModal: 'error',
            //       tituloModal: '¡Error!',
            //       msgModal:
            //         'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
            //       maxWidth: 350,
            //       estadoModal: true,
            //       isReset: true,
            //     })
            //   })
            //   .finally(() => {
            //     this.loading = false
            //   })
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
