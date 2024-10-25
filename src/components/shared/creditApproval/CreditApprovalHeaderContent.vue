<template>
  <div class="credit-approval-header-content">
    <span>¡Felicitaciones</span>
    <span>{{ nombreTitular }} {{ apellidoPaterno }}</span>
    <span>{{ msgEstadoPrestamo }}</span>
  </div>
</template>

<script>
import { ProductCode } from '@/enums/global-enums'
export default {
  props: [
    'nombreTitular',
    'apellidoPaterno',
    'estadoProspecto',
    'codigoProducto',
  ],
  computed: {
    msgEstadoPrestamo() {
      if (
        (this.codigoProducto === ProductCode.MOTO &&
          this.estadoProspecto === 90 || this.estadoProspecto === 92) ||
        this.codigoProducto === ProductCode.MOTO_NO_BANCARIADOS
      ) {
        return 'tienes un préstamo pre-aprobado!'
      } else {
        return 'tienes un préstamo aprobado!'
      }
    },
  },
}
</script>

<style lang='scss'>
.credit-approval-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 40px;
  margin-bottom: 30px;
  line-height: 1.2;
  & :nth-child(1) {
    margin: 0 60px 0 60px;
    text-align: center;
  }
  & :nth-child(2) {
    font-size: 28px;
    font-weight: bold;
  }
  & :nth-child(3) {
    margin: 0 60px 0 60px;
    text-align: center;
  }
}
</style>
