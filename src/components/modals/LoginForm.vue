<template>
  <v-dialog v-model="loginModal" persistent max-width="360" height="auto">
    <form autocomplete="nope" @submit.prevent="login">
      <v-card class="ld-modal">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" class="text-center">
              <h4 class="ld-modal-title" :class="color + '--text'">
                Ingrese su información
              </h4>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-text-field
                v-model="datos.documento"
                v-validate="'required|numeric|max:8|min:8'"
                label="Número de documento"
                :error-messages="errors.collect('datos.documento')"
                data-vv-name="datos.documento"
                data-vv-as="documento"
                required
                type="tel"
                autofocus="autofocus"
                maxlength="8"
                :counter="8"
                :color="color"
              />
            </v-col>
            <v-col v-if="isNecesary" cols="12">
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
                flat
                :error-messages="errors.collect('placa')"
                :color="color"
                maxlength="7"
                minlength="7"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions v-if="!isPersistent">
          <v-row dense>
            <v-col cols="6" md="6" class="text-center">
              <v-btn class="ld-btn-secondary" @click.stop="close"
                >Cancelar</v-btn
              >
            </v-col>
            <v-col cols="6" md="6" class="text-center">
              <v-btn
                class="ld-btn"
                type="submit"
                :loading="loading"
                :disabled="loading"
                :color="color"
                >continuar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn center to="/" text>ATRAS</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn
            center
            dark
            class="ld-btn"
            type="submit"
            :loading="loading"
            :disabled="loading"
            :color="color"
            >continuar</v-btn
          >
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
import { mixins } from '@/mixins/mixin.js'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  mixins: [mixins],
  props: ['color'],
  data() {
    return {
      loading: false,
      isCreated: false
    }
  },
  computed: {
    ...mapState('default', ['bussines', 'loginModal', 'datos']),
    ...mapState('users', ['promotor']),
    placa: {
      get() {
        return this.datos.placa ? this.datos.placa : null
      },
      set(v) {
        if (v.length > 3) {
          this.$store.commit('default/UPDATE_DATOS', {
            placa: v.toUpperCase().replace('-', '')
          })
        }
      }
    },
    isPersistent() {
      const pro = this.bussines.codigoProducto
      const sub = this.bussines.codigoSubProducto
      if (pro === 34 && sub === 7) {
        return true
      } else {
        return false
      }
    },
    isNecesary() {
      if (this.isCreated) {
        const pro = this.bussines.codigoProducto
        const sub = this.bussines.codigoSubProducto
        if (pro === 25 && sub === 2) {
          return false
        } else {
          return true
        }
      }
    }
  },
  mounted() {
    this.isCreated = true
  },
  methods: {
    async enviarToken() {
      const reponseToken = await this.$axios({
        url: '/api/private/v1.0/generarTokenNew',
        method: 'POST',
        data: {
          codigoToken: 'whatsapp',
          documento: this.datos.documento,
          telefono: this.datos.telefono
        },
        headers: {
          'content-type': 'application/json',
          Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
        }
      })
      const tokenSms = reponseToken.data.resultado[0].co_toksms
      this.fechaToken = new Date()
      this.enviarSms(tokenSms)
    },
    enviarSms(token) {
      const msg = {
        mensaje: `Acceso: Su codigo de confirmacion es: ${token}. Nunca compartas con nadie esta clave. Evita el fraude.`,
        telefono: this.datos.telefono
      }
      this.$axios
        .post(`/api/private/v1.0/smsDirecto`, msg, {
          headers: {
            'content-type': 'application/json',
            Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
          }
        })
        .then((response) => {
        })
        .catch((error) => {
        })
    },
    async login() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          if (!this.promotor.state) {
            const token = await this.$recaptcha.execute('loginCliente')
            const isUser = await this.validateCaptcha(token)
            if (isUser) {
              await this.$store.dispatch('users/loginCliente')
            } else {
              // bot detected
              this.loading = false
              this.$store.commit('ui/SET_MODAL', { id: 17, state: true })
            }
          } else {
            const pro = this.bussines.codigoProducto
            const sub = this.bussines.codigoSubProducto
            const marcaDeLdF = this.bussines.marcaDeLd
            const documento = this.datos.documento
            const placa = this.datos.placa
            let canalColocacion = null
            if (pro === 34 && sub === 7) {
              canalColocacion = 2
              this.$store.commit('default/UPDATE_DATOS', { documento, placa })
              this.$store.commit('default/UPDATE_STEP', -1)

              if (marcaDeLdF === 1) {
                const prosp = await this.$store.dispatch('users/loginCliente', {
                  canalColocacion
                })
                if (prosp.codigoEstado === 3) {
                  this.$store.commit('ui/SET_MODAL', {
                    id: 17,
                    state: false
                  })
                  await this.enviarToken()
                  this.$store.commit('default/UPDATE_LOGIN_TOKEN', true)
                } else {
                  if (prosp.codigoEstado === 5) {
                    this.$store.commit('ui/SET_MODAL', {
                      id: 20,
                      state: true
                    })
                  } else if (prosp.codigoEstado === 7) {
                    this.$store.commit('ui/SET_MODAL', {
                      id: 21,
                      state: true
                    })
                  }
                }
              } else {
                await this.$store.dispatch('users/loginCliente', {
                  canalColocacion
                })
              }
            } else {
              await this.$store.dispatch('users/loginCliente', {
                canalColocacion
              })
            }
          }
          this.loading = false
        } else {
          this.$ga.event('Reingreso', 'Formulario-Incompleto')
        }
      })
    },
    close() {
      this.$ga.event('Reingreso', 'Cerrar Modal')
      this.$store.commit('default/UPDATE_LOGIN_MODAL', false)
    }
  }
}
</script>
<style scoped>
.ld-btn {
  min-width: 100px !important;
}
.ld-btn-secondary {
  min-width: 100px !important;
}
</style>
