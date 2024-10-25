<template>
  <div class="pa-3">
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
        lg="12"
        sm="12"
        class="d-flex flex-column justify-center"
        style="padding:4px"
      >
        <h2
          class="ld-h2-title-form display-1"
          style="font-size: 1.5em !important; color:#005092 !important"
        >
          ¡Selecciona tu nuevo préstamo!
          <v-divider></v-divider>
        </h2>
      </v-col>
    </v-row>
    <oferta-item
      v-for="item in ofertas"
      :key="item.id"
      :item="item"
      @verMas="verDetalles"
      :onSelect="onSelect"
    ></oferta-item>

    <v-dialog v-model="modalDetalles" persistent max-width="600" height="auto">
      <v-card class="ld-modal">
        <v-row class="d-flex flex-row justify-center" cols="12">
          <v-col cols="10" pa-4 sm="12" md="6">
            <v-row class="d-flex flex-column">
              <v-row>
                <v-col cols="12" class="d-flex flex-row">
                  <span class="text-center" align="center" style="color: #005092">
                    <h3>Detalles del Préstamo</h3>
                  </span>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="8" class="d-flex flex-row">
                  <span class style="font-size: 12px; color: rgb(0, 80, 146)">Monto a Financiar:</span>
                </v-col>
                <v-col cols="4" class>
                  <span style="font-size: 12px;float:right;color:  rgb(0, 80, 146)">S/.{{maf}}</span>
                </v-col>
              </v-row>
              <v-divider color="secondary" class="ma-0"></v-divider>

              <v-row>
                <v-col
                  cols="8"
                  class="d-flex flex-row"
                  style="padding: 0px; padding-bottom: -25px !important"
                >
                  <span
                    class
                    style="font-size: 12px; color:  rgb(0, 80, 146);margin-left: 12px"
                  >Plazos:</span>
                </v-col>
                <v-col cols="4" class style="padding: 0px">
                  <span
                    class
                    style="font-size: 12px; float: right; color:  rgb(0, 80, 146);margin-right: 15px;"
                  >{{plazo}} meses</span>
                </v-col>
              </v-row>
              <v-divider color="secondary" class="ma-0"></v-divider>

              <v-row>
                <v-col cols="8" class="d-flex flex-row" style="padding: 0px">
                  <span
                    class
                    style="font-size: 12px; color:  rgb(0, 80, 146); margin-left: 12px;"
                  >Cuota Mensual:</span>
                </v-col>
                <v-col cols="4" class style="padding: 0px">
                  <span
                    class
                    style="font-size: 12px; float: right; color:  rgb(0, 80, 146);margin-right: 15px;"
                  >S/.{{cuotaMensual}}</span>
                </v-col>
              </v-row>
              <v-divider color="secondary" class="ma-0"></v-divider>

              <v-row>
                <v-col cols="8" class="d-flex flex-row" style="padding: 0px">
                  <span
                    class
                    style="font-size: 12px; color:  rgb(0, 80, 146); margin-left: 12px;margin-right: 15px;"
                  >
                    TCEA
                    <span style="font-size: 10px">(Referencial)</span>:
                  </span>
                </v-col>
                <v-col cols="4" style="padding: 0px">
                  <span
                    style="font-size: 12px; float:right; color: rgb(0, 80, 146);margin-right: 15px;"
                  >{{(TCEA)}}%</span>
                </v-col>
              </v-row>
              <v-divider color="secondary" class="ma-0"></v-divider>

              <v-row>
                <v-col cols="8" class="d-flex flex-row" style="padding: 0px">
                  <span
                    class
                    style="font-size: 12px; color:  rgb(0, 80, 146); margin-left: 12px;margin-right: 15px;"
                  >
                    Meses de Plazo de Gracia: 
                  </span>
                </v-col>
                <v-col cols="4" style="padding: 0px">
                  <span
                    style="font-size: 12px; float:right; color: rgb(0, 80, 146);margin-right: 15px;"
                  >12 meses</span>
                </v-col>
              </v-row>

              <!-- <v-row>
                <v-col cols="12" class="d-flex flex-row">
                  <span
                    class
                    style="font-size: 12px; color:  black"
                  >Este crédito cuenta con el beneficio de asistencia médica gratuita</span>
                </v-col>
              </v-row> -->
            </v-row>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-row no-gutters>
            <v-col cols="12" order-md="2" md="7" class="text-center pa-1">
              <v-btn
                type="submit"
                class="ld-btn"
                :loading="loading"
                :color="color"
                @click.prevent="continuar"
              >¡LO QUIERO!</v-btn>
            </v-col>
            <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
              <v-btn class="ld-btn-secondary" @click="modalDetalles = false">CANCELAR</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import OfertaItem from '@/components/forms/FaeMype/OfertaItem'
import { mapState } from 'vuex'

export default {
  components: {
    OfertaItem
  },
  methods: {
    verDetalles(value) {
      try {
        /* console.log("antes esta es la oferta en detalles", JSON.stringify(this.ofertaForm))
        console.log("tipo de variable ", typeof(value))
        console.log("contenido devalue ", value) */
        this.ofertaForm ={
            codigoProducto: 14,
            tipoDocumento: 1,
        //documento: "48342422",
            canalAtencion: 2,
            origen: 0,
            canal: 1,
            codigoEntidad: 1,

            placa : value.placa,
            importeDesembolso : value.desembolso,
            importeCuotas : value.cuotaMensual,
            cuotas : value.plazo,
            importeFinanciar : value.maf,
            deudaVigente : value.cancCred,
            factorRecaudo : value.factorRecaudo,
            tasa : value.TCEA,
            importePagoCredito : value.importePagoCredito,

           /*  ...value, */
            codigoProducto : this.body_valida.codigoProducto,
            documento : this.body_valida.documento,
            codigoProspecto : this.body_valida.codigoProspecto,
            estadoProspecto : this.body_valida.estadoProspecto,
            channel : this.body_valida.channel,
        }

        //console.log("esta es la oferta en detalles", JSON.stringify(this.ofertaForm))
        this.placa = value.placa
        this.desembolso = value.desembolso.toFixed(2)
        this.cuotaMensual = value.cuotaMensual.toFixed(2)
        this.importPagoCredito = value.importePagoCredito
        this.plazo = value.plazo
        this.maf = value.maf.toFixed(2)
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
          isReset: true
        })
      }
    },
    continuar() {
      try {
        this.loading = true
       /*  this.ofertaForm.codigoProducto = this.body_valida.codigoProducto
        this.ofertaForm.documento = this.body_valida.documento
        this.ofertaForm.codigoProspecto = this.body_valida.codigoProspecto
        this.ofertaForm.estadoProspecto = this.body_valida.estadoProspecto
        this.ofertaForm.channel = this.body_valida.channel, */




        /* this.ofertaForm.cuotas = this.ofertas[0].cuotas
        this.ofertaForm.oferta = this.ofertas[0].oferta
        this.ofertaForm.placa = this.ofertas[0].placa
        this.ofertaForm.importeCuotas = this.ofertas[0].importeCuotas
        this.ofertaForm.importeDesembolso = this.ofertas[0].importeDesembolso
        this.ofertaForm.deudaVigente = this.ofertas[0].deudaVigente
        this.ofertaForm.importeFinanciar = this.ofertas[0].importeFinanciar
        this.ofertaForm.factorRecaudo = this.ofertas[0].factorRecaudo
        this.ofertaForm.tasa = this.ofertas[0].tasa
        this.ofertaForm.importePagoCredito = this.ofertas[0].importePagoCredito */

        console.log(
          'este son los detalles de la oferta',
          JSON.stringify(this.ofertaForm)
        )

        this.$store
          .dispatch('express/elegirOferta', JSON.stringify(this.ofertaForm))
          .then((res) => {
            if (res.codRes == '00') {
              this.$store.commit('express/SET_COD_EVALUACION', res)
              this.$store.commit('ui/UPDATE_STEP', 4)
            } else if (res.codRes == '99') {
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'warning',
                tituloModal: '¡Lo sentimos!',
                msgModal: 'Por favor inténtalo en unos minutos.',
                maxWidth: 350,
                estadoModal: true,
                isReset: true
              })
              setTimeout(() => {
                this.$store.commit('ui/UPDATE_STEP', 1)
              }, 4000)
            }
          })
          .catch((err) => {
            throw new Error(err.message)
          })
          .finally(() => {
            this.loading = false
          })
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
    }
  },
  props: ['color'],
  computed: {
    ...mapState('express', ['ofertas', 'body_valida'])
  },
  mounted(){

  },
  data() {
    return {
      modalDetalles: false,
      onSelect: { placa: null },
      oferta2: {},
      items: [
        {
          id: '1111',
          color: '#f3f3f3',
          src: require('@/assets/BT-1.png'),
          placa: `DEF-456`,
          maf: `S/ 8,000.00`,
          cancCred: `S/ 3,000.00 (*)`,
          desembolso: `S/ 5,000.00 (*)`,
          //cuotaDiaria: `Cuota Diaria: S/ 11`,
          cuotaMensual: `S/ 516.00`,
          factorRecaudo: `100%`,
          TCEA: `57%`,
          plazo: `24 meses`,
          show: false
        },
        {
          id: '2222',
          color: '#f3f3f3',
          src: require('@/assets/BT-1.png'),
          placa: `DEF-457`,
          maf: `S/ 6,000.00`,
          cancCred: `S/ 3,500.00 (*)`,
          desembolso: `S/ 2,500.00 (*)`,
          //cuotaDiaria: `Cuota Diaria: S/ 11`,
          cuotaMensual: `S/ 387.00`,
          factorRecaudo: ` 100%`,
          TCEA: ` 57%`,
          plazo: ` 24 meses`,
          show: false
        },
        {
          id: '3333',
          color: '#f3f3f3',
          src: require('@/assets/BT-1.png'),
          placa: `DEF-458`,
          maf: ` S/ 5,000.00`,
          cancCred: `S/ 3,000.00 (*)`,
          desembolso: ` S/ 2,000.00 (*)`,
          //cuotaDiaria: `Cuota Diaria: S/ 11`,
          cuotaMensual: `S/ 322.00`,
          factorRecaudo: `100%`,
          TCEA: `57%`,
          plazo: ` 24 meses`,
          show: false
        }
      ],
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
        codigoEntidad: 1
        //codigoPrchannelospecto: 200347,
        //estadoProspecto: 4,
        //: "5",
      }
    }
  }
}
</script>


<style >
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
