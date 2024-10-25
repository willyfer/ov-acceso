<template>
  <v-row no-gutters>
    <v-col id="ldForm" class="d-flex align-center" :style="backgroundStyle">
      <div class="mainForm">
        <div class="headerLayout text-center" :style="bg">
          <h2 class="white--text titulo-form mx-1">{{ tituloCabecera }}</h2>
        </div>
        <div class="cr-column-right pa-2">
          <v-form
            ref="form"
            autocomplete="nope"
            class="pa-2 pa-sm-4 pa-lg-5"
            @submit.prevent="submitLogin"
          >
            <v-row dense>
              <!-- <v-col cols="12" lg="12" align="center">
                <h3 class="ld-h2-title-form" :class="`${color}--text`">{{subtituloCabecera}}</h3>
              </v-col>-->
              <!-- <v-col cols="12">
                <v-select
                  v-model="datos.tipoDocumento"
                  v-validate="'required'"
                  solo
                  flat
                  :items="selectTipoDocumento"
                  item-text="tipdoc"
                  item-value="id"
                  :error-messages="errors.collect('datos.tipoDocumento')"
                  label="Tipo de documento"
                  data-vv-name="datos.tipoDocumento"
                  data-vv-as="Tipo"
                  :color="color"
                  required
                />
              </v-col>-->
              <v-col cols="12" no-gutters>
                <v-text-field
                  v-model="datos.documento"
                  v-validate="'required|digits:' + docLen"
                  :maxlength="docLen"
                  :minlength="docLen"
                  :error-messages="errors.collect('datos.documento')"
                  solo
                  flat
                  label="Número de Documento (DNI)"
                  data-vv-name="datos.documento"
                  required
                  data-vv-as="Documento"
                  :counter="docLen"
                  type="tel"
                  :color="color"
                  @keypress="isNumber"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="placa"
                  v-validate="{
                    required: true,
                    regex: /^([a-zA-Z][A-Za-z0-9][A-Za-z0-9][0-9][0-9][0-9]+)$/
                  }"
                  v-mask="'AXX-XXX'"
                  onkeyup="this.value = this.value.toUpperCase();"
                  label="Placa"
                  data-vv-as="placa"
                  data-vv-name="placa"
                  required
                  solo
                  flat
                  :error-messages="errors.collect('placa')"
                  :color="color"
                  maxlength="7"
                  minlength="7"
                />
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn
                  class="ld-btn"
                  type="submit"
                  :color="color"
                  :loading="loading"
                  :class="color"
                >Lo quiero</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <div>
            <p>
              <a href="#" @click="openTerms">Terminos y condiciones</a>
            </p>
          </div>
        </div>
      </div>
    </v-col>
    <v-dialog v-model="terms" persistent max-width="700">
      <TerminosCondiciones
        :color="color"
        :isNoTratamientoDatos="true"
        :tituloCabecera="tituloCabeceraModal"
        :contenido="contenidoTyCModal"
      />
    </v-dialog>
  </v-row>
</template>
<script>
import { mixins } from '@/mixins/mixin.js'
import { mapState, mapActions } from 'vuex'
export default {
  mixins: [mixins],
  props: {
    color: String,
    background: String,
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?'
    },
    subtituloCabecera: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TerminosCondiciones: () => import('@/components/shared/terms/TerminosCondiciones')
  },
  data() {
    return {
      isCreated: false,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1
        },
        {
          tipdoc: 'CE',
          id: 2
        }
      ],
      tituloCabeceraModal:
        '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyCModal: `<div style="padding-left: 10px">
        <p style="text-align: justify">
            Edpyme Acceso Crediticio S.A., en adelante “Acceso”, financia a sus Clientes con un monto que oscila entre s/. 1,300.00 – s/. 7,500.00 soles, sujeto a previa evaluación crediticia, la cual consiste en que el cliente deberá tener un vehículo convertido a GNV (se verificará la titularidad del vehículo, año de fabricación, entre otros) así como también, la evaluación del perfil del cliente y la información emitida por la SBS. Aplica para clientes que mantengan un crédito vigente con Acceso. Si en el caso de que el cliente tuviese la condición de casado, el mismo no necesitará la firma de su cónyuge para suscribir el financiamiento. El plazo para cancelar el crédito puede variar entre 12 – 24 meses de acuerdo al préstamo otorgado. El monto de las cuotas varía entre s/. 154.00 a s/. 491.00, lo cual estará sujeto al monto otorgado. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 40% - 50%. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Tipo de cambio referencial s/. 3.45 Dicha información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducto de Mercado, aprobado mediante Resolución SBS N° 3274-2017. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe.
          </p>
          <p style="text-align: justify">
            <span>
              Más información en
              <a
                href="https://www.acceso.com.pe"
                target="_blank"
              >www.acceso.com.pe</a>
            </span>
            <span class="pl-1">Dirección: Av. 28 de Julio 334, Jesús María</span>
            <span class="pl-1">Teléfono: (01) 605 5555</span>
          </p>
        </div>`
    }
  },
  computed: {
    ...mapState('express', ['datos']),
    ...mapState('default', ['terms']),
    backgroundStyle() {
      if (this.isCreated && this.$vuetify.breakpoint.name === 'xs') {
        return { background: this.background }
      }
    },
    bg() {
      return { background: this.background }
    },
    docLen() {
      switch (this.datos.tipoDocumento) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
      }
    },
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length > 3) {
          this.$store.commit('express/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', '')
          })
        }
      }
    }
  },

  mounted() {
    this.isCreated = true
    this.$store.commit('express/UPDATE_DATOS', {
      tipoDocumento: 1
    })
  },
  methods: {
    async submitLogin() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$emit('submit', {
            tipoDocumento: 1,
            codigoProducto: 13,
            channel: 14,
            origen: 9,
            documento: this.datos.documento,
            placa: this.datos.placa
          })
        }
      })
    },
    openTerms() {
      /*       this.$ga.event('Prospecto', 'Abrió Terminos y condiciones') */
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    }
  }
}
</script>

<style scoped>
.titulo-form {
  font-size: 1.4em;
}
.crLayoutForm {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.mainForm {
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 350px;
  height: auto;
  margin: 15px;
}
.headerLayout {
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 72px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.cr-column-right {
  border-radius: 0 0 8px 8px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;
  padding: 16px !important;
  width: 100% !important;
  min-height: 300px !important;
  height: 100%;
  background-color: #dcdcdc;
}
.headerH3 {
  font-size: 18px;
  color: white;
}

.headerBtn {
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: bold !important;
  padding: 0px !important;
  margin: 0px 5px !important;
  text-decoration: underline !important;
}

@media (max-width: 768px) {
  .crLayoutForm {
    align-items: center !important;
    padding: 16px !important;
    min-height: calc(100vh - 48px) !important;
  }
  .cr-column-right {
    padding: 16px;
    top: 24px !important;
    min-height: 300px !important;
    height: 100% !important;
  }
}
</style>
