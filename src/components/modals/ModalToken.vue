<template>
  <v-dialog v-model="dialog" persistent max-width="360" height="auto">
    <form autocomplete="nope" @submit.prevent="enviarToken">
      <v-card class="ld-modal">
        <v-card-text>
          <v-row no-gutters align-center>
            <v-col cols="12" text-center>
              <h4 class="ld-modal-title" :class="color + '--text'">
                <b>Ingrese el codigo que se te envió al {{ datos.telefono }}</b>
              </h4>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="datos.telefono"
                v-validate="'required|numeric|max:9|min:9'"
                label="Número de telefono"
                color="soat"
                :error-messages="errors.collect('datos.telefono')"
                data-vv-name="datos.telefono"
                type="tel"
                :maxlength="9"
                required
                :counter="9"
                data-vv-as="Telf."
              />
            </v-col>
            <v-col cols="10" text-center>
              <v-text-field
                v-model="token"
                v-validate="'required|numeric|max:6|min:6'"
                label="Ingresa token"
                :error-messages="errors.collect('token')"
                data-vv-name="token"
                required
                type="tel"
                autofocus="autofocus"
                maxlength="6"
                :counter="6"
                :color="color"
              />
            </v-col>
            <v-col cols="2" text-center>
              <v-btn icon>
                <v-icon :color="color">replay</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col cols="6" offset-xs3 text-center>
              <v-btn
                class="ld-btn"
                type="submit"
                :loading="loading"
                :disabled="loading"
                :color="color"
              >
                <b>continuar</b>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>
<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['color'],
  data() {
    return {
      loading: false,
      token: null
    }
  },
  computed: {
    dialog() {
      return this.$store.state.default.openToken
    },
    datos() {
      return this.$store.state.default.datos
    }
  },
  methods: {
    async enviarToken() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.loading = true
          await this.$store.dispatch('default/validateToken', this.token)
          this.loading = false
        } else {
          this.$ga.event('Reingreso', 'Formulario-Incompleto')
        }
      })
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
