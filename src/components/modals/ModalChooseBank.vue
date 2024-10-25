<template>
  <v-dialog v-model="dialogVisible" :max-width="maxWidth">
    <div class="prueba-matter">
      <div class="container-close">
        <v-icon
          class="container-close__icon"
          color="white"
          small
          @click="dialogVisible = false"
          >close</v-icon
        >
      </div>
      <div class="prueba-matter__header-container">
        <h3>Aquí podrás escoger el banco para abrir una cuenta bancaria:</h3>
      </div>
      <div class="prueba-matter__body-container">
        <span class="prueba-matter__banco-title">Bancos</span>
        <div class="prueba-matter__bancos-container">
          <img width="50px" src="~/assets/img/credInstante/banco1.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/banco2.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/banco3.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/banco4.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/banco5.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/banco6.png" alt="" />
        </div>
        <!--  <span class="prueba-matter__mas-bancos">Ver más bancos +</span> -->
        <span class="prueba-matter__caja-title">Cajas</span>
        <div class="prueba-matter__cajas-container">
          <img width="50px" src="~/assets/img/credInstante/caja1.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/caja2.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/caja3.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/caja4.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/caja5.png" alt="" />
          <img width="50px" src="~/assets/img/credInstante/caja6.png" alt="" />
        </div>
        <!-- <span class="prueba-matter__mas-cajas">Ver más cajas +</span> -->
      </div>
      <div class="prueba-matter__footer-container">
        <h2>Al regresar</h2>
        <span class="prueba-matter__footer-text"
          >Si se terminó la sesión vuelve a registrarte</span
        >
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: ['maxWidth'],
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
  },
}
</script>

<style lang='scss'>
.prueba-matter {
  background: white !important;
  border-radius: 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  &__header-container,
  &__footer-container {
    font-weight: bold;
    background-color: #ff4e00;
    background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
    border-radius: 10px;
    margin: 5px;
    color: white;
    padding: 20px 10px;
    text-align: center;
    width: 95%;
  }
  &__banco-title,
  &__caja-title {
    display: block;
    border: orange solid 1px;
    border-radius: 10px;
    color: orange;
    font-weight: bold;
    padding-left: 14px;
    margin: 34px 24px 14px 24px;
  }
  &__mas-bancos,
  &__mas-cajas {
    display: block;
    background: silver;
    margin: 34px 24px 14px 24px;
    border-radius: 10px;
    color: white;
    text-align: right;
    font-size: 10px;
    padding: 4px 10px;
  }
  &__bancos-container,
  &__cajas-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 54px;
    flex-wrap: wrap;
  }
  &__bancos-container img,
  &__cajas-container img {
    margin: 3px;
  }
  &__footer-text {
    font-size: 12px;
  }
}
.container-close .container-close__icon {
  background-color: #005092 !important;
  border-radius: 50%;
}
</style>