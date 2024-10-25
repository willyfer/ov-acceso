<template>
  <div>
    <div class="pa-3" v-if="quiz">
      <v-row justify="center">
        <v-col cols="12" md="12" lg="12" class="d-flex flex-column justify-center">
          <h2 class="ld-h2-title-form display-1" style="font-size: 1.5em !important">
            Por tu seguridad validaremos tu identidad
            <v-divider></v-divider>
            <span class="form-quiz text-center">{{pre1}}</span>
          </h2>
        </v-col>
      </v-row>

      <v-form
        ref="form1"
        autocomplete="nope"
        class="form-validacion"
        style="display: flex;
        align-items: center;
        justify-content: center;"
      >
        <div id="quiz">
          <!--v-col cols="12" md="12" class="d-flex flex-column justify-center" style="padding:4px">
          <span class="form-quiz text-center">{{pre1}}</span>
          </v-col-->
          <v-radio-group
            :disabled="disabled"
            :readonly="readonly"
            :mandatory="mandatory"
            :multiple="multiple"
            :error="error"
            :success="success"
            :row="row"
            :color="color"
          ></v-radio-group>

          <v-row dense>
            <v-col cols="12" xs="12" sm="6" lg="4">
              <v-card
                color="#005092"
                dark
                @click="indentity(1,res1, id_res1, id_preg1)"
                style="cursor: pointer; padding: 5px; margin-top: 5px; padding: 0 "
              >
                <v-card-subtitle align="center" style="font-size: 0.7em; padding: 7px">
                  <b>{{res1}}</b>
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="6" lg="4">
              <v-card
                color="#005092"
                dark
                @click="indentity(1,res2, id_res2, id_preg1)"
                style="cursor: pointer; padding: 5px; margin-top: 5px; padding: 0 "
              >
                <v-card-subtitle align="center"  style="font-size: 0.7em; padding: 7px">
                  <b>{{res2}}</b>
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="6" lg="4">
              <v-card
                color="#005092"
                dark
                @click="indentity(1,res3, id_res3, id_preg1)"
                style="cursor: pointer; padding: 5px; margin-top: 5px ; padding: 0"
              >
                <v-card-subtitle align="center"  style="font-size: 0.7em; padding: 7px">
                  <b>{{res3}}</b>
                </v-card-subtitle>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="4">
              <v-card
                color="#005092"
                dark
                @click="indentity(1,res4, id_res4, id_preg1)"
                style="cursor: pointer; padding: 5px ; margin-top: 5px; padding: 0"
              >
                <v-card-subtitle align="center"  style="font-size: 0.7em; padding: 7px">
                  <b>{{res4}}</b>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="4">
              <v-card
                color="#005092"
                dark
                @click="indentity(1,res5, id_res5, id_preg1)"
                style="cursor: pointer; padding: 5px;  margin-top: 5px; padding: 0 "
              >
                <v-card-subtitle align="center"  style="font-size: 0.7em; padding: 7px">
                  <b>{{res5}}</b>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="4">
              <v-card
                color="#005092"
                dark
                @click="indentity(1,res6, id_res6, id_preg1)"
                style="cursor: pointer; padding: 5px;  margin-top: 5px; padding: 0 "
              >
                <v-card-subtitle align="center" style="font-size: 0.7em; padding: 7px">
                  <b>{{res6}}</b>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </div>
    <LoadingComponent v-else color="acceso"></LoadingComponent>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import axios from '@nuxtjs/axios'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    LoadingComponent
  },
  mixins: [mixins],
  props: ['color'],
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('contigo', [
      'datos',
      'quizArray',
      'codProspecto',
      'body_valida'
    ])
  },
  data() {
    return {
      loader: null,
      loading: false,
      allowSpaces: false,
      checkbox: true,
      row: null,
      disabled: false,
      readonly: false,
      loading: false,
      flat: false,
      inset: false,
      error: false,
      success: false,
      mandatory: false,
      multiple: false,
      row: false,

      /** variables de las preguntas */
      preguntas: [],
      pre1: '',
      res1: '',
      res2: '',
      res3: '',
      res4: '',
      res5: '',
      res6: '',
      /** fin de las variables  */

      /** variables que se envian para validar */
      id_preg1: '',
      id_res1: '',
      id_res2: '',
      id_res3: '',
      id_res4: '',
      id_res4: '',
      id_res5: '',
      id_res6: '',

      /**fin de lsd variables para validar */

      index: 0,
      len: 0,
      score: 0,
      finalQuiz: false,
      quiz: false,
      detalleEvalua: [],
      respuestas: [],
      objeto: {
        codigoProspecto: this.codProspecto
      }
    }
  },
  methods: {
    indentity(value, respuesta, id_res, id_preg) {
      try {

        this.detalleEvalua.push({
          tipoPregunta: id_preg,
          respuestas: {
            id: id_res,
            rpta: respuesta
          }
        })
        this.index = this.index + value

        if (this.index == 3) {
          this.quiz = false;
          this.objeto.codigoProspecto = this.codProspecto
          this.objeto.detalleEvalua = this.detalleEvalua

          this.$store
            .dispatch('contigo/validaPreguntas', JSON.stringify(this.objeto))
            .then((res) => {
              if( res.codRes == '00'){
                this.$store.commit('contigo/SET_STEP', 3)
              }
              else if(res.codRes == '01'){
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Lo sentimos!',
                msgModal: 'Usted no superó la validación de identidad.',
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
              } else if(res.codRes == '02'){
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Lo sentimos!',
                msgModal: 'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 24 horas.',
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
              }  else if(res.codRes == '03'){
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Lo sentimos!',
                msgModal: 'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 15 días.',
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
              } else if(res.codRes == '04'){
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Lo sentimos!',
                msgModal: 'Por ahora no tenemos una oferta disponible.',
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
              } else {
                throw new Error(
                  'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.'
                )
              }
           /*    res.codRes == '00'
                ? this.$store.commit('contigo/SET_STEP', 3)
                : res.codRes == '01'
                ? this.$store.commit('ui/SET_OPENDIALOGALERT', {
                    imgModal: 'warning',
                    tituloModal: '¡Lo sentimos!',
                    msgModal: 'Usted no superó la validación de identidad',
                    maxWidth: 350,
                    estadoModal: true,
                    isReset: true
                  })
                :res.codRes== '02'
                ?
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                    imgModal: 'warning',
                    tituloModal: '¡Lo sentimos!',
                    msgModal: 'Usted no superó la validación de identidad',
                    maxWidth: 350,
                    estadoModal: true,
                    isReset: true
                  })
                : res.codRes == '99'
                  ?
                  this.setReset()
                  :
                  new Error(
                    'En estos momentos no se puede validar las preguntas, por favor inténtalo en unos minutos.'
                  ) */
            }).catch(
              (err) => {
                throw new Error (err.message)
              }
            )
          /** FIN DE VALIDAR LAS PREGUNTAS */
        } else {
          /** REASIGNACIÓN DE PREGUNTAS Y RESPUESTAS */
          this.pre1 = this.preguntas.data[this.index].quiz
          this.id_preg1 = this.preguntas.data[this.index].id

          this.res1 = this.preguntas.data[this.index].answer[0].value
          this.id_res1 = this.preguntas.data[this.index].answer[0].id

          this.res2 = this.preguntas.data[this.index].answer[1].value
          this.id_res2 = this.preguntas.data[this.index].answer[1].id

          this.res3 = this.preguntas.data[this.index].answer[2].value
          this.id_res3 = this.preguntas.data[this.index].answer[2].id

          this.res4 = this.preguntas.data[this.index].answer[3].value
          this.id_res4 = this.preguntas.data[this.index].answer[3].id

          this.res5 = this.preguntas.data[this.index].answer[4].value
          this.id_res5 = this.preguntas.data[this.index].answer[4].id

          this.res6 = this.preguntas.data[this.index].answer[5].value
          this.id_res6 = this.preguntas.data[this.index].answer[5].id
          /** FIN DE REASIGNACIÓN DE PREGUNTAS Y RESPUESTAS */
        }
        /** FIN DE MUESTRA DE LAS TRES PREGUNTAS AL CLIENTE */
      } catch (err) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'error',
                tituloModal: '¡Error!',
                msgModal: err.message,
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
      }
    },
    setReset(){
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
        imgModal: 'warning',
        tituloModal: '¡Lo sentimos!',
        msgModal: 'En estos momentos no se puede validar las preguntas, por favor inténtalo en unos minutos.',
        maxWidth: 350,
        estadoModal: true,
        isReset: true
      })
      setTimeout( () => {
        this.$store.commit('contigo/SET_STEP', 1)
      }, 4000)
    }
  },

  async mounted() {
    this.$store
      .dispatch('contigo/obtenerPreguntas', this.codProspecto)
      .then((res) => {
        if (res.codRes == '00') {
          this.quiz = true
          this.preguntas = this.quizArray
          this.pre1 = this.preguntas.data[0].quiz
          this.id_preg1 = this.preguntas.data[0].id

          this.res1 = this.preguntas.data[0].answer[0].value
          this.id_res1 = this.preguntas.data[0].answer[0].id

          this.res2 = this.preguntas.data[0].answer[1].value
          this.id_res2 = this.preguntas.data[0].answer[1].id

          this.res3 = this.preguntas.data[0].answer[2].value
          this.id_res3 = this.preguntas.data[0].answer[2].id

          this.res4 = this.preguntas.data[0].answer[3].value
          this.id_res4 = this.preguntas.data[0].answer[3].id

          this.res5 = this.preguntas.data[0].answer[4].value
          this.id_res5 = this.preguntas.data[0].answer[4].id

          this.res6 = this.preguntas.data[0].answer[5].value
          this.id_res6 = this.preguntas.data[0].answer[5].id

        }else if(res.codRes == '01'){
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Usted no superó la validación de identidad.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
        } else if(res.codRes == '02'){
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 24 horas.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
        }  else if(res.codRes == '03'){
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 15 días.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
        } else if(res.codRes == '04'){
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: 'Lo sentimos!',
          msgModal: 'Por ahora no tenemos una oferta disponible.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
        } else {
          throw new Error(
            'En estos momentos no se puede obtener las preguntas, por favor inténtalo en unos minutos.'
          )
        }
      })
      .catch((err) => {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal: err.message,
          maxWidth: 350,
          estadoModal: true,
          isReset: true
        })
      })
  }
}
</script>
<style scope>
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
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

#quiz {
  width: 55% !important;
  padding: 0;
}
</style>
