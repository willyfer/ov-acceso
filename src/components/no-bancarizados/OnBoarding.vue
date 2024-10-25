<template>
  <v-container class="onboarding__container d-flex flex-column mt-4" fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col md="6" class="d-flex flex-column justify-center align-center">
        <PreevaluationNoBancarizados
          slot="step1"
          color="acceso"
          background="#ff7729"
          titulo-cabecera="Si no has tenido un préstamo o tarjeta de crédito en los últimos 24 meses y ningún banco te presta…"
          subtituloCabecera="¡Solicita tu préstamo aquí!"
        />
      </v-col>
      <v-col md="6" class="d-flex align-center">
        <BannerNoBancarizados
          :logo="require('@/assets/img/LD-bancarizador/Imagen-OV.png')"
          :nota="require('@/assets/Nota.png')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BannerNoBancarizados from '@/components/shared/banners/BannerNoBancarizados'
import PreevaluationNoBancarizados from '@/components/shared/preEvaluation/PreevaluationNoBancarizados'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('users', ['promotor']),
  },
  components: {
    BannerNoBancarizados,
    PreevaluationNoBancarizados,
  },
  mixins: [mixins],
  data() {
    return {
      estadoModal: false,
    }
  },
  mounted() {
    this.isNewCreated(13)
    this.getParams()
  },
  methods: {
    getParams() {
      let params = new URLSearchParams(location.search)
      const getChannel = params.get('channel')
      const getCodigoEntidad = params.get('codigoEntidad')
      if (getChannel) {
        this.$store.commit('express/UPDATE_DATOS', { channel: getChannel })
      }
      if (getCodigoEntidad) {
        this.$store.commit('users/UPDATE_PROMOTOR', {
          codigoEntidad: getCodigoEntidad,
        })
      }
    },
  },
}
</script>
<style scoped>
.onboarding__container {
  width: 100% !important;
}
.text-recuerda {
  font-size: 13px;
  background-color: #005197;
  padding: 5px 20px 15px;
  border-radius: 50px;
}
.text__white {
  color: white;
}
.text__orange {
  color: #ff7727;
}
</style>
