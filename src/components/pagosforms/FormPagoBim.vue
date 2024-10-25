<template>
  <v-card class="fondo">
    <v-card-title class="modal-titulo pb-0 d-flex align-center">
      <div>Forma de Pago -</div>
      <img class="ml-2" :src="logoBim" alt="logoBim" width="70" />
    </v-card-title>
    <v-card-text class="container-modal">
      <v-radio-group v-model="radioBIM" class="radioButtons">
        <v-radio :color="color">
          <template v-slot:label>
            <div class="labelRadio">
              <b>Ya tengo BIM</b>
            </div>
          </template>
        </v-radio>
        <div class="text-center mb-4" v-show="radioBIM == 0">
          <div class="container-input-celular">
            <span class="input-group-addon">
              <v-icon>mdi-cellphone-android</v-icon>
            </span>
            <input
              v-model="celular"
              disabled
              class="input-celular"
              type="text"
              placeholder="Cuenta BIM / N° de celular"
            />
          </div>
        </div>
        <v-radio :color="color">
          <template v-slot:label>
            <div class="labelRadio">
              <b>NO tengo BIM</b>
            </div>
          </template>
        </v-radio>
        <div v-show="radioBIM == 1">
          <div class="contenedor-redondo my-4">
            <p class="text-bim info-adicional container-orange ma-0 px-3">
              Si usted no tiene una cuenta BIM no se preocupe, abra una cuenta
              BIM y regresa a esta pantalla, lo esperamos.
            </p>
          </div>
          <div class="contenedor-redondo">
            <h3 class="container-orange">
              ¿Cómo crearse una cuenta en BIM?
            </h3>
          </div>
          <div
            class="text-bim text-blue d-flex flex-wrap justify-space-around align-center"
          >
            <p class="mb-1">
              <b>Descarga el app en tu celular:</b>
            </p>
            <div class="d-flex align-center">
              <div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.pdp.bim&hl=es_PE"
                  target="_blank"
                >
                  <img :src="logoPlay" alt="logoPlay" width="100" />
                </a>
              </div>
              <div>
                <a
                  href="https://apps.apple.com/pe/app/bim/id1361333457"
                  target="_blank"
                >
                  <img :src="logoApp" alt="logoApp" width="85" />
                </a>
              </div>
            </div>
          </div>
          <div class="group-buttons mt-4">
            <v-btn
              rounded
              class="container-blue text-white btn-modal pr-2"
              @click="clickMasInfo"
              >Más información <br />sobre BIM
              <span class="btn-aqui">aquí</span></v-btn
            >
          </div>
        </div>
      </v-radio-group>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-around">
      <v-btn class="ld-btn-secondary" @click="cancelar">CANCELAR</v-btn>
      <v-btn class="ld-btn" :color="color" :loading="loading" @click="confirmar"
      :disabled="radioBIM == 1"
        >Ok</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ModalPagosBim',
  props: {
    color: {
      default: 'acceso'
    },
    loading: {
      default: false
    },
    celular: {
      default: null
    }
  },
  data() {
    return {
      logoBim: require('@/assets/img/Bim/bimNavLogo.png'),
      logoApp: require('@/assets/img/Bim/app_store.png'),
      logoPlay: require('@/assets/img/Bim/google_play.png'),
      radioBIM: 0
    }
  },
  methods: {
    clickMasInfo() {
      window.open('https://acceso.com.pe/descargas/Manual_BIM.pdf', '_blank')
    },
    confirmar() {
      this.$emit('confirmar')
    },
    cancelar() {
      this.$emit('cancelar')
    }
  }
}
</script>

<style scoped>
.container-modal {
  font-size: 16px;
}
.modal-titulo {
  color: #005293;
}
.fondo {
  background-color: #e1e3e4;
}
.contenedor-redondo {
  border: 1.3px solid #005293;
  border-radius: 10px;
  padding: 4px;
  color: white;
}
.contenedor-redondo h3 {
  font-size: 0.9em;
  text-transform: uppercase;
  font-weight: bold;
}
.container-orange {
  background-color: #fe7307;
  border-radius: 6px;
  padding: 1px 5px;
}
.container-blue {
  background-color: #005293 !important;
}
.text-white {
  color: white;
}
.text-blue {
  color: #005293;
  margin: 10px 0;
}
.group-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-modal {
  font-size: 0.65em;
  margin-bottom: 10px;
}
.info-adicional strong {
  font-weight: bold;
}
.text-bim {
  font-size: 0.8em;
}
.btn-web {
  color: white !important;
  margin-left: 5px;
}
.btn-aqui {
  background-color: white;
  padding: 6px;
  border-radius: 11px;
  margin-left: 5px;
  color: #005293;
  font-weight: bold;
}
.container-input-celular {
  display: flex;
  align-items: center;
  color: #005293 !important;
  border: 1px solid #005293;
  border-radius: 10px;
  padding: 8px;
}
.input-celular {
  font-weight: bold;
  font-size: 1.3em;
  width: 100%;
  text-align: center;
  color: #005293 !important;
}
.input-group-addon .v-icon,
.labelRadio {
  color: #005293 !important;
}
@media screen and (min-width: 768px) {
  .container-modal {
    font-size: 17px;
  }
}
</style>
