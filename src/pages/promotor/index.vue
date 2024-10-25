<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" class="text-center promotorLogin">
        <div>
          <div v-if="promotor.state">
            <v-card max-width="400px" class="ld-modal my-2 hidden-md-and-down">
              <v-row no-gutters align-center>
                <v-col cols="2" text-center>
                  <v-icon medium>people</v-icon>
                </v-col>
                <v-col cols="8" class="ld-modal-title" text-center>
                  Promotor:
                  <span class="grey--text">{{ promotor.id }}</span>
                </v-col>
                <v-col cols="2">
                  <v-btn icon @click="cerrarSesion">
                    <v-icon color="acceso" medium>clear</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <div class="my-3">
            <v-card max-width="400px" class="ld-modal">
              <form
                v-if="!promotor.state"
                id="login-form"
                autocomplete="off"
                @submit.prevent="onLogin"
              >
                <v-card-title class="text-center">
                  <v-row dense>
                    <v-col cols="12" class="text-center">
                      <h4 class="ld-modal-title-promotor text-center headline">
                        <b>Iniciar sesión</b>
                      </h4>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        v-model="promotor.id"
                        v-validate="'required'"
                        autofocus
                        :error-messages="errors.collect('promotor.id')"
                        label="Usuario"
                        data-vv-name="promotor.id"
                        required
                        data-vv-as="usuario"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        id="_loginPromotor"
                        v-model="password"
                        v-validate="'required'"
                        :append-icon="show ? 'visibility_off' : 'visibility'"
                        :type="show ? 'text' : 'password'"
                        name="input-10-1"
                        :error-messages="errors.collect('password')"
                        label="Contraseña"
                        data-vv-name="password"
                        autocomplete="off"
                        required
                        data-vv-as="contraseña"
                        @click:append="show = !show"
                      />
                    </v-col>
                    <v-col cols="12" class="text-center" py-2>
                      <v-btn
                        type="submit"
                        form="login-form"
                        class="ld-btn"
                        color="acceso"
                        :loading="loading"
                        :disabled="loading"
                        >CONTINUAR</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-text>
              </form>
              <v-row v-else no-gutters wrap align-center my-2>
                <v-col cols="12" class="ld-modal-title" text-center
                  >Evaluar</v-col
                >
                <v-card-text>
                  <h1>Estás logueado</h1>
                  <h3>
                    En caso no te redirigió.
                    <v-btn text to="/productos">Click aquí</v-btn>
                  </h3>
                </v-card-text>
              </v-row>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
    <ModalForm color="acceso" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ModalForm from '@/components/modals/ModalForm'

export default {
  layout: 'MainLayout',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    ModalForm
  },
  asyncData({ store, redirect }) {
    if (store.state.users.promotor.state) {
      redirect('/productos')
    }
  },
  data() {
    return {
      loading: false,
      show: false,
      password: null,
      selectProducto: 1,
      dni: {
        title: 'DNI',
        subtitle: 'Documento de Identidad',
        pos: 0,
        obligatorio: 1,
        items: [
          {
            title: 'Foto DNI (Frontal)'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('default', ['datos']),
    ...mapState('users', ['promotor'])
  },
  methods: {
    cerrarSesion() {
      this.$ga.event('Promotor', 'Cerrar sesión')
      this.$store.commit('users/UPDATE_PROMOTOR', {
        id: null,
        state: false,
        codigoEvaluacionPromotor: null,
        productos: null,
        codigoEntidad: null
      })
      this.$router.push('/promotor')
    },
    setPicker(val) {
      this.selectProducto = val
    },
    onLogin() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.$ga.event('Promotor', 'Formulario completo')
          this.loading = true

          const isPromotor = await this.$store.dispatch('users/loginPromotor', {
            usuario: this.promotor.id,
            password: this.password,
            canal: 2
          })
          if (isPromotor) {
            this.$router.push('/productos')
          }
          this.loading = false
        } else {
          this.$ga.event('Promotor', 'Formulario incompleto')
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  padding: 16px !important;
}

.container-btn-menu-vertical {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: row;
  align-items: center;
}

.promotorLogin {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100%;
  flex-direction: row;
}

.btn-menu-vertical {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px !important;
  border: 1px solid #ffffff !important;
  height: 120px;
  width: 140px;
  border-radius: 15px;
  margin: 10px auto;
  color: #005092;
  background: skyblue !important;
}

.btn-menu-vertical-active {
  box-shadow: 0px 0px 20px;
  background: #005092 !important;
  color: white !important;
}

.btn-menu-vertical p {
  margin: 0 auto;
  line-height: normal;
}
</style>
