<template>
  <div class="form__container mt-5" id="solicitarlo">
    <p class="title-form text__secondary px-5">
      ¡Te ayudamos con tus deudas en otras financieras!
    </p>
    <v-row>
      <v-col cols="12">
        <div class="px-4 mb-6">
          <p class="subtitle-form text__secondary text__secondary--bold pl-1">
            Ingresa tus datos
          </p>
        </div>
        <v-form
          ref="form"
          autocomplete="nope"
          @submit.prevent="submit"
          class="px-5"
        >
          <v-row dense>
            <v-col cols="12" no-gutters>
              <v-text-field
                outlined
                dense
                v-model="documento"
                v-validate="'required|digits:' + docLen"
                :maxlength="docLen"
                :minlength="docLen"
                :error-messages="errors.collect('documento')"
                label="Número de Documento (DNI)"
                data-vv-name="documento"
                required
                data-vv-as="Documento"
                :counter="docLen"
                type="tel"
                :color="color"
                @keypress="isNumber"
                dark
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="terms"
                v-validate="'required'"
                required
                value="1"
                :error-messages="errors.collect('terms')"
                data-vv-name="terms"
                data-vv-as="Términos y condiciones"
                type="checkbox"
                :color="color"
                dark
              >
                <div slot="label" class="text__secondary term-check">
                  Acepto los
                  <a slot="activator" class="text-check" @click="openTerms"
                    >Términos y Condiciones y las Políticas de Privacidad de
                    Datos</a
                  >
                </div>
              </v-checkbox>
            </v-col>
            <v-col cols="12" class="mt-2">
              <v-btn
                class="border__btn"
                type="submit"
                :loading="loading"
                
                outlined
                color="warning"
                width="100"
              >
                Enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <p class="form__footer mt-8"></p>
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
  </div>
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
  props: ['color', 'loading'],
  data() {
    return {
      terms: null,
      isModalTerm: false,
      tipoDocumento: 1,
      documento: null,
      tituloCabeceraT:
        '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyC: `
      <p align="justify">
        Edpyme Acceso Crediticio S.A., en adelante “Acceso”, financia al Usuario Solicitante con un crédito desde S/ 1,000.00 hasta S/ 5.000.00, sujeto a previa evaluación crediticia según política de Acceso e información emitida por la SBS y/o centrales de riesgo. El plazo máximo para cancelar el crédito es de 24 meses. El monto de las cuotas estará sujeto al monto y plazo otorgado, cuyas cuotas calculadas al monto mínimo y máximo varía entre S/ 70 - S/ 575. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 80%. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Tipo de cambio referencial s/. 3.70 
        El monto otorgado será desembolsado a las cuentas señaladas por el Cliente a fin de que éste último pueda cancelar los créditos vigentes que mantenga con otra entidad financiera.
        En caso exista alguna observación con la información brindada por el Usuario Solicitante, Acceso queda facultado a comunicarle y solicitarle subsane las observaciones existentes para culminar con el proceso de aprobación del crédito, de no existir subsanación Acceso no está obligado a realizar el desembolso del crédito. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe. o puede acercarse a nuestras oficinas ubicadas en: Av. 28 de Julio 334, Jesús María Teléfono: (01) 605 5555.
      </p>
      <p align="justify">
        La información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado, aprobada mediante Resolución SBS N° 3274-2017.
      </p>
      `,
    }
  },
  computed: {
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
            documento: this.documento,
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

<style scoped>
.form__container {
  max-width: 400px;
  margin: 0 auto;
}
.form__title {
  width: 300px;
  font-size: 22px;
  margin: 0 auto;
  text-align: center;
  border-radius: 20px;
}
.form__footer {
  font-size: 0.8em;
  text-align: center;
}
.term-check {
  font-size: 13px;
}
.border__btn {
  margin-left: 10px;
  border: 1px solid #eb9434 !important;
}
.text-check {
  color: #eb9434 !important;
}
.subtitle-form {
  background: linear-gradient(
    to right,
    rgba(255, 119, 41, 1),
    rgba(255, 119, 41, 0.8),
    rgba(255, 119, 41, 0.1)
  );

  border-radius: 4px;
}
.title-form {
  font-size: 19px;
  text-transform: uppercase;
}
@media (min-width: 1024px) {
  .title-form {
    font-size: 20px;
    text-transform: uppercase;
  }
}
</style>