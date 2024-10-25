<template>
  <div>
    <v-form ref="form" @submit.prevent="confirmarSimulacion">
      <div class="my-5">
        <div>
          <span class="simulador__prestamo-titulo"
            >Tienes un monto disponible entre S/ {{ montoMinimo }} y S/
            {{ montoMaximo }}</span
          >
          <p class="simulador__prestamo-titulo mt-2 mb-1">
            Escribe el Monto que desees:
          </p>
          <div class="d-flex justify-center align-center">
            <div class="px-5">
              <v-text-field
                v-model="montoFinal"
                :rules="montoRules"
                color="#005092"
                class="secondary--text centered-input"
                maxlength="4"
                placeholder
                @keypress="isNumber"
                @blur="clearPlazo"
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <p class="simulador__prestamo-titulo">
            Selecciona el plazo de tu préstamo:
          </p>
          <div id="quiz">
            <v-row dense class="d-flex justify-center">
              <v-col
                v-for="(plazo, id) in listaPlazos"
                :key="id"
                cols="4"
                xs="4"
              >
                <v-card
                  class="answerCard"
                  :class="{ 'answerCard--active': idPlazo === id }"
                  dark
                  @click="selectPlazo(plazo, id)"
                >
                  <v-card-subtitle
                    align="center"
                    style="font-size: 0.7em; padding: 7px; color: #ffffff"
                  >
                    <p class="mb-0 notranslate">
                      <b>{{ plazo }} meses</b>
                    </p>
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div class="mt-8 my-5">
        <v-row class="d-flex flex-row justify-center mb-3" cols="12">
          <span class="secondary--text class-title">Tu cuota sería de:</span>
        </v-row>
        <div>
          <div class="d-flex align-center justify-center">
            <img width="40" :src="imgLoading" v-show="loadingSimulacion" />
            <p v-show="!loadingSimulacion" class="ma-0 secondary--text monto-credito">
              {{ cuotaTotal }} soles
            </p>
            <img class="mx-2" width="40" :src="imgMoney" alt="" />
          </div>
          <p class="secondary--text mt-2" style="font-size: 12px">
            Monto de cuota mensual
          </p>
          <div class="secondary--text" style="font-size: 12px">
            *Durante los primeros 3 meses pagarás la mitad de la cuota. A partir
            del 4to mes tu cuota será la señalada.
          </div>
        </div>
      </div>
      <v-row class="d-flex flex-row justify-center mt-4" md="6">
        <v-col md="12" class="d-flex flex-row justify-center">
          <v-btn
            class="white--text"
            style="border-radius: 7px; background-color: #ff7729"
            dark
            type="submit"
            :loading="loading"
            :disabled="!isGuardarSimulacion"
            >Lo quiero</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'CreditSimulationLD',
  props: [
    'montoMinimo',
    'montoMaximo',
    'listaPlazos',
    'intervaloMonto',
    'cuota',
    'loading',
    'loadingSimulacion'
  ],
  data() {
    return {
      monto: this.montoMaximo,
      isBtnMinus: true,
      isBtnPlus: true,
      idPlazo: null,
      plazo: null,
      validateSimular: true,
      imgMoney: require('@/assets/Beneficios-3.png'),
      montoRules: [
        (v) => !!v || 'El campo monto es obligatorio',
        (v) =>
          v <= this.montoMaximo ||
          `El monto debe ser menor a S/ ${this.montoMaximo}`,
        (v) =>
          v >= this.montoMinimo ||
          `El monto debe ser mayor a S/ ${this.montoMinimo}`,
      ],
      imgLoading: require('@/assets/loading-simulador.gif'),
    }
  },
  computed: {
    montoFinal: {
      set(v) {
        this.monto = v
      },
      get() {
        if (this.monto <= this.montoMinimo) {
          this.isBtnMinus = false
          this.isBtnPlus = true
        } else if (this.monto >= this.montoMaximo) {
          this.isBtnPlus = false
          this.isBtnMinus = true
        } else {
          this.isBtnMinus = true
          this.isBtnPlus = true
        }
        return this.monto
      },
    },
    cuotaTotal() {
      const newCuota = this.cuota
        ? this.cuota.toLocaleString('en', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : null
      return this.monto && this.plazo && this.validateSimular ? newCuota : '--'
    },
    isGuardarSimulacion() {
      return this.monto >= this.montoMinimo &&
        this.monto <= this.montoMaximo &&
        this.plazo &&
        this.cuota &&
        !this.loadingSimulacion
        ? true
        : false
    },
  },
  methods: {
    simular() {
      const isValidate = this.$refs.form.validate()
      this.validateSimular = isValidate
      if (isValidate) {
        if (this.monto && this.plazo) {
          this.$emit('simular', {
            montoFinanciar: this.monto,
            plazo: this.plazo,
          })
        }
      }
    },
    clearPlazo() {
      this.idPlazo = null
      this.plazo = null
    },
    confirmarSimulacion() {
      this.$emit('confirmarSimulacion', {
        importeFinanciar: this.monto,
        cantCuotas: this.plazo,
        importeCuotas: this.cuota,
      })
    },
    selectPlazo(value, id) {
      this.idPlazo = id
      this.plazo = value
      this.simular()
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
  },
}
</script>

<style scoped>
.simulador__prestamo-titulo {
  color: #0a4e88;
  font-weight: bold;
  text-align: left;
}
.simulador__input {
  border: 1.2px solid #ff7727;
  height: 30px;
  border-radius: 5px;
}
.monto-credito {
  font-weight: bold;
  font-size: 20px;
}
.answerCard {
  background-color: #005092 !important;
  cursor: pointer;
  padding: 5px;
  padding: 0;
  margin: 2px;
}
.answerCard--active {
  background-color: #ff7727 !important;
}
.centered-input >>> input {
  text-align: center;
}
</style>