export const ResponseCode = {
  CORRECTO: '00',  
  ENLACE_JWT_INCORRECTO: '06',
  ENLACE_JWT_CADUDO: '07',
  ERROR: '99',
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  PROSPECTO_EN_CURSO: '01',
  CLIENTE_NO_CUENTA_CON_INFORMACION_ASOCIADA: '03',
  DIRECCIONAR_PROSPECTO_A_RENOVACION: '04',
  NO_CALIFICA_A_CAMPANIA_LD_1500: '05',  
  NO_SUPERO_VALIDACION_IDENTIDAD: '08',
  EXCEDIO_INTENTOS_24_HORAS: '09',
  EXCEDIO_INTENTOS_15_DIAS: '10',
  NO_CALIFICA_OFERTA: '11',
}

export const actionsByResponseCode = {  
  [ResponseCode.PROSPECTO_EN_CURSO]: {
    message: 'PROSPECTO_EN_CURSO',
    statusCode: ResponseCode.PROSPECTO_EN_CURSO,
  },
  [ResponseCode.CLIENTE_NO_CUENTA_CON_INFORMACION_ASOCIADA]: {
    message: 'CLIENTE_NO_CUENTA_CON_INFORMACION_ASOCIADA',
    statusCode: ResponseCode.CLIENTE_NO_CUENTA_CON_INFORMACION_ASOCIADA,
  },
  [ResponseCode.DIRECCIONAR_PROSPECTO_A_RENOVACION]: {
    message: 'DIRECCIONAR_PROSPECTO_A_RENOVACION',
    statusCode: ResponseCode.DIRECCIONAR_PROSPECTO_A_RENOVACION,
  },
  [ResponseCode.NO_CALIFICA_A_CAMPANIA_LD_1500]: {
    message: 'NO_CALIFICA_A_CAMPANIA_LD_1500',
    statusCode: ResponseCode.NO_CALIFICA_A_CAMPANIA_LD_1500,
  },
  [ResponseCode.NO_SUPERO_VALIDACION_IDENTIDAD]: {
    img: 'warning',
    titulo: 'Lo sentimos',
    message: 'Usted no superó la validación de identidad. Intentalo de nuevo.',
    statusCode: ResponseCode.NO_SUPERO_VALIDACION_IDENTIDAD,
  },
  [ResponseCode.EXCEDIO_INTENTOS_24_HORAS]: {
    img: 'warning',
    titulo: 'Lo sentimos',
    message: 'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 24 horas.',
    statusCode: ResponseCode.EXCEDIO_INTENTOS_24_HORAS,
  },
  [ResponseCode.EXCEDIO_INTENTOS_15_DIAS]: {
    img: 'warning',
    titulo: 'Lo sentimos',
    message: 'Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 15 días.',
    statusCode: ResponseCode.EXCEDIO_INTENTOS_15_DIAS,
  },
  [ResponseCode.NO_CALIFICA_OFERTA]: {
    img: 'warning',
    titulo: 'Lo sentimos',
    message: 'Por ahora no tenemos una oferta disponible.',
    statusCode: ResponseCode.NO_CALIFICA_OFERTA,
  },
}

export const TypesDocuments = {
  DNI: 1,
  CE: 2,
}

export const MaritalStatus = {
  SOLTERO: 'SO',
  CASADO: 'CA',
  VIUDO: 'VI',
  DIVORCIADO: 'DI',
  CONVIVIENTE: 'CO',
}

export const Evaluation = {
  PENDIENTE: 0,
  APROBADO: 1,
  OBSERVADO: 2,
  RECHAZADO: 3,
}

export const Origen = {
  INDETERMINADO: 0,
  GOOGLE: 1,
  FACEBOOK: 2,
  WHATSAPP: 3,
  ORGANICO: 4,
  PROMOTOR: 5,
  ASESOR: 6,
  COMPARABIEN: 7,
  CAMPANIA: 8,
  BUSCA_CREDITO: 9,
  QR: 10,
}

export const Channel = {
  DIGITAL: 1,
  ALIDADOS_COMERCIALES: 2,
  PROMOTOR_EXTERNO: 3,
  PROMOTOR_INTERNO: 4,
  ATENCION_PRESENCIAL: 5,
  LD_RETANQUEO: 6,
  LD_1000: 8,
  RECHAZADOS_MAYO: 9,
  LD_FAE_MYPE: 10,
  EASY_TAXI: 11,
  COSECHA_I: 12,
  ATU: 13,
  CONVERSIONES_LD: 14,
  CANCELADOS: 15,
  CONSUMO: 16,
}

export const ProductCode = {
  SIN_DEFINIR: -1,
  MOTO: 28,
  MOTOTAXI: 29,
  COMPRA_DEUDA: 32,
  EXTRA_EFECTIVO: 33,
  NO_BANCARIZADOS: 35,
  MOTOFURGON: 36,
  MOTO_NO_BANCARIADOS: 37,
  CELULARES: 39,
  EQUIPOS_POS:40
}

export const TypeGuarantor = {
  AVAL_INMUEBLES: 'GM',
  AVAL_INGRESOS: 'GI',
};

export const EntityCode = {
  ACCESO_CREDITICIO: 1,
};