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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import InformationContainer from '@/components/shared/InformationContainer'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import { ResponseCode } from '@/enums/moto-enums';

export default {
  name: 'IdentityValidation',
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
  },
  props: {
    color: {},
    currentComponent: { type: Object, default: () => ({}) },
  },
  mixins: [actionsByCodeMixin],
  async fetch() {
    try {
      await this.$store.dispatch('firma/actionObtenerPreguntas', this.codigoProspecto);
      this.formatQuestionAndAnswers()
    } catch (error) {
      this.$showError(error);
    }
  },
  data() {
    return {
      currentQuestionNumber: 0,/////indice de pregunta actual
      idQuestion: 0,
      question: '',
      answerList: [],
      detalleEvalua: [],
      imgLoading: require('@/assets/img/firma/loading.gif'),
    }
  },
  computed: {
    ...mapGetters('firma', [
      'numberOfQuestions',
      'validationQuestions',
      'productCode',
      'codigoProspecto',
      'estadoProspecto',
      'responseCode',
    ]),
  },
  methods: {
    indentity({ id, value }) {
      try {
        this.detalleEvalua.push({
          tipoPregunta: this.idQuestion,
          respuestas: { id, rpta: value },
        })
        this.currentQuestionNumber++
        if (this.currentQuestionNumber == this.numberOfQuestions) {
          this.sendResponsesValidate();
        } else {
          this.formatQuestionAndAnswers()
        }
      } catch (error) {
        this.$showError(error);
      }
    },
    async sendResponsesValidate() {
      try {
        const data = {
          codigoProspecto: this.codigoProspecto,
          detalleEvalua: this.detalleEvalua,
        };
        await this.$store.dispatch('firma/actionValidarPreguntas', data);
        this.analizarCodigoRespuesta();        
      } catch (error) {
        this.$showError(error);
      }
    },
    async analizarCodigoRespuesta() {
      if(this.responseCode == ResponseCode.CORRECTO) {
        this.createProceedings();
      } else {
        this.$showSpinner(false);
        this.analyzeProspectStatus();
      }
    },    
    formatQuestionAndAnswers() {
      try {
        if(this.responseCode == ResponseCode.CORRECTO) {
          ;({
            id: this.idQuestion,
            quiz: this.question,
            answer: this.answerList,
          } = this.validationQuestions.slice(this.currentQuestionNumber).shift()); 
        } else {
          this.$showSpinner(false);
          this.analyzeProspectStatus();
        }
      } catch (error) {
        throw new Error('No se pudo procesar lista de preguntas')
      }
    },
    async createProceedings() {
      try {
        await this.$store.dispatch('firma/actionCrearExpediente');
        this.analyzeProspectStatus();
      } catch (error) {
        this.$showError(error);
      }
    },
  },  
}
</script>

<style scoped>
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