<template>
  <div class="choose-payment-container">
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <p class="choose-payment-title">Escoge el medio de desembolso para recibir tu dinero</p>
    </SharedHeaderWithStepper>
    <div  class="choose-payment-container-medio-pago">
      <img width="90px" @click="entidadBancaria(2)" src="~/assets/img/credInstante/entidad-bancaria.png" alt="">
      <img width="90px"  src="~/assets/img/credInstante/bin.png" alt="">
    </div>
  </div>
</template>

<script>
import { codPage } from '@/enums/credinstante-enums'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper';
export default {
  name: 'ChoosePayment',
  components: {
    SharedHeaderWithStepper
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  methods: {
    entidadBancaria(val) {
      const dataForm = {
        tipoDesembolso: val,
      }
      this.$store.commit('credinstante/SET_DATA_CREATE_PROCEEEDINGS', dataForm)
      this.$store.commit('credinstante/SET_STEP', codPage.PAYMENT_DETAILS)
    },
  },
}
</script>

<style lang='scss'>
  .choose-payment-container {
    padding: 4px 8px 8px 8px;    
    .choose-payment-title {
      width: 80%;
      margin-top: 45px;
      margin-bottom: 50px;
      line-height: 1.2;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    &-medio-pago {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img:first-child {
        margin: 40px 0 20px;
      }
    }
  }
</style>