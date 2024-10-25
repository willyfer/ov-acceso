<template>
  <v-container fluid class="credit-simulation-motorcycle container-principal d-flex flex-column">
    <SharedHeaderWithStepper
      :numberSteps='currentComponent.numberSteps'
      :imgVehiculo='currentComponent.imgProductStep'
    >
      <CreditSimulationHeaderContent />
    </SharedHeaderWithStepper>
    <CreditSimulationMotorcycleForm
      @simulate-credit-conditions='simulateCreditConditions'
      @edit-simulate-credit-conditions='editSimulateCreditConditions'
      @confirm-credit-condition='confirmCreditCondition'
      :maximumAmountFinance='maximumAmountFinance'
      :minimumAmountFinance='1000'
      :codigoProspecto='codigoProspecto'
      :estadoProspecto='estadoProspecto'
      :listaPlazos='plazos'
      :listaMarcas='listaMarcas'
      :listaModelos='listaModelos'
      :creditConditions='creditConditions'
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper';
import CreditSimulationHeaderContent from '@/components/shared/creditSimulation/CreditSimulationHeaderContent';
import CreditSimulationMotorcycleForm from '@/components/shared/creditSimulation/CreditSimulationMotorcycleForm';
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin';
import creditSimulationMixin from '@/mixins/creditSimulationMixin';

export default {
  name: 'CreditSimulation',
  components: {
    SharedHeaderWithStepper,
    CreditSimulationHeaderContent,
    CreditSimulationMotorcycleForm,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  mixins: [actionsByCodeMixin, creditSimulationMixin],
  async fetch() {
    try {
      const { catalogs: consulta } = this.currentComponent;
      const { productCode: tipoProducto } = this.$store.state.users;
      await this.$store.dispatch('catalogue/getCatalogs', { tipoProducto, consulta });
    } catch (error) {
      this.$showError(error);
    }
  },
  computed: {
    ...mapGetters('moto', [
      'maximumAmountFinance',
      'codigoProspecto',
      'estadoProspecto',
      'creditConditions',
      'plazos',
    ]),
    ...mapGetters('catalogue', [
      'listaMarcas',
      'listaModelos',
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
