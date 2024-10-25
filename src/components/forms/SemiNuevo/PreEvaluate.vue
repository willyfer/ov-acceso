<template>
  <v-form ref="form" autocomplete="nope" @submit.prevent="setCaptcha">
    <v-row dense>
      <v-col cols="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">
          ¡Pide tu crédito vehicular ahora!
        </h2>
      </v-col>
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Completa tus datos:</label>
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
          :counter="docLen"
          data-vv-as="Documento"
          type="tel"
          :color="color"
          @keypress="isNumber"
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
              v-validate="{ required: true }"
              data-vv-delay="1000"
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
      <!-- <v-col cols="12"  pb-2>
        <label class="ld-form-p2">Selecciona si tienes auto propio o alquilado:</label>
      </v-col>
      <v-col cols="12" >
        <v-radio-group
          required
          v-validate="'required'"
          class="ld-radio-group"
          colum
          v-model="datos.propietario"
          :error-messages="errors.collect('datos.propietario')"
          data-vv-name="datos.propietario"
          data-vv-as="Propietario"
        >
          <v-radio class="ld-radio-p" :color="color" label="Tengo un auto propio" :value="true"></v-radio>
          <v-radio class="ld-radio-p" :color="color" label="Alquilo un auto" :value="false"></v-radio>
        </v-radio-group>
      </v-col>-->
      <v-col cols="12" pb-2>
        <label class="ld-form-p2">Información de contacto:</label>
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
          :counter="9"
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
          required
          data-vv-as="email"
          :color="color"
        />
      </v-col>
      <v-col cols="12">
        <v-row dense>
          <v-col cols="12" pb-2>
            <label class="ld-form-p2"
              >Ingresa la información del vehiculo a financiar:</label
            >
          </v-col>
          <v-col cols="12" md="6" py-2>
            <v-autocomplete
              v-model="datos.marcaVehiculoAcceso"
              v-validate="'required'"
              label="Marca"
              :items="listaMarca"
              data-vv-as="marca"
              :error-messages="errors.collect('datos.marcaVehiculoAcceso')"
              data-vv-name="datos.marcaVehiculoAcceso"
              required
              :color="color"
              item-text="marca"
              item-value="coMarca"
            />
          </v-col>
          <v-col cols="12" md="6" py-2>
            <v-autocomplete
              v-model="datos.modeloVehiculoAcceso"
              v-validate="'required'"
              label="Modelo"
              :items="listaModelo"
              data-vv-as="modelo"
              item-text="modelo"
              item-value="coModelo"
              :error-messages="errors.collect('datos.modeloVehiculoAcceso')"
              data-vv-name="datos.modeloVehiculoAcceso"
              :color="color"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" py-2>
            <v-text-field
              v-model="datos.kilometraje"
              v-validate="`required|numeric`"
              label="Kilometraje total"
              :error-messages="errors.collect('datos.kilometraje')"
              data-vv-name="datos.kilometraje"
              type="tel"
              required
              data-vv-as="Kilometraje"
              :color="color"
              @keypress="isNumber"
              @change="listenKilometraje"
            />
          </v-col>
          <v-col cols="12" sm="6" py-2>
            <v-text-field
              v-model="datos.anioFabricacion"
              v-validate="'required|max:4|min:4|between:1980,2020'"
              :maxlength="4"
              :counter="4"
              data-vv-as="Año de Fabricación"
              :error-messages="errors.collect('datos.anioFabricacion')"
              label="Año de Fabricación"
              data-vv-name="datos.anioFabricacion"
              required
              type="tel"
              :color="color"
              @keypress="isNumber"
            />
          </v-col>
          <v-col cols="12" sm="6" py-2>
            <v-text-field
              v-model="datos.precioVehiculo"
              v-validate="'required|max:6|min:4'"
              label="Precio del vehículo"
              maxlength="6"
              minlength="4"
              :error-messages="errors.collect('datos.precioVehiculo')"
              data-vv-name="datos.precioVehiculo"
              required
              data-vv-as="Precio del vehículo"
              type="tel"
              prefix="S/"
              color="acceso"
              @keypress="isNumber"
            />
          </v-col>
        </v-row>
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
      <!--       <modal-casado :color="color"/>
      -->
    </v-row>
    <v-dialog v-model="automodal" max-width="500">
      <v-card>
        <div class="auto_card">
          <v-row dense>
            <v-col cols="12" text-right class="auto_flex">
              <v-icon class="auto_icon" @click="automodal = false"
                >close</v-icon
              >
              <v-img
                :src="require('@/assets/pop-up-seminuevos.png')"
                @click="automodal = false"
              ></v-img>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
  </v-form>
</template>
<script>
import { format, parseISO } from 'date-fns'
import numeral from 'numeral'
import { mapState } from 'vuex'
import ModalCasado from '@/components/modals/ModalCasado'
import { mixins } from '@/mixins/mixin.js'
import LazyLoading from '@/components/shared/loading/LazyLoading'
function lazyComponent(name) {
  return () => ({
    component: import(`@/components/${name}`),
    loading: LazyLoading
  })
}
export default {
  components: {
    ModalCasado,
    TerminosCondiciones: () => import('~/components/shared/terms/TerminosCondiciones')
  },
  mixins: [mixins],
  props: ['color'],
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {
      automodal: true,
      showChart: false,
      showError: false,
      dialog: false,
      sitekey: process.env.SITEKEY_CAPTCHA,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1
        }
        /*     {
          tipdoc: 'CE',
          id: 2
        } */
      ],
      precioVeh: null,
      menu: false,
      loading: false,
      listaMarca: [],
      listaModelo: []
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
    documento() {
      return this.datos.documento
    },
    anioFabricacion() {
      return this.datos.anioFabricacion
    },
    kilometraje() {
      return this.datos.kilometraje
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      } else {
        return null
      }
    },
    modelo() {
      return this.datos.modeloVehiculoAcceso
    },
    marca() {
      return this.datos.marcaVehiculoAcceso
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
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    estadoCivil(newValue) {
      if (newValue === 'CA' || newValue === 'CO') {
        this.$store.commit('default/UPDATE_MODAL_CASADO', true)
      }
    },
    async anioFabricacion(val) {
      if (val && val.length === 4 && this.modelo && this.kilometraje) {
        await this.getPrecioVehiculo()
      }
    },
    async modelo(val) {
      if (val && this.anioFabricacion && this.kilometraje) {
        await this.getPrecioVehiculo()
      }
    },
    async marca(val) {
      // console.log('marca_ ' + val)
      if (val) {
        await this.getModeloVehiculo(val)
      }
    }
  },
  async mounted() {
    await this.getMarcaVehiculo()
  },
  methods: {
    openTerms() {
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    async getPrecioVehiculo() {
      this.showChart = false
      const responseVehiculo = await this.$axios({
        url: '/api/private/v1.0/preciovehiculo',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          marcaVehiculo: this.datos.marcaVehiculoAcceso,
          modeloVehiculo: this.datos.modeloVehiculoAcceso,
          anioFabricacion: this.datos.anioFabricacion,
          kilometraje: this.datos.kilometraje
        }
      })
      // console.log(responseVehiculo.data)
      if (responseVehiculo.data.codigoEstado === '00') {
        this.$store.commit('default/UPDATE_DATOS', {
          precioVehiculoAcceso: responseVehiculo.data.precioVehiculo
        })
        this.showChart = true
      }
    },
    async listenKilometraje(val) {
      if (val && this.anioFabricacion && this.modelo) {
        await this.getPrecioVehiculo()
      }
    },

    async getMarcaVehiculo() {
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoMarcaVehiculo',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          codigoProducto: this.datos.codigoProducto,
          codigoSubProducto: this.datos.codigoSubProducto,
          canalColocacion: null
        }
      })
      // console.log(response.data)
      this.listaMarca = response.data
    },
    async getModeloVehiculo(value) {
      // console.log('marca : ' + value)
      const response = await this.$axios({
        url: '/api/private/v1.0/catalogoModeloVehiculo',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data: {
          codigoProducto: this.datos.codigoProducto,
          codigoSubProducto: this.datos.codigoSubProducto,
          canalColocacion: null,
          coMarca: value
        }
      })
      // console.log(response.data)
      this.listaModelo = response.data
    }
  }
}
</script>
<style scoped>
.mainBarCode {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px dashed #bdbdbd;
  border-radius: 12px;
  padding: 8px;
  background: #e0e0e0;
}
.imageBarCode {
  display: flex;
  margin: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  max-width: 50px;
  max-height: 50px;
}
.mainChart {
  min-height: 250px;
  width: auto;
  margin: 16px !important;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-align: center;
  background: #cccccc4a;
  box-shadow: 1px 2px 10px #00000047;
  border-radius: 2px;
}
.legend {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.auto_card {
  padding-left: 0px;
  padding-right: 0px;
}

.auto_flex {
  background-color: #003259;
}

.auto_icon {
  position: absolute;
  z-index: 9999;
  top: 5px;
  z-index: 9999;
  color: #fff;
  border-radius: 25px;
  font-weight: bold;
  font-size: 2em;
  right: 2px;
}
</style>
