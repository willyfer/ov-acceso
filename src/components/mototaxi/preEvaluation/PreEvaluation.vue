<template>
  <div class="pre-evaluation-motorcycletaxi">
    <SharedHeaderWithoutStepper>
      <PreevaluationHeaderContent
        :nameProduct="nameProduct"
        :imgProduct="imgProduct"
      />
    </SharedHeaderWithoutStepper>
    <div class="pre-evaluation-motorcycletaxi__container-not-cheat">
      <img
        class="pre-evaluation-motorcycletaxi__image-not-cheat"
        src="@/assets/img/no_dejar_enganiar.png"
        alt=""
      />
    </div>
    <PreevaluationForm
      @send-preevaluation="sendPreevaluation"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PreevaluationForm from '@/components/shared/preEvaluation/PreevaluationForm'
import SharedHeaderWithoutStepper from '@/components/shared/SharedHeaderWithoutStepper'
import PreevaluationHeaderContent from '@/components/shared/preEvaluation/PreevaluationHeaderContent'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import preEvaluationMixin from '@/mixins/preEvaluationMixin'
import { EntityCode, ProductCode } from '@/enums/global-enums'

export default {
  components: {
    PreevaluationForm,
    SharedHeaderWithoutStepper,
    PreevaluationHeaderContent,
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
          tipoProducto: this.productCode,
        })
    } catch (error) {
      this.$showError(error)
    }
  },
  computed: {
    ...mapGetters('mototaxi', ['estadoProspecto']),
    ...mapGetters('users', ['productCode']),
    imgProduct() {
      return this.productCode === ProductCode.MOTOTAXI
        ? this.currentComponent.imgProduct.mototaxi
        : this.currentComponent.imgProduct.motofurgon
    },
    nameProduct() {
      return this.productCode === ProductCode.MOTOTAXI
        ? this.currentComponent.nameProduct.mototaxi
        : this.currentComponent.nameProduct.motofurgon 
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang='scss'>
.pre-evaluation-motorcycletaxi {
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