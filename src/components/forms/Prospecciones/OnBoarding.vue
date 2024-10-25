<template>
  <v-container class="d-flex flex-column">
    <v-row class="d-flex flex-row">
      <v-col md="6">
        <LdRequisitosForm
          :logo="require('@/assets/requestimage.png')"
          :logo-credi="require('@/assets/logo-credinstante2.png')"
          @onclickInfo="verInfo"
        />
      </v-col>
      <v-col md="6">
        <FormLayout
          background="#ff7729"
          titulo-cabecera="¡Solicita tu préstamo aquí!"
        >
          <PreEvaluate
            slot="step1"
            :documentos="documentos"
            color="acceso"
            :doc-oficina="docOficina"
          />
        </FormLayout>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" class="secondary--text pa-8">
        <h4 class>
          <b>Términos y condiciones</b>
        </h4>
        <p style="text-align: justify">
          Sujeto a evaluación crediticia, revisión de la placa del vehículo y
          perfil del cliente. Tasa de costo efectiva anual (TCEA) calculada en
          base a 360 días: 43%. Tasa de interés moratoria efectiva anual
          calculada en base a 360 días: 120%, aplicable sobre el importe de la
          cuota vencida desde el primer día de atraso. Tipo de cambio
          referencial S/. 3.45. Dicha información se proporciona con arreglo de
          la Ley N.º 28587 Ley Complementaria a la ley de Protección al
          Consumidor en Materia de Servicios Financieros y al Reglamento de
          Gestión de Conducta de Mercado, aprobado mediante Resolución SBS Nª
          3274-2017. Para mayor información sobre tasas de interés, comisiones y
          gastos, consulta el tarifario en acceso.com.pe. Financia Acceso
          Crediticio – Edpyme.
        </p>
        <p style="text-align: justify">
          <span>Más información en www.acceso.com.pe</span>
          <span class="pl-1">Dirección: Av. 28 de Julio 334, Jesús María</span>
          <span class="pl-1">Teléfono: (01) 605 5555</span>
        </p>
      </v-col>
    </v-row>

    <ModalDocumentos
      :modal-documentos="estadoModal"
      :items="itemsModal"
      @onclickOk="cerraModal"
    />
  </v-container>
</template>
<script>
import LdRequisitosForm from '@/components/forms/Prospecciones/LdRequisitosForm'
import FormLayout from '@/components/rightforms/FormLayout'
import PreEvaluate from '@/components/forms/Prospecciones/PreEvaluate'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'
import ModalDocumentos from '@/components/modals/ModalDocumentos'
export default {
  computed: {
    ...mapState('users', ['promotor'])
  },
  components: {
    LdRequisitosForm,
    PreEvaluate,
    FormLayout,
    ModalDocumentos
  },
  mixins: [mixins],
  data() {
    return {
      estadoModal: false,
      tituloModal: null,
      itemsModal: [],
      itemsInfo: [
        {
          imagenTitulo: require('@/assets/boton--beneficios.png'),
          info: [
            {
              imagen: require('@/assets/Beneficios-1.png'),
              texto: 'MONTO A  <br/> <b> FINANCIAR <br/> HASTA S/ 5,000 <b/>'
            },
            {
              imagen: require('@/assets/Beneficios-2.png'),
              texto: '<b>ENTREGA DE <br/> EFECTIVO <br/> INMEDIATO  <b/>'
            },
            {
              imagen: require('@/assets/Beneficios-3.png'),
              texto: 'PAGALO CON  <br/> <b>TU FACTOR DE <br/> RECAUDO <b/>'
            },
            {
              imagen: require('@/assets/Beneficios-4.png'),
              texto: '<b>EVALUACIÓN  <br/> ONLINE INSTANTÁNEA  <br/> <b/>'
            }
          ]
        },
        {
          imagenTitulo: require('@/assets/boton--requisitos.png'),
          info: [
            {
              imagen: require('@/assets/Requisitos-1.png'),
              texto:
                '<b>DNI O CARNET <br/> DE EXTRANJERÍA <br/> DEL TITULAR <br/> DEL CRÉDITO<b/>'
            },
            {
              imagen: require('@/assets/Requisitos-2.png'),
              texto: '<b>SER PROPIETARIO  <br/>DE UN VEHÍCULO <br/> A GNV<b/>'
            }
          ]
        }
      ],
      optional: {
        text: 'Credinstante es un producto de préstamo en efectivo de ACCESO.',
        subtimes: [
          {
            text: `Préstamo de 3500 soles`,
            estado: false
          },
          {
            text: 'Evaluación y dinero desembolsado al instante',
            estado: false
          },
          {
            text: 'Pago de la cuota con la carga de combustible',
            estado: false
          },
          {
            text: 'Cuotas mensuales de S/ 270',
            estado: false
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
      docOficina: [1, 2, 3, 4, 5]
    }
  },
  mounted() {
    this.isNewCreated(13)
  },
  methods: {
    verInfo() {
      this.estadoModal = true
      this.itemsModal = this.itemsInfo
    },
    cerraModal() {
      this.estadoModal = false
    }
  }
}
</script>
