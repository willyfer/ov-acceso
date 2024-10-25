<template>
  <div class="mainLayout">
    <v-row no-gutters align-center>
      <v-col cols="12" sm="4" text-center>
        <img src="@/assets/time.png" class="mainImage" />
      </v-col>
      <v-col cols="12" sm="8">
        <div>
          <h4 class="ld-title py-2">{{ tituloAprobracion }}</h4>
          <!--     <p class="ld-subtitle mt-2" v-if="seminuevos">
            Estamos verificando tu información,
            <br>en breve se comunicará contigo un asesor para terminar el proceso.
          </p>-->
          <p class="ld-subtitle py-2">{{ subTituloAprobacion }}</p>
        </div>
      </v-col>
      <v-col cols="12" class="text-center mt-3">
        <v-btn :color="color" class="ld-btn text-center" @click.native="goHome"
          >Finalizar</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: 'APROBACIÓN EN PROCESO'
    },
    subTituloAprobacion: {
      type: String,
      default:
        'Estamos verificando tus documentos, te llegará un SMS con el resultado de tu evaluación!'
    }
  },
  computed: {
    seminuevos() {
      // console.log("seminuevos");

      if (this.$route.name === 'credito-semi-nuevo-powers') {
        // console.log("estoy en el IF");
        return true
      } else {
        // console.log("estoy en el ELSE");
        return false
      }
    }
  },
  mounted() {
    this.$ga.event('Documentacion-Pesencial', 'Visualizacion')
  },
  methods: {
    goHome() {
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

.ld-subtitle {
  font-size: 18px;

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
