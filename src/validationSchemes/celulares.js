import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
} from 'vuelidate/lib/validators'

const REGISTRATION_DATA_ADDTIONAL = {
   
 
  department: {
    required,
  },
  province: {
    required,
  },
  district: {
    required,
  },
  maritalStatus: {
    required,
  },
  educationLevel: {
    required,
  },
   
}
 

export function getSchematicRegistrationData(
   
) {
  let base = REGISTRATION_DATA_ADDTIONAL
  return {
    form: base,
  }
}
