<template>
  <v-col id="ldForm" class="crLayoutForm" :style="backgroundStyle">
    <div class="mainForm">
      <div class="headerLayout" :style="bg">
        <h2 class="white--text text-center">{{ tituloCabecera }}</h2>
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
              <h3 class="text-caption" :class="`${color}--text`">
                Si eres mayor de edad y no cuentas con deudas mayores a 2500
                soles puedes pedir tu crédito para adquirir un equipo "Nombre
                del equipo"
              </h3>
            </v-col>
            <v-col cols="12" no-gutters>
              <v-text-field
                v-model="form.dni"
                v-validate="'required|digits:' + 8"
                :maxlength="8"
                :minlength="8"
                :error-messages="errors.collect('form.dni')"
                solo
                flat
                label="Número de Documento (DNI)"
                data-vv-name="form.dni"
                required
                data-vv-as="Documento"
                :counter="8"
                type="tel"
                :color="color"
                @keypress="isNumber"
              />
            </v-col>
            <v-col cols="12" class="mb-2">
            </v-col>
             <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="form.phone"
                v-validate="
                  'required|numeric|regex:^([9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]+)$'
                "
                label="Número de teléfono"
                solo
                flat
                :error-messages="errors.collect('form.phone')"
                data-vv-name="form.phone"
                type="phone"
                maxlength="9"
                minlength="9"
                required
                :counter="9"
                data-vv-as="Telf."
                :color="color"
                :messages="[
                  'Ingresa el número celular que estas usando en este momento.',
                ]"
                @keypress="isNumber"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                v-validate="'required|email|max:50|min:6'"
                label="Correo Electrónico"
                data-vv-as="email"
                type="email"
                :maxlength="50"
                :counter="50"
                data-vv-name="form.email"
                required
                solo
                flat
                :error-messages="errors.collect('form.email')"
                :color="color"
              />
            </v-col>

            <v-col cols="12">
              <v-checkbox
                v-model="form.terms"
                v-validate="'required'"
                required  
                :error-messages="errors.collect('form.terms')"
                data-vv-name="form.terms"
                data-vv-as="Términos y condiciones"
                type="checkbox"
                :color="color"   
      value="1" 
      
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
               
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                class="ld-btn"
                type="submit"
                :color="color"
                :loading="loading"
                :disbaled="loading"
                :class="color"
                >Solicítalo
              </v-btn>
            </v-col>
            <!--<v-dialog v-model="terms" persistent max-width="700">
              <TerminosCondiciones
                :color="color"
                :titulo-cabecera="tituloCabeceraT"
                :contenido="contenidoTyC"
              />
            </v-dialog>-->
          </v-row>
        </v-form>
      </div>
    </div>
  </v-col>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
import { CONTENIDO_TYC } from '@/enums/celulares-enums.js'

import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'

export default {
  components: {
    TerminosCondiciones: () =>
      import('@/components/shared/terms/TerminosCondiciones'),
  },
  mixins: [mixins],
  props: {
    color: String,
    background: { type: String, default: 'orange' },
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?',
    },
  },
  data() {
    return {
      isCreated: false,
      form:{
        dni:'',
        email: '',
        phone:'',
        terms:null

      },
      showError: false,
      dialog: false,
      menu: false,
      loading: false,
      tituloCabeceraT:'<div style="padding-left: 10px">TÉRMINOS Y CONDICIONES</div>',
      contenidoTyC: CONTENIDO_TYC,
    }
  },
  computed: {
    //...mapState('default', ['terms','datos']),
    ...mapGetters('celulares', ['currentComponent', "productCode", "estadoProspecto"]),
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
    // this.$store.dispatch('celulares/resetStates')
    // await this.isNewCreated()
    // this.$store.commit('celulares/UPDATE_DATOS', {
    //   recorridoxDia: 3,
    // })
    // this.$store.commit('celulares/UPDATE_DATOS', {
    //   tipoDocumento: 1,
    // })
  },
  mounted() {
    this.$ga.event('celulares', 'home')
    this.isCreated = true;

  },
  methods: {
    async sendRabbit() {
       
       this.$validator.validateAll().then(async (result) => {
         //if (this.$refs.form.validate()) {
          if(result){
          this.loading = true
           await this.$store.dispatch('celulares/preEvaluate', this.form)
        
           this.$emit('send-preevaluation') 
          this.loading = false
        }
      })
    },
    openTerms() {
      this.$store.commit('default/UPDATE_MODAL_TERMS', true)
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
  min-height: 500px;
  height: auto;
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
  min-height: 500px !important;
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
    min-height: 500px !important;
    height: 100% !important;
  }
}
</style>
