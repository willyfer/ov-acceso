<template>
  <div class="d-flex flex-column secondary--text">
    <v-row cols="10" sm="6" md="4" class="text-center pa-3 justify-center">
      <v-col cols="10" sm="4" md="6">
        <h1>{{ cabecera }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="4" md="6">
        <v-row class="d-flex flex-column pa-2">
          <v-row
            v-for="line in formatObservaciones"
            :key="line.id"
            justify="center"
            class="d-flex flex-row secondary--text"
          >
            <v-col
              cols="2"
              md="2"
              sm="2"
              style="padding:0"
              class="d-flex flex-column justify-center"
            >
              <span class="font-weight-black">{{ line.title }}</span>
            </v-col>
            <v-col
              cols="2"
              md="2"
              sm="4"
              style="padding:0"
              class="d-flex flex-column justify-center"
            >
              <v-icon large color="primary">mdi-menu-right</v-icon>
            </v-col>
            <v-col
              cols="8"
              md="8"
              sm="4"
              style="padding:0"
              class="d-flex flex-column justify-center"
            >
              <v-row>
                <v-col
                  style="padding:0"
                  class="d-flex flex-column justify-center"
                >
                  <span class="pl-4">{{ line.texto }}</span>
                </v-col>
              </v-row>
              <v-divider color="orange"></v-divider>
            </v-col>
          </v-row>
          <!--           <v-row justify="center" class="secondary--text">
            <v-col cols="12">
              <span class="font-weight-black">Referencia:</span>
            </v-col>
            <v-col cols="12">
              <span>{{referencia}}</span>
            </v-col>
          </v-row>
          <v-row justify="center" class="secondary--text">
            <v-col cols="12">
              <span class="font-weight-black">Horario:</span>
            </v-col>
            <v-col cols="12">
              <span>{{horario}}</span>
            </v-col>
          </v-row>-->
        </v-row>
      </v-col>
      <v-col md="0" cols="12"></v-col>
    </v-row>
    <!--     <v-row justify="center">
      <img src="@/assets/asesor.png" />
      <span
        class="d-flex flex-column justify-center subtitle-2 font-weight-black"
      >En breve un asesor se pondrá en contacto contigo</span>
    </v-row>-->
  </div>
  <!--   <v-container class="d-flex flex-column">
    <v-row>
      <v-col md="6">
        <v-row md="6" cols="6" sm="4" class="secondary--text d-flex flex-row justify-center">
          <h2>{{cabecera}}</h2>
        </v-row>
        <v-row cols="6" sm="4" class="secondary--text d-flex flex-row justify-center">
          <h3>Los motivos de observación son los siguientes:</h3>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <div v-for="line in observaciones" :key="line.id">
        <div class="row d-flex flex-row pa-2 secondary--text">
          <div class="col-sm-2 d-flex flex-column justify-center">
            <span>
              <b>{{line.title}}</b>
            </span>
          </div>
          <div class="col-sm d-flex flex-row">
            <div class="row pa-2 d-flex flex-row">
              <img src="@/assets/caret-right-solid.svg" alt srcset width="2%" />
              <div class="d-flex flex-column pa-2">
                <span class="d-flex flex-column justify-content-center pa-2">
                  <b>{{line.texto}}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>-->
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    cabecera: {
      type: String,
      default: '¡La solicitud del cliente ha sido observada!'
    }
  },
  data() {
    return {
      observaciones: []
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    cliente() {
      return this.datos.nombres
    },
    formatObservaciones() {
      if (this.observaciones) {
        const format = []
        this.observaciones.map((v) => {
          format.push({
            title:
              v.ti_evalua == 1 ? 'SBS' : v.ti_evalua == 5 ? 'SUNARP' : 'SAT',
            texto: v.no_obsres
          })
        })
        return format
      }
    }
  },
  async mounted() {
    const response = await this.$axios({
      url: `/v5/evaluacion/v2.0/politicas/?codigoEvaluacion=${this.datos.codigoEvaluacion}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: process.env.BASIC_AUTH
      }
    })
    console.log(response.data)
    const politicas = response.data.js_politi

    const observaciones = politicas.filter((v) => v.ti_reseva === 2)
    /* const observaciones = politicas */
    this.observaciones = observaciones.filter((v) => {
      if (v.ti_evalua === 1 || v.ti_evalua === 6 || v.ti_evalua === 5) return v
    })
    // console.log('all ', this.observaciones)
  }
}
</script>
