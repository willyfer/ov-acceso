<template>
  <div class="pa-3">
    <v-form ref="form1" autocomplete="nope" @submit.prevent="actualizarProspecto">
      <v-row dense class="d-flex flex-column">
        <v-dialog v-model="loginModalExpediente" persistent max-width="380" height="auto">
          <form autocomplete="nope" @submit.prevent="loginExpediente">
            <v-card class="ld-modal">
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" class="text-center pa-2">
                    <h4 class="ld-modal-title" :class="color + '--text'">Ingrese su información</h4>
                  </v-col>
                  <v-col cols="12" class="text-center">
                    <v-text-field
                      outlined
                      v-model="datos.documento"
                      v-validate="'required|numeric|max:9|min:8'"
                      label="Número de documento"
                      :error-messages="errors.collect('datos.documento')"
                      data-vv-name="datos.documento"
                      required
                      type="tel"
                      autofocus="autofocus"
                      maxlength="9"
                      :color="color"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      outlined
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
                      flat
                      :error-messages="errors.collect('placa')"
                      :color="color"
                      maxlength="7"
                      minlength="7"
                    />
                  </v-col>
                </v-row>
                <v-row justify="space-around" class>
                  <v-col cols="6" md="6" class="d-flex flex-column justify-center">
                    <v-btn to="/" text>ATRÁS</v-btn>
                  </v-col>
                  <v-col cols="6" md="6" class="d-flex flex-column justify-center">
                    <v-btn
                      :loading="loading4"
                      :disabled="loading4"
                      :color="color"
                      type="submit"
                      class="white--text"
                    >
                      continuar
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </form>
        </v-dialog>
        <v-col cols="12" md="12" class="text-center" mt-3>
          <v-btn class="ld-btn" :loading="loading" type="submit" :color="color">CONTINUAR</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { selectDistritoCallao, selectDistritoLima } from '@/utils/ubigeo.js'
import { getMarca, getModelo } from '@/api/catalogue'
import { listSectorEconomico } from '@/utils/catalogo'
import { mixins } from '@/mixins/mixin.js'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: ['color'],
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
            placa: v.toUpperCase().replace('-', '')
          })
        }
      }
    },
    pep: {
      get() {
        if (this.datos.pep) {
          return this.datos.pep
        }
        return false
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { pep: v })
      }
    },
    ubigeo: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo
        }
        return null
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
      }
    },
    sectorEconomico: {
      get() {
        let newVal = this.datos.sectorEconomico
        if (!newVal) {
          newVal = 28
        }
        const filterList = this.listaActividadeconomica.filter(
          (val) => val.fk === newVal
        )
        this.selectActividadeconomica = filterList
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { sectorEconomico: v })
      }
    },
    provincia: {
      get() {
        if (this.datos.ubigeo) {
          return this.datos.ubigeo.slice(0, 4)
        }
        return '1501'
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { ubigeo: v })
      }
    },
    marca: {
      get() {
        let newVal = this.datos.marca
        if (!newVal) {
          newVal = null
        }
        return newVal
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { marca: v })
      }
    },
    selectDistrito() {
      if (this.provincia === '1501') {
        return selectDistritoLima
      }
      if (this.provincia === '0701') {
        return selectDistritoCallao
      }
      return []
    },
    selectSectoreconomico() {
      return listSectorEconomico
    },
    actividadEconomica: {
      get() {
        if (this.datos.actividadEconomica) {
          return this.datos.actividadEconomica
        } else {
          return 357
        }
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { actividadEconomica: v })
      }
    },
    estadoCivil: {
      get() {
        if (this.datos.estadoCivil) {
          return this.datos.estadoCivil
        }
        return 'SO'
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { estadoCivil: v })
      }
    },
    profesion: {
      get() {
        if (this.datos.profesion) {
          return this.datos.profesion
        }
        return 111
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { profesion: v })
      }
    },
    nivelEducacion: {
      get() {
        if (this.datos.nivelEducacion) {
          return this.datos.nivelEducacion
        }
        return 'SC'
      },
      set(v) {
        this.$store.commit('express/UPDATE_DATOS', { nivelEducacion: v })
      }
    }
  },
  data() {
    return {
      loginModalExpediente: true,
      loader: null,
      loading4: false,
      selectActividadeconomica: [],
      loading: false,
      loginLoading: false
    }
  },
  watch: {},
  async mounted() {},
  methods: {
    async loginExpediente() {
      this.loader = 'loading4'
      this.loginLoading = true
      const response = await this.$axios({
        url: '/v7/prospecto/v2.0/producto/lde?tipo=1',
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: process.env.BASIC_AUTH
        },
        data: {
          channel: 2,
          canalAtencion: this.datos.canalAtencion,
          codigoUsuario: this.promotor.codigoUsuario,
          codigoProcurador: this.promotor.codigoUsuario,
          origen: this.datos.origen,
          placa: this.datos.placa,
          tipoDocumento: this.datos.tipoDocumento,
          documento: this.datos.documento,
          codigoProducto: 13
        }
      })
      if (response.data.codigoRespuesta === '00') {
        if (
          response.data.estadoProspecto === 4 ||
          response.data.estadoProspecto === 8 ||
          response.data.estadoProspecto === 9
        ) {
          this.loginModalExpediente = false
          this.$store.commit('express/UPDATE_DATOS', response.data)

          if (response.data.jsonReniec.js_ficren) {
            if (response.data.jsonReniec.co_resbio == '00') {
              this.$store.commit('ui/UPDATE_STEP', 4)
            } else {
              if (response.data.estadoBio) {
                this.$store.commit('ui/UPDATE_STEP', 4)
              } else {
                this.$store.commit('ui/UPDATE_STEP', 3)
              }
            }
          } else {
            this.$store.commit('ui/UPDATE_STEP', 2)
          }
        } else {
          const mensaje = this.mensajeCatalogo(response.data.estadoProspecto)
          this.loader = false
          this.$store.commit('ui/SET_OPENDIALOG', {
            estado: true,
            mensaje
          })
          this.loading4 = false
        }
      } else if (response.data.codigoRespuesta == '99') {
        this.loader = false
        this.$store.commit('ui/SET_OPENDIALOG', {
          estado: true,
          mensaje: 'Ha ocurrido un error interno, inténtalo en unos minutos'
        })
      }
      this.loader = false
      this.loginLoading = false
    }
  }
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
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
</style>
