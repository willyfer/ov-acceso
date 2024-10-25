<template>
  <div class="policyEvaluation-credinstante">    
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <PolicyEvaluationHeaderContent :evaluationPhases="phases" />
    </SharedHeaderWithStepper>
    <v-dialog
      v-model="observadosModal"
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
      max-width="400"
      scrollable
      flat
    >
      <v-card flat>
        <v-card-title>
          <span class="font-weight-black secondary--text"
            >Documentos Observados</span
          >
        </v-card-title>
        <v-card-text style="height: 300px">
          <v-dialog v-model="dialogloader" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                Cargando documentos...
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-col v-for="line in documentosObservados" :key="line.id">
            <v-row>
              <v-col
                class="d-flex flex-column justify-center secondary--text"
                >{{ line.no_evalua }}</v-col
              >
              <v-col
                cols="2"
                md="2"
                sm="4"
                style="padding: 0"
                class="d-flex flex-column justify-center"
              >
                <v-icon large color="primary">mdi-menu-right</v-icon>
              </v-col>
              <v-col class="secondary--text">{{ line.no_politi }}</v-col>
            </v-row>
            <v-divider color="orange"></v-divider>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="acceso" dark to="/">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import PolicyEvaluationHeaderContent from '@/components/shared/policyEvaluation/PolicyEvaluationHeaderContent'
let socket = null
export default {
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('credinstante', ['datos', 'openDialog']),
    ...mapState('users', ['promotor']),
  },
  components: {
    SharedHeaderWithStepper,
    PolicyEvaluationHeaderContent,
  },
  data() {
    return {
      phases: [],
      documentosObservados: [],
      dialogloader: false,
      observadosModal: false,
      all: null,
      sbs: null,
      cofide: null,
      resultadoProspecto: null,
      datenow: '',
      paso1: '0',
      paso2: '0',
      paso3: '0',
      paso4: '0',
      procesos: [
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Obteniendo información',
          subtitle: '',
          estado: 0,
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Verificando información',
          subtitle: '',
          estado: 0,
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Validando información',
          subtitle: '',
          estado: 0,
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Corriendo políticas',
          subtitle: '',
          estado: 0,
        },
      ],
      interval: null,
    }
  },
  async created() {
    socket = io.connect(process.env.SOCKET_URL, {
      transports: ['websocket'],
      upgrade: false,
      forceNew: true,
      path: '/credinstante',
    }) 
    socket.on(this.datos.codigoProspecto, (msg) => {
      console.log('listening')
      if (msg.sbs)    
        this.cofideAndSbsEvaluation(msg.sbs); 
      if (msg.cofide)  
        this.cofideAndSbsEvaluation(msg.cofide);   
      if (msg.resultadoProspecto)
        this.prospectResult(msg.resultadoProspecto);
      this.all = msg;
    })
    this.phases = JSON.parse(
      JSON.stringify(this.currentComponent.evaluationPhases)
    )
  },
  mounted() {
    this.EmpiezaSteps()
    this.$ga.event('Credinstante', 'procesando')
    this.interval = setInterval(this.time, 1000 * 30 * 3)
  },
  beforeDestroy() {
    socket.off()
    clearInterval(this.interval)
  },
  methods: {
    async prospectResult(v) {
      await this.EmpiezaSteps();
      if (v != 3) {
        this.$store.commit('credinstante/UPDATE_DATOS', this.all)
        if (v === 1) {
          this.$ga.event('Credinstante', 'EvaluacionAprobado')
          setTimeout(() => {
            this.$store.commit('credinstante/UPDATE_DATOS', this.all)
            this.$store.commit('ui/UPDATE_STEP', 3)
          }, 2500)
        } else {
          this.$ga.event('Credinstante', 'procesando-Observados')
          if (!this.promotor.state) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: 'Estimado cliente',
              msgModal:
                'Tiene una observación por subsanar, por favor haz  <a href="https://wa.me/51952309100?text=Hola" target="_blank">Click Aquí</a> para comunicarte con un asesor.',
              maxWidth: 350,
              estadoModal: true,
              isReset: true,
            })
          } else {
            if (this.promotor.codigoEntidad == 1) {
              this.obtenerObservados(this.datos.codigoEvaluacion)
              this.observadosModal = true
            } else {
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: 'Estimado cliente',
                msgModal: 'Un asesor se comunicará contigo. ¡Gracias!',
                maxWidth: 350,
                estadoModal: true,
                isReset: true,
              })
            }
          }
        }
      } else {
        this.$fb.track('Desaprobado');
        this.$ga.event('Credinstante', 'EvaluacionRechazado')
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: '¡Lo sentimos!',
          msgModal:
            'En estos momentos no tenemos un producto para ti.¡Gracias!',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
      socket.off()
    },
    cofideAndSbsEvaluation(v) {
      console.log('sbs: ', v)
      if (v.estado === 3) {
        this.$ga.event('Credinstante', 'EvaluacionRechazado')
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: '¡Lo sentimos!',
          msgModal:
            'En estos momentos no tenemos una oferta  para ti.¡Gracias!',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
        socket.off()
      }
    },
    async obtenerObservados(cod_eval) {
      this.dialogloader = true
      const response = await this.$axios({
        url: `/v5/evaluacion/v2.0/politicas/?codigoEvaluacion=${cod_eval}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH,
        },
      })
      console.log('RESPUESTA', response)
      const politicas = response.data.js_politi
      const observaciones = politicas.filter((v) => v.ti_reseva === 2)
      this.documentosObservados = observaciones
      this.dialogloader = false
    },
    time() {
      this.$ga.event('Credinstante', 'PendienteEvaluar')
      this.$store.commit('ui/SET_OPENDIALOGALERT', {
        imgModal: 'success',
        tituloModal: ' ¡Hola!',
        msgModal:
          'Tu solicitud está tardando más de lo pensado, pero no te preocupes que cuando este terminada te llegará un sms para avisarte y puedas continuar.',
        maxWidth: 350,
        estadoModal: true,
        isReset: true,
      })
      socket.off()
    },
    goNextValidation(phase) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          phase.state = true
          resolve()
        }, phase.time)
      })
    },
    async EmpiezaSteps() {
      for (const phase of this.phases.slice(0, 3)) {
        await this.goNextValidation(phase)
      }
    },
  },
}
</script>

<style lang='scss'>
.policyEvaluation-credinstante {
  padding: 4px 8px 0 8px;
  margin-bottom: 20px;
}
</style>
