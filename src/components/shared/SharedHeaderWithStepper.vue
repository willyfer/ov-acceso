<template>
  <div class="container-crumb" >
    <ProductStepper 
      :numberSteps='numberSteps'  
      :imgVehiculo='imgVehiculo'
    />
    <slot></slot>
  </div>
</template>

<script>
import ProductStepper from '@/components/shared/ProductStepper';
export default {
  components: {
    ProductStepper,
  },
  props: {
    numberSteps: { type: Array },
    imgVehiculo: { type: String, default: '' },
  },
}
</script>

<style lang='scss'>
.container-crumb {
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0 20px 0;
}
</style>