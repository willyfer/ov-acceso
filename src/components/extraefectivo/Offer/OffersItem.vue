<template >
  <div
    class="pa-1"
    style="display: flex; align-items: center; justify-content: center"
  >
    <v-form ref="form1" autocomplete="nope">
      <v-row dense>
        <v-col>
          <v-hover>
            <template v-slot="{ hover }">
              <v-card
                :color="item.color"
                class="card-ofertas"
                :elevation="hover ? 24 : 6"
                @click.prevent="
                  verMas(
                    item.placa,
                    item.importeDesembolso,
                    item.importeCuotas,
                    item.cuotas,
                    item.importeFinanciar,
                    item.deudaVigente,
                    item.factorRecaudo,
                    item.tasa,
                    item.importePagoCredito
                  )
                "
                min-height="100"
              >
                <div class="d-flex flex-no-wrap">
                  <v-row>
                    <v-col cols="3" lg="4" md="4" sm="4">
                      <v-avatar class="ma-3" size="80">
                        <v-flex
                          style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                        >
                          <v-img
                            :src="require('@/assets/BT-1.png')"
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            "
                          ></v-img>
                        </v-flex>
                      </v-avatar>
                    </v-col>
                    <v-col
                      cols="9"
                      lg="8"
                      md="8"
                      sm="8"
                      class="d-flex flex-column justify-center"
                    >
                      <div class="card-text pl-2">
                        <v-card-text style="line-height: 70%; font-size: 0.8em">
                          <div>
                            <p style="color: #ff7729">
                              <strong
                                >Monto a Financiar: S/
                                {{
                                  item.importeFinanciar
                                    ? item.importeFinanciar.toLocaleString(
                                        'en',
                                        {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }
                                      )
                                    : '0.00'
                                }}
                              </strong>
                            </p>
                            <p>
                              Cuota Mensual: S/
                              {{
                                item.importeCuotas
                                  ? item.importeCuotas.toLocaleString('en', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })
                                  : '0.00'
                              }}
                            </p>
                            <p>Plazo: {{ item.cuotas }} meses</p>
                          </div>
                        </v-card-text>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  $_veeValidate: {
    validator: 'new',
  },
  props: ['color'],
  computed: {
    ...mapGetters('users', ['promotor']),
    ...mapGetters('extraefectivo', ['datos']),
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    onSelect: {
      type: Object,
    },
  },
  data() {
    return {
      loader: null,
      loading: false,

      showMore: true,
      moreDetail: false,
      selectOferta: false,
      disableButton: true,
      alignment: null,
      activeBtn: '1',
      datosOFerta: {
        placa: '',
        desembolso: '',
        cuotaMensual: '',
        plazo: '',
        maf: '',
        cancCred: '',
        factorRecaudo: '',
        TCEA: '',
        state: true,
      },
    }
  },

  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      this.loader = null
    },
  },
  methods: {
    verMas(
      placa,
      desembolso,
      cuotaMensual,
      plazo,
      maf,
      cancCred,
      factorRecaudo,
      TCEA,
      importePagoCredito
    ) {
      console.log("currentComponentItem: ", this.currentComponent)
      this.datosOFerta.placa = placa
      this.datosOFerta.desembolso = desembolso
      this.datosOFerta.cuotaMensual = cuotaMensual
      this.datosOFerta.plazo = plazo
      this.datosOFerta.maf = maf
      this.datosOFerta.cancCred = cancCred
      this.datosOFerta.factorRecaudo = factorRecaudo
      this.datosOFerta.TCEA = TCEA
      this.datosOFerta.importePagoCredito = importePagoCredito

      this.$emit('verMas', this.datosOFerta)
    },
  },
}
</script>
<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
.btn-continuar {
  margin-top: 20px;
}
.footer-card-text {
  text-align: center;
  padding-bottom: 5px;
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

.card-text {
  color: #000000;
  margin-left: 5px;
  line-height: 1px !important;
  padding-top: 10px;
}
.class-condiciones {
  font-size: 12px;
  color: red;
}
.card-ofertas {
  list-style: none !important;
  border: 1px solid #eeeeee !important;
  border-radius: 15px !important;
}
.v-card {
  box-shadow: none !important;
}

#ofertas {
  background-color: #eeeeee;
  border-radius: 5%;
  padding: 0px;
}

#btnshow {
  margin: 10px;
  text-decoration: none;
}

.ofertaSeleccionada {
  box-shadow: 2px 2px 10px #666 !important;
}

.card-ofertasseleccionada {
  list-style: none !important;
  border: 1px solid rgb(228, 223, 223) !important;
  border-radius: 15px !important;
  box-shadow: 2px 2px 10px #666 !important;
}

#tarjetas {
  cursor: pointer;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px !important;
}

.container {
  width: 100% !important;
}
</style>
