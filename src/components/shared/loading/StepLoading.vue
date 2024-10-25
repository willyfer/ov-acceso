<template>
  <div class="pa-2">
    <div class="text-center">
      <span
        ><b>{{ texto }}</b></span
      >
    </div>
    <div class="d-flex flex-row justify-center">
      <div v-show="ready == 0" ref="step" class="Oval">
        <img :src="icono" width="25%" />
        <!-- <font-awesome-icon :icon="icono" :style="{ color: 'white' }" /> -->
      </div>
      <div v-show="ready == 1" ref="step" class="Oval-active">
        <img :src="icono" alt srcset width="25%" />
        <!-- <font-awesome-icon :icon="icono" :style="{ color: 'white' }" /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ready: {
      type: String,
      default: '0'
    },
    icono: {
      default: '@/assets/check-solid.svg'
    },
    texto: {
      type: String
    }
  }
}
</script>
<style>
.Oval {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 166, 35, 0.31);
}
.Oval-active {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(235, 118, 51);
  box-shadow: 0 0 20px #ff9635;
}
</style>
