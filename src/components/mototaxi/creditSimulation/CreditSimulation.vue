<template>
  <v-container fluid class="credit-simulation-motorcycletaxi container-principal d-flex flex-column">
    <SharedHeaderWithStepper 
      :numberSteps='currentComponent.numberSteps'
      :imgVehiculo='currentComponent.imgProductStep'
    >
      <CreditSimulationHeaderContent />
    </SharedHeaderWithStepper>    
    <CreditSimulationMotorcycleTaxiForm 
      @simulate-credit-conditions='simulateCreditConditions'
      @edit-simulate-credit-conditions='editSimulateCreditConditions'
      @confirm-credit-condition='confirmCreditCondition'
      :codigoProspecto='codigoProspecto'
      :estadoProspecto='estadoProspecto'
      :productCode='productCode'
      :plazo='plazo'
      :combustible='combustible'
      :model='model'
      :creditConditions='creditConditions'
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper';
import CreditSimulationHeaderContent from '@/components/shared/creditSimulation/CreditSimulationHeaderContent';
import CreditSimulationMotorcycleTaxiForm from '@/components/shared/creditSimulation/CreditSimulationMotorcycleTaxiForm';
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin';
import creditSimulationMixin from '@/mixins/creditSimulationMixin';

export default {
  name: 'CreditSimulation',
  components: {
    SharedHeaderWithStepper,
    CreditSimulationHeaderContent,
    CreditSimulationMotorcycleTaxiForm,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  mixins: [actionsByCodeMixin, creditSimulationMixin],
  /* async fetch() {
    try {      
      const { catalogs: consulta } = this.currentComponent;
      const { productCode: tipoProducto } = this.$store.state.users;
      await this.$store.dispatch('catalogue/getCatalogs', { tipoProducto, consulta });
    } catch (error) {
      this.$showError(error);
    }
  }, */
  computed: {
    ...mapGetters('mototaxi', [
      'codigoProspecto',
      'estadoProspecto',
      'creditConditions',
      'plazo',
      'combustible',
      'model',
    ]),
    ...mapGetters('users', [
      'productCode',
    ]),
  },
}
</script>

<style scoped>
.container-principal {
  max-width: 450px !important;
  padding-top: 4px !important;
}
</style>