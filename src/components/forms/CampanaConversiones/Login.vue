<template>
  <v-container fluid pa-0 class="campana-conversiones__container">
    <v-row class="d-flex flex-row">
      <v-col lg="6" md="6" class="v-col-left">
        <Leftforms :logo="img" />
      </v-col>
      <v-col
        lg="6"
        md="6"
        class="d-flex flex-column justify-center align-center"
      >
        <Rightforms
          :background="color"
          titulo-cabecera="Completa tus datos en el formulario"
          :color="color"
          :loading="loading"
          @submit="loginEmit"
        ></Rightforms>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Leftforms from '@/components/forms/CampanaConversiones/LeftForms'
import Rightforms from '@/components/forms/CampanaConversiones/RightForms'
import PreEvaluate from '@/components/forms/credinstante/PreEvaluate'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', ['datos']),
    ...mapState('ui', ['step'])
  },

  components: {
    Leftforms,
    Rightforms,
    PreEvaluate
  },
  mixins: [mixins],
  data() {
    return {
      color: '#ff7729',
      img: require('@/assets/img/Conversiones/campana-conversiones.png'),
      logoForm: require('@/assets/img/Retanqueo/logo-Credinstante.png'),
      loading: false,
      resForm: {}
    }
  },
  methods: {
    async loginEmit(payload) {
      this.loading = true
      const dataValidaCampanaConversiones = await this.$store.dispatch(
        'express/validaCampanaConversiones', payload
      )
      this.loading = false
      console.log('Lo QUiero')
    }
  }
}
</script>
<style scoped>
.campana-conversiones__container {
  max-width: 800px !important;
}
</style>
