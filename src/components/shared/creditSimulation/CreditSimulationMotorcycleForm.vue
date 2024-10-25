<template>
  <div>
    <div class="semi-round__container">
      <div class="semi-round__content">
        <v-row class="datos-vehiculo" dense>
          <v-col cols="12">
            <v-select
              label="Marca"
              dense
              outlined
              v-model="form.mark"
              :items="listaMarcas"
              item-text="no_marcas"
              item-value="co_marcas"
              :readonly="notEditable"
              required
              :error-messages="markTypeErrors"
              @change="handleChangeMark"
              @blur="$v.form.mark.$touch()"
            >
            </v-select>
            <v-select
              label="Modelo"
              dense
              outlined
              v-model="form.model"
              :items="modelos"
              item-text="no_modelo"
              item-value="co_modelo"
              :readonly="notEditable"
              required
              :error-messages="modelTypeErrors"
              @change="$v.form.model.$touch()"
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
                      dense
                      v-model="form.vehiclePrice"
                      type="number"
                      :readonly="notEditable"
                      required
                      :error-messages="vehiclePriceErrors"
                      @input="$v.form.vehiclePrice.$touch()"
                      @blur="$v.form.vehiclePrice.$touch()"
                    ></v-text-field>
                  </div>
                </div>
              </v-col>
              <v-col class="container-box" cols="6" xs="6" sm="6" md="6">
                <div class="box-datos">
                  <div class="box-simulacion">
                    <div class="label-simulacion">Monto a financiar</div>
                    <div class="container-input">
                      <v-text-field
                        prefix="S/"
                        outlined
                        dense
                        v-model="form.amountFinance"
                        type="number"
                        :readonly="notEditable"
                        required
                        :error-messages="amountFinanceErrors"
                        @input="$v.form.amountFinance.$touch()"
                        @blur="$v.form.amountFinance.$touch()"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="info-box">Max: {{ maximumAmountFinance }}</div>
                </div>
              </v-col>
              <v-col class="container-box" cols="6" xs="6" sm="6" md="6">
                <div class="box-simulacion">
                  <div class="label-simulacion">Cuota Inicial</div>
                  <div class="container-input">
                    <v-text-field
                      prefix="S/"
                      outlined
                      dense
                      readonly
                      :value="calculateDownPayment"
                      type="text"
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
                      :items="listaPlazos"
                      outlined
                      dense
                      :readonly="notEditable"
                      required
                      :error-messages="creditTermErrors"
                      @change="$v.form.creditTerm.$touch()"
                      @blur="$v.form.creditTerm.$touch()"
                    ></v-select>
                    <span class="plazo">Meses</span>
                  </div>
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
      <v-col cols="12" class="text-center button-confirmar-condicion">
        <SharedButton
          text="Confirmar condición"
          :buttonOrange="true"
          :totalWidth="76"
          @click="confirmCreditCondition"
        />
      </v-col>
      <v-col cols="12" class="text-center button-editar-condicion">
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
import { required, numeric, maxValue } from 'vuelidate/lib/validators'
import InformationContainer from '@/components/shared/InformationContainer'
import CreditConditions from '@/components/shared/CreditConditions'
import CreditConditionsNote from '@/components/shared/CreditConditionsNote'
import SharedButton from '@/components/shared/SharedButton'

export default {
  name: 'CreditSimulationMotorcycleForm',
  components: {
    InformationContainer,
    CreditConditions,
    CreditConditionsNote,
    SharedButton,
  },
  props: {
    maximumAmountFinance: { type: Number, default: 0 },
    minimumAmountFinance: { type: Number, default: 0 },
    codigoProspecto: { type: Number, default: 0 },
    estadoProspecto: { type: Number, default: 0 },
    listaPlazos: { type: Array, default: () => [] },
    listaMarcas: { type: Array, default: () => [] },
    listaModelos: { type: Array, default: () => [] },
    creditConditions: { type: Object, default: () => ({}) },
  },
  validations() {
    return {
      form: {
        mark: {
          required,
        },
        model: {
          required,
        },
        vehiclePrice: {
          required,
          numeric,
          onlyPositiveIntegers(amount) {
            if (/^[1-9][0-9]*$/.test(String(amount))) return true
            else return false
          },
        },
        amountFinance: {
          maxValue: maxValue(this.maximumAmountFinance),
          onlyPositiveIntegers(amount) {
            if (/^[1-9][0-9]*$/.test(String(amount))) return true
            else return false
          },
          required,
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
        mark: '',
        model: '',
        vehiclePrice: '',
        amountFinance: this.minimumAmountFinance,
        initialFee: '',
        creditTerm: '',
      },
      modelos: [],
      notEditable: false,
    }
  },
  computed: {
    markTypeErrors() {
      const errors = []
      if (!this.$v.form.mark.$dirty) return errors
      !this.$v.form.mark.required && errors.push('Campo requerido')
      return errors
    },
    modelTypeErrors() {
      const errors = []
      if (!this.$v.form.model.$dirty) return errors
      !this.$v.form.model.required && errors.push('Campo requerido')
      return errors
    },
    vehiclePriceErrors() {
      const errors = []
      if (!this.$v.form.vehiclePrice.$dirty) return errors
      !this.$v.form.vehiclePrice.required && errors.push('Campo requerido')
      !this.$v.form.vehiclePrice.onlyPositiveIntegers &&
        errors.push('Solo enteros mayores a cero')
      return errors
    },
    amountFinanceErrors() {
      const errors = []
      if (!this.$v.form.amountFinance.$dirty) return errors
      !this.$v.form.amountFinance.required && errors.push('Campo requerido')
      !this.$v.form.amountFinance.maxValue &&
        errors.push('No puede ser mayor al monto maximo')
      !this.$v.form.amountFinance.onlyPositiveIntegers &&
        errors.push('Solo enteros mayores a cero')
      return errors
    },
    creditTermErrors() {
      const errors = []
      if (!this.$v.form.creditTerm.$dirty) return errors
      !this.$v.form.creditTerm.required && errors.push('Campo requerido')
      return errors
    },
    ////////////////////////////////
    calculateDownPayment() {
      return this.form.vehiclePrice && this.form.amountFinance
        ? this.form.vehiclePrice - this.form.amountFinance
        : ''
    },
    hasCreditConditions() {
      return Object.keys(this.creditConditions).length
    },
  },
  methods: {
    simulateCreditConditions() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          marca: this.form.mark,
          modelo: this.form.model,
          precioVehiculo: Number(this.form.vehiclePrice),
          montoFinanciar: Number(this.form.amountFinance),
          cuotaInicial: Number(this.calculateDownPayment),
          plazo: this.form.creditTerm,
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
        }
        this.$emit('simulate-credit-conditions', data)
        this.notEditable = true
      }
    },
    confirmCreditCondition() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const data = {
          marca: this.form.mark,
          modelo: this.form.model,
          precioVehiculo: Number(this.form.vehiclePrice),
          montoFinanciar: Number(this.form.amountFinance),
          cuotaInicial: Number(this.calculateDownPayment),
          plazo: this.form.creditTerm,
          cuota: this.creditConditions.cuota,
          tcea: this.creditConditions.tcea,
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
        }
        this.$emit('confirm-credit-condition', data)
      }
    },
    editSimulateCreditConditions() {
      this.$v.$reset()
      this.notEditable = false
      this.$emit('edit-simulate-credit-conditions', Object())
    },
    handleChangeMark(idMark) {
      this.$v.form.mark.$touch()
      this.modelos = this.listaModelos.filter(
        (model) => model.co_marcas == idMark
      )
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
.datos-simulacion {
  padding: 0 20px;
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