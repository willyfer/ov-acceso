<template>
  <v-container
    class="registration-personal-data-motorcycletaxi container-principal d-flex flex-column"
  >
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <RegistrationPersonalDataHeaderContent />
    </SharedHeaderWithStepper>
    <RegistrationPersonalDataMotorcycleTaxiForm
      @get-provinces="getProvinces"
      @get-districts="getDistricts"
      @get-provinces-guarantor="getProvincesGuarantor"
      @get-districts-guarantor="getDistrictsGuarantor"
      @registration-personal-data="registrationPersonalData"
      @handle-change-economic-sector="handleChangeEconomicSector"
      :listaTiposDocumentos="listaTiposDocumentos"
      :listaTiposResidencias="listaTiposResidencias"
      :listActividadEconomica="listActividadEconomica"
      :listaSectorEconomico="listaSectorEconomico"
      :listaProfesion="listaProfesion"
      :listaCargaFamiliar="listaCargaFamiliar"
      :departments="departments"
      :provinces="provinces"
      :districts="districts"
      :provincesGuarantor="provincesGuarantor"
      :districtsGuarantor="districtsGuarantor"
      :estadoCivil="estadoCivil"
      :codigoProspecto="codigoProspecto"
      :estadoProspecto="estadoProspecto"
      :productCode="productCode"
      :listaTiposAvalista="listaTiposAvalista"
      :listaTiposLicencia="listaTiposLicencia"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import RegistrationPersonalDataMotorcycleTaxiForm from '@/components/shared/registrationPersonalData/RegistrationPersonalDataMotorcycleTaxiForm'
import RegistrationPersonalDataHeaderContent from '@/components/shared/registrationPersonalData/RegistrationPersonalDataHeaderContent'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import registrationPersonalDataMixin from '@/mixins/registrationPersonalDataMixin'
import { defaultValues } from '@/enums/mototaxi-enums'

export default {
  components: {
    SharedHeaderWithStepper,
    RegistrationPersonalDataMotorcycleTaxiForm,
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
      this.handleChangeEconomicSector(defaultValues.ECONOMIC_SECTOR)
    } catch (error) {
      this.$showError(error)
    }
  },
  computed: {
    ...mapGetters('catalogue', [
      'listaTiposDocumentos',
      'listaTiposResidencias',
      'listaActividadEconomica',
      'listaSectorEconomico',
      'listaProfesion',
      'listaCargaFamiliar',
      'listaTiposAvalista',
      'listaTiposLicencia',
    ]),
    ...mapGetters('ubigeo', [
      'departments',
      'provinces',
      'districts',
      'provincesGuarantor',
      'districtsGuarantor',
    ]),
    ...mapGetters('mototaxi', [
      'estadoCivil',
      'codigoProspecto',
      'estadoProspecto',
    ]),
  },
  data() {
    return {
      listActividadEconomica: [],
    }
  },
  methods: {
    async getProvincesGuarantor(idDepartment) {
      await this.$store.dispatch('ubigeo/getProvincesGuarantor', idDepartment)
    },
    async getDistrictsGuarantor(idProvince) {
      await this.$store.dispatch('ubigeo/getDistrictsGuarantor', idProvince)
    },
    handleChangeEconomicSector(idSectorEconomico) {
      this.listActividadEconomica = this.listaActividadEconomica.filter(
        (item) => item.sector == idSectorEconomico
      )
    },
  },
}
</script>

<style scoped>
.container-principal {
  max-width: 450px !important;
  padding-top: 4px !important;
}
</style>