<template>
  <div class="preevaluate-form">
    <div class="preevaluate-form__container">
      <div class="preevaluate-form__title">Ingresa tus datos y evalúate</div>
      <div class="preevaluate-form__inputs">
        <form>
          <v-select
            v-if="isAccesoCrediticio"
            v-model="form.productEntity"
            :items="listaEntidadesProducto"
            item-text="no_entida"
            item-value="co_entida"
            label="Entidad del producto"
            outlined
            dense
            required
            :error-messages="productEntityErrors"
            @change="$v.form.productEntity.$touch()"
            @blur="$v.form.productEntity.$touch()"
          ></v-select>
          <v-select
            v-model="form.documentType"
            :items="listaTiposDocumentos"
            item-text="tipdoc"
            item-value="id"
            label="Tipo de Documento"
            outlined
            dense
            required
            :error-messages="documentTypeErrors"
            @change="$v.form.documentType.$touch()"
            @blur="$v.form.documentType.$touch()"
          ></v-select>
          <v-text-field
            v-model="form.documentNumber"
            label="Número de Documento"
            :maxlength="docLen"
            :minlength="docLen"
            outlined
            dense
            required
            :error-messages="documentNumberErrors"
            @input="$v.form.documentNumber.$touch()"
            @blur="$v.form.documentNumber.$touch()"
          ></v-text-field>
          <v-menu
            v-if="hasCE"
            v-model="menuBirthdate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Fecha de Nacimiento"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
                :error-messages="birthdateErrors"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.birthdate"
              required
              @blur="$v.form.birthdate.$touch()"
              @input="setBirthdate()"
            ></v-date-picker>
          </v-menu>
          <v-select
            v-model="form.profileType"
            :items="listaTipoPerfil"
            item-text="tipo"
            item-value="id"
            label="Selecciona tu tipo de perfil"
            outlined
            dense
            required
            :error-messages="profileTypeErrors"
            @change="$v.form.profileType.$touch()"
            @blur="$v.form.profileType.$touch()"
          ></v-select>
          <v-select
            v-model="form.maritalStatus"
            :items="listaEstadosCiviles"
            item-text="name"
            item-value="id"
            label="Selecciona tu estado civil"
            outlined
            dense
            required
            :error-messages="maritalStatusErrors"
            @change="$v.form.maritalStatus.$touch()"
            @blur="$v.form.maritalStatus.$touch()"
          ></v-select>
          <v-select
            v-model="form.educationLevel"
            :items="listaNivelesEducacion"
            item-text="name"
            item-value="id"
            label="Selecciona tu nivel de educación"
            outlined
            dense
            required
            :error-messages="educationLevelErrors"
            @change="$v.form.educationLevel.$touch()"
            @blur="$v.form.educationLevel.$touch()"
          ></v-select>
          <v-text-field
            v-if="isNetRemuneration"
            v-model="form.netRemuneration"
            label="ingresa tu remuneración neta"
            dense
            outlined
            required
            prefix="S/"
            type="number"
            :error-messages="netRemunerationErrors"
            @input="$v.form.netRemuneration.$touch()"
            @blur="$v.form.netRemuneration.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="form.cellPhoneNumber"
            label="Número de celular"
            outlined
            dense
            required
            :maxlength="lengthTelefono"
            :minlength="lengthTelefono"
            :error-messages="cellPhoneNumberErrors"
            @input="$v.form.cellPhoneNumber.$touch()"
            @blur="$v.form.cellPhoneNumber.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Correo electrónico"
            outlined
            dense
            :error-messages="emailErrors"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
          ></v-text-field>
          <v-checkbox
            v-model="form.acceptTerms"
            required
            :error-messages="acceptTermsErrors"
            @change="$v.form.acceptTerms.$touch()"
            @blur="$v.form.acceptTerms.$touch()"
          >
            <template v-slot:label>
              <div class="preevaluate-form__terminos">
                Acepto los
                <span
                  @click="openTermsConditions"
                  class="preevaluate-form__terminos-orange"
                >
                  Términos y Condiciones y las Políticas de Privacidad de Datos.
                </span>
              </div>
            </template>
          </v-checkbox>
        </form>
      </div>
    </div>
    <div class="preevaluate-form__container-button">
      <SharedButton
        text="solicitar"
        :buttonOrange="true"
        :totalWidth="60"
        @click="sendPreevaluation"
      />
    </div>
    <SnackbarInvalid ref="snackbarInvalid" />
  </div>
</template>

<script>
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'
import SharedButton from '@/components/shared/SharedButton'
import SnackbarInvalid from '@/components/modals/SnackbarInvalid'
import { dateFormatSend } from '@/utils/helpers'
import { TypesDocuments, EntityCode, ProductCode } from '@/enums/global-enums'
import { getSchematicPreevaluation } from '@/validationSchemes/shared'

export default {
  name: 'PreevaluationForm',
  components: {
    SharedButton,
    SnackbarInvalid,
  },
  props: {
    listaTiposDocumentos: { type: Array, default: () => [] },
    listaEstadosCiviles: { type: Array, default: () => [] },
    listaNivelesEducacion: { type: Array, default: () => [] },
    listaTipoPerfil: { type: Array, default: () => [] },
    listaEntidadesProducto: { type: Array, default: () => [] },
    canal: { type: Number, default: null },
    channel: { type: Number, default: null },
    codigoEntidad: { type: Number, default: null },
    codigoUsuario: { type: Number, default: null },
    productCode: { type: Number, default: null },
  },
  validations() {
    return getSchematicPreevaluation.call(
      this,
      this.hasCE,
      this.isAccesoCrediticio,
      this.isNetRemuneration
    )
  },
  data() {
    return {
      menuBirthdate: false,
      TypesDocuments: TypesDocuments,
      EntityCode: EntityCode,
      form: {
        productEntity: null,
        documentType: '',
        documentNumber: '',
        profileType: '',
        maritalStatus: '',
        educationLevel: '',
        cellPhoneNumber: '',
        email: '',
        acceptTerms: true,
        birthdate: '',
        netRemuneration: 0,
      },
      lengthText: 50,
      lengthTelefono: 9,
    }
  },
  computed: {
    computedDateFormatted() {
      if (!this.form.birthdate) return null
      const [year, month, day] = this.form.birthdate.split('-')
      return `${day}/${month}/${year}`
    },
    productEntityErrors() {
      const errors = []
      if (!this.$v.form.productEntity.$dirty) return errors
      !this.$v.form.productEntity.required && errors.push('Campo requerido')
      return errors
    },
    documentTypeErrors() {
      const errors = []
      if (!this.$v.form.documentType.$dirty) return errors
      !this.$v.form.documentType.required && errors.push('Campo requerido')
      return errors
    },
    documentNumberErrors() {
      const errors = []
      if (!this.$v.form.documentNumber.$dirty) return errors
      !this.$v.form.documentNumber.numeric &&
        errors.push('El campo solo debe contener números')
      !this.$v.form.documentNumber.minLength &&
        errors.push(`El campo debe contener ${this.docLen} dígitos`)
      !this.$v.form.documentNumber.maxLength &&
        errors.push(`El campo debe contener ${this.docLen} dígitos`)
      !this.$v.form.documentNumber.required && errors.push('Campo requerido')
      return errors
    },
    profileTypeErrors() {
      const errors = []
      if (!this.$v.form.profileType.$dirty) return errors
      !this.$v.form.profileType.required && errors.push('Campo requerido')
      return errors
    },
    maritalStatusErrors() {
      const errors = []
      if (!this.$v.form.maritalStatus.$dirty) return errors
      !this.$v.form.maritalStatus.required && errors.push('Campo requerido')
      return errors
    },
    educationLevelErrors() {
      const errors = []
      if (!this.$v.form.educationLevel.$dirty) return errors
      !this.$v.form.educationLevel.required && errors.push('Campo requerido')
      return errors
    },
    cellPhoneNumberErrors() {
      const errors = []
      if (!this.$v.form.cellPhoneNumber.$dirty) return errors
      !this.$v.form.cellPhoneNumber.required && errors.push('Campo requerido')
      !this.$v.form.cellPhoneNumber.numeric &&
        errors.push('El campo solo debe contener números')
      !this.$v.form.cellPhoneNumber.minLength &&
        errors.push(`El campo debe contener ${this.lengthTelefono} dígitos`)
      !this.$v.form.cellPhoneNumber.maxLength &&
        errors.push(`El campo debe contener ${this.lengthTelefono} dígitos`)
      return errors
    },
    netRemunerationErrors() {
      const errors = []
      if (!this.$v.form.netRemuneration.$dirty) return errors
      !this.$v.form.netRemuneration.numeric &&
        errors.push('El campo solo debe contener números')
      !this.$v.form.netRemuneration.required && errors.push('Campo requerido')
      return errors
    },
    acceptTermsErrors() {
      const errors = []
      if (!this.$v.form.acceptTerms.$dirty) return errors
      !this.$v.form.acceptTerms.checked && errors.push('Campo requerido')
      return errors
    },
    birthdateErrors() {
      const errors = []
      if (!this.$v.form.birthdate.$dirty) return errors
      !this.$v.form.birthdate.required && errors.push('Campo requerido')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Debe colocar un Email válido')
      !this.$v.form.email.maxLength &&
        errors.push(`El campo debe contener ${this.lengthText} dígitos`)
      return errors
    },
    docLen() {
      if (this.form.documentType == 1) {
        return 8
      } else if (this.form.documentType == 2) {
        return 9
      } else {
        return 0
      }
    },
    ///////////////////////
    hasCE() {
      return this.form.documentType == this.TypesDocuments.CE
    },
    isAccesoCrediticio() {
      return this.codigoEntidad == this.EntityCode.ACCESO_CREDITICIO
    },
    isNetRemuneration() {
      return (
        (this.productCode === ProductCode.MOTO &&
          this.form.profileType === 'DF') ||
        (this.productCode === ProductCode.SIN_DEFINIR &&
          this.form.profileType === 'DF')
      )
    },
  },
  methods: {
    sendPreevaluation() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store.commit(
          'moto/SET_NET_REMUNERATION',
          parseInt(this.form.netRemuneration)
        )
        const data = {
          tipoDocumento: this.form.documentType,
          documento: this.form.documentNumber,
          tipoPerfil: this.form.profileType,
          estadoCivil: this.form.maritalStatus,
          nivelEducacion: this.form.educationLevel,
          telefono: this.form.cellPhoneNumber,
          correo: this.form.email,
          terminos: this.form.acceptTerms,
          fechaNacimiento: dateFormatSend(this.form.birthdate),
          codigoProducto: this.productCode,
          codigoUsuario: this.codigoUsuario,
          canalAtencion: this.canal,
          remuneracion: parseInt(this.form.netRemuneration),
          ingresoNeto: parseInt(this.form.netRemuneration),
          codigoEntidad: this.form.productEntity
            ? this.form.productEntity
            : this.codigoEntidad,
          channel: this.channel,
          origen: 4,
        }
        this.$emit('send-preevaluation', data)
      } else this.$refs.snackbarInvalid.open()
    },
    setBirthdate() {
      this.$v.form.birthdate.$touch()
      this.menuBirthdate = false
    },
    openTermsConditions(event) {
      event.stopPropagation()
      event.preventDefault()
      event.cancelBubble = true
      event.stopImmediatePropagation()
      //window.open("https://docs.google.com/document/u/2/d/e/2PACX-1vRqasv434StE7u5jDuWj-3h_ATyQH2y6DXh8PnJX4UDw9V5oDkVb0pfGL54dUW1ow/pub","blank", );
      this.$emit('open-terms-conditions')
    },
  },
}
</script>

<style lang='scss'>
.preevaluate-form {
  &__container {
    border: 1px solid #ff4e00;
    border-radius: 24px;
    padding: 6px 6px 40px 6px;
    margin: 0 22px 0 22px;
  }
  &__title {
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
    color: white;
    font-size: 18px;
  }
  &__subtitle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 20px 0;
  }
  &__inputs {
    margin: 40px 16px 0 16px;
  }
  &__terminos {
    font-size: 10px;
    font-weight: bold;
    line-height: 16px;
  }
  &__terminos-orange {
    color: #ff4e00;
  }
  &__container-button {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .v-text-field.v-text-field--enclosed.error--text .v-text-field__details {
    margin-top: 0px !important;
    margin-bottom: 14px !important;
  }
}
</style>