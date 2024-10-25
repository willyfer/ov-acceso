<template>
  <div class="pre-evaluation-motorcycle">
    <SharedHeaderWithoutStepper>
      <PreevaluationHeaderContent
        :nameProduct="currentComponent.nameProduct"
        :imgProduct="currentComponent.imgProduct"
      />
    </SharedHeaderWithoutStepper>
    <div class="pre-evaluation-motorcycle__container-not-cheat">
      <img
        class="pre-evaluation-motorcycle__image-not-cheat"
        src="@/assets/img/no_dejar_enganiar.png"
        alt=""
      />
    </div>
    <PreevaluationForm
      @send-preevaluation="sendPreevaluation"
      @open-terms-conditions="openTermsConditions"
      :listaTiposDocumentos="listaTiposDocumentos"
      :listaEstadosCiviles="listaEstadosCiviles"
      :listaNivelesEducacion="listaNivelesEducacion"
      :listaTipoPerfil="listaTipoPerfil"
      :listaEntidadesProducto="listaEntidadesProducto"
      :canal="2"
      :channel="channel"
      :codigoEntidad="codigoEntidad"
      :codigoUsuario="codigoUsuario"
      :productCode="productCode"
    />
    <TermsConditionsModal ref="termsConditionsModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PreevaluationForm from '@/components/shared/preEvaluation/PreevaluationForm'
import SharedHeaderWithoutStepper from '@/components/shared/SharedHeaderWithoutStepper'
import PreevaluationHeaderContent from '@/components/shared/preEvaluation/PreevaluationHeaderContent'
import TermsConditionsModal from '@/components/modals/TermsConditionsModal'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import preEvaluationMixin from '@/mixins/preEvaluationMixin'
import { EntityCode } from '@/enums/global-enums'

export default {
  components: {
    PreevaluationForm,
    SharedHeaderWithoutStepper,
    PreevaluationHeaderContent,
    TermsConditionsModal,
  },
  mixins: [actionsByCodeMixin, preEvaluationMixin],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  async mounted() {
    try {
      const { catalogs: consulta } = this.currentComponent
     
      
      const { codigoEntidad } = this.$store.state.users.promotor
      await this.$store.dispatch('catalogue/getCatalogs', {
        tipoProducto: this.productCode,
        consulta,
      })
      if (codigoEntidad == EntityCode.ACCESO_CREDITICIO)
        await this.$store.dispatch('catalogue/getProductEntities', {
          //tipoProducto: this.productCode,
          tipoProducto: 28,
        })
    } catch (error) {
      this.$showError(error)
    }
  },
  computed: {
    ...mapGetters('moto', ['estadoProspecto']),
    ...mapGetters('users', ['productCode']),
  },
  data() {
    return {
    }
  },
  methods: {
    openTermsConditions() {
      this.$refs.termsConditionsModal.open()
    },
  },
}
</script>

<style lang='scss'>
.pre-evaluation-motorcycle {
  padding: 4px 8px 8px 8px;
  &__container-not-cheat {
    margin: 40px 30px 20px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__image-not-cheat {
    width: 100%;
  }
}
</style>