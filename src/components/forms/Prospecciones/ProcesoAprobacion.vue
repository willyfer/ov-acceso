<template>
  <v-container class="d-flex flex-column">
    <v-col class="text-center">
      <v-row class="d-flex flex-row mt-2 justify-center">
        <span class="secondary--text display-1 font-weight-black">
          {{
          tituloAprobracion
          }}
        </span>
      </v-row>
      <v-row class="d-flex flex-row justify-center mb-3" cols="12">
        <span class="secondary--text display-1 font-weight-black">
          {{
          subTituloAprobacion
          }}
        </span>
      </v-row>
      <v-row class="d-block d-flex flex-row justify-center">
        <v-col md="6">
          <span
            class="grey pa-1 secondary--text font-weight-black d-flex flex-row justify-center"
            style=" border-radius:50px; width:100%"
          >Condiciones del crédito</span>
        </v-col>
      </v-row>
      <v-row class="d-flex flex-row justify-center" cols="12">
        <v-col cols="10" pa-4 sm="12" md="6">
          <v-row class="d-flex flex-column">
            <v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <span class="secondary--text">Préstamo</span>
              </v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <!-- <span class="secondary--text">S/.{{ datos.importeFinanciar }}.00</span> -->
                <span class="secondary--text">S/.3500.00</span>
              </v-row>
            </v-row>
            <v-divider color="secondary" class="ma-0"></v-divider>
            <v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <span class="secondary--text">Plazo</span>
              </v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <!-- <span class="secondary--text">{{ datos.cuotas }}</span> -->
                <span class="secondary--text">12</span>
              </v-row>
            </v-row>
            <v-divider color="secondary" class="ma-0"></v-divider>
            <v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <span class="secondary--text">Cuota</span>
              </v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <!-- <span class="secondary--text">S/.{{ datos.importeCuotas }}.00</span> -->
                <span class="secondary--text">S/.270.00</span>
              </v-row>
            </v-row>
            <v-divider color="secondary" class="ma-0"></v-divider>
            <v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <span class="secondary--text">TCEA</span>
              </v-row>
              <v-row cols="12" class="d-flex flex-row justify-center">
                <!-- <span class="secondary--text">{{ datos.tasa * 100 }}%</span> -->
                <span class="secondary--text">5%</span>
              </v-row>
            </v-row>
            <v-divider color="secondary" class="ma-0"></v-divider>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="d-block d-flex flex-row justify-center">
        <v-col md="6">
          <span
            class="title secondary--text font-weight-black d-flex flex-row justify-start"
          >Requisitos</span>
        </v-col>
      </v-row>
      <v-row class="d-block d-flex flex-row justify-center">
        <v-col md="6" class="d-flex flex-column">
          <span class="d-flex secondary--text">DNI</span>
          <span class="d-flex secondary--text">Recibo de servicios</span>
          <span class="d-flex secondary--text">Sustento de ingresos</span>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-row justify-center" cols="12">
        <span class="mb-4 secondary--text title font-weight-black">¿Estás interesado?</span>
      </v-row>
      <v-row class="d-flex flex-row justify-center" cols="12">
        <v-btn class="primary pa-2" width="252px" @click="dialogstate = true">Si quiero</v-btn>
        <v-btn class="pa-2" to="/">No, no en estos momentos</v-btn>
      </v-row>
    </v-col>
    <v-dialog v-model="dialogstate" width="400" persistent>
      <v-card>
        <v-card-title>
          <v-col class="secondary--text">
            <v-row class="text-center d-flex flex-row justify-center" v-html="Cabecera"></v-row>
          </v-col>
        </v-card-title>
        <v-card-text>
          <v-row class="border-acceso d-flex flex-column pa-6">
            <v-row class="secondary--text">
              <v-col cols="12" md="4" style="padding:0">
                <span class="font-weight-black">Dirección</span>
              </v-col>
              <v-col cols="12" md="8" style="padding:0">
                <span class="d-flex flex-row justify-end">
                  {{
                  onsede.direccion
                  }}
                </span>
              </v-col>
            </v-row>
            <v-row class="secondary--text">
              <v-col cols="12" md="4" style="padding:0">
                <span class="font-weight-black">Referencia:</span>
              </v-col>
              <v-col cols="12" md="8" style="padding:0">
                <span class="d-flex flex-row justify-end">
                  {{
                  onsede.referencia
                  }}
                </span>
              </v-col>
            </v-row>
            <v-row class="secondary--text">
              <v-col cols="12" md="4" style="padding:0">
                <span class="font-weight-black">Horario:</span>
              </v-col>
              <v-col cols="12" md="8" style="padding:0">
                <span class="d-flex flex-row justify-end">
                  {{
                  onsede.horario
                  }}
                </span>
              </v-col>
            </v-row>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="acceso" text to="/">Aceptar</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import { selectSede } from '@/utils/catalogo'
export default {
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: '¡Felicitaciones, tienes tu '
    },
    subTituloAprobacion: {
      type: String,
      default: 'crédito pre-aprobado!'
    }
  },
  data() {
    return {
      Cabecera:
        '<b>¡Gracias!<b/> <br/> No olvides recoger <br/> tu efectivo presentando <br/> tu DNI',
      dialogstate: false,
      condiciones: ''
    }
  },
  methods: {
    cierramodal() {
      this.$store.commit('express/SET_DIALOG', false)
    },
    async enviasede() {
      await this.$store.dispatch('express/updateProspecto', {
        placa: this.datos.placa,
        documento: this.datos.documento,
        codigoProspecto: this.datos.codigoProspecto,
        codigoProducto: this.datos.codigoProducto,
        estadoProspecto: this.datos.estadoProspecto,
        sede: this.datos.sede
        /*         importeFinanciar: this.condiciones['prestamo'] ,
        cuotas: this.condiciones['plazo'],
        importeCuotas: this.condiciones['cuota'],
        tasa: this.condiciones['tcea'] */
      })
      this.dialogstate = true
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    onsede() {
      const direccion = null

      const abc = selectSede.filter((e) => e.id === this.datos.sede)
      return abc[0]
    },

    nombres() {
      return this.datos.nombres
    },
    selectSede() {
      return selectSede
    },
    MontoPrestamo() {
      if (this.datos.anioFabricacion < 2000) {
        return { prestamo: 1500, plazo: 18, cuota: 270, tcea: 0.4 }
      } else if (this.datos.sitCrediticia) {
        return { prestamo: 1500, plazo: 17, cuota: 271, tcea: 0.5 }
      } else {
        return { prestamo: 3500, plazo: 16, cuota: 272, tcea: 0.6 }
      }
    }
  },
  created() {
    this.$store.commit('express/UPDATE_DATOS', { sede: 1 })
  },
  mounted() {
    this.$ga.event('Prospecciones', 'ProcesoAprobacion')
    this.condiciones = this.MontoPrestamo
    /*       {
        label: 'Préstamo',
        value: this.MontoPrestamo
      },
      { label: 'Plazo', value: '18 meses' },
      { label: 'Cuota', value: '270 Soles' },
      { label: 'TCEA', value: '23%' }
    ] */
  }
}
</script>
