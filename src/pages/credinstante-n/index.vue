<template>
  <div class="container-credinstante">
    <component
      :is="currentComponent.name"
      :currentComponent='currentComponent'
      @open-modal-menssage-prospectus='openModalMenssageProspectus'
    />
    <ModalAlert />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'///se deben eliminar
import LazyLoading from '@/components/shared/loading/LazyLoading'///se deben eliminar
import OnBoarding from '@/components/credinstante/preEvaluation/OnBoarding'

export default {
  layout: 'default',
  head() {
    return {
      title: 'Credinstante | Acceso Crediticio - Hasta S/3,500 Rápido y Fácil‎',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Si eres propietario o alquilas un taxi a GNV, GLP o Gasolina. Pide tu préstamo de hasta S/5500 soles y págalo de manera fácil. Pídelo e infórmate aquí.`
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'Préstamos rápidos, préstamos personales, crédito online, préstamos online, dinero al instante, préstamos en Lima, taxistas, Soat, Conversión Gnv, crédito al instante, conversión GLP, prestamos personales, crédito en línea, crédito rápido, crédito consumo, prestamo, garantia, prenda, aval, taxistas, taxi, prestamos fáciles, sola firma, al instante, DNI, necesito dinero, taxi palanca, alquilar un taxi, prestamos confiable,'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/libredisponibilidad'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Credinstante | Acceso Crediticio - Hasta S/3,500 Rápido y Fácil‎'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Si eres propietario o alquilas un taxi a GNV, GLP o Gasolina. Pide tu préstamo de hasta S/5500 soles y págalo de manera fácil. Pídelo e infórmate aquí.`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/img/credinstante_og.png'
        }
      ]
    }
  },
  components: {
    LoadingComponent,
    LazyLoading,
    OnBoarding,
    Procesando: () => import('@/components/credinstante/policyEvaluation/Procesando'),
    ProcesoAprobacion: () => import('@/components/credinstante/creditApproval/ProcesoAprobacion'),
    ObservadoPage: () => import('@/components/credinstante/ObservadoPage'),
    ValidacionIdentidad: () => import('@/components/credinstante/firma/ValidacionIdentidad'),
    ConfirmarDatos: () => import('@/components/credinstante/firma/ConfirmarDatos'),
    ChoosePayment: () => import('@/components/credinstante/firma/ChoosePayment'),
    PaymentDetails: () => import('@/components/credinstante/firma/PaymentDetails'),
    DocumentosValorados: () => import('@/components/credinstante/firma/DocumentosValorados'),
    ElectronicSignature: () => import('@/components/credinstante/firma/ElectronicSignature'),
    FelicitacionPage: () => import('@/components/credinstante/firma/FelicitacionPage'),
    ModalAlert: () => import('@/components/modals/ModalAlert'),
  },
  computed: {
    ...mapGetters('credinstante', ['currentComponent']),
  },
  methods: {
    openModalMenssageProspectus(data) {      
      //this.$refs.modalAlertGlobal.open(data);
    },
  },
  fetch() {
    this.$store.dispatch('credinstante/resetStates')
  },
  mounted() {    
    this.$nextTick(() => {
      document.querySelector('.v-main.mainLayout').style.paddingTop = '1px';
    });
  },
}
</script>
<style scoped>
  .container {
    width: 100% !important;
  }
  .container-credinstante {
    max-width: 450px;
    margin: auto;
  }
</style>

