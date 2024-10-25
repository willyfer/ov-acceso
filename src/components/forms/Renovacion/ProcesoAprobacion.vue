<template>
  <v-container class="creditos__container d-flex flex-column">
    <v-col class="text-center">
      <template>
        <v-row class="d-flex flex-row mt-2 justify-center" cols="12">
          <span class="secondary--text class-title">{{ofertas.nombreCliente}}, </span>
        </v-row>
        <v-row class="d-flex flex-row justify-center mb-3" cols="12">
          <span class="secondary--text class-title"
            >elige el monto y plazo que más te acomode
          </span>
        </v-row>
        <RenovaSimulation
          :montoMinimo="ofertas.importeFinanciarMinimo"
          :montoMaximo="ofertas.importeFinanciarMaximo"
          :listaPlazos="ofertas.plazos"
          :placa="ofertas.placa"
          :deudaVigente="ofertas.deudaVigente"
          :tea="ofertas.tasa"
          :factorRecaudo="ofertas.factorRecaudo"
          :intervaloMonto="intervaloMonto"
          :cuota="datos.cuotaFinal"
          :loading="loading"
          :color="color"
          :loadingSimulacion="loadingSimulacion"
          @simular="simular"
          @confirmarSimulacion="confirmarSimulacion"
        />
      </template>
    </v-col>
    <v-dialog v-model="isModalDetallePrestamo" max-width="500">
      <div class="container-poup">
        <div class="container-close d-flex justify-end">
          <v-icon color="white" small @click="isModalDetallePrestamo = false"
            >close</v-icon
          >
        </div>
        <img class="img-popup" :src="imgPopup" alt="Fae_finalizado" />
      </div>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import CreditDetails from '@/components/shared/CreditDetails'
import RenovaSimulation from '@/components/shared/renovaSimulation/renoSimulation.vue'
export default {
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: '¡Felicitaciones ',
    },
    subTituloAprobacion: {
      type: String,
      default: 'tienes un crédito aprobado!',
    },
  },
  components: {
    CreditDetails,
    RenovaSimulation,
  },
  data() {
    return {
      isBtnConfirmar: true,
      Cabecera:
        '<b>¡Gracias!<b/> <br/> No olvides recoger <br/> tu efectivo presentando <br/> tu DNI',
      dialogstate: false,
      condiciones: '',
      loading: false,
      loadingSimulacion: false,
      clientId: '', //required
      tokenApp: '', //required
      documentNumber: '', //required
      resultUrl: '', //required
      resultHeaders: '', //opcinal
      clientData: '', //opcinal
      isModalDetallePrestamo: false,
      imgPopup: require('@/assets/detalle-prestamo-pos.png'),
      intervaloMonto: 1,
    }
  },
  methods: {
    confirmaPrestamo() {
      this.loading = true
      this.$ga.event('Credinstante', 'Boton-confirmación')
      this.loading = false
      this.dialogstate = true
      this.$store.commit('ui/UPDATE_STEP', 4) //4
    },
   async simular(payload) {
     this.loadingSimulacion = true
      await this.$store.dispatch('express/actionSimularCredito', {
        ...payload,
        producto: this.datos.codigoProducto,
        tea: this.ofertas.tasa
      })
      this.loadingSimulacion = false
    },
    async confirmarSimulacion(payload) {
      this.loading = true
      await this.$store.dispatch('express/actionConfirmarSimulacion', {
        ...payload,
        prospecto: this.ofertas.codigoProspecto,
      })
      this.loading = false
    },
  },
  computed: {
    ...mapGetters('express', ['datos', 'plazos','ofertas']),
    ...mapState('users', ['promotor']),
    isDetallePrestamo() {
      if (
        this.datos.codigoProducto === 17 ||
        this.datos.codigoProducto === 18 ||
        this.datos.codigoProducto === 26 ||
        this.datos.codigoProducto === 27
      ) {
        return true
      } else {
        return false
      }
    },
    isSimulador() {
      return this.datos.codigoProducto === 13 ||
        this.datos.codigoProducto === 23
        ? true
        : false
    },
  },
  mounted() {
    if (this.promotor.codigoUsuario) {
      this.isBtnConfirmar = false
    } else {
      this.isBtnConfirmar = true
    }
    this.$ga.event('Credinstante', 'aprobacion')
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
