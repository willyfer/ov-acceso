<template>
  <div class="d-flex flex-column">
    <v-row>
      <v-col class="text-center">
        <h3 class="secondary--text font-weight-black">
          {{
            paso3 == 1
              ? 'YA ESTAMOS POR FINALIZAR'
              : 'ESTAMOS VERIFICANDO TU SOLICITUD...'
          }}
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
        <v-card-text style="height: 300px;">
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
                style="padding:0"
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
    ...mapState('prospeccion', ['datos', 'openDialog']),
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
    }
  },
  components: {
    mixins: [mixins],
    StepSquare
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
          estado: 0
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Verificando información',
          subtitle: '',
          estado: 0
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Validando información',
          subtitle: '',
          estado: 0
        },
        {
          logo: require('@/assets/revision_Export.png'),
          title: 'Corriendo políticas',
          subtitle: '',
          estado: 0
        }
      ]
    }
  },
  watch: {
    cofide(v) {
      console.log('cofide: ', v)
      if (v.estado === 3) {
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje: 'Lo sentimos no tenemos una oferta  para ti.¡Gracias!'
        })

        socket.off()
      }
    },
    sbs(v) {
      console.log('sbs: ', v)
      if (v.estado === 3) {
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje: 'Lo sentimos no tenemos una oferta  para ti. ¡Gracias!'
        })
        socket.off()
      }
    },
    resultadoProspecto(v) {
      console.log(this.paso1, this.paso2, this.paso3)
      setTimeout(() => {
        this.paso1 = '1'
        this.paso2 = '1'
        setTimeout(() => {
          this.paso3 = '1'
          setTimeout(() => {
            this.paso4 = '1'
            if (v != 3) {
              this.$store.commit('prospeccion/UPDATE_DATOS', this.all)
              if (v === 1) {
                console.log('APROBADO')
                setTimeout(() => {
                  this.$store.commit('ui/UPDATE_STEP', 3)
                }, 2000)
              } else {
                console.log('OBSERVADO')
                console.log(this.promotor)
                if (!this.promotor.state) {
                  this.$store.commit('ui/SET_OPENDIALOG', {
                    estado: true,
                    mensaje:
                      'Tiene una observación por subsanar, por favor haz  <a href="https://wa.me/51952309100?text=Hola" target="_blank">Click Aquí</a> para comunicarte con un asesor.'
                  })
                } else {
                  if (this.promotor.codigoEntidad == 1) {
                    //  usuario interno
                    /* this.obtenerObservados(cod_eval) */
                    this.obtenerObservados(this.datos.codigoEvaluacion)
                    this.observadosModal = true
                  } else {
                    //  usuario externo
                    this.$store.commit('ui/SET_OPENDIALOG', {
                      estado: true,
                      mensaje: 'Un asesor se comunicará contigo. ¡Gracias!'
                    })
                  }
                }
              }
            } else {
              console.log('RECHAZADO')

              this.$store.commit('ui/SET_OPENDIALOG', {
                estado: true,
                mensaje:
                  'Disculpa, pero en estos momentos no tenemos un producto para ti. ¡Gracias!'
              })
            }
            socket.off()
          }, 1000)
        }, 1500)
      }, 1500)
    },
    datenow(val) {
      this.$store.commit('ui/SET_OPENDIALOG', {
        estado: true,
        mensaje: 'Se está procesando tu solicitud ¡Gracias!'
      })

      socket.off()
    }
  },
  async created() {
    socket = io.connect(process.env.SOCKET_URL, {
      transports: ['websocket']
    }) // me conecto al servidor
    socket.on(this.datos.codigoProspecto, (msg) => {
      console.log('listening')
      if (msg.sbs) {
        this.sbs = msg.sbs
      }
      if (msg.cofide) {
        this.cofide = msg.cofide
      }
      if (msg.resultadoProspecto)
        this.resultadoProspecto = msg.resultadoProspecto
      this.all = msg
    })
  },
  mounted() {
    /*     this.resultadoProspecto=2 */
    this.$ga.event('Prospecciones', 'Procesando')
    this.EmpiezaSteps()
    this.interval = setInterval(this.time, 1000 * 60 * 2)
  },

  beforeDestroy() {
    //console.log('destruyendo')
    socket.close()
    clearInterval(this.interval)
  },
  methods: {
    async obtenerObservados(cod_eval) {
      this.dialogloader = true
      const response = await this.$axios({
        url: `/v5/evaluacion/v2.0/politicas/?codigoEvaluacion=${cod_eval}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH
        }
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
              this.paso4 = '1'
              setTimeout(() => {
                this.$store.commit('ui/UPDATE_STEP', 3)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    }
  }
}
</script>
