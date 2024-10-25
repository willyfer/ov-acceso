<template>
  <div>
    <v-container
      class="credit-approval-motorcycle d-flex flex-column align-center"
    >
      <div>
        <SharedHeaderWithStepper
          :numberSteps="currentComponent.numberSteps"
          :imgVehiculo="currentComponent.imgProductStep"
        >
          <CreditApprovalHeaderContent
            :nombreTitular="nombreTitular"
            :apellidoPaterno="apellidoPaterno"
            :codigoProducto="productCode"
            :estadoProspecto="estadoProspecto"
          />
        </SharedHeaderWithStepper>
      </div>
      <div class="my-2 approval-condiciones-credito">
        <InformationContainer align="center" title="Condiciones del crédito">
          <CreditConditions :creditConditions="creditDetails" />
          <CreditConditionsNote />
        </InformationContainer>
      </div>
      <div class="my-2">
        <InformationContainer align="center" title="Próximos pasos">
          <NextStepsTake />
        </InformationContainer>
      </div>
      <div class="button-enviar-carta-aprobacion">
        <SharedButton
          :text="nameButtonSend"
          :buttonOrange="true"
          :totalWidth="90"
          @click="openModalSendApprovalLetter"
        />
      </div>
      <div class="button-entendido">
        <SharedButton
          text="Entiendo"
          :buttonSilver="true"
          :totalWidth="90"
          @click="finalizeCreditEvaluationProcess"
        />
      </div>
    </v-container>
    <CreditApprovalSendingLetterModal
      ref="creditApprovalSendingLetterModal"
      @send-approval-letter="sendApprovalLetter"
      @downlload-approval-letter="downloadApprovalLetter"
      :loadingDescargar="loadingDescargar"
      :email="email"
      :cellPhoneNumber="cellPhoneNumber"
      :estadoProspecto="estadoProspecto"

    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import InformationContainer from '@/components/shared/InformationContainer'
import CreditConditions from '@/components/shared/CreditConditions'
import CreditConditionsNote from '@/components/shared/CreditConditionsNote'
import NextStepsTake from '@/components/shared/NextStepsTake'
import CreditApprovalHeaderContent from '@/components/shared/creditApproval/CreditApprovalHeaderContent'
import SharedButton from '@/components/shared/SharedButton'
import CreditApprovalSendingLetterModal from '@/components/shared/creditApproval/CreditApprovalSendingLetterModal'
import { codPage } from '@/enums/moto-enums'
import { ProductCode } from '@/enums/global-enums'

export default {
  name: 'EvaluationSubmissionConfirmation',
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
    CreditConditions,
    CreditConditionsNote,
    NextStepsTake,
    CreditApprovalHeaderContent,
    SharedButton,
    CreditApprovalSendingLetterModal,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapGetters('moto', [
      'creditDetails',
      'email',
      'cellPhoneNumber',
      'codigoProspecto',
      'estadoProspecto',
      'urlCarta',
      'nombreTitular',
      'apellidoPaterno',
    ]),
    ...mapGetters('users', ['productCode']),
    nameButtonSend() {
      return this.productCode === ProductCode.MOTO_NO_BANCARIADOS ||
        (this.productCode === ProductCode.MOTO && this.estadoProspecto === 90 || this.estadoProspecto === 92)
        ? 'Enviar carta de pre-aprobación'
        : 'Enviar carta de aprobación'
    },
  },
  data() {
    return {
      loadingDescargar: false,
    }
  },
  methods: {
    openModalSendApprovalLetter() {
      this.$refs.creditApprovalSendingLetterModal.open()
    },
    async sendApprovalLetter(averageCosts) {
      try {
        const data = {
          ...averageCosts,
          estadoProspecto: this.estadoProspecto,
          codigoProspecto: this.codigoProspecto,
          mensaje: 'Enviando pruebas para carta de aprobacion por sms',
        }
        await this.$store.dispatch('moto/sendApprovalLetter', data)
        this.$refs.creditApprovalSendingLetterModal.close()
      } catch (error) {
        this.$showError(error)
      }
    },
    async downloadApprovalLetter() {
      try {
        this.loadingDescargar = true
        await this.$store.dispatch(
          'moto/getCartaAprobacion',
          this.codigoProspecto
        )
        this.$refs.creditApprovalSendingLetterModal.close()
        window.open(this.urlCarta, '_blank')
        this.loadingDescargar = false
      } catch (error) {
        this.$showError(error)
      }
    },
    finalizeCreditEvaluationProcess() {
      this.$store.commit('moto/CLEAR_ALL')
      this.$store.commit('moto/SET_STEP', codPage.PRE_EVALUATION)
      this.$store.commit('users/SET_PRODUCT_CODE', ProductCode.SIN_DEFINIR)
    },
  },
}
</script>

<style lang='scss'>
.credit-approval-motorcycle {
  padding: 4px 8px 0 8px !important;
  width: 100% !important;
  .approval-condiciones-credito {
    padding-top: 30px;
  }
  .button-enviar-carta-aprobacion {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .button-entendido {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    margin-top: 20px;
  }
}
</style>
