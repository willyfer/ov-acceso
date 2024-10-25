<template>
  <div class="contents__container">
    <div class="contents__section-1">
      <p class="text__primary text__primary--bold">
        <v-icon aria-hidden="false" class="text__orange"> arrow_right</v-icon>
        ¿En qué consiste?
      </p>
      <p class="pl-8 contents--text">
        Nuestro préstamo te permite cancelar tus créditos con otras financieras
        a una tasa preferencial, así ahorrar en tu presupuesto mensual.
      </p>
    </div>
    <div class="contents__section-2">
      <p class="text__primary text__primary--bold">
        <v-icon aria-hidden="false" class="text__orange"> arrow_right</v-icon
        >Información de la Compra de Deuda
      </p>
      <ul class="list-compra-deuda">
        <li class="list-compra-deuda__item">
          <div class="list-compra-deuda__container-img my-2">
            <v-img
              class="list-compra-deuda__img"
              :src="imgCompraDeuda1"
              alt="imgCompraDeuda"
              width="80"
            />
          </div>
          <p class="list-compra-deuda__text contents--text">
            Compramos tus deudas por montos desde S/ 1,000 hasta S/ 5,000.
          </p>
        </li>
        <li class="list-compra-deuda__item">
          <div class="list-compra-deuda__container-img my-2">
            <v-img
              class="list-compra-deuda__img"
              :src="imgCompraDeuda2"
              alt="imgCompraDeuda"
              width="170"
            />
          </div>
          <p class="list-compra-deuda__text contents--text">
            Lo puedes solicitar desde casa, 100% digital.
          </p>
        </li>
      </ul>
    </div>
    <div class="contents__section-3">
      <p class="text__primary text__primary--bold">
        <v-icon aria-hidden="false" class="text__orange"> arrow_right</v-icon
        >¿Cómo obtenerlo?
      </p>
      <div class="obtenerlo__container">
        <ul class="list-obtenerlo">
          <li class="list-obtenerlo__item">
            <div class="d-flex align-start">
              <v-icon aria-hidden="false" class="text__primary">
                arrow_right</v-icon
              >
              <p class="contents--text">
                Obtenerlo es muy fácil. Solicítalo por aquí y en 72 horas
                hábiles como máximo te desembolsamos el dinero a tu cuenta
                bancaria.
              </p>
            </div>
          </li>
          <li class="list-obtenerlo__item">
            <div class="d-flex align-start">
              <v-icon aria-hidden="false" class="text__primary">
                arrow_right</v-icon
              >
              <p class="contents--text">
                Financiamiento en 12, 18 ó 24 cuotas fijas mensuales.
              </p>
            </div>
          </li>
        </ul>
        <div class="obtenerlo__container-img ma-5">
          <v-img
            class="obtenerlo__img"
            :src="imgObtenerlo"
            alt="imgObtenerlo"
            width="150"
          />
        </div>
      </div>
    </div>
    <div class="contents__section-3">
      <p class="text__primary text__primary--bold">
        <v-icon aria-hidden="false" class="text__orange"> arrow_right</v-icon
        >¿Dónde puedo hacer mis pagos?
      </p>
      <div class="obtenerlo__container">
        <ul class="list-obtenerlo">
          <li class="list-obtenerlo__item">
            <div class="d-flex align-start">
              <v-icon aria-hidden="false" class="text__primary">
                arrow_right</v-icon
              >
              <p class="contents--text">
                Tenemos diferentes opciones para realizar tus pagos de una
                manera sencilla, segura y confiable.
              </p>
            </div>
          </li>
          <li class="list-obtenerlo__item">
            <div class="d-flex align-start">
              <v-icon aria-hidden="false" class="text__primary">
                arrow_right</v-icon
              >
              <p class="contents--text">
                Para conocer los lugares de pago puedes dar click en el
                siguiente enlace:
              </p>
            </div>
            <div class="lugares-pago">
              <a class="lugares-pago__link" :href="linkPagos" target="_blank">Ver lugares de pago aquí</a>
            </div>
          </li>
        </ul>
        <div class="obtenerlo__container-img ma-5">
          <v-img
            class="obtenerlo__img"
            :src="imgPagos"
            alt="imgObtenerlo"
            width="150"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contents',
  data() {
    return {
      imgCompraDeuda1: require('@/assets/img/compra-deuda/compraDeuda1.png'),
      imgCompraDeuda2: require('@/assets/img/compra-deuda/compraDeuda2.png'),
      imgObtenerlo: require('@/assets/img/compra-deuda/obtenerlo.png'),
      imgPagos: require('@/assets/img/compra-deuda/pagos.png'),
      linkPagos: 'https://acceso.com.pe/descargas/lugares_de_pago_actulizado_2021.pdf'
    }
  },
}
</script>

<style scoped>
ul li {
  list-style: none;
}
.contents__container {
  max-width: 600px;
  margin: 0 auto;
}
.list-compra-deuda {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.list-compra-deuda__item {
  margin: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-compra-deuda__text {
  text-align: center;
}
.list-obtenerlo__item {
  padding: 10px;
}
.obtenerlo__container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.list-obtenerlo {
  max-width: 400px;
}
.lugares-pago{
  margin-left: 24px;
  background-color: #ff7729;
  max-width: 300px; 
  text-align: center; 
  border-radius: 15px;
  padding: 2px 0;
}
.lugares-pago__link {
  color: white;
  text-decoration: none;
  font-weight: bold;  
}
.lugares-pago:hover {
  background-color: #165f9c;
}
</style>