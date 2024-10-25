<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
        lg="12"
        class="d-flex flex-column justify-center"
      >
        <h2
          class="ld-h2-title-form display-1"
          style="font-size: 1.5em !important"
        >
          {{ titulo }}

          <v-divider></v-divider>
          <span class="form-quiz text-center">{{ question }}</span>
        </h2>
      </v-col>
    </v-row>
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
                <p class="mb-0 notranslate">
                  <b>{{ answer.value }}</b>
                </p>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'IdentityQuestions',
  props: [
    'titulo',
    'isFormatQuestionAndAnswers',
    'codigoProspecto',
    'numberOfQuestions',
    'validationQuestions',
  ],
  data() {
    return {
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
        codigoProspecto: this.codigoProspecto,
        detalleEvalua: this.detalleEvalua,
      }
      this.$emit('sendValidate', data)
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

<style scoped>
.headerIdentityValidation {
  color: white;
  padding: 20px 30px;
  text-align: center;
  font-size: 1.1em;
}
.answerCard {
  background-color: #005092 !important;
  cursor: pointer;
  padding: 5px;
  margin-top: 5px;
  padding: 0;
}
.container {
  width: 80% !important;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.form-validacion {
  padding: 0px;
  /* border: 1px solid #ff7729 !important; */
  border-radius: 10px;
}
.form-quiz {
  font-size: 20px;
  color: #005092;
}
.ld-h2-title-form {
  color: #005092 !important;
}
</style>