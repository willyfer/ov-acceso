<template>
  <v-container>
    <v-row dense>
      <FormLayout background="#244242">
        <component
          :is="currentComponent"
          slot="formulario"
          :documentos="documentos"
          color="express"
          :doc-oficina="docOficina"
        />
      </FormLayout>
    </v-row>
    <ModalText color="acceso" />
    <ModalForm color="express" />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import RequisitosForm from '@/components/RequisitosForm'
import FormLayout from '@/components/forms/LdeSignature/FormLayout'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import { mixins } from '@/mixins/mixin.js'
import { mixins as init } from '@/mixins/init.js'

function lazyComponent(name) {
  return () => ({
    component: import(`@/components/forms/Activacion/${name}`),
    loading: LazyLoading
  })
}
export default {
  layout: 'ExpressLayout',
  middleware: 'authenticated',
  mixins: [mixins, init],
  components: {
    RequisitosForm,
    FormLayout,
    LoadingComponent,
    LazyLoading,

    ModalForm: () => import('@/components/modals/ModalForm'),
    ModalText: () => import('@/components/modals/ModalText'),
    DocumentosValorados: lazyComponent('DocumentosValorados'),
    Login: lazyComponent('Login'),
    MenuValida: lazyComponent('MenuValida'),
    ReniecForm: lazyComponent('ReniecForm'),
    Expediente: lazyComponent('Expediente'),
    EnviarDocumentos: lazyComponent('EnviarDocumentos'),
    ProcesoAprobacion: lazyComponent('ProcesoAprobacion')
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
        case 2:
          name = 'MenuValida'
          break
        case 3:
          name = 'ReniecForm'
          break
        case 4:
          name = 'Expediente'
          break
        case 5:
          name = 'DocumentosValorados'
          break
        case 6:
          name = 'ProcesoAprobacion'
          break
      }
      return name
    },
    pasos() {
      return [
        {
          text: 'Pre-evaluate',
          estado: !!(
            this.step2 === true ||
            this.step3 === true ||
            this.step5 === true ||
            this.step4 === true
          )
        },
        {
          text: 'Completa datos y documentos',
          estado:
            this.step5 === true || this.step4 === true || this.step3 === true
              ? true
              : this.step2
        },
        {
          text: 'Recibe tu efectivo'
        }
      ]
    }
  },
  data() {
    return {
      leyenda: {
        titulo: 'Libre Disponibilidad Express',
        descripcion: 'Completa tu registro de <b><i> Whatsapp</i></b>',
        arrayRequisitos: [
          {
            text: 'Registro previo en canal Whatsapp'
          }
        ]
      },
      documentos: [
        { isUp: true }, // documento
        /* { isUp: true }, // tarjeta */
        { isUp: false }, // soat
        { isUp: false }, // servicio
        { isUp: false }, // revision
        { isUp: false } // other
      ],
      /* docOficina: [1, 2] */
      docOficina: [1]
    }
  },
  async mounted() {
    this.$store.dispatch('express/resetStates')

    this.$store.commit('express/UPDATE_DATOS', { sectorEconomico: 28 })
  }
}
</script>
