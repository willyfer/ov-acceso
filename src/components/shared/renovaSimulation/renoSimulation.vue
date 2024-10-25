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
          <div>
            <v-row dense class="d-flex ">
              <v-col
                v-for="(plazo, id) in formatListaplazo"
                :key="id"
                cols="12"
                xs="6"
                sm="4"
                md="3"

              >
                <v-card v-if="plazo != ','"
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
            >Ver Detalle</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-dialog v-model="modalDetalles" persistent max-width="400" height="auto">
      <v-card class="ld-modal pa-4">
        <v-row class="d-flex flex-row justify-center ma-0" cols="12">
          <v-col cols="12" sm="12" md="12">
            <v-row class="d-flex flex-column flex-nowrap">
              <v-row class="mx-0">
                <v-col cols="12" class="d-flex flex-row">
                  <span
                    class="text-center"
                    align="center"
                    style="color: #005092"
                  >
                    <h3>Detalles del Préstamo</h3>
                  </span>
                </v-col>
              </v-row>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >Placa:</span
                  >
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);">
                    <strong>{{ placa }}</strong>
                  </span>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146)"
                    >Monto a Financiar:</span
                  >
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px;color:  rgb(0, 80, 146)"
                    >S/.{{ montoFinal }}</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-5">
                  <span style="font-size: 12px; color: red;"
                    >Cancelación de Crédito Vigente:</span
                  >
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: red;"
                    >S/.{{ deudaVigente }} *</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="7" class="pb-1 pl-5">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >Desembolso:</span
                  >
                </v-col>
                <v-col cols="5" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >S/.{{ redondeoDesembolso }} *</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-0">
                  <span class style="font-size: 12px; color: rgb(0, 80, 146);"
                    >Plazos:</span
                  >
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >{{ plazo }} meses</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >Cuota Mensual:</span
                  >
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >S/.{{ cuotaTotal }}</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-0">
                  <span style="font-size: 12px; color:  rgb(0, 80, 146);">
                    TCEA
                    <span style="font-size: 10px">(Referencial)</span>:
                  </span>
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >{{ tea* 100 }}%</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 pb-2 divider-container d-flex align-center">
                <v-col cols="8" class="pb-1 pl-0">
                  <span class style="font-size: 12px; color: rgb(0, 80, 146);"
                    >Factor de recaudo:</span
                  >
                </v-col>
                <v-col cols="4" class="text-right pb-1 pr-0">
                  <span style="font-size: 12px; color: rgb(0, 80, 146);"
                    >{{ factorRecaudo * 100 }}%</span
                  >
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <v-row class="mx-0 py-2">
                <v-col cols="12">
                  <p style="font-size: 12px; color:  black">
                    *Valores aproximados se recalcularán cuando se realice el
                    desembolso.
                  </p>
                  <p style="font-size: 12px; color:  black">
                    Recuerda que cancelaremos tu primer préstamo y te abonaremos
                    el saldo de la oferta que escogiste.
                  </p>
                </v-col>
              </v-row>
            </v-row>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row class="pb-3">
            <v-col cols="12" order-md="2" md="7" class="text-center pa-1">
              <v-btn
                type="submit"
                class="ld-btn"
                :loading="loading"
                :color="color"
                @click.prevent="saveConfirSimulation"
                >¡LO QUIERO!</v-btn
              >
            </v-col>
            <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
              <v-btn class="ld-btn-secondary" @click="modalDetalles = false"
                >CANCELAR</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreditSimulationLD',
  props: [
    'montoMinimo',
    'montoMaximo',
    'listaPlazos',
    'placa',
    'deudaVigente',
    'tea',
    'factorRecaudo',
    'intervaloMonto',
    'cuota',
    'loading',
    'loadingSimulacion',
    'color'
  ],
  data() {
    return {
      modalDetalles: false,
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
    formatListaplazo(){

      let lp = this.listaPlazos
      let res = lp.split(',')
      return res.map(v=> v? v.trim() : undefined )
    },
    redondeoDesembolso(){
      const desembolso = this.montoFinal - this.deudaVigente
      return this.round(desembolso)
    },
    redondeoMontoFinanciar(){
      return this.round(this.montoFinal)
    }

  },
  methods: {
    round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    },
    /*roundToTwo(num) {
      return +(Math.round(num + "e+2")  + "e-2");
    },*/
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
      this.modalDetalles = true
    },
    saveConfirSimulation(){
      this.$emit('confirmarSimulacion', {
        importeFinanciar: this.montoFinal,
        cantCuotas: this.plazo,
        importeCuotas: this.cuotaTotal,
        deudaVigente: this.deudaVigente,
        importeDesembolso: this.redondeoDesembolso,
        tca: this.tea,
        factorRecaudo: this.factorRecaudo,
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
.ld-btn-secondary {
    min-width: 100px !important;
}
.ld-btn {
    width: 50px !important;
}
</style>
