<template>
  <v-container class="mainBack">
    <v-row dense>
      <v-col cols="12" md="6" class="pa-2">
        <v-row dense style="margin-top: 12%;">
          <v-col cols="12">
            <div class="home-section white--text text-left">
              <h1 class="home-title display-1 my-2">
                <b>¿Buscas un crédito?</b>
                <br />
              </h1>
              <h2 class="home-title text-left my-2">Nosotros te lo damos!</h2>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="home-section my-2">
              <h4 class="home-subtitle text-left text-md-left grey--text text--lighten-3">
                Elige cualquiera de nuestros productos
                <br class="hidden-xs-only" />digitales y solicita tu crédito en
                línea
              </h4>
            </div>
          </v-col>
          <v-col cols="12 pa-2 text-left my-2">
            <v-row dense>
              <v-col
                v-for="(item, key) in home"
                :key="key"
                cols="6"
                justify="center"
                align="center"
                class="text-center"
              >
                <div class="button-item">
                  <n-link tag="button" :to="item.url">
                    <img :src="item.src" class="imgProduct" />
                    <br />
                    <span v-html="item.title" />
                  </n-link>
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
  asyncData({ store, redirect }) {
    if (store.state.users.promotor.state) {
      redirect('/productos')
    }
  },
  data() {
    return {
      home: [
        {
          title: 'Credinstante',
          src: require('@/assets/icono_libredisponibilidad.png'),
          url: '/credinstante'
        },
        {
          title: 'Seminuevo',
          src: require('@/assets/seminuevo.png'),
          url: '/credito-semi-nuevo'
        },
        {
          title: 'Celulares',
          src: require('@/assets/smartphone.png'),
          url: '/celulares'
        }
      ]
    }
  },
  mounted(){
    console.log('ENTORNO DE TRABAJO: ', process.env.NUXT_ENV)
  },
  computed: {
    promotor() {
      return this.$store.state.users.promotor
    }
  },
  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    }
  },
  head() {
    return {
      title: 'Préstamos rápidos en línea | Solicítalo ahora',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Tenemos el préstamo que buscas: dinero libre disponibilidad, para conversiones a GNV, financiar tu SOAT y más. Evalúa tu crédito aquí. ¡Contáctanos!`
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'Préstamos rápidos, préstamos personales, crédito online, préstamos online, Libre disponibilidad, dinero al instante, préstamos en Lima, taxistas, Soat, Conversión Gnv'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Préstamos rápidos en línea | Solicítalo ahora'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Tenemos el préstamo que buscas: dinero libre disponibilidad, para conversiones a GNV, financiar tu SOAT y más. Evalúa tu crédito aquí. ¡Contáctanos!`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/img/oficinaacceso_og.png'
        }
      ]
    }
  }
}
</script>

<style>
.mainBack {
  background-image: url('~assets/home-personaje.png');
  /* Center and scale the image nicely */
  background-position: right;
  background-repeat: no-repeat;
}

.leftContent {
  width: 1200px;
}
.imgProduct {
  width: 100%;
  height: 60px;
}

/* .home-title {
  font-size: 42px;
  line-height: 50px;
} */

/* .home-title:nth-child(2) {
  font-size: 32px;
  line-height: 36px;
} */

.home-subtitle {
  font-size: 20px;
  line-height: 32px;
  word-wrap: break-word !important;
  color: '#fff' !important;
}

/* .home-buttons {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  align-self: center;
} */

/* .button-layout {
  display: flex;
  align-items: center;
  justify-content: center;
} */

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

.home-column-right {
  width: 100% !important;
  height: auto;
  position: relative;
}

.home-column-right img {
  min-width: 200px;
  max-width: 400px;
  width: 100%;
}

@media (max-width: 991px) {
  .home-column-right {
    display: flex;
    align-content: flex-end;
    justify-content: flex-end;
    flex-direction: column;
    text-align: center;
    margin: 0 auto;
  }

  .home-column-right .img-layout {
    text-align: center;
    margin: 2em auto 0;
  }
}

@media (max-width: 768px) {
  .mainBack {
    background-image: none;
    /* Center and scale the image nicely */
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

  /*   .home-title {
    font-size: 32px;
    line-height: 36px;
    color: white;
    text-align: center;
  } */

  .home-column-right img {
    max-width: 400px;
    width: 70%;
  }
  .btn_iframe {
    background-color: transparent !important;
    box-shadow: 0px 0px 0px transparent !important;
  }
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
}
</style>
