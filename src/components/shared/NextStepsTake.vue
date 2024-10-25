<template>
  <div>
    <div class="pasos-btn-group mb-5">
      <div class="pasos-btn" :class="classPaso1" @click="cambiarPaso(1)">
        <span class="pasos-btn__title">Paso 1</span>
        <span class="pasos-btn__subtitle">Registro Vehicular</span>
      </div>
      <div class="pasos-btn" :class="classPaso2" @click="cambiarPaso(2)">
        <span class="pasos-btn__title">Paso 2</span>
        <span class="pasos-btn__subtitle">Toma de Firmas</span>
      </div>
      <div class="pasos-btn" :class="classPaso3" @click="cambiarPaso(3)">
        <span class="pasos-btn__title">Paso 3</span>
        <span class="pasos-btn__subtitle">Entrega Vehicular</span>
      </div>
    </div>
    <div v-show="paso === 1" class="pasos-btn-info">
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgUser" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          El cliente deberá de pagar su cuota inicial para el financiamiento
          del vehículo y enviar su voucher al concesionarios.
        </p>
      </div>
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgUser" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          El concesionario registrará los datos del vehículo a financiar.
        </p>
      </div>
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgBank" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          Acceso Crediticio verificará los sustentos otorgados por
          concesionario.
        </p>
      </div>
    </div>
    <div v-show="paso === 2" class="pasos-btn-info">
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgBank" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          Acceso Crediticio enviará un enlace vía mensaje de texto para
          autorizar el ingreso a firma electrónica.
        </p>
      </div>
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgUser" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          El cliente deberá validar su identidad y firmar sus contratos
          electrónicos.
        </p>
      </div>
    </div>
    <div v-show="paso === 3" class="pasos-btn-info">
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgBank" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          Acceso Crediticio desembolsa al concesionario el monto a
          financiar.
        </p>
      </div>
      <div class="pasos-btn-info__container">
        <div class="pasos-btn-info__container-img">
          <img class="pasos-btn-info__img" :src="imgUser" alt="" />
        </div>
        <p class="pasos-btn-info__text mb-0">
          El concesionario inmatriculará la placa del vehiculo en registros
          públicos y comunicará al cliente para la entrega
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    classPaso1(){
      if(this.paso === 1) {
        return 'pasos-btn--active'
      }else {
        return ''
      }
    },
    classPaso2(){
      if(this.paso === 2) {
        return 'pasos-btn--active'
      }else {
        return ''
      }
    },
    classPaso3(){
      if(this.paso === 3) {
        return 'pasos-btn--active'
      }else {
        return ''
      }
    }
  },
  data() {
    return {
      imgBank: require('@/assets/img/moto/bank.png'),
      imgUser: require('@/assets/img/moto/user.png'),
      paso: 1
    }
  },
  methods: {
    cambiarPaso(value){
      this.paso = value
    }
  }
}
</script>

<style>
.pasos-btn-group {
  display: flex;
  justify-content: space-around;
}
.pasos-btn {
  display: flex;
  flex-direction: column;
  background-color: #797979;
  color: white;
  padding: 5px;
  border-radius: 5px;
  line-height: 1.2;
  cursor: pointer;
}

.pasos-btn--active {
  background-color: #F36E47;
}

.pasos-btn__title {
  font-size: 0.9em;
  font-weight: bold;
}

.pasos-btn__subtitle {
  font-size: 0.5em;
}

.pasos-btn-info__container {
  display: flex;
  align-items: center;
  margin: 15px;
}

.pasos-btn-info__container-img {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.pasos-btn-info__img {
  width: 45px;
}

.pasos-btn-info__text {
  font-size: 0.57em;
  color: #797979;
}
</style>