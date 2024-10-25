<template>
  <v-container class="mainBack">
    <v-row dense>
      <v-col cols="12" md="6" class="pa-2">
        <v-row dense>
          <v-col cols="12">
            <div class="home-section white--text text-left">
              <h1 class="home-title display-1">
                <b>¿Buscas un crédito?</b>
                <br />
              </h1>
              <h2 class="home-title text-left">Nosotros te lo damos!</h2>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="home-section">
              <h4 class="home-subtitle text-left text-md-left grey--text text--lighten-3">
                Elige cualquiera de nuestros productos
                <br class="hidden-xs-only" />digitales y solicita tu crédito en
                línea
              </h4>
            </div>
          </v-col>
          <v-col cols="12 pa-2 text-left">
            <v-row dense>
              <v-col
                v-for="(item, key) in productsByUser"
                :key="key"
                cols="6"
                justify="center"
                align="center"
                class="text-center"
              >
                <div class="button-item">
                  <button @click="(e) => getProduct(item.url, item.id)">
                    <img :src="item.src" class="imgProduct"/>
                    <br />
                    <span v-html="item.title" />
                  </button>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'MainLayout',
  middleware: 'authenticated',
  data() {
    return {
      allProductos: [
        {
          id: 1,
          title: 'Consulta </br> SOAT',
          src: require('@/assets/credito_soat.png'),
          url: '/credito-soat-plus'
        },
        {
          id: 2,
          detalle: 'Micro Crédito LD',
          title: 'Micro Crédito LD',
          src: require('@/assets/credito_soat.png'),
          url: '/'
        },
        {
          id: 3,
          title: 'Credinstante',
          src: require('@/assets/icono_libredisponibilidad.png'),
          url: '/credinstante'
        },
        {
          id: 7,
          title: 'Semi Nuevos',
          src: require('@/assets/credito-vehicular.png'),
          url: '/credito-semi-nuevo'
        },
        {
          id: 8,
          title: 'Conversión GNV + Efectivo',
          src: require('@/assets/conversion-efectivo.png'),
          url: '/credito-mas-efectivo'
        },
        {
          id: 11,
          title: 'Club del Conductor',
          src: require('@/assets/club_conductor_home.png'),
          url: '/ld-clubconductor'
        },
        {
          id: 12,
          title: 'LD - Express',
          src: require('@/assets/express.png'),
          url: '/ld-express'
        },
        {
          id: 13,
          title: 'Credinstante',
          src: require('@/assets/icono_libredisponibilidad.png'),
          url: '/credinstante'
        },
        {
          id: 19,
          title: 'Conversion </br> FISE',
          src: require('@/assets/gas.png'),
          url: '/conversion-fise'
        },
        {
          id: 21,
          title: 'Conversion',
          src: require('@/assets/gas.png'),
          url: '/conversion'
        },
        {
          id: 30,
          title: 'Estado de Prospectos',
          src: require('@/assets/express.png'),
          url: '/estado-prospectos'
        },
        {
          id: 31,
          title: 'Acivación - Credinstante',
          src: require('@/assets/express.png'),
          url: '/activacion-ld'
        },
        {
          id: 28,
          title: 'Moto',
          src: require('@/assets/img/moto/motoHome.png'),
          url: '/moto'
        },
        {
          id: 29,
          title: 'Mototaxi',
          src: require('@/assets/img/mototaxi/motoTaxiHome.png'),
          url: '/mototaxi'
        },
        {
          id: 36,
          title: 'Motofurgón',
          src: require('@/assets/img/motofurgon/motofurgon.png'),
          url: '/motofurgon'
        },
      ],
      productsByUser: [],
    }
  },
  fetch() {
    const { productos } = this.$store.state.users.promotor;
    this.productsByUser = this.allProductos.filter(item => {
      return productos.find(p => p.ti_solpro == item.id) ? item : undefined ;
    });
  },
  methods: {
    getProduct(url, idProducto) {      
      this.$store.commit('users/SET_PRODUCT_CODE', idProducto);
      this.$router.push(url);
    }
  }
}
</script>

<style>
.mainBack {
  background-image: url('~assets/home-personaje.png');
  background-position: right;
  background-repeat: no-repeat;
  width: 80% !important;
}

.leftContent {
  width: 1200px;
}
.imgProduct {
  width: 100%;
  height: 60px;
}

.home-subtitle {
  font-size: 20px;
  line-height: 32px;
  word-wrap: break-word !important;
  color: '#fff' !important;
}
.button-item {
  max-height: 120px;
  min-height: 120px;
  width: 120px;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.44);
  background: linear-gradient(#ea9864, #e5762f);
  margin: 16px;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  line-height: 15px;
  font-weight: 600;
  text-transform: none !important;
  padding: 10px;
}

.button-item img {
  width: 100%;
}
@media (max-width: 991px) {
}

@media (max-width: 768px) {
  .mainBack {
    background-image: none;
  }
  .imgProduct {
    max-width: 80px !important;
    width: 100% !important;
  }
  .button-item {
    font-size: 12px;
    width: 100px;
    max-height: 100px;
    min-height: 100px;
    margin: 5px;
    padding: 2px 10px;
  }

  .button-item img {
    width: 250px;
    max-width: 75%;
  }

  .home-section {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .container {
    height: 100%;
    top: 32px !important;
  }
}
</style>
