<template>
  <div class="evaluation-submission-confirmation-motorcycletaxi">
    <SharedHeaderWithStepper 
      :numberSteps='currentComponent.numberSteps'
      :imgVehiculo='currentComponent.imgProductStep'
    >
      <EvaluationSubmissionHeaderContent
        :nombreTitular='nombreTitular'
        :apellidoPaterno='apellidoPaterno'
      />
    </SharedHeaderWithStepper>
    <div>
      <InformationContainer title='Condiciones del crédito' align='center'>
        <CreditConditions :creditConditions="creditDetails" />
      </InformationContainer>
    </div>
    <div class="my-6">
      <InformationContainer title="Próximos pasos" align='center'>
        <NextStepsTake />
      </InformationContainer>
    </div>
    <div class="button-enviar-carta-aprobacion">
      <SharedButton 
        text='Enviar carta de pre-aprobación'
        :buttonOrange='true'
        :totalWidth='80'
        @click='openModalSendApprovalLetter'
      />
    </div>
    <div class="button-entendido">
      <SharedButton 
        text='Entiendo'
        :buttonSilver='true'
        :totalWidth='80'
        @click='finalizeCreditEvaluationProcess'
      />
    </div>
    <CreditApprovalSendingLetterModal 
      ref="creditSendingLetterModal" 
      @send-approval-letter='sendApprovalLetter'
      @downlload-approval-letter='downloadApprovalLetter'
      :loadingDescargar='loadingDescargar'
      :email='email'
      :cellPhoneNumber='cellPhoneNumber'
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper';
import InformationContainer from '@/components/shared/InformationContainer';
import EvaluationSubmissionHeaderContent from '@/components/shared/evaluationSubmission/EvaluationSubmissionHeaderContent';
import CreditApprovalSendingLetterModal from '@/components/shared/creditApproval/CreditApprovalSendingLetterModal';
import CreditConditions from '@/components/shared/CreditConditions';
import NextStepsTake from '@/components/shared/NextStepsTake';
import SharedButton from '@/components/shared/SharedButton';
import { codPage } from '@/enums/mototaxi-enums';

export default {//envair carta de preabrobacion
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
    EvaluationSubmissionHeaderContent,
    CreditConditions,
    SharedButton,
    NextStepsTake,
    CreditApprovalSendingLetterModal,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapGetters('mototaxi', [
      'creditDetails', 
      'email',
      'cellPhoneNumber',
      'codigoProspecto',
      'estadoProspecto',
      'urlCarta',
      'nombreTitular',
      'apellidoPaterno',
    ]),
    ...mapGetters('users', [
      'productCode',
    ]),
  },
  data() {
    return {
      loadingDescargar: false
    }
  },
  methods: {
    openModalSendApprovalLetter() {
      this.$refs.creditSendingLetterModal.open();
    },
    async sendApprovalLetter(averageCosts) {
      try {        
        const data = {
          ...averageCosts,
          "estadoProspecto": this.estadoProspecto,
          "codigoProspecto": this.codigoProspecto,
          "mensaje": "Enviando pruebas para carta de aprobacion por sms",
        };
        await this.$store.dispatch('mototaxi/sendApprovalLetter', data);
        this.$refs.creditSendingLetterModal.close();
      } catch (error) {
        this.$showError(error);
      }
    },
    async downloadApprovalLetter() {
      try {        
        this.loadingDescargar = true
        await this.$store.dispatch('mototaxi/getCartaAprobacion', this.codigoProspecto)
        window.open(this.urlCarta, '_blank');
        this.loadingDescargar = false
      } catch (error) {
        this.$showError(error);
      }
    },
    finalizeCreditEvaluationProcess() {
      this.$store.commit('mototaxi/CLEAR_ALL');
      this.$store.commit('mototaxi/SET_STEP', codPage.PRE_EVALUATION);
    },
  },
}
</script>

<style lang='scss'>
  .evaluation-submission-confirmation-motorcycletaxi {
    padding: 4px 8px 8px 8px;
    > div:nth-child(2) {
      margin-top: 40px;
    }
    .button-enviar-carta-aprobacion {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .button-entendido {
      text-align: center;
      margin-bottom: 50px;
    }
  }
</style>