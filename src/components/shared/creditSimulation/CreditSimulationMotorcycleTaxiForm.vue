<template>
  <div>
    <div class="semi-round__container">
      <div class="semi-round__content">
        <v-row class="datos-vehiculo" dense>
          <v-col cols="12">
            <v-select
              label="Tipo de combustible"
              dense
              outlined
              v-model="form.fuelType"
              :items="combustible"
              item-text="combustible"
              item-value="idCombustible"
              return-object
              :readonly="notEditable"
              required
              :error-messages="fuelTypeErrors"
              @change="handleChangeFuelType"
              @blur="$v.form.fuelType.$touch()"
            >
            </v-select>
            <v-select
              label="Modelo"
              dense
              outlined
              v-model="form.model"
              :items="listModel"
              item-text="nombreModelo"
              item-value="modelo"
              return-object
              :readonly="notEditable"
              required
              :error-messages="modelTypeErrors"
              @change="handleChangeModel"
              @blur="$v.form.model.$touch()"
            >
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col class="container-box" cols="6" xs="6" sm="6" md="6">
                <div class="box-simulacion">
                  <div class="label-simulacion">Precio Vehículo</div>
                  <div class="container-input">
                    <v-text-field
                      prefix="S/"
                      outlined
                      readonly
                      dense
                      :value="form.vehiclePrice"
                      type="number"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col class="container-box" cols="6" xs="6" sm="6" md="6">
                <div class="box-simulacion">
                  <div class="label-simulacion">Plazo</div>
                  <div class="container-input d-flex justify-space-between">
                    <v-select
                      v-model="form.creditTerm"
                      :items="listPlazos"
                      item-text="plazo"
                      item-value="codigoPoliticaVehicular"
                      outlined
                      dense
                      return-object
                      :readonly="notEditable"
                      required
                      :error-messages="creditTermErrors"
                      @change="handleChangePlazo"
                      @blur="$v.form.creditTerm.$touch()"
                    ></v-select>
                    <span class="plazo">Meses</span>
                  </div>
                </div>
              </v-col>
              <v-col class="container-box" cols="6" xs="6" sm="6" md="6">
                <div class="box-datos">
                  <div class="box-simulacion">
                    <div class="label-simulacion">Cuota Inicial</div>
                    <div class="container-input">
                      <v-text-field
                        prefix="S/"
                        outlined
                        dense
                        v-model="form.initialFee"
                        type="number"
                        :readonly="notEditable"
                        required
                        :error-messages="initialFeeErrors"
                        @input="$v.form.initialFee.$touch()"
                        @blur="$v.form.initialFee.$touch()"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="info-box">Min: {{ minimumAmountFinance }}</div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-row v-if="!hasCreditConditions">
      <v-col cols="12" class="text-center button-simar-condicion">
        <SharedButton
          text="Simular condiciones"
          :buttonOrange="true"
          :totalWidth="76"
          @click="simulateCreditConditions"
        />
      </v-col>
    </v-row>
    <div class="credit-conditions-container" v-if="hasCreditConditions">
      <InformationContainer title="Condiciones del crédito" align="center">
        <CreditConditions :creditConditions="creditConditions" />
        <CreditConditionsNote />
      </InformationContainer>
    </div>
    <v-row v-if="hasCreditConditions">
      <v-col v-if="creditConditions.cuota < creditConditions.cuotaMaxima" cols="12" md="6" class="text-center button-confirmar-condicion">
        <SharedButton
          text="Confirmar condición"
          :buttonOrange="true"
          :totalWidth="76"
          @click="confirmCreditCondition"
        />
      </v-col>
      <v-col cols="12" md="6" class="text-center button-editar-condicion mt-2">
        <SharedButton
          text="Editar"
          :buttonSilver="true"
          :totalWidth="76"
          @click="editSimulateCreditConditions"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { required, numeric, maxValue, minValue } from 'vuelidate/lib/validators'
import InformationContainer from '@/components/shared/InformationContainer'
import CreditConditions from '@/components/shared/CreditConditions'
import CreditConditionsNote from '@/components/shared/CreditConditionsNote'
import SharedButton from '@/components/shared/SharedButton'

export default {
  components: {
    InformationContainer,
    CreditConditions,
    CreditConditionsNote,
    SharedButton,
  },
  props: {
    codigoProspecto: { type: Number, default: 0 },
    estadoProspecto: { type: Number, default: 0 },
    productCode: { type: Number, default: 0 },
    combustible: { type: Array, default: () => [] },
    model: { type: Array, default: () => [] },
    plazo: { type: Array, default: () => [] },
    creditConditions: { type: Object, default: () => ({}) },
  },
  validations() {
    return {
      form: {
        fuelType: {
          required,
        },
        model: {
          required,
        },
        initialFee: {
          minValue: minValue(this.minimumAmountFinance),
          required,
          onlyPositiveIntegers(amount) {
            if (/^[1-9][0-9]*$/.test(String(amount))) return true
            else return false
          },
          numeric,
        },
        creditTerm: {
          required,
        },
      },
    }
  },
  data() {
    return {
      form: {
        fuelType: '',
        marca: null,
        model: '',
        vehiclePrice: '',
        initialFee: '',
        creditTerm: '',
        tcea: null,
        otherExpenses: null,
      },
      notEditable: false,
      listModel: [],
      listPlazos: [],
      minimumAmountFinance: 0,
    }
  },
  computed: {
    fuelTypeErrors() {
      const errors = []
      if (!this.$v.form.fuelType.$dirty) return errors
      !this.$v.form.fuelType.required && errors.push('Campo requerido')
      return errors
    },
    modelTypeErrors() {
      const errors = []
      if (!this.$v.form.model.$dirty) return errors
      !this.$v.form.model.required && errors.push('Campo requerido')
      return errors
    },
    initialFeeErrors() {
      const errors = []
      if (!this.$v.form.initialFee.$dirty) return errors
      !this.$v.form.initialFee.required && errors.push('Campo requerido')
      !this.$v.form.initialFee.minValue &&
        errors.push('No puede ser menor al monto minimo')
      !this.$v.form.initialFee.onlyPositiveIntegers &&
        errors.push('Solo enteros mayores a cero')
      !this.$v.form.initialFee.numeric && errors.push('solo numeros')
      return errors
    },
    creditTermErrors() {
      const errors = []
      if (!this.$v.form.creditTerm.$dirty) return errors
      !this.$v.form.creditTerm.required && errors.push('Campo requerido')
      return errors
    }, ///////////////////////
    hasCreditConditions() {
      return Object.keys(this.creditConditions).length
    },
  },
  methods: {
    simulateCreditConditions() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          tipoCombustible: this.form.fuelType.idCombustible,
          modelo: this.form.model.modelo,
          precioVehiculo: this.form.vehiclePrice,
          cuotaInicial: Number(this.form.initialFee),
          plazo: this.form.creditTerm.plazo,
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
          codigoProducto: this.productCode,
          tcea: this.form.tcea,
          otrosGastos: this.form.otherExpenses,
        }
        this.$emit('simulate-credit-conditions', data)
        this.notEditable = true
      }
    },
    confirmCreditCondition() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          tipoCombustible: this.form.fuelType.idCombustible,
          modelo: this.form.model.modelo,
          precioVehiculo: this.form.vehiclePrice,
          cuotaInicial: Number(this.form.initialFee),
          plazo: this.form.creditTerm.plazo,
          tcea: this.creditConditions.tcea,
          codigoPoliticaVehicular: this.form.creditTerm.codigoPoliticaVehicular,
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
          codigoProducto: this.productCode,
          marca: this.form.marca,
          montoFinanciar: this.creditConditions.montoFinanciar,
          otrosGastos: this.form.otherExpenses,
        }
        this.$emit('confirm-credit-condition', data)
      }
    },
    editSimulateCreditConditions() {
      this.$v.$reset()
      this.notEditable = false
      this.$emit('edit-simulate-credit-conditions', Object())
    },
    handleChangeFuelType({ idCombustible }) {
      this.$v.form.fuelType.$touch()
      this.form.model = ''
      this.form.creditTerm = ''
      this.form.vehiclePrice = null
      this.form.initialFee = null
      this.minimumAmountFinance = null
      this.listModel = this.model.filter(
        (item) => item.idCombustible == idCombustible
      )
    },
    handleChangeModel({ modelo, precioVehiculo, idCombustible }) {
      this.$v.form.model.$touch()
      this.form.creditTerm = ''
      this.form.vehiclePrice = precioVehiculo
      this.form.initialFee = null
      this.minimumAmountFinance = null
      this.listPlazos = this.plazo.filter(
        (item) => item.modelo == modelo && item.idCombustible == idCombustible
      )
    },
    handleChangePlazo({ cuotaInicial, marca, tcea, otrosGastos }) {
      this.$v.form.creditTerm.$touch()
      this.form.initialFee = cuotaInicial
      this.minimumAmountFinance = cuotaInicial
      this.form.marca = marca
      this.form.tcea = tcea
      this.form.otherExpenses = otrosGastos
    },
    initialFeeMin() {
      return this.minimumAmountFinance
    },
    initialFeeMax() {
      return this.form.vehiclePrice
    },
  },
}
</script>

<style>
/* /////////////////////////// */
.error--text .v-text-field__details {
  padding: 0 !important;
}
.box-simulacion .plazo {
  margin-left: 4px;
}
.box-simulacion .v-input__slot {
  padding: 0 0 0 6px !important;
}
.container-input .v-input__slot {
  padding: 0 0 0 6px !important;
}
/* ///////////////// */
.semi-round__container {
  padding: 0 15px;
}
.semi-round__content {
  border-left: 1px solid #f36e47;
  border-right: 1px solid #f36e47;
  border-bottom: 1px solid #f36e47;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 34px 20px 20px 20px;
}
.datos-vehiculo {
}
.datos-simulacion {
  padding: 0 20px;
}
.container-box {
  /*  height: 100px; */
}
.box-simulacion {
  border: 1px solid #f36e47;
  padding: 2px;
  text-align: center;
  border-radius: 10px;
}
.label-simulacion {
  font-size: 0.8em;
  background-color: #f36e47;
  color: white;
  border-radius: 20px;
}
.container-input {
  padding: 20px 10px 0 10px;
}
.input-simulacion {
  width: 100%;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.input-simulacion--select {
  text-align: center;
  width: 48%;
  border-radius: 4px;
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.info-box {
  font-size: 0.75em;
  text-align: center;
  background-color: #f36e47;
  width: 80px;
  margin: 0 auto;
  color: white;
  padding: 1px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.button-simar-condicion {
  margin-top: 40px;
  margin-bottom: 40px;
}
.button-confirmar-condicion {
  margin-top: 50px;
}
.button-editar-condicion {
  margin-bottom: 50px;
}
.btn-primary {
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  color: white;
}

.btn-secondary {
  background: #797979 !important;
  color: white;
}
.credit-conditions-container {
  margin-top: 50px;
}
</style>
