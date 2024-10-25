<template>
  <v-row no-gutters>
    <v-col id="ldForm" class="crLayoutForm" :style="backgroundStyle">
      <div class="mainForm">
        <div class="headerLayout text-center" :style="bg">
          <h2 class="white--text titulo-form mx-1">{{ tituloCabecera }}</h2>
        </div>
        <div class="cr-column-right pa-2">
          <v-form
            ref="form"
            autocomplete="nope"
            class="pa-2 pa-sm-4 pa-lg-5"
            @submit.prevent="submit"
          >
            <v-row dense>
              <v-col cols="12" no-gutters>
                <v-text-field
                  v-model="form.documento"
                  v-validate="'required|digits:' + docLen"
                  :maxlength="docLen"
                  :minlength="docLen"
                  :error-messages="errors.collect('form.documento')"
                  solo
                  flat
                  label="Número de Documento (DNI)"
                  data-vv-name="form.documento"
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
                    regex: /^([a-zA-Z][A-Za-z0-9][A-Za-z0-9][0-9][0-9][0-9]+)$/,
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
                  >Lo quiero</v-btn
                >
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
    <v-dialog v-model="isModalTerm" persistent max-width="700">
      <TerminosCondiciones
        :color="color"
        :isNoTratamientoDatos="true"
        :isPoliticaPrivacidad="true"
        :tituloCabecera="tituloCabeceraT"
        :contenido="contenidoTyC"
        @close="closeTerms"
      />
    </v-dialog>
  </v-row>
</template>
<script>
import { mixins } from '@/mixins/mixin.js'
export default {
  name: 'Form',
  components: {
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
  },
  mixins: [mixins],
  props: {
    color: String,
    loading: Boolean,
    background: String,
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?',
    },
    subtituloCabecera: String,
  },
  data() {
    return {
      isCreated: false,
      terms: null,
      isModalTerm: false,
      tipoDocumento: 1,
      form: {
        documento: null,
        placa: null,
      },
      tituloCabeceraT:
        '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyC: `
      <p align="justify">
      Edpyme Acceso Crediticio S.A., en adelante “Acceso”, financia a los Clientes que: cuenten con un crédito de libre disponibilidad activo, sean propietarios de un vehículo a GNV, realicen sus pagos mediante Factor Recaudo y mantengan como mínimo una cuota cancelada; con un monto de S/ 300.00 (Trescientos con 00/100 Soles), sujeto a previa evaluación crediticia según política de Acceso e información emitida por la SBS y/o centrales de riesgo. El plazo para cancelar el crédito es de 06 meses. Tasa Efectiva Anual calculada en base a 360 días: 80%. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 80 %. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Cuotas mensuales de hasta S/ 75.00. Tipo de cambio referencial s/. 3.70 
      El monto otorgado será desembolsado según las instrucciones del Cliente, de acceder al crédito, los pagos se realizarán mediante el chip de recaudo instalado en el vehículo del Cliente, a través de las cajas de Acceso o demás canales señalados en nuestra página web.
      </p>
      <p align="justify">
      En caso exista alguna observación con la información brindada por el Clientes, Acceso queda facultado a comunicarle y solicitarle subsane las observaciones existentes para culminar con el proceso de aprobación del crédito, de no existir subsanación Acceso no está obligado a realizar el desembolso del crédito. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe. o puede acercarse a nuestras oficinas ubicadas en: Av. 28 de Julio 334, Jesús María Teléfono: (01) 605 5555.
      </p>
      <p align="justify">
      La información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado, aprobada mediante Resolución SBS N° 3274-2017.
      </p>
      `,
    }
  },
  computed: {
    backgroundStyle() {
      if (this.isCreated && this.$vuetify.breakpoint.name === 'xs') {
        return { background: this.background }
      }
    },
    bg() {
      return { background: this.background }
    },
    placa: {
      get() {
        return this.form.placa ? this.form.placa : null
      },
      set(v) {
        if (v.length > 3) {
          this.form.placa = v.toUpperCase().replace('-', '')
        }
      },
    },
    docLen() {
      switch (this.tipoDocumento) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
      }
    },
  },
  methods: {
    async submit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$emit('submit', {
            documento: this.form.documento,
            placa: this.form.placa,
          })
        }
      })
    },
    openTerms() {
      this.isModalTerm = true
    },
    closeTerms() {
      this.isModalTerm = false
    },
  },
}
</script>

<style>
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

@media (min-width: 769px) and (max-width: 1024px) {
  .crLayoutForm {
    align-items: center !important;
  }
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
