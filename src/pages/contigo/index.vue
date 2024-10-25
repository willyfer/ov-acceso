<template>
  <v-container fluid class="pa-2" pa-2>
    <v-row justify="space-between">
      <v-col>
        <v-row class="d-flex flex-column justify-center">
          <component
            :is="currentComponent.name"
            :currentComponent="currentComponent"
            slot="formulario"
            color="acceso"
          />
        </v-row>
      </v-col>
    </v-row>
    <ModalAlert />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RequisitosForm from '@/components/RequisitosForm'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import Login from '@/components/contigo/Login'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/contigo/${name}`),
    loading: LazyLoading,
  })
}
export default {
  layout: 'CredinstanteLayout',
  components: {
    RequisitosForm,
    LoadingComponent,
    LazyLoading,
    Login,
    ModalAlert: () => import('@/components/modals/ModalAlert'),
    ValidacionIdentidad: lazyComponent('ValidacionIdentidad'),
    ConfirmarDatos: lazyComponent('ConfirmarDatos'),
    Ofertas: lazyComponent('Ofertas'),
    DocumentosValorados: lazyComponent('DocumentosValorados'),
  },
  computed: {
    ...mapGetters('contigo', ['currentComponent']),
    ...mapState('users', ['promotor']),
  },
}
</script>

<style>
.container {
  min-height: 100% !important;
  width: 100%;
}
</style>
