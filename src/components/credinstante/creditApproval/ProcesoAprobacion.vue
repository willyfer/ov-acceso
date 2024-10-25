<template>
  <div class="evaluation-submission-confirmation-motorcycle">
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <div class="credit-approval-header-content">
        <span>¡Felicitaciones</span>
        <span>{{ datos.nombres }}</span>
        <span>tienes un préstamo aprobado!</span>
      </div>
    </SharedHeaderWithStepper>
    <div>
      <InformationContainer title="Condiciones del crédito" align="center">
        <div class="credit-conditions">
          <div>
            <span>Préstamo</span>
            <span
              >S/
              {{
                datos.importeFinanciar
                  ? datos.importeFinanciar.toFixed(2)
                  : '00.00'
              }}</span
            >
          </div>
          <div>
            <span>Plazo</span>
            <span>{{ datos.cuotas }} meses</span>
          </div>
          <template v-if="isDetallePrestamo">
            <div>
              <span>Valor del POS</span>
              <span
                >S/.
                {{
                  datos.importeCostoPos
                    ? datos.importeCostoPos.toFixed(2)
                    : '00.00'
                }}</span
              >
            </div>
            <div>
              <span style="width: 60%">Dinero transferido a tu cuenta</span>
              <span
                >S/.
                {{
                  datos.importeFinanciar
                    ? (datos.importeFinanciar - datos.importeCostoPos).toFixed(
                        2
                      )
                    : '00.00'
                }}</span
              >
            </div>
          </template>
          <div>
            <span>Cuota</span>
            <span
              >S/
              {{
                datos.importeCuotas ? datos.importeCuotas.toFixed(2) : '00.00'
              }}</span
            >
          </div>
          <div>
            <span>TCEA</span>
            <span
              >{{ datos.tasa ? (datos.tasa * 100).toFixed(2) : '00.00' }}%</span
            >
          </div>
        </div>
      </InformationContainer>
    </div>
    <div
      v-show="isDetallePrestamo"
      class="evaluation-submission-confirmation-motorcycle__container-button"
    >
      <SharedButton
        text="Detalle del préstamo"
        :buttonOrange="true"
        :totalWidth="90"
        @click="isModalDetallePrestamo = true"
      />
    </div>
    <div
      class="evaluation-submission-confirmation-motorcycle__container-button"
    >
      <SharedButton
        text="Confirma tu préstamo aquí"
        :buttonOrange="true"
        :totalWidth="90"
        @click="confirmaPrestamo"
      />
    </div>
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import InformationContainer from '@/components/shared/InformationContainer'
import SharedButton from '@/components/shared/SharedButton'

export default {
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
    SharedButton,
  },
  props: {
    color: String,
    currentComponent: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      isBtnConfirmar: true,
      dialogstate: false,
      condiciones: '',
      loading: false,
      isModalDetallePrestamo: false,
      imgPopup: require('@/assets/detalle-prestamo-pos.png'),
    }
  },
  methods: {
    async confirmaPrestamo() {
      this.loading = true
      this.$ga.event('Credinstante', 'Boton-confirmación')
      this.loading = false
      this.dialogstate = true
      this.$store.commit('credinstante/SET_STEP', 4) //4
    },
  },
  computed: {
    ...mapState('credinstante', ['datos']),
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
  },
  created() {
    this.$store.commit('credinstante/UPDATE_DATOS', { sede: 1 })
  },
  mounted() {
    if (this.promotor.codigoUsuario) this.isBtnConfirmar = false
    else this.isBtnConfirmar = true
    this.$ga.event('Credinstante', 'aprobacion')
    this.$fb.track('Aprobado')
  },
}
</script>

<style lang='scss'>
.evaluation-submission-confirmation-motorcycle {
  padding: 4px 8px 8px 8px;
  > div:nth-child(2) {
    margin-top: 40px;
  }
  &__container-button {
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .credit-approval-header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    margin-top: 40px;
    margin-bottom: 30px;
    line-height: 1.2;
    & :nth-child(1) {
      margin: 0 60px 0 60px;
      text-align: center;
    }
    & :nth-child(2) {
      font-size: 26px;
      font-weight: bold;
      text-align: center;
    }
    & :nth-child(3) {
      margin: 0 60px 0 60px;
      text-align: center;
    }
  }
  .credit-conditions {
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
      color: #f36e47;
    }
    div:first-child ~ div {
      border-top: 1px solid #0a4e88;
    }
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
