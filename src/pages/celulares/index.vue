<template>
  <div class="container-moto">
    <component
      :is="currentComponent.name"
      :currentComponent="currentComponent"
      @open-modal-menssage-prospectus="openModalMenssageProspectus"
    />
    <ModalAlertGlobal ref="modalAlertGlobal" />
  </div>
</template>
 
<script>
import { mapState,mapGetters } from 'vuex'
import FormLayout from '@/components/rightforms/FormLayout'
import OnBoarding from '@/components/celulares/OnBoarding'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import Oferta from '@/components/celulares/Oferta'
import ObservadoPage from '@/components/celulares/ObservadoPage'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/celulares/${name}`),
    loading: LazyLoading,
  })
}
export default {
  layout: 'CredinstanteLayout',
  head() {
    return {
      title: 'Celulares | Acceso Crediticio - Hasta S/3,500 Rápido y Fácil‎',
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
    OnBoarding,
    FormLayout,
    LoadingComponent,
    LazyLoading,
    Procesando: () => import('@/components/celulares/Procesando'),
    Oferta,
    ObservadoPage,
    ModalAlert: () => import('@/components/modals/ModalAlert'),
    Procesando: lazyComponent('Procesando'),
    Oferta: lazyComponent('Oferta'),
    ElectronicSignature: lazyComponent('ElectronicSignature'),
    ValidacionIdentidad: lazyComponent('ValidacionIdentidad'),
    DatosAdicionales: lazyComponent('DatosAdicionales'),
    DocumentosValorados: lazyComponent('DocumentosValorados'),
    BiometricValidation: lazyComponent('BiometricValidation'),
    ConfirmarOferta: lazyComponent('ConfirmarOferta'),
    //ValidateToken: lazyComponent('ProcesoAprobacion'),
    ValidateToken: lazyComponent('ValidateToken'),
    ModalAlertGlobal: () => import("@/components/modals/ModalAlertGlobal"),
  },
  computed: {
    ...mapGetters('celulares', ['currentComponent']),
    ...mapState('users', ['promotor']),

  },
  data() {
    return {
      socket: null,
      logo: require('@/assets/requestimage.png'),
      documentos: [
        { isUp: true }, // documento
        { isUp: true }, // tarjeta
        { isUp: true }, // soat
        { isUp: false }, // servicio
        { isUp: false }, // revision
        { isUp: false }, // other
      ],
      docOficina: [1, 2, 3, 4, 5],
    }
  },
  fetch() {
    this.$store.dispatch('celulares/resetStates')
  }, 
   methods: {
     openModalMenssageProspectus(data) {
       console.log('data recibida por el mixin');
      this.$refs.modalAlertGlobal.open(data);
    },
   }
  
}
</script>
<style scoped>
.container {
  width: 100% !important;
}
</style>
