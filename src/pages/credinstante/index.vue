<template>
  <v-container fluid class="pa-2" pa-2>
    <v-row justify="space-between">
      <v-col class="d-flex align-center">
        <v-row class="d-flex flex-column justify-center">
          <component
            :is="currentComponent"
            slot="formulario"
            :socket="socket"
            :documentos="documentos"
            color="acceso"
            :doc-oficina="docOficina"
          />
        </v-row>
      </v-col>
    </v-row>
    <!-- <ModalText color="acceso" /> -->
    <ModalAlert />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import FormLayout from '@/components/rightforms/FormLayout'
import OnBoarding from '@/components/forms/credinstante/OnBoarding'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import ProcesoAprobacion from '@/components/forms/credinstante/ProcesoAprobacion'
import ObservadoPage from '@/components/forms/credinstante/ObservadoPage'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/forms/credinstante/${name}`),
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
    OnBoarding,
    FormLayout,
    LoadingComponent,
    LazyLoading,
    Procesando: () => import('@/components/forms/credinstante/Procesando'),
    ProcesoAprobacion,
    ObservadoPage,
    ModalAlert: () => import('@/components/modals/ModalAlert'),
    Procesando: lazyComponent('Procesando'),
    ProcesoAprobacion: lazyComponent('ProcesoAprobacion'),
    ElectronicSignature: lazyComponent('ElectronicSignature'),
    ValidacionIdentidad: lazyComponent('ValidacionIdentidad'),
    ConfirmarDatos: lazyComponent('ConfirmarDatos'),
    DocumentosValorados: lazyComponent('DocumentosValorados'),
    BiometricValidation: lazyComponent('BiometricValidation'),
    //ValidateToken: lazyComponent('ProcesoAprobacion'),
    ValidateToken: lazyComponent("ValidateToken"),
  },
  computed: {
    ...mapState('ui', ['step']),
    ...mapState('users', ['promotor']),
    currentComponent() {
      let name = null
      switch (this.step) {
        case -1:
          name = 'LazyLoading'
          break
        case 0:
          name = 'LoadingComponent'
          break
        case 1:
          name = 'OnBoarding'
          break
        case 2:
          name = 'Procesando'
          break
        case 3:
          name = 'ProcesoAprobacion'
          break
        case 4:
          name = 'ValidacionIdentidad'
          break
        case 5:
          name = 'ConfirmarDatos'
          break
        case 6:
          name = 'DocumentosValorados'
          break
        case 7:
          name = 'BiometricValidation'
          break
        case 8:
          name = 'ElectronicSignature'
          break
        case 9:
          name = 'ValidateToken'
          break
      }
      return name
    },
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
    this.$store.dispatch('express/resetStates')
  },
}
</script>
<style scoped>
.container {
  width: 100% !important;
}
</style>



