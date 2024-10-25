<template>
  <div>
    <v-row class="d-block d-flex flex-row justify-center">
      <v-col md="12">
        <span
          class="pa-1 secondary--text d-flex flex-row justify-center"
          style="
            border-radius: 7px;
            width: 100%;
            color: white !important;
            background-color: #797979;
          "
          >Condiciones del crédito</span
        >
      </v-col>
    </v-row>
    <div class="credit-conditions">
      <div class="credit-conditions__row">
        <span>Préstamo</span>
        <span>S/ {{ prestamoDetalle }}</span>
      </div>
      <div class="credit-conditions__row">
        <span>Plazo</span>
        <span>{{ cuotas }} meses</span>
      </div>
      <template v-if="isDetallePrestamo">
        <div class="credit-conditions__row">
          <span>Valor del POS</span>
          <span>S/. {{ valorPOSDetalle }}</span>
        </div>
        <div class="credit-conditions__row">
          <span style="width: 60%">Dinero transferido a tu cuenta</span>
          <span>S/. {{ importeFinanciar }}</span>
        </div>
      </template>
      <div class="credit-conditions__row">
        <span>Cuota</span>
        <span>S/ {{ cuotaDetalle }}*</span>
      </div>
      <div class="credit-conditions__row">
        <span>TCEA</span>
        <span>{{ tceaDetalle }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditDetails',
  props: [
    'codigoProducto',
    'importeFinanciar',
    'importeCostoPos',
    'importeCuotas',
    'tasa',
    'cuotas',
  ],
  computed: {
    isDetallePrestamo() {
      if (
        this.codigoProducto === 17 ||
        this.codigoProducto === 18 ||
        this.codigoProducto === 26 ||
        this.codigoProducto === 27
      ) {
        return true
      } else {
        return false
      }
    },
    prestamoDetalle() {
      return this.importeFinanciar
        ? this.importeFinanciar.toFixed(2)
        : '00.00'
    },
    valorPOSDetalle() {
      return this.importeCostoPos ? this.importeCostoPos.toFixed(2) : '00.00'
    },
    cuotaDetalle() {
      return this.importeCuotas
        ? this.importeCuotas.toFixed(2)
        : '00.00'
    },
    tceaDetalle() {
      return this.tasa ? (this.tasa * 100).toFixed(2) : '00.00'
    },
  },
}
</script>

<style scoped>
.credit-conditions__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px;
  color: #0a4e88;
  border-bottom: 1px solid #797979;
}
.credit-conditions {
  margin: 20px 0;
}
</style>