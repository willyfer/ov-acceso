<template>
  <v-container fluid d-flex align-center>
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
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import IdentityQuestions from '@/components/validations/IdentityQuestions'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    LoadingComponent,
    IdentityQuestions,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
    color: { type: String, default: null },
  },
  mixins: [actionsByCodeMixin],
  computed: {
    ...mapGetters('users', ['productCode']),
    ...mapGetters('extraefectivo', [
      'datos',
      'numberOfQuestions',
      'validationQuestions',
      'estadoProspecto',
    ]),
  },
  async fetch() {
    try {
      this.$fb.track('formulario_extra_efectivo')
      this.isQuestion = false
      await this.$store.dispatch(
        'extraefectivo/actionObtenerPreguntas',
        this.datos.codigoProspecto
      )
      this.isQuestion = true
      this.isFormatQuestionAndAnswers = true
    } catch (error) {
      this.$emit('open-modal-menssage-prospectus', {
        titulo: '¡Lo sentimos!',
        message:
          'En estos momentos no podemos obtener tus preguntas, por favor inténtalo en unos minutos.',
        reset: 'extraefectivo',
      })
    }
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
        await this.$store.dispatch(
          'extraefectivo/actionValidarPreguntas',
          payload
        )
        this.analyzeProspectStatus()
      } catch (error) {
        console.log('errorSendValidate: ', error)
        this.$emit('open-modal-menssage-prospectus', {
          titulo: '¡Lo sentimos!',
          message:
            'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.',
          reset: 'extraefectivo',
        })
      }
    },
  },
}
</script>
<style scope>
</style>
