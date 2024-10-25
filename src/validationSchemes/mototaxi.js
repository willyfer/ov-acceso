import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'

const REGISTRATION_PERSONAL_DATA_BASE = {
  guarantorDriverLicense: {
    required,
  },
  familyBurden: {
    required,
  },
  department: {
    required,
  },
  province: {
    required,
  },
  district: {
    required,
  },
  address: {
    required,
  },
  economicSector: {
    required,
  },
  economicActivity: {
    required,
  },
  professionOccupation: {
    required,
  },
  workDate: {
    required,
  },
}
const REGISTRATION_PERSONAL_DATA_GUARANTOR_BASE = {
  guarantorType: {
    required,
  },
  guarantorTypeDocumentType: {
    required,
  },
  guarantorDocumentNumber: {
    required,
  },
  guarantorDepartment: {
    required,
  },
  guarantorProvince: {
    required,
  },
  guarantorDistrict: {
    required,
  },
  guarantorAddress: {
    required,
  },
  guarantorLatitude: {
    required,
  },
  guarantorLongitude: {
    required,
  },
}

export function getSchematicRegistrationPersonalData(
  isMarried,
  isAvalist,
  hasCE,
  isAvalIngresos,
  hasGuarantorCE,
  docLen
) {
  let base = REGISTRATION_PERSONAL_DATA_BASE
  if (isMarried) {
    base = {
      ...base,
      documentType: {
        required,
      },
      documentNumber: {
        required,
        minLength: minLength(docLen),
        maxLength: maxLength(docLen),
        numeric,
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
  if (isAvalist) {
    base = {
      ...base,
      ...REGISTRATION_PERSONAL_DATA_GUARANTOR_BASE,
    }
  }
  if (hasGuarantorCE) {
    base = {
      ...base,
      guarantorBirthDate: {
        required,
      },
    }
  }
  if (isAvalIngresos) {
    base = {
      ...base,
      guarantorNetRemuneration: {
        required,
      },
    }
  }
  return {
    form: base,
  }
}
