import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'

function PREEVALUATION_BASE() {
  return {
    documentType: {
      required,
    },
    documentNumber: {
      required,
      numeric,
      minLength: minLength(this.docLen),
      maxLength: maxLength(this.docLen),
    },
    profileType: {
      required,
    },
    maritalStatus: {
      required,
    },
    educationLevel: {
      required,
    },
    netRemuneration: {
      required,
      numeric,
    },
    cellPhoneNumber: {
      required,
      numeric,
      minLength: minLength(this.lengthTelefono),
      maxLength: minLength(this.lengthTelefono),
    },
    acceptTerms: {
      checked(val) {
        return val
      },
    },
    email: {
      email,
      maxLength: maxLength(this.lengthText),
    },
  }
}

export function getSchematicPreevaluation(hasCE, isAccesoCrediticio) {
  let base = PREEVALUATION_BASE.call(this)
  if (isAccesoCrediticio) {
    base = {
      ...base,
      productEntity: {
        required,
      },
    }
  }
  if (hasCE) {
    base = {
      ...base,
      birthdate: {
        required,
      },
    }
  }
  return {
    form: base,
  }
}
