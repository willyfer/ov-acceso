<template>
  <div class="compra-deuda__container">
    <component
      :is="currentComponent.name"
      :currentComponent="currentComponent"
      @open-modal-menssage-prospectus="openModalMenssageProspectus"
      color="acceso"
    />
    <ModalAlertGlobal
      :currentComponent="currentComponent"
      ref="modalAlertGlobal"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import OnBoarding from '@/components/compra-deuda/evaluation/OnBoarding'
import { ProductCode } from '@/enums/global-enums'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/compra-deuda/${name}`),
    loading: LazyLoading,
  })
}

export default {
  layout: 'CredinstanteLayout',
  head() {
    return {
      title: 'Acceso Crediticio - Compramos tu deuda Rápido y Fácil‎',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `En Acceso te ayudamos con tus deudas en otras financieras a una tasa preferencial. Pídelo e infórmate aquí.`,
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'Préstamos rápidos, compra de deuda, financieras, préstamos personales, crédito online, préstamos online, dinero al instante, préstamos en Lima, taxistas, Soat, Conversión Gnv, crédito al instante, conversión GLP, prestamos personales, crédito en línea, crédito rápido, crédito consumo, prestamo, garantia, prenda, aval, taxistas, taxi, prestamos fáciles, sola firma, al instante, DNI, necesito dinero, prestamos confiable,',
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/compra-deuda',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Acceso Crediticio - Compramos tu deuda Rápido y Fácil‎‎',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `En Acceso te ayudamos con tus deudas en otras financieras a una tasa preferencial. Pídelo e infórmate aquí.`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/img/compra-deuda_og.png',
        },
      ],
    }
  },
  components: {
    LoadingComponent,
    LazyLoading,
    OnBoarding,
    IdentityValidation: lazyComponent('signature/IdentityValidation'),
    Offers: lazyComponent('Offer/Offers'),
    ConfirmData: lazyComponent('signature/ConfirmData'),
    ContractDocuments: lazyComponent('signature/ContractDocuments'),
    BiometricValidation: lazyComponent('signature/BiometricValidation'),
    ElectronicSignature: lazyComponent('signature/ElectronicSignature'),
    ModalAlertGlobal: () => import('@/components/modals/ModalAlertGlobal'),
  },
  computed: {
    ...mapGetters('compra-deuda', ['currentComponent']),
  },
  methods: {
    openModalMenssageProspectus(data) {
      this.$refs.modalAlertGlobal.open(data)
    },
  },
  mounted() {
    this.$store.commit('users/SET_PRODUCT_CODE', ProductCode.COMPRA_DEUDA)
  },
}
</script>
<style>
.compra-deuda__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100% !important;
}
.text__primary {
  color: #165f9c !important;
}

.text__primary--bold {
  font-weight: bold;
}

.text__secondary {
  color: white !important;
}

.text__secondary--bold {
  font-weight: bold;
}

.text__gray {
  color: #888484 !important;
}

.text__orange {
   color: #ff7729 !important;
}

.content__primary {
  background-color: #ff7729 !important;
}

.content__secondary {
  background-color: #ebebeb !important;
}

.content__blue {
  background-color: #165f9c !important;
}

.contents--text {
  font-size: 0.9em;
}
</style>

