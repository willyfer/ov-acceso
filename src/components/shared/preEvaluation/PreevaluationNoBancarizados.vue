<template>
  <v-col id="ldForm" class="crLayoutForm" :style="backgroundStyle">
    <div class="mainForm">
      <div class="headerLayout" :style="bg">
        <h2 class="white--text text-center">{{ tituloCabecera }}</h2>
        <h2 class="headerLayout---subtitle white--text text-center">
          {{ subtituloCabecera }}
        </h2>
      </div>
      <div class="cr-column-right pa-2">
        <v-form
          ref="form"
          autocomplete="nope"
          class="pa-2 pa-sm-4 pa-lg-5"
          @submit.prevent="sendRabbit"
        >
          <v-row dense>
            <v-col cols="12" lg="12">
              <h3 class="ld-h2-title-form" :class="`${color}--text`">
                Completa tus datos
              </h3>
            </v-col>
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
            <v-col v-if="showfecha" cols="12">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="formatFechaNacimiento"
                    v-validate="{ required: showfecha }"
                    data-vv-delay="1000"
                    label="Fecha de nacimiento"
                    prepend-inner-icon="event"
                    :color="color"
                    solo
                    flat
                    required
                    data-vv-name="formatFechaNacimiento"
                    data-vv-as="fecha"
                    :error-messages="errors.collect('formatFechaNacimiento')"
                    maxlength="10"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="datos.fechaNacimiento"
                  locale="es"
                  max="2000-01-01"
                  min="1930-01-01"
                  no-title
                  @input="menu = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="datos.telefono"
                v-validate="
                  'required|numeric|regex:^([9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)$'
                "
                label="Número de teléfono"
                solo
                flat
                :error-messages="errors.collect('datos.telefono')"
                data-vv-name="datos.telefono"
                type="phone"
                maxlength="9"
                minlength="9"
                required
                :counter="9"
                data-vv-as="Telf."
                :color="color"
                @keypress="isNumber"
                :messages="[
                  'Ingresa el número celular que estas usando en este momento.',
                ]"
              />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="datos.terms"
                v-validate="'required'"
                required
                value="1"
                :error-messages="errors.collect('datos.terms')"
                data-vv-name="datos.terms"
                data-vv-as="Términos y condiciones"
                type="checkbox"
                :color="color"
              >
                <div slot="label" class="tyc-credinstante">
                  Acepto los
                  <a
                    slot="activator"
                    :class="color + '--text'"
                    @click="openTerms"
                    >Términos y Condiciones y las Políticas de Privacidad de
                    Datos</a
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
                :loading="loading"
                :disbaled="loading"
                :class="color"
                >Solicítalo</v-btn
              >
            </v-col>
            <v-dialog v-model="terms" max-width="700">
              <TerminosLegalesNoBancariados
                :color="color"
                @close="closeTerms"
              />
            </v-dialog>
          </v-row>
        </v-form>
      </div>
    </div>
  </v-col>
</template>
<script>
import { format, parseISO } from 'date-fns'
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'

export default {
  components: {
    TerminosLegalesNoBancariados: () =>
      import('@/components/shared/terms/TerminosLegalesNoBancariados'),
  },
  mixins: [mixins],
  props: {
    color: String,
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
      selectTipoCliente: [
        {
          id: 1,
          text: 'Particular',
        },
        {
          id: 2,
          text: 'Taxi',
        },
      ],
      duplicateDoc: false,
      showError: false,
      dialog: false,
      selectTipoDocumento: [
        {
          tipdoc: 'DNI',
          id: 1,
        },
      ],
      menu: false,
      loading: false,
      terms: false,
    }
  },
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', ['datos']),
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length > 3) {
          this.$store.commit('express/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', ''),
          })
        }
      },
    },
    documento() {
      return this.datos.documento
    },
    telefono() {
      return this.datos.telefono
    },
    codigoReferidos() {
      return this.datos.codigoReferidos
    },
    formatFechaNacimiento() {
      if (this.datos.fechaNacimiento) {
        return format(parseISO(this.datos.fechaNacimiento), 'dd/MM/yyyy')
      }
      return null
    },
    showfecha() {
      if (this.datos.tipoDocumento == 1) {
        return false
      } else {
        return true
      }
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
    backgroundStyle() {
      if (this.isCreated && this.$vuetify.breakpoint.name === 'xs') {
        return { background: this.background }
      }
    },
    bg() {
      return { background: this.background }
    },
  },
  async created() {
    this.$store.dispatch('express/resetStates')
    await this.isNewCreated()
    this.$store.commit('express/UPDATE_DATOS', {
      recorridoxDia: 3,
    })
    this.$store.commit('express/UPDATE_DATOS', {
      tipoDocumento: 1,
    })
  },
  mounted() {
    this.$ga.event('Credinstante', 'home')
    this.isCreated = true
  },
  methods: {
    async sendRabbit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event('Credinstante', 'Boton-solicitar')
          this.$fb.track('Lead')
          this.loading = true
          /* if (!this.promotor.state) {
            console.log('user')
            const token = await this.$recaptcha.execute('form')
            const isRealPerson = await this.validateCaptcha(token)
            console.log(isRealPerson)
            if (isRealPerson) {
              await this.$store.dispatch('express/preEvaluate')
              this.loading = false
            } else {
              // bot detected
              this.loading = false
              this.$store.commit('ui/SET_OPENDIALOGALERT', {
                imgModal: 'error',
                tituloModal: '¡OH!',
                msgModal:
                  'Hemos detectado una actividad sospechosa...!<br> intentalo en unos minutos',
                maxWidth: 350,
                estadoModal: true,
                isReset: false,
              })
            }
          } else {
            console.log('promotor')
            await this.$store.dispatch('express/preEvaluate')
            this.loading = false
          } */
          await this.$store.dispatch('express/preEvaluate')
          this.loading = false
        }
      })
    },
    openTerms() {
      this.terms = true
    },
    closeTerms() {
      this.terms = false
    },
  },
}
</script>
<style scoped>
.text-info__telef {
  font-size: 12px;
}

.tyc-credinstante {
  font-size: 15px;
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
  min-height: 400px;
  height: auto;
}
.headerLayout {
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 150px !important;
  display: flex !important;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
  font-size: 12px !important;
}
.headerLayout---subtitle {
  font-size: 19px !important;
  text-transform: uppercase;
}
.cr-column-right {
  border-radius: 0 0 8px 8px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;
  padding: 16px !important;
  width: 100% !important;
  min-height: 400px !important;
  height: 100%;
  background-color: #dcdcdc;
}

@media (max-width: 768px) {
  .crLayoutForm {
    padding: 16px !important;
    min-height: calc(100vh - 48px) !important;
  }
  .cr-column-right {
    padding: 16px;
    top: 24px !important;
    min-height: 400px !important;
    height: 100% !important;
  }
}
</style>

