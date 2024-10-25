<template>
  <v-container fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col lg="6" md="6" class="v-col-left d-flex align-center mt-4">
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
import Leftforms from '@/components/forms/Renovacion/LeftForms'
import Rightforms from '@/components/forms/Renovacion/RightForms'
import PreEvaluate from '@/components/forms/credinstante/PreEvaluate'
import { mixins } from '@/mixins/init.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('users', ['promotor']),
    ...mapState('express', ['datos']),
    ...mapState('ui', ['step']),
  },

  components: {
    Leftforms,
    Rightforms,
    PreEvaluate,
  },
  mixins: [mixins],
  data() {
    return {
      color: '#ff7729',
      img: require('@/assets/img/Retanqueo/Imagen-OV-Retanqueo.png'),
      logoForm: require('@/assets/img/Retanqueo/logo-Credinstante.png'),
      loading: false,
      steping: 1,
      resForm: {},
    }
  },
  methods: {
    loginEmit(payload) {
      this.loading = true
      this.steping = this.step
      this.$store
        .dispatch('express/validaCliente', payload)
        .then((res) => {
          if (res.codRes == '00') {
            this.$gtag('event', 'conversion', {
              send_to: process.env.SEND_TO_ADS,
            })
            console.log('max verificar',res)
            this.resForm.codRes = res.codRes
            this.resForm.documento = res.data.documento
            /*this.resForm.channel = res.channel
            this.resForm.codigoProducto = res.codigoProducto
            this.resForm.estadoProspecto = res.estadoProspecto*/
            this.resForm.codigoProspecto = res.data.codigoProspecto

            this.$store.commit('express/SET_COD_PROSP', res.data.codigoProspecto)
            this.$store.commit('express/SET_OFERTAS', res.data)
            this.$store.commit('express/SET_BODY_VALIDA', this.resForm)
            this.$store.commit('ui/UPDATE_STEP', 2)
          } else if (res.codRes == '01') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal: `<p style="color: #005092">Usted no se encuentra calificado para esta campaña</p>`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true,
            })
          } else if (res.codRes == '10') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Recuerda!',
              msgModal: `<p style="color: #005092">Ya tienes tu crédito aprobado.`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true,
            })
          } else if (res.codRes == '11') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: `<p style="color: #005092">Ya tienes tu crédito aprobado.`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true,
            })
          } else if (res.codRes == '99') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: `<p style="color: #005092"> <br> En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos. </br> </p>`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true,
            })
          } else {
            throw new Error(
              'En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.'
            )
          }
        })
        .catch((err) => {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'error',
            tituloModal: '¡Error!',
            msgModal: err.message,
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.steping = this.step
  },
}
</script>
<style>
.container {
  width: 90% !important;
}
.v-col-left {
  margin: 0px auto;
}
</style>
