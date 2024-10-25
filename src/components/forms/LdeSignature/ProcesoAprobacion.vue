<template>
  <div class="mainLayout">
    <v-row no-gutters align-center>
      <v-col cols="12" sm="10" offset-sm1>
        <h4 class="ld-title text-center">¡Felicitaciones!</h4>
        <h4 class="ld-title text-center mb-3"></h4>
        <v-row no-gutters row>
          <v-col cols="12">
            <p class="ld-subTitle-signature text-center mb-3">
              Tu operación finalizó con éxito.
              <br />Ahora recoge tu efectivo de S/5,000 en cualquiera de
              nuestras oficinas, presentando tu DNI.
            </p>
          </v-col>
        </v-row>
        <v-row no-gutters column>
          <v-row no-gutters mb-3>
            <v-col cols="12" sm="6">
              <iframe
                class="google_maps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15606.743900597563!2d-77.042852!3d-12.065114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcf793461683422d6!2sAcceso+Crediticio!5e0!3m2!1ses!2spe!4v1543616129871"
                height="300"
                width="auto"
                frameborder="0"
                style="border:0"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-row dense>
                <v-col cols="2" sm="2" text-center>
                  <v-icon large color="acceso" class="pt-2">location_on</v-icon>
                </v-col>
                <v-col cols="10" sm="10">
                  <v-row no-gutters column>
                    <v-col cols="12">
                      <h4>Jesús María</h4>
                    </v-col>
                    <v-col cols="12">
                      Dirección:
                      <a class="link_maps" @click="dialog = true"
                        >Av. 28 de Julio 334</a
                      >
                      <br />
                      <span>Horario de atención: 9:00 a.m. - 6:00 p.m.</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
      <v-col cols="12" class="text-center" mt-3>
        <v-btn :color="color" class="ld-btn" @click="goHome">CERRAR</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    color: String
    /*     tituloAprobracion: {
      type: String,
      default: '¡FELICITACIONES TIENES UN CRÉDITO APROBADO!'
    },
    subTituloAprobacion: {
      type: String,
      default: 'Puedes recoger tu dinero en las oficinas de Acceso Crediticio.'
    } */
  },
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false
    }
  },
  computed: {
    seminuevos() {
      // console.log('seminuevos')

      if (this.$route.name === 'credito-semi-nuevo-powers') {
        // console.log('estoy en el IF')
        return true
      } else {
        // console.log('estoy en el ELSE')
        return false
      }
    }
  },
  mounted() {
    // this.$ga.event('Documentacion-Pesencial', 'Visualizacion')
  },
  methods: {
    goHome() {
      this.$router.push('/')
      this.$ga.event('Expediente completo', 'Completo')
      this.$store.commit('default/RESET_STATES')
    }
  }
}
</script>

<style scoped>
.ld-title {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: -1px;
}

.ld-subTitle-signature {
  font-size: 16px !important;
  margin-bottom: 0px;
}

.ld-span {
  font-size: 12px;
  margin-bottom: 0px;
}

.mainLayout {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.mainImage {
  width: 80%;
  height: auto;
}
.google_maps {
  position: relative;
}
.google_maps iframe {
  width: 100%;
  height: 100%;
}
.link_maps {
  text-decoration: underline !important;
}
.modal_maps {
  border-radius: 12px;
}
.close_maps {
  position: relative;
}
@media (max-width: 991px) {
  .mainImage {
    max-width: 200px;
    width: 100%;
  }
  .ld-final {
    display: flex;
    justify-content: center;
  }
}
</style>
