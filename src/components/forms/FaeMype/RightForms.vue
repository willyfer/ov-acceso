<template>
  <v-row no-gutters>
    <v-col id="ldForm" class="crLayoutForm" :style="backgroundStyle">
      <div class="mainForm">
        <div class="headerLayout" :style="bg">
          <h2 class="white--text">{{ tituloCabecera }}</h2>
        </div>
        <div class="cr-column-right pa-2">
          <v-form
            ref="form"
            autocomplete="nope"
            class="pa-2 pa-sm-4 pa-lg-5"
            @submit.prevent="submitLogin"
          >
            <v-row dense>
              <v-col cols="12" lg="12" align="center">
                <h3 class="ld-h2-title-form" :class="`${color}--text`">
                  {{ subtituloCabecera }}
                </h3>
              </v-col>
              <!--               <v-col cols="12">
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
              </v-col> -->
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
        </div>
      </div>
    </v-col>
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
      default: 'Ingresa tu DNI'
    },
    loading: {
      type: Boolean,
      default: false
    }
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
      ]
    }
  },
  computed: {
    ...mapState('express', ['datos']),
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
          this.$store.commit('express/UPDATE_DATOS', {
            channel: 5,
            codigoProducto: 16
          })
          this.$emit('submit', {
            channelForm: this.datos.channel,
            codigoProductoForm: this.datos.codigoProducto,
            tipoDocForm: this.datos.tipoDocumento,
            documentoForm: this.datos.documento,
            placaForm: this.datos.placa
          })
        }
      })
    }
  }
}
</script>

<style>
.crLayoutForm {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: center !important;
}

.mainForm {
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 250px;
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
  min-height: 250px !important;
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
