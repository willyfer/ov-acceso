<template>
  <v-container class="onboarding__container d-flex flex-column mt-4" fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col md="6" class="d-flex flex-column justify-center align-center">
        <PreEvaluate
          slot="step1"
          :documentos="documentos"
          color="acceso"
          :doc-oficina="docOficina"
          background="#ff7729"
          titulo-cabecera="¡Solicita tu préstamo aquí!"
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
    <p class="pa-4 mt-8 footer-terminos" style="text-align: justify">
      <b>Términos legales</b>
      <br>
      Edpyme Acceso Crediticio S.A., en adelante
      “Acceso”, otorga créditos a los Usuarios Solicitantes hasta por los
      siguientes montos: S/ 1,500.00, S/ 2,000.00, S/2,500.00, S/ 3,500.00,
      S/4,000.00 o de S/4,500.00, sujeto a previa evaluación crediticia e
      información emitida por la SBS. El plazo para cancelar el crédito es de
      12, 18 o 24 meses, dependiendo el monto del crédito. El monto de las
      cuotas varía entre S/ 198.00 a S/ 337.00 Soles, lo cual estará sujeto al
      monto otorgado. Tasa de costo efectiva anual (TCEA) calculada en base a
      360 días: 61% - 91%. Tasa de interés moratoria efectiva anual calculada en
      base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde
      el primer día de atraso. Tipo de cambio referencial S/ 3.45 Dicha
      información se proporciona con arreglo de la Ley N° 28587 Ley
      Complementaria a la ley de Protección al Consumidor en Materia de
      Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado,
      aprobado mediante Resolución SBS N° 3274-2017. Para mayor información
      sobre tasa de interés, comisiones y gastos, consulta el tarifario en
      acceso.com.pe. Por otro lado, en caso de existir alguna observación con la
      información brindada por el Usuario Solicitante, Acceso queda facultado,
      más no obligado, a comunicarle y solicitarle subsane las observaciones
      existentes para culminar con el proceso de aprobación del crédito; sin
      embargo, es responsabilidad del Usuario Solicitante brindar información
      clara y veraz. El Usuario Solicitante, ante la activación del crédito
      “CredInstante”, adquirirá de manera automática y gratuita el beneficio del
      Programa de “Asistencia Médica”, el cual también podrá solicitar, sin pago
      único, adicional o parcial, se brinde hasta a tres (3) de sus dependientes
      (esposa, hijos y/o padres), sin afectar al crédito otorgado por Acceso,
      para esto último deberá presentar su solicitud dentro de los treinta (30)
      primeros días calendarios de la activación de su crédito, llamando a los
      números telefónicos del Grupo MOK señalados al final del presente
      enunciado. El tiempo de activación de la “Asistencia Médica”, es por el
      mismo plazo de activación del crédito del Usuario Solicitante, dicha
      asistencia no se verá afectado si este último decide pre-cancelar la
      totalidad del crédito, subsistiendo así la “Asistencia Médica” hasta por
      el plazo que originalmente se suscribió el crédito. La información sobre
      la cobertura de la “Asistencia Médica”, será enviada al correo electrónico
      que el Usuario Solicitante haya brindado previamente en el formulario de
      evaluación de crédito, o de ser el caso, se enviará un mensaje de texto al
      número de celular designado por este, adjuntando el link de descarga de
      toda la información sobre el programa “Atención Médica” o la entrega de la
      información de manera física. El Usuario Solicitante designa a Acceso, de
      forma libre y voluntaria la cuenta de ahorros o cuenta corriente donde se
      destinará el desembolso del importe solicitado, el cual es de su
      titularidad. En caso Acceso verifique que la cuenta designada por éste es
      errónea, le solicitará por única vez que realice la corrección del número
      de cuenta al teléfono consignado en la solicitud de crédito en un plazo
      máximo de 3 días calendarios de comunicado a fin de proceder con la
      culminación del proceso de desembolso, en caso el Usuario Solicitante no
      cumpla con la corrección en el plazo señalado o ingrese una cuenta errónea
      por segunda vez se dejará sin efecto los documentos de crédito suscrito
      digitalmente por el Usuario Solicitante, y en consecuencia al no proceder
      con el desembolso se le comunicará la resolución del contrato al correo
      electrónico designado en la solicitud de crédito, sin penalización alguna
      en su contra. Quedando eximida Acceso de toda responsabilidad u obligación
      frente al Usuario Solicitante.
    </p>
    <ModalDocumentos
      :modal-documentos="estadoModal"
      :items="itemsModal"
      :footer="fotterModal"
      @onclickOk="cerraModal"
    />
  </v-container>
</template>

<script>
import LdRequisitosForm from '@/components/forms/credinstante/LdRequisitosForm'
import PreEvaluate from '@/components/forms/credinstante/PreEvaluate'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'
import ModalDocumentos from '@/components/modals/ModalDocumentos'

export default {
  computed: {
    ...mapState('users', ['promotor']),
  },
  components: {
    LdRequisitosForm,
    PreEvaluate,
    ModalDocumentos,
  },
  mixins: [mixins],
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
        this.$store.commit('express/UPDATE_DATOS', { channel: getChannel })
      }
      if (getCodigoEntidad) {
        this.$store.commit('users/UPDATE_PROMOTOR', {
          codigoEntidad: getCodigoEntidad,
        })
      }
    },
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
