<template>
  <v-container fluid class="pa-2" pa-2>
    <v-row justify="space-between">
      <v-col>
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
   
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import FrameBoard from '@/components/forms/CambiarCuenta/FrameBoard'
import FormCuenta from '@/components/forms/CambiarCuenta/FormCuenta'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/forms/CambiarCuenta/${name}`),
    loading: LazyLoading
  })
}
export default {
  layout: 'CredinstanteLayout',
  head() {
    return {
      title: 'Dinero al instante | Solicita tu préstamo con Acceso',
      meta: [        
      ]
    }
  },
  components: {  
    LazyLoading,
    FrameBoard, 
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
          name = 'FrameBoard'
          break
        /* case 2:
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
          name = 'ObservadoPage' 
          break */
      }
      return name
    }
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
        { isUp: false } // other
      ],
      docOficina: [1, 2, 3, 4, 5]
    }
  },
  created() {
    this.$store.dispatch('express/resetStates')
    //this.$recaptcha.init()
  }
}
</script>
