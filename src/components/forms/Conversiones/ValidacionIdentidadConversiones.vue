<template>
  <div>
    <div class="pa-3" v-show="isQuestion">
      <IdentityQuestions
        titulo="Por tu seguridad validaremos tu identidad"
        :isFormatQuestionAndAnswers="isFormatQuestionAndAnswers"
        :codigoProspecto="datos.codigoProspecto"
        :numberOfQuestions="numberOfQuestions"
        :validationQuestions="validationQuestions"
        @sendValidate="sendValidate"
      />
    </div>
    <LoadingComponent v-show="!isQuestion" color="acceso"></LoadingComponent>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import IdentityQuestions from '@/components/validations/IdentityQuestions'
export default {
  name: 'ValidacionIdentidadConversiones',
  components: {
    LoadingComponent,
    IdentityQuestions,
  },
  props: ['color'],
  computed: {
    ...mapGetters('conversiones', [
      'datos',
      'numberOfQuestions',
      'validationQuestions',
    ]),
  },
  async fetch() {
    try {
      this.isQuestion = false
      const responseObtenerPreguntas = await this.$store.dispatch(
        'conversiones/obtenerPreguntas',
        this.datos.codigoProspecto
      )
      if (responseObtenerPreguntas.codRes == '00') {
        this.isQuestion = true
        this.isFormatQuestionAndAnswers = true
      } else if (responseObtenerPreguntas.codRes == '01') {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Usted no superó la validación de identidad.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      } else if (responseObtenerPreguntas.codRes == '02') {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal:
            'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 24 horas.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      } else if (responseObtenerPreguntas.codRes == '03') {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal:
            'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 15 días.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      } else if (responseObtenerPreguntas.codRes == '04') {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Por ahora no tenemos una oferta disponible.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      } else {
        throw new Error(
          'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.'
        )
      }
    } catch (error) {}
  },
  data() {
    return {
      isFormatQuestionAndAnswers: false,
      isQuestion: false,
    }
  },
  methods: {
    async sendValidate(payload) {
      try {
        this.isQuestion = false
        const responseValidarPreguntas = await this.$store.dispatch(
          'conversiones/validaPreguntas',
          payload
        )
        if (responseValidarPreguntas.codRes == '00') {
          this.$store.commit('ui/UPDATE_STEP', 6)
        } else if (responseValidarPreguntas.codRes == '01') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: 'Lo sentimos!',
            msgModal: 'Usted no superó la validación de identidad.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        } else if (responseValidarPreguntas.codRes == '02') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: 'Lo sentimos!',
            msgModal:
              'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 24 horas.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        } else if (responseValidarPreguntas.codRes == '03') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: 'Lo sentimos!',
            msgModal:
              'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 15 días.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        } else if (responseValidarPreguntas.codRes == '04') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: 'Lo sentimos!',
            msgModal: 'Por ahora no tenemos una oferta disponible.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        } else {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: 'Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        }
      } catch (error) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: 'Lo sentimos!',
          msgModal:
            'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
  },
}
</script>
<style scope>
</style>
