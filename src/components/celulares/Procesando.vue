<template>
  <div class="d-flex flex-column">
    <v-row>
      <v-col class="text-center">
        <h3 class="secondary--text font-weight-black">
          Estamos procesando tu solicitud, esto podría tardar algunos minutos.
        </h3>
      </v-col>
    </v-row>
    <v-row class="pa-4">
      <v-col>
        <StepSquare
          :ready="paso1"
          :icono="require('@/assets/CargandoDatos.png')"
          texto="Cargando Datos"
        />
      </v-col>
      <v-col>
        <StepSquare
          :ready="paso2"
          :icono="require('@/assets/Verificando.png')"
          texto="Verificando"
        />
      </v-col>
      <v-col>
        <StepSquare
          :ready="paso3"
          :icono="require('@/assets/Validando.png')"
          texto="Validando"
        />
      </v-col>
      <v-col>
        <StepSquare
          :ready="paso4"
          :icono="require('@/assets/Evaluando.png')"
          texto="Evaluando"
        />
      </v-col>
    </v-row>
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
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import { mixins } from '@/mixins/mixin.js'
import StepSquare from '@/components/shared/loading/StepSquare'
let socket = null
export default {
  props: ['color'],
  computed: {
    ...mapState('express', ['datos', 'openDialog']),
    ...mapState('users', ['promotor']),
    estadoPrevaluate() {
      if (this.openDialog) {
        return this.openDialog.estado
      }
    },
    mensajePrevaluate() {
      if (this.openDialog) {
        return this.openDialog.mensaje
      }
    },
  },
  components: {
    mixins: [mixins],
    StepSquare,
  },
  data() {
    return {
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
    }
  },
  watch: {
    cofide(v) {
      console.log('cofide: ', v)
      // if (v.estado === 3) {
      //   this.$ga.event('Credinstante', 'EvaluacionRechazado')
      //   this.$store.commit('ui/SET_OPENDIALOGALERT', {
      //     imgModal: 'warning',
      //     tituloModal: '¡Lo sentimos!',
      //     msgModal:
      //       'En estos momentos no tenemos una oferta  para ti.¡Gracias!',
      //     maxWidth: 350,
      //     estadoModal: true,
      //     isReset: true,
      //   })
        // socket.off()
      // }
    },
    sbs(v) {
      console.log('sbs: ', v)
      // if (v.estado === 3) {
      //   this.$ga.event('Credinstante', 'EvaluacionRechazado')
      //   this.$store.commit('ui/SET_OPENDIALOGALERT', {
      //     imgModal: 'warning',
      //     tituloModal: '¡Lo sentimos!',
      //     msgModal:
      //       'En estos momentos no tenemos una oferta  para ti.¡Gracias!',
      //     maxWidth: 350,
      //     estadoModal: true,
      //     isReset: true,
      //   })
        /* this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje: 'Lo sentimos no tenemos una oferta  para ti. ¡Gracias!'
        }) */
        //socket.off()
      // }
    },
    resultadoProspecto(v) {
      console.log(this.paso1, this.paso2, this.paso3)
      setTimeout(() => {
        this.paso1 = '1'
        this.paso2 = '1'  
        setTimeout(() => {
          this.paso3 = '1'
          setTimeout(() => {
            this.paso4 = '1';
             this.$store.commit('celular/SET_STEP', 3);
            // if (v != 3) {
            //   this.$store.commit('express/UPDATE_DATOS', this.all)
            //   if (v === 1) {
            //     console.log('APROBADO')
            //     this.$ga.event('Credinstante', 'EvaluacionAprobado')
            //     setTimeout(() => {
            //       this.$store.commit('express/UPDATE_DATOS', this.all)
            //       this.$store.commit('ui/UPDATE_STEP', 9)
            //     }, 2500) //modifico para 2'30min
            //   } else {
            //     console.log('OBSERVADO')
            //     console.log(this.promotor)
            //     this.$ga.event('Credinstante', 'procesando-Observados')
            //     if (!this.promotor.state) {
            //       this.$store.commit('ui/SET_OPENDIALOGALERT', {
            //         imgModal: 'warning',
            //         tituloModal: 'Estimado cliente',
            //         msgModal:
            //           'Tiene una observación por subsanar, por favor haz  <a href="https://wa.me/51952309100?text=Hola" target="_blank">Click Aquí</a> para comunicarte con un asesor.',
            //         maxWidth: 350,
            //         estadoModal: true,
            //         isReset: true,
            //       })
            //     } else {
            //       if (this.promotor.codigoEntidad == 1) {
            //         this.obtenerObservados(this.datos.codigoEvaluacion)
            //         this.observadosModal = true
            //       } else {
            //         this.$store.commit('ui/SET_OPENDIALOGALERT', {
            //           imgModal: 'warning',
            //           tituloModal: 'Estimado cliente',
            //           msgModal: 'Un asesor se comunicará contigo. ¡Gracias!',
            //           maxWidth: 350,
            //           estadoModal: true,
            //           isReset: true,
            //         })
            //       }
            //     }
            //   }
            // } else {
            //   console.log('RECHAZADO')
            //   this.$fb.track('Desaprobado')
            //   this.$ga.event('Credinstante', 'EvaluacionRechazado')
            //   this.$store.commit('ui/SET_OPENDIALOGALERT', {
            //     imgModal: 'warning',
            //     tituloModal: '¡Lo sentimos!',
            //     msgModal:
            //       'En estos momentos no tenemos un producto para ti.¡Gracias!',
            //     maxWidth: 350,
            //     estadoModal: true,
            //     isReset: true,
            //   })
            // }
            // socket.off()
          }, 300)
        }, 300)
      }, 500)
    },
    datenow(val) {
      this.$ga.event('celulares', 'PendienteEvaluar')
      this.$store.commit('ui/SET_OPENDIALOGALERT', {
        imgModal: 'success',
        tituloModal: ' ¡Hola!',
        msgModal:
          'Tu solicitud está tardando más de lo pensado, pero no te preocupes que cuando este terminada te llegará un sms para avisarte y puedas continuar.',
        maxWidth: 350,
        estadoModal: true,
        isReset: true,
      })
      //  socket.off()
    },
  },
  async created() {
    //  SOCKET DESACTIVADO
    // socket = io.connect(process.env.SOCKET_URL, {
    //   transports: ['websocket'],
    //   upgrade: false,
    //   forceNew: true,
    //   path: '/credinstante',
    // }) 

    // socket.on(this.datos.codigoProspecto, (msg) => {
    //   console.log('listening')
    //   if (msg.sbs) {
    //     this.sbs = msg.sbs
    //   }
    //   if (msg.cofide) {
    //     this.cofide = msg.cofide
    //   }
    //   if (msg.resultadoProspecto)
    //     this.resultadoProspecto = msg.resultadoProspecto
    //   this.all = msg
    // })
  },
  mounted() {
    this.EmpiezaSteps()
    this.$ga.event('celulares', 'procesando')
    this.interval = setInterval(this.time, 1000 * 30 * 3)
  },

  beforeDestroy() {
    // socket.off()
    // clearInterval(this.interval)
  },
  methods: {
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
      this.datenow = Date.now()
    },
    EmpiezaSteps() {
      setTimeout(() => {
        this.paso1 = '1'
        setTimeout(() => {
          this.paso2 = '1'
          setTimeout(() => {
            this.paso3 = '1'
            setTimeout(() => {
            this.paso4 = '1';
            this.$store.commit('celulares/SET_STEP', 3);
          }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    },
  },
}
</script>
