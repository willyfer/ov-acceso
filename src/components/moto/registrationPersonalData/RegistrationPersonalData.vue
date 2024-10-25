<template>
  <v-container
    class="registration-personal-data-motorcycle container-principal d-flex flex-column"
  >
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <RegistrationPersonalDataHeaderContent />
    </SharedHeaderWithStepper>
    <RegistrationPersonalDataMotorcycleForm
      @get-provinces="getProvinces"
      @get-districts="getDistricts"
      @registration-personal-data="registrationPersonalData"
      :listaTiposDocumentos="listaTiposDocumentos"
      :listaTiposResidencias="listaTiposResidencias"
      :listaActividadEconomica="listaActividadEconomica"
      :listaSectorEconomico="listaSectorEconomico"
      :listaProfesion="listaProfesion"
      :listaCargaFamiliar="listaCargaFamiliar"
      :departments="departments"
      :provinces="provinces"
      :districts="districts"
      :estadoCivil="estadoCivil"
      :codigoProspecto="codigoProspecto"
      :estadoProspecto="estadoProspecto"
      :productCode="productCode"
      :netRemuneration="netRemuneration"
      :listaTipoUsoMoto="listaTipoUsoMoto"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import RegistrationPersonalDataMotorcycleForm from '@/components/shared/registrationPersonalData/RegistrationPersonalDataMotorcycleForm'
import RegistrationPersonalDataHeaderContent from '@/components/shared/registrationPersonalData/RegistrationPersonalDataHeaderContent'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import registrationPersonalDataMixin from '@/mixins/registrationPersonalDataMixin'

export default {
  components: {
    SharedHeaderWithStepper,
    RegistrationPersonalDataMotorcycleForm,
    RegistrationPersonalDataHeaderContent,
  },
  mixins: [actionsByCodeMixin, registrationPersonalDataMixin],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  async fetch() {
    try {
      this.$gtag('event', 'conversion', {
        send_to: process.env.SEND_TO_ADS,
      })
      const { catalogs: consulta } = this.currentComponent
      const { productCode: tipoProducto } = this.$store.state.users
      await this.$store.dispatch('catalogue/getCatalogs', {
        tipoProducto,
        consulta,
      })
      await this.$store.dispatch('ubigeo/getDepartments')
    } catch (error) {
      this.$showError(error)
    }
  },
  computed: {
    ...mapGetters('catalogue', [
      'listaTiposDocumentos',
      'listaTiposResidencias',
      'listaSectorEconomico',
      'listaActividadEconomica',
      'listaProfesion',
      'listaCargaFamiliar',
      'listaTipoUsoMoto'
    ]),
    ...mapGetters('ubigeo', ['departments', 'provinces', 'districts']),
    ...mapGetters('moto', [
      'estadoCivil',
      'codigoProspecto',
      'estadoProspecto',
      'netRemuneration',
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
