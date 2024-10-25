<template>
  <div class="evaluation-submission-confirmation-motorcycle">
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <EvaluationSubmissionHeaderContent
        :nombreTitular="nombreTitular"
        :apellidoPaterno="apellidoPaterno"
      />
    </SharedHeaderWithStepper>
    <div>
      <InformationContainer title="Condiciones del crédito" align="center">
        <CreditConditions :creditConditions="creditDetails" />
      </InformationContainer>
    </div>
    <div
      class="evaluation-submission-confirmation-motorcycle__container-button"
    >
      <SharedButton
        text="Entiendo"
        :buttonSilver="true"
        :totalWidth="74"
        @click="entiendo"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import InformationContainer from '@/components/shared/InformationContainer'
import EvaluationSubmissionHeaderContent from '@/components/shared/evaluationSubmission/EvaluationSubmissionHeaderContent'
import CreditConditions from '@/components/shared/CreditConditions'
import SharedButton from '@/components/shared/SharedButton'
import { codPage } from '@/enums/moto-enums'

export default {
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
    EvaluationSubmissionHeaderContent,
    CreditConditions,
    SharedButton,
  },
  props: {
    currentComponent: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('moto', [
      'creditDetails', 
      'nombreTitular', 
      'apellidoPaterno',
    ]),
  },
  methods: {
    ...mapMutations('moto', ['CLEAR_ALL', 'SET_STEP']),
    entiendo() {
      this.CLEAR_ALL()
      this.$store.commit('moto/SET_STEP', codPage.PRE_EVALUATION)
    },
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
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>