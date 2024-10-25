<template>
  <div class="credit-conditions">
    <div>
      <span>Monto a financiar</span>
      <span>S/ {{ montoFinanciar }}</span>
    </div>
    <div>
      <span>Precio de vehículo</span>
      <span>S/ {{ precioVehiculo }}</span>
    </div>
    <div>
      <span>Cuota inicial</span>
      <span>S/ {{ cuotaInicial }}</span>
    </div>
    <div>
      <span>Plazo</span>
      <span>{{ plazo }} meses</span>
    </div>
    <div>
      <span>Cuota</span>
      <span>S/ {{ cuota }}</span>
    </div>
    <div>
      <span>TCEA</span>
      <span>{{ tcea }}%</span>
    </div>
    <strong v-if="cuota > cuotaMaxima" class="caption red--text text--lighten-1">* Su cuota máxima es de S/ {{cuotaMaxima}} </strong>
  </div>
</template>

<script>
export default {
  props: {
    creditConditions: { type: Object, default: () => ({}) },
  },
  computed: {
    montoFinanciar() {
      return this.creditConditions.montoFinanciar
        ? this.formatImporte(this.creditConditions.montoFinanciar)
        : '0.00'
    },
    precioVehiculo() {
      return this.creditConditions.precioVehiculo
        ? this.formatImporte(this.creditConditions.precioVehiculo)
        : '0.00'
    },
    cuotaInicial() {
      return this.creditConditions.cuotaInicial
        ? this.formatImporte(this.creditConditions.cuotaInicial)
        : '0.00'
    },
    plazo() {
      return this.creditConditions.plazo
    },
    cuota() {
      return this.creditConditions.cuota
        ? this.formatImporte(this.creditConditions.cuota)
        : '0.00'
    },
    cuotaMaxima() {
      return this.creditConditions.cuotaMaxima
        ? this.formatImporte(this.creditConditions.cuotaMaxima)
        : '0.00'
    },
    tcea() {
      const tceaPorcentaje = this.creditConditions.tcea
        ? this.creditConditions.tcea * 100
        : 0
      return tceaPorcentaje.toFixed(2)
    },

  },
  methods: {
    formatImporte(value) {
      return value.toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },
}
</script>

<style lang='scss'>
.credit-conditions {
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
    color: #f36e47;
  }
  div:first-child ~ div {
    border-top: 1px solid #0a4e88;
  }
}
</style>
