<template>
  <div class="extraefectivo__container">
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
import OnBoarding from '@/components/extraefectivo/evaluation/OnBoarding'
import { ProductCode } from '@/enums/global-enums'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/extraefectivo/${name}`),
    loading: LazyLoading,
  })
}

export default {
  layout: 'CredinstanteLayout',
  head() {
    return {
      title: 'Credinstante | Acceso Crediticio - Hasta S/3,500 Rápido y Fácil‎',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Si eres propietario o alquilas un taxi a GNV, GLP o Gasolina. Pide tu préstamo de hasta S/5500 soles y págalo de manera fácil. Pídelo e infórmate aquí.`,
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'Préstamos rápidos, préstamos personales, crédito online, préstamos online, dinero al instante, préstamos en Lima, taxistas, Soat, Conversión Gnv, crédito al instante, conversión GLP, prestamos personales, crédito en línea, crédito rápido, crédito consumo, prestamo, garantia, prenda, aval, taxistas, taxi, prestamos fáciles, sola firma, al instante, DNI, necesito dinero, taxi palanca, alquilar un taxi, prestamos confiable,',
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/libredisponibilidad',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Credinstante | Acceso Crediticio - Hasta S/3,500 Rápido y Fácil‎',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Si eres propietario o alquilas un taxi a GNV, GLP o Gasolina. Pide tu préstamo de hasta S/5500 soles y págalo de manera fácil. Pídelo e infórmate aquí.`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/img/credinstante_og.png',
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
    ...mapGetters('extraefectivo', ['currentComponent']),
  },
  methods: {
    openModalMenssageProspectus(data) {
      this.$refs.modalAlertGlobal.open(data)
    },
  },
  mounted() {
    this.$store.commit('users/SET_PRODUCT_CODE', ProductCode.EXTRA_EFECTIVO)
  },
}
</script>
<style>
.extraefectivo__container {
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

