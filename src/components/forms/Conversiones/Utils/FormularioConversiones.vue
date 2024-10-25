<template>
  <v-form ref="formConversiones" autocomplete="nope" @submit.prevent="submit">
    <v-row dense class="px-5">
      <v-col cols="12">
        <h2 class="ld-h2-title-form" :class="`${color}--text`">{{ title }}</h2>
      </v-col>
      <v-col cols="12" lg="12">
        <h3 class="ld-h2-title-form" :class="`${color}--text`">
          Completa tus datos
        </h3>
      </v-col>
      <v-col cols="12">
        <v-select
          solo
          flat
          v-model="evaluacionDatos.tipoDocumento"
          v-validate="'required'"
          :items="selectTipoDocumento"
          item-text="tipdoc"
          item-value="id"
          :error-messages="errors.collect('evaluacionDatos.tipoDocumento')"
          placeholder="Tipo de documento"
          data-vv-name="evaluacionDatos.tipoDocumento"
          data-vv-as="Tipo"
          :color="color"
          background-color="white"
          readonly
          required
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          solo
          flat
          v-model="evaluacionDatos.documento"
          v-validate="'required|digits:' + docLen"
          :maxlength="docLen"
          :minlength="docLen"
          :error-messages="errors.collect('evaluacionDatos.documento')"
          placeholder="Número de documento"
          background-color="white"
          data-vv-name="evaluacionDatos.documento"
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
          solo
          flat
          v-model="maskPlaca"
          v-validate="{
            required: true,
            regex: /^([a-zA-Z][A-Za-z0-9][A-Za-z0-9][0-9][0-9][0-9]+)$/,
          }"
          v-mask="'AXX-XXX'"
          onkeyup="this.value = this.value.toUpperCase();"
          placeholder="Placa"
          background-color="white"
          data-vv-as="placa"
          data-vv-name="maskPlaca"
          required
          :error-messages="errors.collect('maskPlaca')"
          :color="color"
          maxlength="7"
          minlength="7"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          solo
          flat
          v-model="evaluacionDatos.categoriaVehiculo"
          v-validate="'required'"
          :items="itemsCategoriaVehiculo"
          item-text="name"
          item-value="id"
          :error-messages="errors.collect('evaluacionDatos.categoriaVehiculo')"
          placeholder="Categoría de vehículo"
          background-color="white"
          data-vv-name="evaluacionDatos.categoriaVehiculo"
          data-vv-as="Categoría de vehículo"
          :color="color"
          required
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          solo
          flat
          v-model="evaluacionDatos.telefono"
          v-validate="'required|numeric|max:9|min:9'"
          placeholder="Número de celular"
          background-color="white"
          :error-messages="errors.collect('evaluacionDatos.telefono')"
          data-vv-name="evaluacionDatos.telefono"
          type="tel"
          :maxlength="9"
          required
          data-vv-as="Telf."
          :color="color"
          @keypress="isNumber"
        />
      </v-col>
      <v-col cols="12" v-if="isSelectTaller">
        <v-select
          solo
          flat
          v-model="evaluacionDatos.tallerVehicular"
          v-validate="'required'"
          :items="itemsTallerVehicular"
          item-text="name"
          item-value="id"
          :error-messages="errors.collect('evaluacionDatos.tallerVehicular')"
          placeholder="Taller Vehicular"
          background-color="white"
          data-vv-name="evaluacionDatos.tallerVehicular"
          data-vv-as="Taller Vehicular"
          :color="color"
          required
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="evaluacionDatos.email"
          v-validate="'email|max:50|min:6'"
          solo
          flat
          label="Correo electrónico (Opcional)"
          :error-messages="errors.collect('evaluacionDatos.email')"
          data-vv-name="evaluacionDatos.email"
          type="email"
          :maxlength="50"
          :counter="50"
          data-vv-as="email"
          :color="color"
        />
      </v-col>
      <v-col cols="12">
        <v-radio-group
          v-model="evaluacionDatos.codigoProducto"
          v-validate="'required'"
          required
          :error-messages="errors.collect('evaluacionDatos.codigoProducto')"
          data-vv-name="evaluacionDatos.codigoProducto"
          data-vv-as="Tipo de producto"
          class="my-0"
        >
          <template v-slot:label>
            <div>
              ¿
              <strong>Qué tipo de producto</strong> desea elegir?
            </div>
          </template>
          <div v-for="producto in arrayProductos" :key="producto.codigo">
            <v-radio :value="producto.codigo" class="mt-2">
              <template v-slot:label>
                <div>{{ producto.name }}</div>
              </template>
            </v-radio>
          </div>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="datos.terminosCondiciones"
          v-validate="'required'"
          required
          value="1"
          :error-messages="errors.collect('datos.terminosCondiciones')"
          data-vv-name="datos.terminosCondiciones"
          data-vv-as="Terminos y condiciones"
          type="checkbox"
          :color="color"
        >
          <div slot="label">
            Acepto los
            <a slot="activator" :class="color + '--text'" @click="openTerms"
              >Términos y Condiciones</a
            >
          </div>
        </v-checkbox>
      </v-col>
      <v-col cols="12">
        <span v-if="showError" class="body-2 red--text"
          >*Completa todos los campos por favor</span
        >
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn
          class="ld-btn"
          type="submit"
          :color="color"
          :loading="loadingEvaluacion"
          :disbaled="loadingEvaluacion"
          :class="color"
          >Solicítalo</v-btn
        >
      </v-col>
      <v-dialog v-model="terms" persistent max-width="700">
        <TerminosCondiciones
          :tituloCabecera="tituloCabeceraModal"
          :contenido="contenidoTyCModal"
          :color="color"
          :isNoTratamientoDatos="true"
          :isPoliticaPrivacidad="true"
        />
      </v-dialog>
    </v-row>
  </v-form>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import {
  selectCategoriaVehiculo,
  selectTallerVehicular,
} from '@/utils/catalogo'

export default {
  name: 'FormularioConversiones',
  components: {
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
  },
  mixins: [mixins],
  props: ['color', 'title'],
  data() {
    return {
      showError: false,
      dialog: false,
      tituloCabeceraModalNoFISE:
        '<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyCModalNoFISE: `<div style="padding-left: 10px">
        <p style="text-align: justify">
            Edpyme Acceso Crediticio S.A., en adelante “Acceso”, financia al Usuario Solicitante que sea propietario de un vehículo automotor, como requisito principal, con un crédito de hasta S/ 4.000.00, sujeto a previa evaluación crediticia según política de Acceso e información emitida por la SBS y/o centrales de riesgo. Los plazos para cancelar el crédito son de 12, 24 y 36 meses. El monto de las cuotas estará sujeto al monto y plazo otorgado, las cuales calculado a un monto de S/4,000.00 a un plazo máximo y mínimo, varía entre S/ 180 – S/ 425. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 30%. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Tipo de cambio referencial s/. 3.70 
            El monto otorgado será desembolsado a las cuentas del Taller elegido por el Usuario Solicitante, de otorgársele el crédito, los cobros se realizarán mediante el chip de recaudo instalado en el vehículo del Usuario Solicitante.
            En caso exista alguna observación con la información brindada por el Usuario Solicitante, Acceso queda facultado a comunicarle y solicitarle subsane las observaciones existentes para culminar con el proceso de aprobación del crédito, de no existir subsanación Acceso no está obligado a realizar el desembolso del crédito. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe. o puede acercarse a nuestras oficinas ubicadas en: Av. 28 de Julio 334, Jesús María Teléfono: (01) 605 5555.
          </p>
          <p style="text-align: justify">
            La información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado, aprobada mediante Resolución SBS N° 3274-2017.
          </p>
        </div>`,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('conversiones', [
      'evaluacionDatos',
      'loadingEvaluacion',
      'arrayProductos',
      'isSelectTaller',
    ]),
    ...mapState('default', ['datos', 'terms']),
    ...mapState('users', ['promotor']),
    docLen() {
      switch (this.evaluacionDatos.tipoDocumento) {
        case 1:
          return 8
          break
        case 2:
          return 9
          break
      }
    },
    itemsCategoriaVehiculo() {
      return selectCategoriaVehiculo
    },
    itemsTallerVehicular() {
      return selectTallerVehicular.sort(function (a, b) {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        return 0
      })
    },
    maskPlaca: {
      get() {
        return this.evaluacionDatos.placa ? this.evaluacionDatos.placa : null
      },
      set(v) {
        if (v.length === 7) {
          this.evaluacionDatos.placa = v.toUpperCase().replace('-', '')
        }
      },
    },
    tituloCabeceraModal() {
      if (this.arrayProductos[0].codigo === 21) {
        return this.tituloCabeceraModalNoFISE
      } else {
        return null
      }
    },
    contenidoTyCModal() {
      if (this.arrayProductos[0].codigo === 21) {
        return this.contenidoTyCModalNoFISE
      } else {
        return null
      }
    },
  },
  methods: {
    openTerms() {
      this.$ga.event('Prospecto', 'Abrió Terminos y condiciones')
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset()
    },
    submit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          try {
            const dataFormulario = {
              tipoDocumento: this.evaluacionDatos.tipoDocumento,
              documento: this.evaluacionDatos.documento,
              placa: this.evaluacionDatos.placa,
              categoriaVehiculo: this.evaluacionDatos.categoriaVehiculo,
              telefono: this.evaluacionDatos.telefono,
              codigoEntidad: this.evaluacionDatos.tallerVehicular,
              email: this.evaluacionDatos.email,
              codigoProducto: this.evaluacionDatos.codigoProducto,
            }
            this.$store.dispatch('conversiones/setLoadingForm', true)
            if (!this.promotor.state) {
              const token = await this.$recaptcha.execute('formConversiones')
              const isUser = await this.validateCaptcha(token)
              if (isUser) {
                this.$emit('submit', { ...dataFormulario })
              } else {
                this.$store.commit('ui/SET_OPENDIALOGALERT', {
                  imgModal: 'warning',
                  tituloModal: '¡Lo sentimos!',
                  msgModal:
                    'Hemos detectado una actividad sospechosa, por favor inténtelo en unos minutos',
                  maxWidth: 350,
                  estadoModal: true,
                  push: '/conversion-fise',
                })
                this.$store.dispatch('conversiones/setLoadingForm', false)
                this.$store.dispatch('conversiones/resetEvaluacionDatos')
              }
            } else {
              this.$emit('submit', { ...dataFormulario })
            }
          } catch (error) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal:
                'En estos momentos no podemos evaluarte, por favor inténtelo en unos minutos',
              maxWidth: 350,
              estadoModal: true,
              push: '/conversion-fise',
            })
          }
        }
      })
    },
  },
}
</script>
