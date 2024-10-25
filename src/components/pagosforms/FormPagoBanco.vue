<template>
  <form ref="formPagoBanco" @submit.prevent="confirmPagoBanco">
    <v-card>
      <v-card-title> Forma de Pago - Banco </v-card-title>
      <v-card-subtitle>
        <p class="mb-0">
          Debes registrar solo la cuenta bancaria del titular del DNI para que
          el préstamo se active.
        </p>
        <ul>
          <li><b>La cuenta bancaria debe ser en soles.</b></li>
          <li><b>No se aceptan en dólares.</b></li>
          <li><b>No se aceptan cuentas bancarias de terceros.</b></li>
        </ul>
      </v-card-subtitle>
      <v-card-text class="pt-1">
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
          :counter="longitudMaxBancaria"
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
          :counter="longitudMaxInterbancaria"
          :maxlength="longitudMaxInterbancaria"
          :minlength="longitudMaxInterbancaria"
          data-vv-name="cuentaInterbancaria"
          data-vv-as="Cuenta Interbancaria"
          :error-messages="errors.collect('cuentaInterbancaria')"
          :rules="rulesInterbancario"
        ></v-text-field>
        <p class="footer-text mb-0">
          Registra correctamente tu cuenta bancaria. De lo contrario solo
          tendrás una oportunidad de corregirla, dentro de un plazo de 3 días
          desde que se te notifique.
          <br />
          <b>
            Si usted, no tiene una cuenta bancaria, no se preocupe, abra una en
            su banco de confianza y regrese a esta pantalla. Lo esperamos.
          </b>
        </p>
      </v-card-text>
      <v-card-actions class="action-pagos">
        <v-row class="mx-0 mb-2">
          <v-col cols="12" sm="6" class="pb-0">
            <v-btn class="action-pagos__cancelar mx-0" @click="closePagoBanco"
              >CANCELAR</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6" class="pb-0">
            <v-btn
              class="action-pagos__confirmar mx-0"
              type="submit"
              :color="color"
              :loading="loading"
              >OK</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
import { mixins } from '@/mixins/mixin.js'
export default {
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
.footer-text {
  font-size: 12px;
}
.action-pagos__cancelar {
  width: 100%;
  background-color: #808080 !important;
  color: white;
}
.action-pagos__confirmar {
  width: 100%;
  color: white;
}
</style>
