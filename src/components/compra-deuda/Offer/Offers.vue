<template>
  <div>
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
        lg="12"
        sm="12"
        style="padding: 4px"
      >
        <h2
          class="ld-h2-title-form display-1"
          style="font-size: 1.5em !important; color: #005092 !important"
        >
          ¡Selecciona tu nuevo préstamo!
          <v-divider></v-divider>
        </h2>
      </v-col>
    </v-row>
    <oferta-item
      v-for="item in datos.ofertas"
      :key="item.id"
      :item="item"
      @verMas="verDetalles"
      :onSelect="onSelect"
    ></oferta-item>

    <v-dialog v-model="modalDetalles" persistent max-width="400" height="auto">
      <v-card>
        <v-row class="mr-0 ml-0">
          <v-col cols="12" class="d-flex flex-row pb-1">
            <span class="text-center" align="center" style="color: #005092">
              <h3>Detalles del Préstamo</h3>
            </span>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center pb-1"
          >
            <div class="d-flex flex-row">
              <span style="font-size: 12px; color: rgb(0, 80, 146)"
                >Monto a Financiar:</span
              >
            </div>
            <div>
              <span
                style="font-size: 12px; float: right; color: rgb(0, 80, 146)"
                >S/ {{ maf }}</span
              >
            </div>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center pb-1"
          >
            <div>
              <span style="font-size: 12px; color: rgb(0, 80, 146)"
                >Plazos:</span
              >
            </div>
            <div>
              <span style="font-size: 12px; color: rgb(0, 80, 146)"
                >{{ plazo }} meses</span
              >
            </div>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center pb-1"
          >
            <div>
              <span style="font-size: 12px; color: rgb(0, 80, 146)"
                >Cuota Mensual:</span
              >
            </div>
            <div>
              <span style="font-size: 12px; color: rgb(0, 80, 146)"
                >S/ {{ cuotaMensual }}</span
              >
            </div>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-space-between align-center pb-1"
          >
            <div>
              <span class style="font-size: 12px; color: rgb(0, 80, 146)">
                TCEA
                <span style="font-size: 10px">(Referencial)</span>:
              </span>
            </div>
            <div>
              <span style="font-size: 12px; color: rgb(0, 80, 146)"
                >{{ TCEA }}%</span
              >
            </div>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row no-gutters>
            <v-col cols="12" xs="6" class="mb-2">
              <v-btn
                type="submit"
                class="btn-primary"
                :loading="loading"
                :color="color"
                @click.prevent="continuar"
                >¡LO QUIERO!</v-btn
              >
            </v-col>
            <v-col cols="12" xs="6" class="mb-2">
              <v-btn class="btn-secondary" @click="modalDetalles = false"
                >CANCELAR</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import OfertaItem from '@/components/compra-deuda/Offer/OffersItem'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import { mapGetters } from 'vuex'

export default {
  components: {
    OfertaItem,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
    color: { type: String, default: null },
  },
  mixins: [actionsByCodeMixin],
  methods: {
    verDetalles(value) {
      try {
        /* console.log("antes esta es la oferta en detalles", JSON.stringify(this.ofertaForm))
        console.log("tipo de variable ", typeof(value))
        console.log("contenido devalue ", value) */
        this.ofertaForm = {
          codigoProducto: 14,
          tipoDocumento: 1,
          //documento: "48342422",
          canalAtencion: 2,
          origen: 0,
          canal: 1,
          codigoEntidad: 1,

          placa: value.placa,
          importeDesembolso: value.desembolso,
          importeCuotas: value.cuotaMensual,
          cuotas: value.plazo,
          importeFinanciar: value.maf,
          deudaVigente: value.cancCred,
          factorRecaudo: value.factorRecaudo,
          tasa: value.TCEA,
          importePagoCredito: value.importePagoCredito,

          /*  ...value, */
          codigoProducto: this.datos.codigoProducto,
          documento: this.datos.documento,
          codigoProspecto: this.datos.codigoProspecto,
          estadoProspecto: this.datos.estadoProspecto,
          channel: this.datos.channel,
        }

        //console.log("esta es la oferta en detalles", JSON.stringify(this.ofertaForm))
        this.placa = value.placa
        this.desembolso = value.desembolso.toFixed(2)
        this.cuotaMensual = value.cuotaMensual
          ? value.cuotaMensual.toLocaleString('en', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '0.00'
        this.importPagoCredito = value.importePagoCredito
        this.plazo = value.plazo
        this.maf = value.maf
          ? value.maf.toLocaleString('en', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : '0.00'
        this.cancCred = value.cancCred.toFixed(2)
        this.factorRecaudo = parseInt(value.factorRecaudo * 10000, 10) / 100 //((0.76569*100)).toFixed(2), //((value.factorRecaudo)*100).toFixed(2)
        this.TCEA = parseInt(value.TCEA * 10000, 10) / 100
        //this.TCEA = (this.TCEA * 100).toFixed(2)
        this.modalDetalles = value.state
        this.onSelect = value
      } catch (err) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal: err.message,
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
    async continuar() {
      try {
        console.log("currentComponent: ", this.currentComponent)
        this.loading = true
        await this.$store.dispatch(
          'compra-deuda/actionElegirOferta',
          this.ofertaForm
        )
        this.analyzeProspectStatus()
        this.loading = false
      } catch (err) {
        console.log("continuar: ", err)
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal: err.message,
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
  },
  computed: {
    ...mapGetters('users', ['productCode']),
    ...mapGetters('compra-deuda', ['datos', 'estadoProspecto']),
  },
  mounted() {},
  data() {
    return {
      modalDetalles: false,
      onSelect: { placa: null },
      oferta2: {},
      loading: false,
      maf: '',
      cancCred: '',
      factorRecaudo: '',
      TCEA: '',
      placa: '',
      desembolso: '',
      cuotaMensual: '',
      importPagoCredito: '',
      plazo: '',
      ofertaForm: {
        //codigoProducto: 14,
        tipoDocumento: 1,
        //documento: "48342422",
        canalAtencion: 2,
        origen: 0,
        canal: 1,
        codigoEntidad: 1,
        //codigoPrchannelospecto: 200347,
        //estadoProspecto: 4,
        //: "5",
      },
    }
  },
}
</script>


<style scoped>
.btn-primary {
  width: 100%;
  color: white !important;
  font-weight: bold;
}
.btn-secondary {
  width: 100%;
  color: white !important;
  font-weight: bold;
  background-color: #808080 !important;
}
.v-application .secondary--text-detalles {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 30px;
}

.separation_pla {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 190px;
}

.separation_m {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 115px;
}

.separation_d {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 135px;
}

.separation_ca {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 80px;
}

.separation_plaz {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 185px;
}

.separation_imp_crd {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 110px;
}

.separation_cu {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 135px;
}

.separation_t {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 195px;
}

.separation_f {
  color: #005092 !important;
  caret-color: #005092 !important;
  margin-left: 140px;
}
.sangria {
  color: red;
  margin-left: 10px;
}
</style>
