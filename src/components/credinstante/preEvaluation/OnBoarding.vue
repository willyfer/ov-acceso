<template>
  <div class="pre-evaluation-credinstante">
    <SharedHeaderWithoutStepper>
      <PreevaluationHeaderContent/>
    </SharedHeaderWithoutStepper>
    <div class="pre-evaluation-credinstante__container-not-cheat">
      <img class="pre-evaluation-credinstante__image-not-cheat" src="@/assets/img/no_dejar_enganiar.png" alt="">
    </div>
    <PreEvaluateForm
      slot="step1"
      :documentos="documentos"
      color="acceso"
      :doc-oficina="docOficina"
      background="#ff7729"
      titulo-cabecera="¡Solicita tu préstamo aquí!"
    />
    <ModalDocumentos
      :modal-documentos="estadoModal"
      :items="itemsModal"
      :footer="fotterModal"
      @onclickOk="cerraModal"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PreEvaluateForm from '@/components/credinstante/preEvaluation/PreEvaluateForm'
import SharedHeaderWithoutStepper from '@/components/shared/SharedHeaderWithoutStepper';
import PreevaluationHeaderContent from '@/components/credinstante/preEvaluation/PreevaluationHeaderContent';
import ModalDocumentos from '@/components/modals/ModalDocumentos'

export default {
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('users', ['promotor']),
  },
  components: {
    PreEvaluateForm,
    SharedHeaderWithoutStepper,
    PreevaluationHeaderContent,
    ModalDocumentos,
  },
  data() {
    return {
      estadoModal: false,
      tituloModal: null,
      tituloCabecera: '¡SI NECESITAS DINERO!',
      subtituloCabecera: 'NOSOTROS TE PRESTAMOS',
      itemsModal: [],
      itemsInfo: [
        {
          imagenTitulo: require('@/assets/boton--requisitos.png'),
          info: [
            {
              imagen: require('@/assets/Requisitos-1.png'),
              texto: '<b>DNI DEL TITULAR<b/>',
            },
            {
              imagen: require('@/assets/Requisitos-2.png'),
              texto: '<b>SER PROPIETARIO  <br/>DE UN VEHÍCULO',
            },
          ],
        },
        {
          imagenTitulo: require('@/assets/boton--beneficios.png'),
          info: [
            {
              imagen: require('@/assets/Beneficios-1.png'),
              texto: 'MONTO A  <br/> <b> FINANCIAR <br/> HASTA S/ 5.500 <b/>',
            },
            {
              imagen: require('@/assets/Beneficios-2.png'),
              texto:
                '<b>RECIBE EL DINERO <br/> EN TU CUENTA BANCARIA <br/> SIN MOVERTE DE CASA<b/>',
            },
            {
              imagen: require('@/assets/Beneficios-3.png'),
              texto: 'PAGA TUS <br/> <b>CUOTAS DE <br/> MANERA FÁCIL<b/>',
            },
            {
              imagen: require('@/assets/Beneficios-4.png'),
              texto: '<b>EVALUACIÓN  <br/> ONLINE INSTANTÁNEA  <br/> <b/>',
            },
          ],
        },

        {
          imagenTitulo: require('@/assets/boton--asistencia.png'),
          info: [
            {
              imagen: require('@/assets/Asistencia-1.png'),
              texto:
                '<b>TU PRÉSTAMO <br/> VIENE <br/> CON ASISTENCIA <br/> MÉDICA <b/>',
            },
            {
              imagen: require('@/assets/Asistencia-2.png'),
              texto: '<b>INCLUYE 3  <br/>FAMILIARES <br/> DEPENDIENTES<b/>',
            },
          ],
        },
      ],
      optional: {
        text: 'Credinstante es un producto de préstamo en efectivo de ACCESO.',
        subtimes: [
          {
            text: `Préstamo de 4500 soles`,
            estado: false,
          },
          {
            text: 'Evaluación y dinero desembolsado al instante',
            estado: false,
          },
          {
            text: 'Pago de la cuota con la carga de combustible',
            estado: false,
          },
          {
            text: 'Cuotas mensuales de S/ 364',
            estado: false,
          },
        ],
      },
      fotterModal: '',

      documentos: [
        { isUp: true }, // documento
        { isUp: true }, // tarjeta
        { isUp: true }, // soat
        { isUp: false }, // servicio
        { isUp: false }, // revision
        { isUp: false }, // other
      ],
      docOficina: [1, 2, 3, 4, 5],
      logoForm: require('@/assets/img/Retanqueo/logo-Credinstante.png'),
    }
  },
  mounted() {
    this.isNewCreated(13)
    this.getParams()
    //this.$store.commit('ui/UPDATE_STEP', 5)
  },
  methods: {
    verInfo() {
      this.estadoModal = true
      this.itemsModal = this.itemsInfo
      this.fotterModal =
        'Para más información revise los <a href="https://oficina.acceso.com.pe/credinstante">términos y condiciones</a>'
    },
    cerraModal() {
      this.estadoModal = false
    },
    getParams() {
      let params = new URLSearchParams(location.search)
      const getChannel = params.get('channel')
      const getCodigoEntidad = params.get('codigoEntidad')
      if (getChannel) {
        this.$store.commit('credinstante/UPDATE_DATOS', { channel: getChannel })
      }
      if (getCodigoEntidad) {
        this.$store.commit('users/UPDATE_PROMOTOR', {
          codigoEntidad: getCodigoEntidad,
        })
      }
    },
    isCreated(codigoProducto, codigoSubProducto, marcaDeLd) {
      this.$store.commit('default/RESET_STATES')
      const placa = this.$route.query.placa
      const origenLead = this.$route.query.origen ? this.$route.query.origen : 0
      const codigoReferidos = this.$route.query.ref
      if (placa || origenLead || codigoReferidos) {
        this.$store.commit('default/UPDATE_DATOS', {
          placa,
          origenLead,
          codigoReferidos
        })
      }
      this.$store.commit('default/UPDATE_BUSSINES', {
        codigoProducto,
        codigoSubProducto,
        marcaDeLd
      })
    },
    isNewCreated(codigoProducto) {
      this.$store.dispatch('express/resetStates')
      const channel = this.promotor.state ? this.promotor.channel : 1
      let origen = this.$route.query.origen ? this.$route.query.origen : 4
      console.log('promotor : ', this.promotor)
      if (this.promotor.state) {
        if (this.promotor.channel != 5) {
          origen = 5
        } else {
          origen = 6
        }
      }
      console.log('origen: ', origen, 'chanel: ', channel)
      this.$store.commit('express/UPDATE_DATOS', { origen, channel })
    },
  },
}
</script>
<style lang='scss'>
  .pre-evaluation-credinstante {
    padding: 4px 8px 8px 8px;
    &__container-not-cheat {
      margin: 40px 30px 20px 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__image-not-cheat {
      width: 100%;
    }
  }
</style>