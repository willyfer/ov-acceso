<template>
  <v-container fluid class="pa-2" pa-2>
    <v-row justify="space-between">
      <v-col>
        <v-row class="d-flex flex-column justify-center">
          <component :is="currentComponent" slot="formulario" color="acceso" />
        </v-row>
      </v-col>
    </v-row>
    <!-- <ModalText color="acceso" />
    <ModalForm color="acceso" /> -->
    <ModalAlert />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import RequisitosForm from '@/components/RequisitosForm'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import { mixins } from '@/mixins/mixin.js'
import { mixins as init } from '@/mixins/init.js'
import Login from '@/components/forms/CampanaConversiones/Login'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/forms/credinstante/${name}`),
    loading: LazyLoading
  })
}
export default {
  layout: 'CredinstanteLayout',
  mixins: [mixins, init],
  components: {
    RequisitosForm,
    LoadingComponent,
    LazyLoading,
    Login,
    ModalAlert: () => import('@/components/modals/ModalAlert'),
    ProcesoAprobacion: lazyComponent('ProcesoAprobacion'),
    ValidacionIdentidad: lazyComponent('ValidacionIdentidad'),
    ConfirmarDatos: lazyComponent('ConfirmarDatos'),
    DocumentosValorados: lazyComponent('DocumentosValorados')
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
          name = 'Login'
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
      }
      return name
    }
  },
  async mounted() {
    //this.$store.dispatch('express/resetStates')
  }
}
</script>
