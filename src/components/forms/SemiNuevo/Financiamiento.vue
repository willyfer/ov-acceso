<template>
  <div>
    <VForm
      ref="form1"
      autocomplete="nope"
      @submit.prevent="enviarFinanciamiento"
    >
      <v-row dense>
        <v-col pt-4 cols="12" align-center justify-center class=" text-center ">
          <h1 class="ld-h1-title-form pb-0" :class="color + '--text'">
            ¡Felicidades!
          </h1>
          <h2 class="ld-h2-title-form" :class="color + '--text'">
            Tienes un préstamo pre aprobado por un monto de S/
            {{ importeMaximoFinanciar | toMoney }}
          </h2>
        </v-col>
        <v-col cols="12 py-3">
          <v-divider />
        </v-col>
        <v-col cols="12 py-3">
          <v-row dense>
            <v-col cols="6" class=" text-center " align-center justify-center>
              <p class="title mb-2 font-weight-bold">Préstamo pre aprobado</p>
              <p class="title mb-2 text-slider display-1">
                S/ {{ importeMaximoFinanciar | toMoney }}
              </p>
            </v-col>
            <v-col cols="6" class=" text-center " align-center justify-center>
              <p class="title mb-2 font-weight-bold">Precio del auto</p>
              <p class="title mb-2 text-slider display-1">
                S/ {{ datos.precioVehiculo | toMoney }}
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12 py-3">
          <v-divider />
        </v-col>
        <v-col cols="12" sm="10" offset-sm1 mt-2>
          <h4 class="text-left">
            <b>Monto a solicitar</b>
          </h4>
        </v-col>
        <v-col cols="12" sm="10" offset-sm1 pb-4>
          <v-slider
            v-model="importeFinanciar"
            class="slider"
            track-color="LightBlue"
            thumb-color="white"
            thumb-size="100"
            loading="true"
            height="40"
            :min="importeMaximoFinanciar * 0.5"
            :max="importeMaximoFinanciar"
            color="white"
            step="100"
          />
        </v-col>
        <v-col cols="12" sm="10" offset-sm1>
          <v-row no-gutters align-center justify-center>
            <v-col cols="12">
              <v-row no-gutters align-center justify-space-between>
                <v-col cols="4" text-left>
                  <p>S/ {{ (importeMaximoFinanciar * 0.5) | toMoney }}</p>
                </v-col>
                <v-col cols="4" text-center>
                  <p class=" text-center  font-weight-bold text-slider">
                    S/ {{ importeFinanciar | toMoney }}
                  </p>
                </v-col>
                <v-col cols="4" text-right>
                  <p>S/ {{ importeMaximoFinanciar | toMoney }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12 py-3">
          <v-divider />
        </v-col>
        <v-col cols="12" sm="10" offset-sm1 pt-3 text-center>
          <v-row dense>
            <v-col class=" text-center " cols="4">
              <v-row dense>
                <v-col cols="12" font-weight-bold>Valor de cuota</v-col>
                <v-col class=" text-center " cols="12"
                  >S/ {{ datos.importeCuotas | toMoney }}</v-col
                >
              </v-row>
            </v-col>
            <v-col class=" text-center " cols="4">
              <v-select
                v-model="cantidadCuotas"
                v-validate="'required'"
                :items="selectCuotas"
                :error-messages="errors.collect('cantidadCuotas')"
                label="N° Cuotas"
                data-vv-name="cantidadCuotas"
                data-vv-as="Tipo"
                :color="color"
                required
              />
            </v-col>
            <v-col class=" text-center " cols="4">
              <v-row dense>
                <v-col cols="12" font-weight-bold>T.E.A</v-col>
                <v-col cols="12">23.50%</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class=" text-center " pt-4>
          <v-btn class="ld-btn" type="submit" :color="color">CONFIRMAR</v-btn>
        </v-col>
      </v-row>
    </VForm>
  </div>
</template>
<script>
import { format } from 'date-fns'
import LazyLoading from '@/components/shared/loading/LazyLoading'

const numeral = require('numeral')

function lazyComponent(name) {
  return () => ({
    component: import(/* webpackPrefetch: true */ `@/components/${name}`),
    loading: LazyLoading
  })
}
export default {
  filters: {
    toMoney(val) {
      const string = numeral(val).format('0,0')
      return string
    }
  },
  props: ['color'],
  $_veeValidate: {
    validator: 'new'
  },
  data() {
    return {}
  },
  computed: {
    datos() {
      return this.$store.state.default.datos
    },
    selectCuotas() {
      const cuotas = []
      if (this.datos.arrayRCI) {
        this.datos.arrayRCI.map((v) => cuotas.push(v.cantidadCuotas))
      }
      return cuotas
    },
    cantidadCuotas: {
      get() {
        // console.log('hererer')
        // console.log(this.datos.cantidadCuotas)
        return this.datos.cantidadCuotas
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { cantidadCuotas: v })
      }
    },
    importeFinanciar: {
      get() {
        return this.datos.importeFinanciar
          ? this.datos.importeFinanciar
          : this.datos.importeMaximoFinanciar
      },
      set(v) {
        this.$store.commit('default/UPDATE_DATOS', { importeFinanciar: v })
      }
    },
    importeMaximoFinanciar() {
      return this.$store.state.default.datos.importeMaximoFinanciar
    },
    series() {
      return [percent]
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  watch: {
    async cantidadCuotas(val) {
      // console.log('val: ' + val)
      await this.getValorCuota(val, this.importeFinanciar)
    },
    async importeFinanciar(val) {
      await this.getValorCuota(this.cantidadCuotas, val)
    }
  },
  mounted() {
    this.$store.commit('default/UPDATE_DATOS', {
      cantidadCuotas: this.datos.arrayRCI[0].cantidadCuotas,
      importeFinanciar: this.datos.importeMaximoFinanciar
    })
  },
  methods: {
    async enviarFinanciamiento() {
      await this.$store.dispatch('default/actualizarProspecto')
    },
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
    async getValorCuota(cantidadCuotas, importeFinanciar) {
      await this.$store.dispatch('default/getValorCuota', {
        cantidadCuotas,
        importeFinanciar
      })
      /* const data = {
        tipoSimulacion: 1, //,
        codigoProducto: this.datos.codigoProducto,
        codigoSubProducto: this.datos.codigoSubProducto,
        canalColocacion: null,
        precioVehiculoAcceso: this.datos.precioVehiculoAcceso,
        importeFinanciar: this.datos.importeFinanciar,
        fechaInicio: format(new Date(), 'YYYY-MM-DD'), //hoy + 60
        fechaPrimerVencimiento: format(addMonths(new Date(), 2), 'YYYY-MM-DD'), //hoy + 60
        tipoSeguroDesgravamen: 1,
        importeSeguroDesgravamen: null,
        diasHabiles: true,
        acumulaSeguro: false,
        precioVehiculo: 0.0,
        porcentajeRetoma: 0.0,
        valoresReduccionCuota: null,
        valoresCuota: null,
        valoresVencimiento: null,
        im_garmov: this.datos.im_garmov,
        tipoCuotas: this.datos.tipoCuotas,
        tasa: this.datos.tasa,
        tasaSeguroDesgravamen: this.datos.tasaSeguroDesgravamen,
        im_otrgas: this.datos.im_otrgas,
        cantidadCuotas
      }
      //console.log(body)
      //console.log(data)
      const response = await this.$axios({
        url: '/api/private/v1.0/evaluacionScoreCuota',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        },
        data
      })
      const result = response.data
      //console.log('score-cuota')
      //console.log(result)
      this.$store.commit('default/UPDATE_DATOS', {
        importeCuotas: result.importeCuotas,
        ...result
      }) */
    }
  }
}
</script>
<style scoped>
.ld-h1-title-form {
  font-size: 35px !important;
}
.ld-h2-title-form {
  margin: 0 auto;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
}
.text-slider {
  font-size: 24px;
  color: #e88444;
  text-align: center;
  line-height: 22px;
  font-weight: bold;
}

.slider {
  height: 40px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 1px 2px 10px #ccc; /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#00c1f7+0,0e7797+100 */
  background: #00c1f7; /* Old browsers */
  background: -moz-linear-gradient(
    left,
    #00c1f7 0%,
    #0e7797 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    #00c1f7 0%,
    #0e7797 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    #00c1f7 0%,
    #0e7797 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00c1f7', endColorstr='#0e7797',GradientType=1 ); /* IE6-9 */
}
</style>
