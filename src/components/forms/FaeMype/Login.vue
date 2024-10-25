<template>
  <v-container fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col lg="6" md="6" class="v-col-left d-flex align-center">
        <Leftforms :logo="img" />
      </v-col>
      <v-col lg="6" md="6">
        <Rightforms
          :background="color"
          titulo-cabecera="¡Pídelo aquí!"
          :color="color"
          :loading="loading"
          @submit="dialog = true"
        ></Rightforms>
      </v-col>
      <v-row dense>
        <v-col cols="12" class="secondary--text pa-12 caption">
          <h4 class="title">Términos y condiciones</h4>
          <p style="text-align: justify">
            Edpyme Acceso Crediticio S.A., en adelante “ACCESO”, a través del Fondo de Apoyo Empresarial a la Micro y Pequeña Empresa (FAE – MYPE), creado mediante el Decreto de Urgencia N°029-2020, y sus modificatorias, otorga un Crédito FAE - MYPE ascendente a S/ 3,000.00 (Tres Mil y 00/100 soles), por un plazo de 36 meses, compuesto por un período de gracia de 12 meses y 24 meses para cancelar las cuotas del Crédito FAE - MYPE; a los Clientes de ACCESO que cumplan con los siguientes requisitos:
          </p>
          <ul>
            <li style="text-align: justify">
              Cuenten con un crédito MES pequeñas empresas o micro empresas celebrado con ACCESO, a la fecha de solicitud y desembolso del Crédito FAE - MYPE.
            </li>
            <li style="text-align: justify">
              El Crédito FAE - MYPE tenga como destino exclusivamente el capital de trabajo, según los parámetros establecidos por la Superintendencia de Banca, Seguros y AFP (SBS) para créditos a microempresas y pequeñas empresas;
            </li>
            <li style="text-align: justify">
              Encontrarse clasificado en el Sistema Financiero, al 29 de febrero de 2020 en la Central de Riesgo de la Superintendencia de Banca, Seguros y Administradoras Privadas de Fondos de Pensiones (SBS), en la categoría de “Normal” o “Con Problemas Potenciales” (CPP). En caso de no contar con clasificación a dicha fecha, no haber estado en una categoría diferente a la categoría “Normal” durante los 12 meses previos al otorgamiento del Crédito FAE - MYPE.
            </li>
          </ul>
          <br />
          <p style="text-align: justify">
            La aprobación del Crédito FAE - MYPE estará sujeta a la validación de todos los requisitos especificados en el Decreto de Urgencia N° 029- 2020, Decreto de Urgencia N° 049 -2020 y en el Reglamento Operativo del FAE - MYPE, además de la evaluación crediticia de acuerdo a las políticas internas de ACCESO. 
          </p>
          <p style="text-align: justify">
            De acceder al Crédito FAE - MYPE bajo las condiciones señaladas, debemos precisar que las cuotas mensuales pueden variar entre S/ 135.00 a S/ 138.00 soles, estos montos son referenciales ya que están sujetos a la TEA otorgada, la cual tiene un rango de entre 4.09% – 4.69%. Tasa Moratoria: 120%. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 4.09% – 4.69%. Esta campaña se encontrará vigente hasta el 15 de junio de 2020.
          </p>
          <p style="text-align: justify">
            Cabe señalar que, una vez presentada la solicitud de Crédito FAE – MYPE, y demás documentos de crédito suscritos digitalmente por el Cliente, se presentará a COFIDE para su evaluación, lo cual, de ser rechazado por éste último, conllevará que no se efectúe el desembolso, quedando sin efectos los documentos de crédito suscritos y aceptados por el Cliente; esto será comunicado a través del correo electrónico o número telefónico designado en la solicitud de Crédito FAE MYPE, sin penalización alguna en su contra. Quedando eximida ACCESO de toda responsabilidad u obligación frente al Cliente.
          </p>
        </v-col>
      </v-row>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="400">
      <div class="container-poup">
        <img class="img-popup" :src="imgPopup" alt="Fae_finalizado">
      </div>     
    </v-dialog>
  </v-container>
</template>
<script>
import Leftforms from '@/components/forms/FaeMype/LeftForms'
import Rightforms from '@/components/forms/FaeMype/RightForms'
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
    Rightforms
  },
  mixins: [mixins],
  data() {
    return {
      color: '#ff7729',
      img: require('@/assets/img/faemype/imagen-pricipal.png'),
      imgPopup: require('@/assets/img/faemype/Popup_FAE.png'),
      loading: false,
      steping: 1,
      resForm: {},
      dialog: true
    }
  },
  methods: {
    /* loginEmit(payload) {
      this.loading = true
      this.steping = this.step
      this.$store
        .dispatch('express/validaClienteFae', payload)
        .then((res) => {
          if (res.codRes == '00') {
            this.resForm.codRes = res.codRes
            this.resForm.channel = res.channel
            this.resForm.codigoProducto = res.codigoProducto
            this.resForm.documento = res.documento
            this.resForm.estadoProspecto = res.estadoProspecto
            this.resForm.codigoProspecto = res.codigoProspecto

            this.$store.commit('express/SET_COD_PROSP', res.codigoProspecto)
            this.$store.commit('express/SET_OFERTAS', res.ofertas)
            this.$store.commit('express/SET_BODY_VALIDA', this.resForm)
            this.$store.commit('ui/UPDATE_STEP', 2)
          } else if (res.codRes == '01') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Lo sentimos!',
              msgModal: `<p style="color: #005092">Usted no se encuentra calificado para esta campaña</p>`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true
            })
          } else if (res.codRes == '10') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Recuerda!',
              msgModal: `<p style="color: #005092">Ya tienes una solicitud en curso.`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true
            })
          } else if (res.codRes == '11') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: `<p style="color: #005092">Ya tienes una solicitud en curso.`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true
            })
          } else if (res.codRes == '99') {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: `<p style="color: #005092"> <br> En estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos. </br> </p>`,
              maxWidth: 350,
              estadoModal: true,
              isReset: true
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
            isReset: true
          })
        })
        .finally(() => {
          this.loading = false
        })
    } */
  },
  mounted() {
    this.steping = this.step
  }
}
</script>
<style scoped>
.container {
  width: 90% !important;
}
.v-col-left {
  margin: 0px auto;
}

.container-poup {
  display: flex;
}

.img-popup {
  width: 100%;
  height: 100%;
}
</style>
