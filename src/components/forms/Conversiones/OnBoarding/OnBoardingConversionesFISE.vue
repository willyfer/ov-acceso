<template>
  <v-container class="d-flex flex-column" fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col md="6" class="d-flex align-center">
        <component
          :is="currentComponent"
          :imgHeader="require('@/assets/img/Conversiones/titular.png')"
          :logo="require('@/assets/img/Conversiones/auto.png')"
          :imgFooter="require('@/assets/img/Conversiones/monto.png')"
          :tituloCabecera="tituloCabecera"
          :subtituloCabecera="subtituloCabecera"
          :footerText="''"
          @onclickRequisitos="verModalRequisitos"
          @onclickBeneficios="verModalBeneficios"
          @onclickAhorro="verModalAhorro"
        />
      </v-col>
      <v-col md="6" class="d-flex align-center">
        <FormLayout
          background="#ff7729"
          titulo-cabecera="¡Solicita tu préstamo aquí!"
        >
          <FormularioConversiones
            slot="step1"
            color="acceso"
            @submit="enviarSolicitud"
          />
        </FormLayout>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" class="secondary--text pa-8 caption">
        Más información en www.acceso.com.pe Dirección: Av. 28 de Julio 334,
        Jesús María Teléfono: (01) 605 5555.
      </v-col>
    </v-row>
    <ModalRequisitos :isModal="isModalRequisitos" @close="cerraModal" />
    <ModalBeneficios :isModal="isModalBeneficios" @close="cerraModal" />
    <ModalAhorro :isModal="isModalAhorro" @close="cerraModal" />
  </v-container>
</template>

<script>
import LdRequisitosFISE from '@/components/forms/Conversiones/Banners/LdRequisitosFISE'
import LdRequisitosDefault from '@/components/forms/Conversiones/Banners/LdRequisitosDefault'
import FormLayout from '@/components/rightforms/FormLayout'
import FormularioConversiones from '@/components/forms/Conversiones/Utils/FormularioConversiones'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'
export default {
  name: 'OnBoardingConversionesFISE',
  components: {
    LdRequisitosFISE,
    LdRequisitosDefault,
    FormLayout,
    FormularioConversiones,
    ModalRequisitos: () =>
      import('@/components/forms/Conversiones/Modals/ModalRequisitos'),
    ModalBeneficios: () =>
      import('@/components/forms/Conversiones/Modals/ModalBeneficios'),
    ModalAhorro: () =>
      import('@/components/forms/Conversiones/Modals/ModalAhorro')
  },
  computed: {
    ...mapState('users', ['promotor']),  
    currentComponent() {
      let name = null
      switch (this.$nuxt.$route.name) {
        case 'conversion-fise':
          name = 'LdRequisitosFISE'
          break
        case 'conversion':
          name = 'LdRequisitosDefault'
          break
      }
      return name
    }
  },
  mixins: [mixins],
  async created() {
    
  },
  data() {
    return {
      estadoModal: false,
      isModalAhorro: false,
      isModalBeneficios: false,
      isModalRequisitos: false,
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
              texto: '<b>DNI DEL TITULAR<b/>'
            },
            {
              imagen: require('@/assets/Requisitos-2.png'),
              texto: '<b>SER PROPIETARIO  <br/>DE UN VEHÍCULO'
            }
          ]
        },
        {
          imagenTitulo: require('@/assets/boton--beneficios.png'),
          info: [
            {
              imagen: require('@/assets/Beneficios-1.png'),
              texto: 'MONTO A  <br/> <b> FINANCIAR <br/> HASTA S/ 5.500 <b/>'
            },
            {
              imagen: require('@/assets/Beneficios-2.png'),
              texto:
                '<b>RECIBE EL DINERO <br/> EN TU CUENTA BANCARIA <br/> SIN MOVERTE DE CASA<b/>'
            },
            {
              imagen: require('@/assets/Beneficios-3.png'),
              texto: 'PAGA TUS <br/> <b>CUOTAS DE <br/> MANERA FÁCIL<b/>'
            },
            {
              imagen: require('@/assets/Beneficios-4.png'),
              texto: '<b>EVALUACIÓN  <br/> ONLINE INSTANTÁNEA  <br/> <b/>'
            }
          ]
        },

        {
          imagenTitulo: require('@/assets/boton--asistencia.png'),
          info: [
            {
              imagen: require('@/assets/Asistencia-1.png'),
              texto:
                '<b>TU PRÉSTAMO <br/> VIENE <br/> CON ASISTENCIA <br/> MÉDICA <b/>'
            },
            {
              imagen: require('@/assets/Asistencia-2.png'),
              texto: '<b>INCLUYE 3  <br/>FAMILIARES <br/> DEPENDIENTES<b/>'
            }
          ]
        }
      ],
      optional: {
        text: 'Credinstante es un producto de préstamo en efectivo de ACCESO.',
        subtimes: [
          {
            text: `Préstamo de 4500 soles`,
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
            text: 'Cuotas mensuales de S/ 364',
            estado: false
          }
        ]
      },
      fotterModal: ''
    }
  },
  methods: {
    verInfo() {
      this.estadoModal = true
      this.itemsModal = this.itemsInfo
      this.fotterModal =
        'Para más información revise los <a href="https://oficina.acceso.com.pe/credinstante">términos y condiciones</a>'
    },
    verModalRequisitos() {
      this.isModalRequisitos = true
    },
    verModalBeneficios() {
      this.isModalBeneficios = true
    },
    verModalAhorro() {
      this.isModalAhorro = true
    },
    cerraModal() {
      this.isModalRequisitos = false
      this.isModalBeneficios = false
      this.isModalAhorro = false
    },
    enviarSolicitud(payload) {
      this.$store.dispatch('conversiones/preEvaluate', payload)
    }
  }
}
</script>

<style></style>
