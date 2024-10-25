<template>
  <v-container class="creditos__container d-flex flex-column">
    <v-col class="text-center">
      <template>
        <v-row class="d-flex flex-row mt-2 justify-center">
          <span class="secondary--text class-title">{{
            tituloAprobracion
          }}</span>
        </v-row>
        <v-row class="d-flex flex-row justify-center" cols="12">
          <span class="secondary--text class-title">{{ datos.nombres }}</span>
        </v-row>

        <v-row
          v-if="datos.codigoProducto == 23"
          class="d-flex flex-row justify-center mb-3"
          cols="12"
        >
          <span class="secondary--text" style="font-size: 20px"
            >Si pagas tus cuotas puntualmente, podrás acceder más adelante, a un
            préstamo por un monto mayor.</span
          >
        </v-row>
        <v-row class="d-flex flex-row justify-center" cols="12">
          <v-col>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="250"
              max-width="200"
              width="200"
              height="250"
              :src="img_a20"
              style="margin: 9px auto"
            ></v-img>
            <p>
              Costo de equipo: S/.699 TEA: 80% Cuota mensual: 108.24 Plazo:12
              meses
            </p>
          </v-col>
        </v-row>
        <div v-if="isBtnConfirmar">
          <v-row class="d-flex flex-row justify-center mt-4" md="6">
            <span class="secondary--text" style="font-size: 20px"
              >¿Está conforme con la oferta comercial?</span
            >
            <v-col md="6" class="d-flex flex-row justify-center">
              <v-btn
                class="white--text"
                style="border-radius: 7px; background-color: #ff7729"
                dark
                :loading="loading"
                @click="confirmaPrestamo"
                >Si</v-btn
              >
            </v-col>
            <v-col md="6" class="d-flex flex-row justify-center">
              <v-btn
                class="white--text"
                style="border-radius: 7px; background-color: #ff7729"
                dark
                :loading="loadingdecline"
                @click="declinarPrestamo"
                >No</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </template>
    </v-col>
    <v-dialog v-model="isModalDeclineOferta" max-width="500">
      <div class="container-poup">
        <div class="container-close d-flex justify-end">
          <v-icon color="white" small @click="isModalDeclineOferta = false"
            >close</v-icon
          >
        </div>
        <!-- <img class="img-popup" :src="imgPopup" alt="Fae_finalizado" /> -->
        <v-card>
          <v-card-text>
            <div class="text-h5 pa-5">
              Acerquesea los puntos de vena autorizados
              <a href="#">Relacion de centros autorizados</a>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <!-- <v-btn text @click="isModalDeclineOferta = false">Cerrar</v-btn> -->
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import CreditDetails from '@/components/shared/CreditDetails'
import CreditSimulationLD from '@/components/shared/creditSimulation/CreditSimulationLD'
export default {
  components: {
    CreditDetails,
    CreditSimulationLD,
  },
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: 'La oferta seleccionada es la siguiente: ',
    },
    subTituloAprobacion: {
      type: String,
      default: 'tienes un crédito aprobado por acceso!',
    },
  },
  data() {
    return {
      isBtnConfirmar: true,
      Cabecera:
        '<b>¡Gracias!<b/> <br/> No olvides recoger <br/> tu efectivo presentando <br/> tu DNI',
      dialogstate: false,
      condiciones: '',
      loading: false,
      loadingdecline: false,
      loadingSimulacion: false,
      clientId: '', //required
      tokenApp: '', //required
      documentNumber: '', //required
      resultUrl: '', //required
      resultHeaders: '', //opcinal
      clientData: '', //opcinal
      isModalDeclineOferta: false,
      imgPopup: require('@/assets/detalle-prestamo-pos.png'),
      intervaloMonto: 1,
      items_marca: ['sansung', 'marca'],
      marca: '',
      items_modelo: ['a10', 'a20', 'a10s', 'a30'],
      modelo: '',
      img_a20: require('@/assets/img/celulares/samsung_a20.jpg'),
    }
  },
  methods: {
    confirmaPrestamo() {
      this.loading = true
      this.$ga.event('celulares', 'Boton-confirmación')
      this.loading = false
      this.dialogstate = true
      this.$store.commit('celulares/SET_STEP', 5) //4
    },
    declinarPrestamo() {
      //Abrirmodal
      this.loadingdecline = true
      this.$ga.event('celulares', 'Boton-declinacion-oferta')
      this.loadingdecline = false
      this.dialogstate = true
      this.isModalDeclineOferta = true
      // this.$store.commit('celulares/SET_STEP', 5) //4
    },
  },
  computed: {
    ...mapGetters('express', ['datos', 'plazos']),
    ...mapState('users', ['promotor']),
  },
  mounted() {
    if (this.promotor.codigoUsuario) {
      this.isBtnConfirmar = false
    } else {
      this.isBtnConfirmar = true
    }
    this.$ga.event('celulares', 'aprobacion')
    this.$fb.track('Aprobado')

    this.documentNumber = this.datos.documento
  },
}
</script>

<style scoped>
.creditos__container {
  max-width: 450px !important;
}
.v-text-field--outlined .v-input__control {
  padding: 0;
}
.class-title {
  font-size: 28px;
  font-weight: bold;
}
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
  .class-title {
    font-size: 23px;
    font-weight: bold;
  }
  .mainImage {
    max-width: 200px;
    width: 100%;
  }
  .ld-final {
    display: flex;
    justify-content: center;
  }
}
.container-poup {
  display: flex;
  position: relative;
}

.img-popup {
  width: 100%;
  height: 100%;
}

.container-close {
  position: absolute;
  right: 0;
}
.container-close .v-icon {
  background-color: #005092 !important;
  border-radius: 50%;
  padding: 5px;
}
</style>
