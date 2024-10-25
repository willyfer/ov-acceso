<template>
  <div>
    <component :is="currentComponent" color="acceso" />
    <ModalAlert />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import OnBoarding from '@/components/no-bancarizados/OnBoarding'
import { ProductCode } from '@/enums/global-enums'

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
      title:
        'Credinstante | Acceso Crediticio - ¿Necesitas dinero al toque y nadie te presta?‎',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Te prestamos sin historial crediticio. Comienza con S/300 soles y si pagas puntual todas tus cuotas, te duplicamos el monto luego de 6 meses. Pídelo e infórmate aquí.`,
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'Préstamo personal sin historial crediticio, no tengo historial crediticio, ingresa al sistema financiero, nadie te presta, préstamos rápidos, préstamos personales, crédito online, préstamos online, dinero al instante, préstamos en Lima, crédito al instante, préstamos personales, crédito en línea, crédito rápido, crédito consumo, préstamo, prenda, aval, prestamos fáciles, sola firma, al instante, DNI, necesito dinero, prestamos confiable, préstamo seguro, sin historial de crédito.',
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/LD-Bancarizador',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:
            'Credinstante | Acceso Crediticio - ¿Necesitas dinero al toque y nadie te presta?‎',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Te prestamos sin historial crediticio. Comienza con S/300 soles y si pagas puntual todas tus cuotas, te duplicamos el monto luego de 6 meses. Pídelo e infórmate aquí.`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/descargas/ld-bancarizador_og.png',
        },
      ],
    }
  },
  components: {
    LoadingComponent,
    LazyLoading,
    OnBoarding,
    Procesando: () => import('@/components/forms/credinstante/Procesando'),
    ModalAlert: () => import('@/components/modals/ModalAlert'),
    Procesando: lazyComponent('Procesando'),
    ProcesoAprobacion: lazyComponent('ProcesoAprobacion'),
    ElectronicSignature: lazyComponent('ElectronicSignature'),
    ValidacionIdentidad: lazyComponent('ValidacionIdentidad'),
    ConfirmarDatos: lazyComponent('ConfirmarDatos'),
    DocumentosValorados: lazyComponent('DocumentosValorados'),
    BiometricValidation: lazyComponent('BiometricValidation'),
    ValidateToken: lazyComponent('ValidateToken'),
  },
  computed: {
    ...mapState('ui', ['step']),
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
  mounted() {
    this.$store.commit('express/UPDATE_DATOS', {
      codigoProducto: ProductCode.NO_BANCARIZADOS,
    })
  },
}
</script>

<style>
</style>