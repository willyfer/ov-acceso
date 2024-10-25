<template>
  <div class="pa-2 text-center">
    <div class="d-flex flex-row justify-center">
      <div class="cuadro-exterior">
        <div v-show="!ready" class="cuadro-interior">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-show="ready" class="cuadro-interior-active">
          <img :src="require(`@/assets/${icono}`)" alt srcset width="50%" />
        </div>
      </div>
    </div>
    <div class="text-center">
      <span class="texto-procesando">
        {{ texto }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ready: { type: Boolean, default: false },
    icono: { type: String, default: '' },
    texto: { type: String, default: '' },
  },
}
</script>
<style>
.texto-procesando {
  font-size: 10px;
  color: white;
  line-height: 0.9;
}
.cuadro-exterior {
  border-radius: 25%;
  border: 1px solid white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.cuadro-interior {
  position: relative;
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(245, 166, 35, 0.31);
}
.cuadro-interior-active {
  position: relative;
  width: 74px;
  height: 74px;
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* pulse loading */

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 55px;
  height: 55px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>
