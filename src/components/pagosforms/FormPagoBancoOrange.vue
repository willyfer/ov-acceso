<template>
  <div>
    <div class="semi-round__container">
      <div class="semi-round__content">
        <v-row class="datos-vehiculo" dense>
          <v-col cols="12">
            <form ref="formPagoBanco">
              <v-select
                class="mb-1"
                v-model="selectTipoCuenta"
                :items="listaTipoCuenta"
                label="Tipo de Cuenta"
                outlined
                dense
                return-object
                item-text="tipo"
                item-value="id"
                @change="changeTipoCuenta(selectTipoCuenta.id)"
                v-validate="'required'"
                data-vv-name="selectTipoCuenta"
                data-vv-as="Tipo de Cuenta"
                :error-messages="errors.collect('selectTipoCuenta')"
              ></v-select>
              <v-select
                class="mb-1"
                dense
                v-model="selectEntidadBancaria"
                :items="listaTipoEntidad"
                label="Entidad Bancaria"
                outlined
                return-object
                item-text="siglas"
                item-value="codigoBanco"
                @change="changeEntidadBancaria(selectEntidadBancaria)"
                v-validate="'required'"
                data-vv-name="selectEntidadBancaria"
                data-vv-as="Entidad Bancaria"
                :error-messages="errors.collect('selectEntidadBancaria')"
              ></v-select>
              <v-text-field
                class="mb-1"
                dense
                label="Cuenta Bancaria"
                outlined
                v-model="cuentaBancaria"
                @keypress="isNumber"
                v-validate="'required'"
                :minlength="longitudMinBancaria"
                :maxlength="longitudMaxBancaria"
                data-vv-name="cuentaBancaria"
                data-vv-as="Cuenta Bancaria"
                :error-messages="errors.collect('cuentaBancaria')"
                :rules="rulesBancario"
              ></v-text-field>
              <v-text-field
                class="mb-1"
                dense
                label="Cuenta Interbancaria"
                outlined
                v-model="cuentaInterbancaria"
                v-validate="'required'"
                @keypress="isNumber"
                :maxlength="longitudMaxInterbancaria"
                :minlength="longitudMaxInterbancaria"
                data-vv-name="cuentaInterbancaria"
                data-vv-as="Cuenta Interbancaria"
                :error-messages="errors.collect('cuentaInterbancaria')"
                :rules="rulesInterbancario"
              ></v-text-field>
            </form>
          </v-col>
          <v-col cols="12">
            <div class="registra-correctamente-cuenta">
              <img width="40px" src="~/assets/img/credInstante/calendario.png">
              <span>
                Registra correctamente tu cuenta bancaria. De lo contrario solo
                tendrás una oportunidad de corregirla, dentro de un plazo de 3 días
                desde que se te notifique.
              </span>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-row class="my-6">      
      <v-col cols="12" md="6" class="text-center button-editar-condicion">
        <SharedButton 
          text='Cancelar' 
          :buttonSilver='true'
          :totalWidth='76' 
          @click='closePagoBanco'
        />
      </v-col>
      <v-col cols="12" md="6" class="text-center button-confirmar-condicion">
        <SharedButton 
          text='Confirmar' 
          :buttonOrange='true'
          :totalWidth='76' 
          :loading="loading"
          @click='confirmPagoBanco'
        />
      </v-col>
    </v-row>    
  </div>
</template>

<script>
import { mixins } from '@/mixins/mixin.js'
import SharedButton from '@/components/shared/SharedButton'
export default {
  name: 'FormPagoBancoOrange',
  components: {
    SharedButton,
  },
  props: {
    listaTipoCuenta: {},
    listaTipoEntidad: {},
    color: {
      default: 'acceso'
    },
    loading: {
      default: false
    }
  },
  mixins: [mixins],
  data() {
    return {
      selectTipoCuenta: null,
      selectEntidadBancaria: null,
      cuentaBancaria: '',
      longitudMinBancaria: 0,
      longitudMaxBancaria: 0,
      cuentaInterbancaria: '',
      longitudMaxInterbancaria: 0,
      rulesBancario: [
        (v) =>
          (v && v.length == this.longitudMaxBancaria) ||
          (v.length == 10 && this.selectEntidadBancaria.codigoBanco == 3) ||
          'El número de dígitos de la cuenta no es válido'
      ],
      rulesInterbancario: [
        (v) =>
          (v && v.length == this.longitudMaxInterbancaria) ||
          'El número de dígitos de la cuenta no es válido'
      ]
    }
  },
  methods: {
    changeTipoCuenta(idTipoCuenta) {
      this.cuentaBancaria = ''
      this.cuentaInterbancaria = ''
      if (this.selectEntidadBancaria) {
        this.longitudMaxInterbancaria = 20
        if (idTipoCuenta == 1) {
          this.longitudMaxBancaria = this.selectEntidadBancaria.cantidadDigitosAhorro
        } else if (idTipoCuenta == 2) {
          this.longitudMaxBancaria = this.selectEntidadBancaria.cantidadDigitosCorriente
        } else {
          this.longitudMaxBancaria = 0
        }
        if (this.selectEntidadBancaria.codigoBanco == 3) {
          this.longitudMinBancaria = 10
        } else {
          this.longitudMinBancaria = this.longitudMaxBancaria
        }
      } else {
        this.longitudMaxBancaria = 0
        this.longitudMaxInterbancaria = 0
      }
    },
    changeEntidadBancaria(entidadBancaria) {
      this.cuentaBancaria = ''
      this.cuentaInterbancaria = ''
      if (this.selectTipoCuenta) {
        this.longitudMaxInterbancaria = 20
        if (this.selectTipoCuenta.id == 1) {
          this.longitudMaxBancaria = entidadBancaria.cantidadDigitosAhorro
        } else if (this.selectTipoCuenta.id == 2) {
          this.longitudMaxBancaria = entidadBancaria.cantidadDigitosCorriente
        } else {
          this.longitudMaxBancaria = 0
        }
        if (this.selectEntidadBancaria.codigoBanco == 3) {
          this.longitudMinBancaria = 10
        } else {
          this.longitudMinBancaria = this.longitudMaxBancaria
        }
      } else {
        this.longitudMaxBancaria = 0
        this.longitudMaxInterbancaria = 0
      }
    },
    confirmPagoBanco() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          if (!this.validateLengthCuentaBancaria(this.cuentaBancaria)) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal:
                'El número de dígitos de la cuenta bancaria no es válido',
              maxWidth: 350,
              estadoModal: true
            })
          } else if (
            !this.validateLengthCuentaInterbancaria(this.cuentaInterbancaria)
          ) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal:
                'El número de dígitos de la cuenta interbancaria no es válido',
              maxWidth: 350,
              estadoModal: true
            })
          } else if (!this.validateFormatCuenta(this.cuentaBancaria)) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: 'La cuenta bancaria debe contener solo números',
              maxWidth: 350,
              estadoModal: true
            })
          } else if (!this.validateFormatCuenta(this.cuentaInterbancaria)) {
            this.$store.commit('ui/SET_OPENDIALOGALERT', {
              imgModal: 'warning',
              tituloModal: '¡Atención!',
              msgModal: 'La cuenta interbancaria debe contener solo números',
              maxWidth: 350,
              estadoModal: true
            })
          } else {
            this.$emit('confirmPagoBanco', {
              tipoCuenta: this.selectTipoCuenta.id,
              entidadBancariaOrigen: this.selectEntidadBancaria
                .entidadBancariaOrigen,
              entidadBancariaDestino: this.selectEntidadBancaria.codigoBanco,
              numeroCuentaBancaria: this.cuentaBancaria,
              numeroCuentaInterbancaria: this.cuentaInterbancaria
            })
          }
        }
      })
    },
    closePagoBanco() {
      this.$emit('closePagoBanco')
    },
    validateLengthCuentaBancaria(numCuenta) {
      if (
        numCuenta.length == this.longitudMaxBancaria ||
        (numCuenta.length == 10 && this.selectEntidadBancaria.codigoBanco == 3)
      ) {
        return true
      } else {
        return false
      }
    },
    validateLengthCuentaInterbancaria(numCuenta) {
      if (numCuenta.length == this.longitudMaxInterbancaria) {
        return true
      } else {
        return false
      }
    },
    validateFormatCuenta(numCuenta) {
      const REGEX_NUMEROS = /^[0-9]+$/
      const validateCuenta = REGEX_NUMEROS.exec(numCuenta)
      if (validateCuenta) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
/* /////////////////////////// */
  .error--text .v-text-field__details {
    padding: 0 !important;
  }
  .box-simulacion .plazo{
    margin-left: 4px;
  }
  .box-simulacion .v-input__slot {
    padding: 0 0 0 6px !important;
  }
  .container-input .v-input__slot {
    padding: 0 0 0 6px !important;
  }
  /* ///////////////// */
  .semi-round__container {
    padding: 0 15px;
  }
  .semi-round__content {
    border-left: 1px solid #f36e47;
    border-right: 1px solid #f36e47;
    border-bottom: 1px solid #f36e47;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 34px 20px 20px 20px;
  }
  .datos-simulacion {
    padding: 0 20px;
  }
  .box-simulacion {
    border: 1px solid #f36e47;
    padding: 2px;
    text-align: center;
    border-radius: 10px;
  }
  .label-simulacion {
    font-size: 0.8em;
    background-color: #f36e47;
    color: white;
    border-radius: 20px;
  }
  .container-input {
    padding: 20px 10px 0 10px;
  }
  .input-simulacion {
    width: 100%;
    text-align: center;
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
  .input-simulacion--select {
    text-align: center;
    width: 48%;
    border-radius: 4px;
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  .info-box {
    font-size: 0.75em;
    text-align: center;
    background-color: #f36e47;
    width: 80px;
    margin: 0 auto;
    color: white;
    padding: 1px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .button-simar-condicion {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .btn-primary {
    background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
    color: white;
  }

  .btn-secondary {
    background: #797979 !important;
    color: white;
  }
  .credit-conditions-container {
    margin-top: 50px;
  }
  .registra-correctamente-cuenta {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .registra-correctamente-cuenta span {
    font-size: 9px;
    line-height: 1;
    color: #939090;
    margin-left: 5px;
  }

</style>
