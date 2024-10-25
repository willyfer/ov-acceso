<template>
  <div>
    <v-row no-gutters class="text-center align-center">
      <v-col cols="12" md="12">
        <h4 class="ld-h2-title-form-italic">ESTÁS PRE-APROBADO</h4>
      </v-col>
      <v-col cols="12" md="12">
        <p class="ld-form-p2">
          Acercate a nuestras oficinas con los siguientes
          <br />documentos para terminar el proceso.
        </p>
      </v-col>
      <v-col cols="12" md="12" class="text-center" my-3>
        <v-row dense>
          <v-col
            v-for="(item, key) in totalImagenes"
            :key="key"
            cols="4"
            align-center
          >
            <img
              :src="item.url"
              style="width:80%; max-width:100px; height:auto"
            />
            <p class="ld-form-p2">
              <small>{{ item.title }}</small>
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" ma-3>
        <p class="ld-form-p2">
          Ahorra tiempo subiendo tus documento por internet!
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="text-center">
        <v-btn class="ld-btn-secondary" @click.native="goHome">
          <b>Finalizar</b>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" class="text-center pa-2" bottom>
        <v-btn class="ld-btn" :color="color" @click.native="setStep">
          <b>Subir Documentos</b>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['color', 'docOficina'],
  data() {
    return {
      totalDocumentos: [
        { id: 1, url: require('@/assets/dni_export.png'), title: 'DNI' },
        {
          id: 2,
          url: require('@/assets/tarjeta_export.png'),
          title: 'Tarjeta Propiedad'
        },
        {
          id: 3,
          url: require('@/assets/recibo_Export.png'),
          title: 'Recibo de Servicio'
        },
        { id: 4, url: require('@/assets/home-icon-2.png'), title: 'SOAT' },
        {
          id: 5,
          url: require('@/assets/revision_Export.png'),
          title: 'Revisión técnica'
        },
        {
          id: 6,
          url: require('@/assets/revision_Export.png'),
          title: 'Boleta de Pagos'
        }
      ]
    }
  },
  computed: {
    datos() {
      return this.$store.state.default.datos
    },
    step() {
      return this.$store.state.default.step
    },
    totalImagenes() {
      return this.totalDocumentos.filter((val) => {
        const docs = this.docOficina.filter((doc) => {
          if (doc == val.id) return true
        })
        return docs
      })
    }
  },
  mounted() {
    //  this.$ga.event('Pre-Aprobado', 'visualizacion')
    this.$fb.track('Pre-probado')
  },
  methods: {
    setStep() {
      this.$store.commit('default/UPDATE_STEP', parseInt(this.step - 1))
      this.$ga.event('Documentacion-Pesencial', 'Regresar a Documentacion')
    },
    goHome() {
      this.$ga.event('Documentacion-Pesencial', 'Finalizar')
      this.$store.commit('default/RESET_STATES')
    }
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .ld-final {
    display: flex;
    justify-content: center;
  }

  .ld-personaje-img {
    position: absolute;
    right: 0px;
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .ld-final {
    display: flex;
    justify-content: center;
  }

  .ld-personaje-img {
    position: absolute;
    bottom: 0 !important;
    right: 0px;
    width: 120px !important;
  }
}

@media (min-width: 1025px) {
  .ld-final {
    display: flex;
    justify-content: center;
  }

  .ld-personaje-img {
    position: absolute;
    bottom: 0px !important;
    right: 0px;
    width: 250px !important;
  }
}
.ld-btn-secondary {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2) important!;
  background-color: grey !important;
}
</style>
