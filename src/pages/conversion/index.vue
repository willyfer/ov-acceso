<template>
  <v-container>
    <ModalAlert />
    <component :is="currentComponent" color="acceso" slot="formulario" />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import ModalAlert from '@/components/modals/ModalAlert'
import OnBoardingConversiones from '@/components/forms/Conversiones/OnBoarding/OnBoardingConversiones'
import { mixins } from '@/mixins/init.js'
function lazyComponent(name) {
  return () => ({
    component: import(`@/components/forms/Conversiones/${name}`),
    loading: LoadingComponent
  })
}
export default {
  layout: 'CredinstanteLayout',
  mixins: [mixins],
  head() {
    return {
      title: 'Conversión a GNV más efectivo de S/1500 | Evaluación online',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Acceso te brinda el crédito para el auto seminuevo que tanto quieres. Busca tu seminuevo y adquiérelo con nosotros aquí. ¡Contáctanos!`
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content:
            'Conversión GNV, préstamos rápidos, crédito online, préstamos online, dinero al instante, préstamos en Lima, taxistas, Conversiones GNV en Lima'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/credito-mas-efectivo'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Conversión a GNV más efectivo de S/1500 | Evaluación online'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Acceso te brinda el crédito para el auto seminuevo que tanto quieres. Busca tu seminuevo y adquiérelo con nosotros aquí. ¡Contáctanos!`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/img/conversiongnv_og.png'
        }
      ]
    }
  },
  components: {
    LoadingComponent,
    LazyLoading,
    OnBoardingConversiones,
    ModalAlert,
    ProcesandoConversiones: lazyComponent('ProcesandoConversiones'),
    ProcesoAprobacionConversiones: lazyComponent(
      'ProcesoAprobacionConversiones'
    ),
    ValidacionIdentidadConversiones: lazyComponent(
      'ValidacionIdentidadConversiones'
    ),
    ConfirmarDatosConversiones: lazyComponent('ConfirmarDatosConversiones'),
    DocumentosValoradosConversiones: lazyComponent(
      'DocumentosValoradosConversiones'
    )
  },
  computed: {
    ...mapState('ui', ['step']),
    ...mapState('users', ['promotor']),
    ...mapState('express', ['datos']),
    currentComponent() {
      let name = null
      switch (this.step) {
        case -1:
          name = 'LazyLoading'
          break
        case 1:
          name = 'LoadingComponent'
          break
        case 2:
          name = 'OnBoardingConversiones'
          break
        case 3:
          name = 'ProcesandoConversiones'
          break
        case 4:
          name = 'ProcesoAprobacionConversiones'
          break
        case 5:
          name = 'ValidacionIdentidadConversiones'
          break
        case 6:
          name = 'ConfirmarDatosConversiones'
          break
        case 7:
          name = 'DocumentosValoradosConversiones'
          break
      }
      return name
    }
  },
  data() {
    return {
      arrayProductos: [
        { codigo: 21, name: 'Solo conversión' },
        { codigo: 22, name: 'Conversión + LD' }
      ]
    }
  },
  methods: {
    async getProcess() {
      await this.$store.dispatch('conversiones/continuarProceso')
    },
    async getTaller() {
      const params = new URLSearchParams(location.search)
      const taller = params.get('taller')
      console.log('taller: ', taller)
      if (taller) {
        this.$store.commit('conversiones/SET_IS_SELECT_TALLER', false)
        this.$store.commit('conversiones/SET_EVALUACION_DATOS', {
          tallerVehicular: parseInt(taller)
        })
      } else if (this.promotor.codigoEntidad) {
        this.$store.commit('conversiones/SET_IS_SELECT_TALLER', false)
        this.$store.commit('conversiones/SET_EVALUACION_DATOS', {
          tallerVehicular: parseInt(this.promotor.codigoEntidad)
        })
      }
    }
  },
  async created() {
    this.$store.dispatch('conversiones/resetStates')
    this.$store.dispatch('conversiones/resetEvaluacionDatos')
    await this.isNewCreated()    
    this.$store.commit('conversiones/SET_EVALUACION_DATOS', {
      channel: this.datos.channel,
      origen: this.datos.origen
    })
  },
  async mounted() {
    this.$store.commit('conversiones/SET_ARRAY_PRODUCTOS', this.arrayProductos)
    /* this.$store.commit('conversiones/SET_EVALUACION_DATOS', {
      codigoProducto: this.arrayProductos[0].codigo
    }) */
    await this.getProcess()
    await this.$recaptcha.init()
    await this.getTaller()
  }
}
</script>
<style>
.text-color--primary {
  color: #005197 !important;
}
.text-color--secondary {
  color: #ffffff !important;
}
.content-color--primary {
  background-color: #ff7729 !important;
}
.content-color--secondary {
  background-color: #808080 !important;
}
</style>
