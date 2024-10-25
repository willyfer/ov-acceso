<template>
  <div class="stepper-container">
    <div :style="{ width: widthSteps }" class="stepper-container__item-steps" v-for="(item, index) in numberSteps" :key="index"></div>
    <div :style="{ width: widthSteps }" class="stepper-container__item-steps stepper-container__item-steps-static">
      <img class="stepper-container__img-vehiculo" :src="require(`@/assets/img/${imgVehiculo}`)" alt="">
    </div>
    <img class="stepper-container__img-ubicacion" :src="require('@/assets/img/ubicacion.png')" alt="">
  </div>
</template>

<script>
export default {
  name: 'ProductStepper',
  props: {
    numberSteps: { type: Array },
    imgVehiculo: { type: String, default: '' },
  },
  computed: {
    widthSteps() {
      return '12.5%';
    }
  }
}
</script>

<style lang='scss'>
.stepper-container {
  width: 90%;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  position: relative;
  &__item-steps {
    height: 6px;
    border-radius: 10px;
    background: white;
    margin-left: 1px;
  }
  &__item-steps-static {
    position: relative;
  }
  &__img-vehiculo {
    position: absolute;
    width: 34px;
    bottom: 8px;
  }
  &__img-ubicacion {
    position: absolute;
    width: 10px;
    right: 0;
    bottom: 10px;
  }
}
</style>