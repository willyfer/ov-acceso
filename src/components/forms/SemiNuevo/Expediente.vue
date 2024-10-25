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
            v-model="datos.estadoCivil"
            v-validate="'required'"
            :items="selectEstadoCivil"
            item-text="estciv"
            item-value="id"
            :error-messages="errors.collect('datos.estadoCivil')"
            label="Estado civil"
            data-vv-name="datos.estadoCivil"
            data-vv-as="estado civil"
            required
            :color="color"
          />
        </v-col>

        <v-col cols="12" md="12" py-2>
          <p class="ld-form-p2">Información Financiaria</p>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field
            v-model="datos.ingresoMensual"
            v-validate="'required'"
            label="Ingreso Mensual"
            :error-messages="errors.collect('datos.ingresoMensual')"
            data-vv-name="datos.ingresoMensual"
            required
            mask
            maxlength="5"
            data-vv-as="Ingreso Mensual"
            type="tel"
            prefix="S/"
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-autocomplete
            v-model="datos.tipoRegimenLaboral"
            v-validate="'required'"
            :items="selectSituacionLaboral"
            item-text="sitlab"
            item-value="id"
            :error-messages="errors.collect('datos.tipoRegimenLaboral')"
            label="Régimen laboral"
            data-vv-name="datos.tipoRegimenLaboral"
            data-vv-as="Situación laboral"
            required
            :color="color"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="datos.cargaFamiliar"
            v-validate="'numeric|max:12|min:1'"
            :color="color"
            maxlength="2"
            minlength="1"
            placeholder="0"
            label="¿Cuántas personas dependen de tí?"
            :error-messages="errors.collect('datos.cargaFamiliar')"
            data-vv-name="datos.cargaFamiliar"
            @keypress="isNumber"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-autocomplete
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
            item-text="name"
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
            item-text="name"
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
        <v-autocomplete
          v-model="datos.tipoResidencia"
          v-validate="'required'"
          :items="selectTipoResidencia"
          data-vv-as="Tipo de residencia"
          item-text="name"
          item-value="id"
          :error-messages="errors.collect('datos.tipoResidencia')"
          label="Tipo de residencia"
          data-vv-name="datos.tipoResidencia"
          required
          :color="color"
        />
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
        <v-col cols="12" md="12" class="text-center mt-3">
          <v-btn class="ld-btn" :loading="loading" type="submit" :color="color"
            >CONTINUAR</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <ModalCasado :color="color" dark />
  </div>
</template>
<script>
/* import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js' */
import { format } from 'date-fns'
import { mapState } from 'vuex'
import ModalCasado from '@/components/modals/ModalCasado'
import { catalogoProvincias, catalogoDistritos } from '@/api/catalogue'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['color'],
  computed: {
    ...mapState('default', ['datos', 'bussines', 'step']),
    estadoCivil() {
      return this.datos.estadoCivil
    },
    ubigeo: {
      get() {
        if (this.$store.state.default.datos.ubigeo) {
          this.departamento = this.$store.state.default.datos.ubigeo.slice(0, 2)
          this.provincia = this.$store.state.default.datos.ubigeo.slice(0, 4)
          return this.$store.state.default.datos.ubigeo
        } else {
          this.departamento = '15'
          this.provincia = '1501'
        }
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { ubigeo: v })
      }
    }
  },
  components: {
    ModalCasado
  },
  data() {
    return {
      im_garmov: null,
      loading: false,
      departamento: null,
      provincia: null,
      distrito: null,
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
          estciv: 'Conviviente',
          id: 'CO'
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
      selectDepartamento: [],
      selectProvincia: [],
      selectDistrito: [],
      selectSituacionLaboral: [
        {
          sitlab: '4ta categoría',
          id: 4
        },
        {
          sitlab: '5ta categoría',
          id: 5
        },
        {
          sitlab: 'Otros',
          id: 9
        }
      ],
      selectTipoResidencia: [
        {
          name: 'Propia',
          id: 'P'
        },

        {
          name: 'Familiar',
          id: 'F'
        },

        {
          name: 'Alquilado',
          id: 'A'
        }
      ]
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    estadoCivil(nuevo) {
      if (nuevo === 'CA' || nuevo === 'CO') {
        this.$store.commit('default/UPDATE_MODAL_CASADO', true)
      } else {
        this.$store.commit('default/UPDATE_MODAL_CASADO', false)
      }
      // console.log(nuevo)
    },
    departamento(region_id) {
      // console.log('listening depa: ' + region_id)
      this.catalogoProvincias(region_id)
    },
    provincia(province_id) {
      // console.log('listening pro ' + province_id)
      this.catalogoDistritos(province_id)
    }
  },
  async mounted() {
    this.$ga.event('Expediente', 'Visualización')
    // await this.getNacionalidad()
    await this.catalogoDepartamentos()
    await this.getParametros()

    this.$store.commit('default/UPDATE_DATOS', {
      nacionalidad: '187',
      paisResidencia: '187'
    })
  },
  methods: {
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    async catalogoDepartamentos() {
      const departamento = await this.$store.dispatch(
        'default/catalogoDepartamentos'
      )
      // console.log(departamento)
      this.selectDepartamento = departamento
    },
    async catalogoProvincias(region_id) {
      const provincia = await catalogoProvincias(this.$axios, {
        region_id
      })
      // console.log(provincia)
      this.selectProvincia = provincia
    },
    async catalogoDistritos(province_id) {
      const distrito = await catalogoDistritos(this.$axios, {
        province_id
      })
      // console.log('distritos')
      // console.log(distrito)
      this.selectDistrito = distrito
    },
    async actualizarProspecto() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event('Expediente', 'Formulario Completo')
          this.loading = true
          /* call to admision */
          let step = this.step
          this.$store.commit('default/UPDATE_STEP', -1)

          const result = await this.$store.dispatch('default/postAdmision') // 00 o 01
          const cuotas = [24, 36, 48]

          const rciTotal = []
          const importeFinanciar = result.importeMaximoFinanciar
          for (let index = 0; index < cuotas.length; index++) {
            const cantidadCuotas = cuotas[index]
            // console.log(cantidadCuotas + '--' + importeFinanciar)
            await this.$store.dispatch('default/getValorCuota', {
              cantidadCuotas,
              importeFinanciar
            }) // 00 o 01

            // console.log('_importeCuotas: ' + this.datos.importeCuotas)
            const getRCI = await this.$store.dispatch(
              'default/enviarFinanciamiento'
            )
            rciTotal.push({
              ...getRCI,
              cantidadCuotas,
              importeFinanciar
            })
          }

          // console.log('--rciTotal--')
          // console.log(rciTotal)
          const arrayRCI = rciTotal.filter((v) => v.codigoEstado === 1)
          // console.log('Availables')
          // console.log(arrayRCI)
          const rciDesaprobado = rciTotal.filter((v) => v.codigoEstado === 2)
          // console.log('Desaprobados')
          // console.log(rciDesaprobado)

          let detalleProspecto = ''
          let resultadoProspecto = 1

          if (result.codigoEstado === 2 || rciDesaprobado.length >= 3) {
            detalleProspecto = ''
            if (result.codigoEstado === 2) {
              detalleProspecto = result.detalleProspecto
            }
            if (rciDesaprobado.length >= 3) {
              detalleProspecto = detalleProspecto.concat(
                rciDesaprobado[0].detalleProspecto
              )
            }
            this.$store.commit('ui/SET_MODAL', { id: 2, state: true })
            resultadoProspecto = 2
            step = 1
          }

          if (this.datos.tipoRegimenLaboral === 9) {
            // console.log('ESTOY EN EL IF DE VALIDACION TIPO REGIMEN LABORAL')
            this.$store.commit('ui/SET_MODAL', { id: 2, state: true })
            resultadoProspecto = 2
            detalleProspecto = detalleProspecto.concat(
              '- Regimen Laboral :  Otros'
            )
            step = 1
          }

          this.$store.commit('default/UPDATE_DATOS', {
            ...result.prospecto,
            resultadoProspecto,
            detalleProspecto,
            arrayRCI,
            rciTotal
          })
          this.$store.commit('default/UPDATE_STEP', step)
          await this.$store.dispatch('default/actualizarProspecto')
          this.loading = false
        } else {
          this.$ga.event('Expediente', 'Formulario Incompleto')
        }
      })
    },

    async getParametros() {
      // console.log('GET_PARAMETRIA')
      const data = {
        codigoProducto: this.bussines.codigoProducto,
        codigoSubProducto: this.bussines.codigoSubProducto,
        canalColocacion: null
      }
      const response = await this.$axios({
        url: '/api/private/v1.0/evaluacionParametros',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data
      })
      const result = response.data
      // console.log(result)
      this.$store.commit('default/UPDATE_DATOS', { ...result })
      return result
    }
  }
}
</script>
