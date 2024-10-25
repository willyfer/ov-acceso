<template>
  <v-container class="d-flex flex-column pt-1">
    <v-row class="pt-0">
      <v-col cols="12" class="pt-0">
        <SharedHeaderWithStepper
          :numberSteps="currentComponent.numberSteps"
          :imgVehiculo="currentComponent.imgProductStep"
        >
          <div class="headerIdentityValidation">
            Por tu seguridad validaremos tu identidad
          </div>
        </SharedHeaderWithStepper>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <InformationContainer :title="question" align="center">
          <v-form
            autocomplete="nope"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 26px;
            "
          >
            <div id="quiz">
              <v-row dense>
                <v-col
                  v-for="answer in answerList"
                  :key="answer.id"
                  cols="12"
                  xs="12"
                  sm="6"
                  lg="4"
                >
                  <v-card class="answerCard" dark @click="indentity(answer)">
                    <v-card-subtitle
                      align="center"
                      style="font-size: 0.7em; padding: 7px; color: #ffffff"
                    >
                      <b>{{ answer.value }}</b>
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </InformationContainer>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import InformationContainer from '@/components/shared/InformationContainer'
export default {
  $_veeValidate: {
    validator: 'new',
  },
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('credinstante', [
      'datos',
      'numberOfQuestions',
      'validationQuestions',
    ]),
  },
  async fetch() {
    try {
      this.isQuestion = false
      const responseObtenerPreguntas = await this.$store.dispatch(
        'credinstante/obtenerPreguntas',
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
      currentQuestionNumber: 0, /////indice de pregunta actual
      idQuestion: 0,
      question: '',
      answerList: [],
      detalleEvalua: [],
    }
  },
  watch: {
    isFormatQuestionAndAnswers: function (val) {
      if (val) {
        this.formatQuestionAndAnswers()
      }
    },
  },
  methods: {
    async sendValidate(payload) {
      try {
        this.isQuestion = false
        const responseValidarPreguntas = await this.$store.dispatch(
          'credinstante/validaPreguntas',
          payload
        )
        if (responseValidarPreguntas.codRes == '00') {
          this.$store.commit('credinstante/SET_STEP', 5)
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
    indentity({ id, value }) {
      try {
        this.detalleEvalua.push({
          tipoPregunta: this.idQuestion,
          respuestas: { id, rpta: value },
        })
        this.currentQuestionNumber++
        if (this.currentQuestionNumber == this.numberOfQuestions) {
          this.sendResponsesValidate()
        } else {
          this.formatQuestionAndAnswers()
        }
      } catch (error) {}
    },
    async sendResponsesValidate() {
      const data = {
        codigoProspecto: this.datos.codigoProspecto,
        detalleEvalua: this.detalleEvalua,
      }
      this.sendValidate(data);
    },
    formatQuestionAndAnswers() {
      try {
        ;({
          id: this.idQuestion,
          quiz: this.question,
          answer: this.answerList,
        } = this.validationQuestions.slice(this.currentQuestionNumber).shift())
      } catch (error) {
        throw new Error('No se pudo procesar lista de preguntas')
      }
    },
  },
}
</script>
<style scope>
  .headerIdentityValidation {
    color: white;
    padding: 20px 30px;
    text-align: center;
    font-size: 1.1em;
  }
  .answerCard {
    background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 92%);
    cursor: pointer;
    padding: 5px;
    margin-top: 5px;
    padding: 0;
  }
</style>
