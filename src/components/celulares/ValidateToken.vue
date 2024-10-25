<template>
  <v-container
    class="d-flex flex-column align-center validate-token__container"
  >
    <v-col class="text-center d-flex flex-column align-center justify-center">
      <div>
        <v-row class="d-flex flex-row justify-center">
          <span class="secondary--text class-title">¡Felicitaciones! </span>
        </v-row>
        <v-row class="d-flex flex-row justify-center" cols="12">
          <span class="secondary--text class-title">{{ datos.nombres }}</span>
        </v-row>
        <v-row class="d-flex flex-row justify-center mb-3" cols="12">
          <span class="secondary--text class-title"
            >tienes un préstamo aprobado.</span
          >
        </v-row>
      </div>
      <div class="mt-8 pa-1 d-flex flex-column justify-center align-center">
        <p class="secondary--text text-center">
          Para continuar, por favor ingresa el código que te hemos enviado por
          mensaje de texto
        </p>
        <form @submit.prevent="validarToken">
          <v-text-field
            v-model="tokenenviado"
            v-validate="'required|max:6|min:6|numeric'"
            data-vv-name="token"
            :error-messages="errors.collect('token')"
            maxlength="6"
            minlength="6"
            :counter="6"
            color="#005092"
            class="secondary--text centered-input"
            placeholder
            hint="Te enviamos un código  vía SMS"
            @keypress="isNumber"
          ></v-text-field>
          <div class="validate-token__group-button mt-4">
            <div class="text-center pa-1">
              <v-btn
                class="button-reenviar"
                :loading="loading"
                :disabled="loadingLlamada"
                @click.prevent="resend"
                >Reenviar</v-btn
              >
            </div>
            <div class="text-center pa-1">
              <v-btn
                type="submit"
                class="button-continuar"
                :color="color"
                :loading="loading"
                :disabled="loadingLlamada"
                >Continuar</v-btn
              >
            </div>
          </div>
          <!-- <div class="text-center pa-1 mt-2">
            <v-btn
              class="btn-llamar"
              text
              :loading="loadingLlamada"
              @click="llamadaToken"
            >
              No recibo el código,<br />
              deseo que me llamen
            </v-btn>
          </div> -->
        </form>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ValidateToken',
  props: ['color'],
  data() {
    return {
      tokenenviado: null,
      loading: false,
      loadingLlamada: false,
    }
  },
  computed: {
    ...mapGetters('express', ['datos']),
  },
  methods: {
    async resend() {
      await this.enviarToken()
    },
    async validarToken() {
      try {
        this.$validator.validateAll().then(async (result) => {
          if (result) {
            this.loading = true
            const payload = {
              codigoToken: 'CREDINSTANTE',
              documento: this.datos.documento,
              token: this.tokenenviado,
            }
            await this.$store.dispatch('express/actionValidarTokenNew', payload)
            this.loading = false
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    async enviarToken() {
      try {
        this.loading = true
       const dataToken = {
          codigoToken: 'CREDINSTANTE',
          documento: this.datos.documento, //this.datos.documento,
          telefono: this.datos.telefono, //this.datos.telefono
        }
        await this.$store.dispatch('express/actionGenerarTokenNew', dataToken)
        this.loading = false
      } catch (error) {
        console.log('enviarToken: ', error)
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'warning',
          tituloModal: '¡Lo sentimos!',
          msgModal:
            'En estos momentos no podemos enviar el token, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
    async llamadaToken() {
      const dataToken = {
        grupo: 'CREDINSTANTE',
        documento: this.datos.documento, //this.datos.documento,
        celular: this.datos.telefono, //this.datos.celular
        tipo: 3,
      }
      this.loadingLlamada = true
      await this.$store.dispatch('express/actionLlamadaToken', dataToken)
      this.loadingLlamada = false
    },
  },
  async mounted() {
    await this.enviarToken()
  },
}
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}
.validate-token__container {
  max-width: 500px !important;
}
.class-title {
  font-size: 28px;
  font-weight: bold;
}
.validate-token__group-button {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-wrap: wrap !important;
}
.button-continuar {
  color: white !important;
}
.button-reenviar {
  background-color: grey !important;
  color: white !important;
}
.btn-llamar {
  color: #ff7729 !important;
  font-weight: bold;
  text-decoration: underline !important;
}
@media (max-width: 991px) {
  .class-title {
    font-size: 23px;
    font-weight: bold;
  }
}
</style>