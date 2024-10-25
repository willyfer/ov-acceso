<template>
  <v-container class="d-flex flex-column container-principal__aprobacion">
    <v-col class="text-center" slot="formulario">
      <v-row class="d-flex flex-row mt-2 justify-center">
        <span class="class-title text-color--primary">
          {{
          tituloAprobracion
          }}
        </span>
      </v-row>
      <v-row class="d-flex flex-row justify-center" cols="12">
        <span class="class-title text-color--primary">{{ datos.nombres }}</span>
      </v-row>
      <v-row class="d-flex flex-row justify-center mb-3" cols="12">
        <span class="class-title text-color--primary">
          {{
            `tienes un préstamo ${
        this.isBtnOferta ? 'aprobado' : 'pre aprobado'
      }  !`
          }}
        </span>
      </v-row>
      <div v-for="oferta in datos.arrayOfertas" :key="oferta.id">
        <OfertasConversiones :datosOferta="oferta" />
      </div>
      <div v-if="isBtnOferta">
        <v-row class="mt-4 d-flex justify-center">
          <v-col md="6" class="d-flex flex-row justify-center">
            <v-btn
              class="btn-confirmar content-color--primary text-color--secondary"
              style="border-radius:7px;"
              :loading="loading"
              @click="confirmaPrestamo"
            >Confirma tu préstamo AQUÍ</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { selectSede } from '@/utils/catalogo'
import OfertasConversiones from '@/components/forms/Conversiones/Utils/OfertasConversiones'
export default {
  name: 'ProcesoAprobacionConversiones',
  props: {
    color: String,
    tituloAprobracion: {
      type: String,
      default: '¡Felicitaciones '
    },
  },
  components: {
    OfertasConversiones
  },
  data() {
    return {
      Cabecera:
        '<b>¡Gracias!<b/> <br/> No olvides recoger <br/> tu efectivo presentando <br/> tu DNI',
      loading: false
    }
  },
  methods: {
    async confirmaPrestamo() {
      this.loading = true
      await this.$store.dispatch('conversiones/confirmarOferta')
      this.loading = false
    }
  },
  computed: {
    ...mapGetters('conversiones', ['isBtnOferta', 'datos']),
    ...mapState('users', ['promotor'])
  },
  mounted() {
    if (this.promotor.codigoUsuario) {
      this.$store.commit('conversiones/SET_DATOS', { isBtnOferta: false })
    }
  }
}
</script>

<style scoped>
.container-principal__aprobacion {
  max-width: 600px !important;
}
.v-text-field--outlined .v-input__control {
  padding: 0;
}
.class-title {
  font-size: 28px;
  font-weight: bold;
}
.ld-title {
  font-size: 30px;
  line-height: 40px;
  font-weight: 600;
  font-style: italic;
  letter-spacing: -1px;
}

.ld-subtitle {
  font-size: 18px;

  margin-bottom: 0px;
}

.mainLayout {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.mainImage {
  width: 80%;
  height: auto;
}
@media (max-width: 991px) {
  .class-title {
    font-size: 23px;
    font-weight: bold;
  }
  .mainImage {
    max-width: 200px;
    width: 100%;
  }
  .ld-final {
    display: flex;
    justify-content: center;
  }
}

.container-poup {
  display: flex;
  position: relative;
}

.img-popup {
  width: 100%;
  height: 100%;
}

.container-close {
  position: absolute;
  right: 0;
}

.container-close .v-icon {
  background-color: #005092 !important;
  border-radius: 50%;
  padding: 5px;
}

@media (max-width: 375px) {
  .container-principal__aprobacion {
    padding: 0 !important;
  }
  #ldForm {
    padding: 0 !important;
  }
}
@media (min-width: 359px) {
  .btn-detalle {
    width: 100%;
  }

  .btn-confirmar {
    width: 100%;
  }
}
</style>
