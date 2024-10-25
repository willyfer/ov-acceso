<template>
  <v-container class="onboarding__container d-flex flex-column mt-4" fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col md="6" class="d-flex flex-column justify-center align-center">
        <PreEvaluate
          @send-preevaluation="submitPreEValuation"
          slot="step1"
          :documentos="documentos"
          color="acceso"
          :doc-oficina="docOficina"
          background="#ff7729"
          titulo-cabecera="!Adquire un equipo!"
        />
      </v-col>
      <v-col md="6" class="d-flex align-center">
        <LdRequisitosForm
          :logo="require('@/assets/Principal.png')"
          :nota="require('@/assets/Nota.png')"
          :tituloCabecera="tituloCabecera"
          :subtituloCabecera="subtituloCabecera"
          :footerText="''"
          @onclickInfo="verInfo"
        />
      </v-col>
    </v-row>
    
    <ModalDocumentos
      :modal-documentos="estadoModal"
      :items="itemsModal"
      :footer="fotterModal"
      @onclickOk="cerraModal"
    />
  </v-container>
</template>

<script>
import LdRequisitosForm from '@/components/celulares/LdRequisitosForm'
import PreEvaluate from '@/components/celulares/PreEvaluate'
import { mixins } from '@/mixins/init.js'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import { mapState,mapGetters } from 'vuex'
import ModalDocumentos from '@/components/modals/ModalDocumentos'

export default {
  computed: {
    ...mapState('users', ['promotor']),
    ...mapGetters('celulares', ['currentComponent', "productCode", "estadoProspecto"]),
  },
  components: {
    LdRequisitosForm,
    PreEvaluate,
    ModalDocumentos,
  },
   mixins: [mixins, actionsByCodeMixin],
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
        this.$store.commit('celulares/UPDATE_DATOS', { channel: getChannel })
      }
      if (getCodigoEntidad) {
        this.$store.commit('users/UPDATE_PROMOTOR', {
          codigoEntidad: getCodigoEntidad,
        })
      }
    },
async submitPreEValuation(){
   
    this.analyzeProspectStatus()
}
  },
}
</script>
<style scoped>
.onboarding__container {
  width: 100% !important;
}

.crLayoutForm {
  min-height: inherit !important;
}

.container-recuerda {
  /* font-family: 'Exo 2'; */
  margin: 10px 0;
  padding: 0 10px;
  max-width: 320px;
}

.container-recuerda p {
  margin-bottom: 0px;
}

.text-recuerda {
  font-size: 13px;
  background-color: #005197;
  padding: 5px 20px 15px;
  border-radius: 50px;
}

.footer-recuerda {
  font-size: 14px;
  margin: auto;
  width: 220px;
  background-color: #ebebeb;
  border-radius: 50px;
  border: 2px solid #005197;
  position: relative;
  top: -12px;
}

.text__white {
  color: white;
}

.text__orange {
  color: #ff7727;
}
.footer-terminos {
  color: #005197;
  font-size: 0.8em;
  text-align: center;
}
</style>
