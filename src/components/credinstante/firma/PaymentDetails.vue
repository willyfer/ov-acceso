<template>
  <v-container
    fluid
    class="credit-simulation-motorcycle container-principal d-flex flex-column"
  >
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <img
        class="entidad-bancaria-header"
        width="60px"
        src="~/assets/img/credInstante/entidad-bancaria-header.png"
        alt=""
      />
      <span class="forma-pago">Forma de pago</span>
      <span class="ingresar-cuenta-b"
        >Debes ingresar tu cuenta bancaria que este registrada a tu nombre y no
        de un tercero.</span
      >
    </SharedHeaderWithStepper>
    <FormPagoBancoOrange
      :listaTipoCuenta="listaTipoCuenta"
      :listaTipoEntidad="listaTipoEntidad"
      :loading="loading"
      @confirmPagoBanco="confirmPagoBanco"
      @closePagoBanco="closePagoBanco"
    />
    <ModalChooseBank ref="modalChooseBank" :maxWidth="350" />
    <div class="no-tiene-cuenta-bancaria">
      <span>Si usted no tiene una cuenta bancaria, </span>
      <span>no se preocupe, búsquelo en el siguiente enlace</span>
    </div>
    <div class="elegir-cuenta-bancaria">
      <img
        @click="openChooseBank"
        width="138px"
        src="~/assets/img/credInstante/escoger-banco.png"
        alt=""
      />
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import FormPagoBancoOrange from '@/components/pagosforms/FormPagoBancoOrange'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import ModalChooseBank from '@/components/modals/ModalChooseBank'
import { codPage } from '@/enums/credinstante-enums'
import { getBancos } from '@/api/catalogue'
export default {
  name: 'PaymentDetails',
  components: {
    ModalChooseBank,
    FormPagoBancoOrange,
    SharedHeaderWithStepper,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  computed: {
    ...mapState('credinstante', ['dataCreateProceedings']),
  },
  data() {
    return {
      listaTipoEntidad: [],
      loading: false,
      listaTipoCuenta: [
        {
          id: 1,
          tipo: 'Cuenta de Ahorros',
        },
        {
          id: 2,
          tipo: 'Cuenta Corriente',
        },
      ],
    }
  },
  methods: {
    async confirmPagoBanco(payload) {
      try {
        this.loading = true
        const dataForm = {
          ...this.dataCreateProceedings,
          ...payload,
        }
        const responseConfirmarDatos = await this.$store.dispatch(
          'credinstante/confirmarDatos',
          dataForm
        )
        if (responseConfirmarDatos.codRes === '00') {
          this.$store.commit('credinstante/UPDATE_DATOS', {
            responseConfirmarDatos,
          })
          this.$store.commit(
            'credinstante/SET_STEP',
            codPage.CONTRACT_DOCUMENTS
          )
        } else {
          throw new Error(
            'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.'
          )
        }
        this.loading = false
      } catch (error) {
        this.$store.commit('ui/SET_OPENDIALOGALERT', {
          imgModal: 'error',
          tituloModal: '¡Error!',
          msgModal:
            'En estos momentos no podemos actualizar tus datos, por favor inténtalo en unos minutos.',
          maxWidth: 350,
          estadoModal: true,
          isReset: true,
        })
      }
    },
    closePagoBanco() {
      this.$store.commit('credinstante/SET_STEP', codPage.CHOOSE_PAYMENT)
    },
    openChooseBank() {
      this.$refs.modalChooseBank.open()
    },
  },
  async mounted() {
    getBancos(this.$axios)
      .then((res) => {
        if (res.codRes == '00') {
          this.listaTipoEntidad = res.arrayBancos
        } else if (res.codRes == '99') {
          this.$store.commit('ui/SET_OPENDIALOGALERT', {
            imgModal: 'warning',
            tituloModal: '¡Lo sentimos!',
            msgModal:
              'En estos momentos no se puede obtener los bancos, por favor inténtelo más tarde.',
            maxWidth: 350,
            estadoModal: true,
            isReset: true,
          })
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
  },
}
</script>

<style scoped lang='scss'>
.container-principal {
  max-width: 450px !important;
  padding-top: 4px !important;
  .entidad-bancaria-header {
    margin: 30px 0 10px;
  }
  .forma-pago {
    width: 80%;
    line-height: 1.2;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  .ingresar-cuenta-b {
    width: 80%;
    margin-top: 30px;
    margin-bottom: 10px;
    line-height: 1.2;
    text-align: center;
    color: white;
    font-size: 14px;
  }
  .no-tiene-cuenta-bancaria {
    border: solid 1px silver;
    border-radius: 20px;
    font-size: 10px;
    padding: 10px 25px;
    color: silver;
    margin: 0 22px;
    span:first-child {
      font-weight: bold;
    }
  }
  .elegir-cuenta-bancaria {
    margin: 32px auto;
  }
}
</style>