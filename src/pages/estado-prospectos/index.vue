<template>
  <v-container>
    <v-layout column justify-center align-center fill-height>
      <v-flex xs="12" sm="8" md="6" class="d-flex flex-column justify-center">
        <v-card class="mt-2">
          <v-card-title class="font-weight-black"
            >Resumen Prospectos</v-card-title
          >
          <v-card-text class="d-flex flex-row justify-center">
            <v-col
              v-for="line in contador"
              :key="line.id"
              md="2"
              class="d-flex flex-row justify-center"
            >
              <v-row class="d-flex flex-row justify-center">
                <v-col style="padding:0">
                  <span class="body secondary--text font-weight-black">
                    {{ line.estado }}
                  </span>
                </v-col>
                <v-col class="text-center" style="padding:0">
                  <span class="body font-weight-black">
                    {{ line.cantidad }}
                  </span>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
        <v-card class="mt-2">
          <v-card-title class="font-weight-black">
            Prospectos
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar Prospecto"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            :items-per-page="5"
            :search="search"
          >
            <template v-slot:item.action="{ item }">
              <div v-if="item.co_estado === '3'">
                <v-icon color="green lighten-2" small @click="editItem(item)"
                  >description</v-icon
                >
              </div>
            </template>
          </v-data-table>
          <v-data-table
            v-if="loadingTabla"
            item-key="name"
            class="elevation-1"
            loading
            loading-text="Loading... Please wait"
          ></v-data-table>
        </v-card>
        <v-dialog
          v-model="observadosModal"
          hide-overlay
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
              <v-dialog
                v-model="dialogloader"
                hide-overlay
                persistent
                width="300"
              >
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
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
export default {
  layout: 'MainLayout',
  middleware: 'authenticated',
  mixins: [mixins],
  data() {
    return {
      dialogloader: false,
      observadosModal: false,
      documentosObservados: [],
      loadingTabla: false,
      search: '',
      contador: [],
      estados: [
        { id: 1, label: 'Pendiente:' },
        { id: 2, label: 'Rechazado:' },
        { id: 3, label: 'Observado:' },
        { id: 4, label: 'Aprobado:' },
        { id: 5, label: 'Desembolso:' },
        { id: 6, label: 'Activado:' }
      ],
      headers: [
        { text: 'Nombres', value: 'no_nombre', width: 150 },
        { text: 'N° Documento', value: 'documento', width: 150 },
        { text: 'Placa', value: 'placa', width: 150 },
        { text: 'Telefono', value: 'telefono', width: 150 },
        { text: 'Fecha Activación', value: 'fe_activa', width: 150 },
        { text: 'Importe a Financiar', value: 'im_financ', width: 150 },
        { text: 'Estado', value: 'estadoProspecto', width: 150 }
        /*       {
          text: 'Detalle',
          value: 'action',
          sortable: false,
          width: 150
        } */
      ],
      desserts: []
    }
  },
  computed: {
    ...mapState('users', ['promotor'])
  },
  mounted() {
    this.listaProspectos()
  },
  methods: {
    editItem(item) {
      this.documentosObservados = []
      console.log(item)
      this.observadosModal = true
      this.obtenerObservados(item.co_evalua)
    },
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
    async listaProspectos() {
      this.loadingTabla = true
      const response = await this.$axios({
        url: '/v4/prospecto/v2.0/lista',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH
        },
        data: {
          codigoUsuario: this.promotor.codigoUsuario,
          documento: null,
          placa: null
        }
      })
      console.log(response)
      const obj = []
      this.desserts = response.data.lista
      this.estados.forEach((element) => {
        const elFiltrados = this.desserts.filter((val) => {
          return val.co_estado == element.id
        })
        obj.push({
          estado: element.label,
          cantidad: elFiltrados.length
        })
      })
      console.log('OBJETO', obj)
      this.contador = obj
      setTimeout(() => {
        this.loadingTabla = false
      }, 1000)
    }
  }
}
</script>
