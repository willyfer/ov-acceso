<template>
  <v-container>
    <v-row dense>
      <RequisitosForm :leyenda="leyenda" :pasos="pasos" color="credveh" />
      <FormLayout background="#ff7729">
        <component
          :is="currentComponent"
          slot="formulario"
          color="credveh"
          :documentos="documentos"
          :doc-oficina="docOficina"
          titulo-aprobracion="Aprobación en proceso"
          sub-titulo-aprobacion="Estamos verificando tu información.
En las próximas horas un asesor se comunicará contigo."
        />
      </FormLayout>
      <LoginForm color="credveh" />
    </v-row>
    <ModalForm color="credveh" />
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import RequisitosForm from '@/components/RequisitosForm'
import FormLayout from '@/components/FormLayout'
import PreEvaluate from '@/components/forms/SemiNuevo/PreEvaluate'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import LazyLoading from '@/components/shared/loading/LazyLoading'
import { mixins } from '@/mixins/init.js'
function lazyComponent(name) {
  return () => ({
    component: import(`@/components/${name}`),
    loading: LoadingComponent
  })
}
export default {
  mixins: [mixins],
  layout: 'LdLayout',
  head() {
    return {
      title: '¡Financiamos el auto seminuevo de tus sueños!',
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
            'Autos seminuevo, vehículos seminuevos, crédito online, crédito vehicular, autos particulares, vehículos de consumo, autos de segunda, financiamiento vehicular'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://oficina.acceso.com.pe/credito-semi-nuevo'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: '¡Financiamos el auto seminuevo de tus sueños!'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Acceso te brinda el crédito para el auto seminuevo que tanto quieres. Busca tu seminuevo y adquiérelo con nosotros aquí. ¡Contáctanos!`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://acceso.com.pe/img/seminuevos_og.png'
        }
      ]
    }
  },
  components: {
    RequisitosForm,
    FormLayout,
    PreEvaluate,
    LazyLoading,
    LoadingComponent,
    ModalForm: () => import('@/components/modals/ModalForm'),
    LoginForm: () => import('@/components/modals/LoginForm'),
    Expediente: lazyComponent('forms/SemiNuevo/Expediente'),
    Financiamiento: lazyComponent('forms/SemiNuevo/Financiamiento'),
    ProcesoAprobado: lazyComponent('forms/Default/ProcesoAprobacion')
  },
  computed: {
    ...mapState('default', ['step']),
    currentComponent() {
      let name = null
      switch (this.step) {
        case -1:
          name = 'LoadingComponent'
          break
        case 0:
          name = 'LoadingComponent'
          break
        case 1:
          name = 'PreEvaluate'
          break
        case 2:
          name = 'Expediente'
          break
        case 3:
          name = 'Financiamiento'
          break
        case 4:
          name = 'ProcesoAprobado'
          break
      }
      return name
    },
    pasos() {
      return [
        {
          text: 'Ingresa tu información',
          estado: !!(
            this.$store.state.default.step2 === true ||
            this.$store.state.default.step3 === true ||
            this.$store.state.default.step5 === true ||
            this.$store.state.default.step4 === true
          )
        },
        /*  "Completa datos y documentos", */
        /*
       "Elige el monto  a financiar y tu cuota mensual", */
        {
          text: 'Completa tus datos',
          estado:
            this.$store.state.default.step5 === true ||
            this.$store.state.default.step4 === true ||
            this.$store.state.default.step3 === true
              ? true
              : this.$store.state.default.step2
        },
        /*  {
          text: 'Completa tus datos financieros',
          estado:
            this.$store.state.default.step5 === true || this.$store.state.default.step4 === true
              ? true
              : this.$store.state.default.step3
        }, */
        /*  {
          text: 'Elige el monto  a financiar y tu cuota mensual',
          estado:
            this.$store.state.default.step5 === true || this.$store.state.default.step4 === true
              ? true
              : this.$store.state.default.step3
        }, */
        {
          text: 'Obtén tu crédito',
          estado:
            this.$store.state.default.step6 === true ||
            this.$store.state.default.step5 === true
              ? true
              : this.$store.state.default.step4
        }
      ]
    }
  },
  data() {
    return {
      leyenda: {
        titulo: 'Seminuevos',
        descripcion:
          '<b>Si ya elegiste el auto que tanto quieres. <i>¡Nosotros te lo financiamos rápido y fácil!</i></b>',
        arrayRequisitos: [
          {
            text: 'Kilometraje máximo 90,000'
          },
          {
            text: 'Para vehículos desde el 2013'
          }
        ]
      },
      documentos: [
        { isUp: true }, // documento
        { isUp: true }, // tarjeta
        { isUp: true }, // soat
        { isUp: false }, // servicio
        { isUp: false }, // revision
        { isUp: false } // other
      ],
      docOficina: [1, 3, 6]
    }
  },
  async mounted() {
    console.log('mounted-credito-vehicular')
    this.isCreated(25, 2)
    await this.$recaptcha.init()
  }
}
</script>
