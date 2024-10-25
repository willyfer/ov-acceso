import { codPage as codPageFirma } from '~/enums/firma/pages'

export const codPage = {
  PRE_EVALUATION: 1,
  POLICY_EVALUATION: 2,
  REGISTRATION_PERSONAL_DATA: 3,
  CREDI_SIMULATION: 4,
  DOCUMENT_REGISTRATION: 5,
  EVALUATION_SUBMISSION_CONFIRMATION: 6,
  CREDIT_APPROVAL: 7,
  EVALUATION_REJECTION: 8,
  ...codPageFirma,
}
export const ResponseCode = {
  CORRECTO: '00',
  NO_SUPERO_VALIDACION_IDENTIDAD: '01',
  EXCEDIO_INTENTOS_24_HORAS: '02',
  EXCEDIO_INTENTOS_15_DIAS: '03',
  NO_CALIFICA_OFERTA: '04',
  TOKEN_INCORRECTO: '01',
}

export const MotorcycleStatuses = {
  PROSPECTO_NUEVO: 0,
  PROSPECCION_CLIENTES_RECHAZADOS_OV: 23, //La ov rechaza el prospecto
  PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV: 24, //La ov aun no termina de evaluar el prospecto
  PROSPECCION_CLIENTES_EXISTE_PROCESO: 34, // Ya existe un prospecto en curso
  PROSPECCION_CLIENTES_PRE_APROBADOS_OV: 25, //La OV pre aprueba el prospecto
  PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV: 26, //Posterior a la pre evaluación el cliente completa los datos personales solicitados
  APROBACION_SOLICITUDES_PENDIENTE_VALIDAR_SOLICITUD_OV: 27, //Ocurre cuando el cliente adjunta la boleta de remuneración exigido por la OV (en algunos casos ) o si el asesor de backoffice observe el documento
  APROBACION_SOLICITUDES_SOLICITUDES_RECHAZADAS_WFCORE: 28, //Lo adjuntado por el cliente NO pasa las validaciones que el asesor de backoffice ha considerado
  APROBACION_SOLICITUDES_SOLICITUDES_OBSERVADAS_WFCORE: 29, //Lo adjuntado por el cliente es OBSERVADO según las validaciones que el asesor de backoffice ha considerado
  APROBACION_SOLICITUDES_SOLICITUDES_APROBADAS_WFCORE: 30, //Lo adjuntado por el cliente  PASA las validaciones que el asesor de backoffice ha considerado
  OTORGAMIENTO_CREDITO_DATOS_VEHICULO_REGISTRADO_WFCORE: 31, //El concesionario adjunta la información requerida relacionada al vehículo
  OTORGAMIENTO_CREDITO_REGISTRO_OBSERVADO_WFCORE: 32, //Lo adjuntado por el concesionario es observado por el backoffice
  OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE: 33, //Lo adjuntado por el concesionario es aprobado por el backoffice
  OTORGAMIENTO_CREDITO_CONTRACTUALES_FIRMADOS_OV: 10, //El cliente firma los contractuales en la OV
  ACTIVACION_CREDITO_ACTIVADOS_WFCORE: 11, //El prospecto es activado
  DESISTIMIENTO_CREDITO_DESISTIMIENTO_WFCORE: 12, //El prospecto es desistido
  OBSERVADO_SIMULACION_CREDITO: 90,
  //OBSERVADO_SIMULACION_CREDITO_APROBADO: 91,
  ERROR_DATOS_ERRADOS_IDENTIDAD: -1,
  ERROR_DATOS_ERRADOS_IDENTIDAD_MENOREDAD: -2,
  OTORGAMIENTO_CREDITO_CARTA_APROBACION: 91,
  OTORGAMIENTO_CREDITO_CARTA_PRE_APROBACION: 92
}

export const actionsByProspectCodeMotoNoBancarizados = {
  [codPage.PRE_EVALUATION]: [
    {
      prospectStatus: MotorcycleStatuses.PROSPECTO_NUEVO, //0
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus: MotorcycleStatuses.PROSPECCION_CLIENTES_RECHAZADOS_OV, //23
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus: MotorcycleStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS_OV, //25
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus:
        MotorcycleStatuses.DESISTIMIENTO_CREDITO_DESISTIMIENTO_WFCORE, //12
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus:
        MotorcycleStatuses.APROBACION_SOLICITUDES_SOLICITUDES_RECHAZADAS_WFCORE, //28
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus: MotorcycleStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV, //24
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_EXISTE_PROCESO, //34
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.APROBACION_SOLICITUDES_PENDIENTE_VALIDAR_SOLICITUD_OV, //27
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.APROBACION_SOLICITUDES_SOLICITUDES_OBSERVADAS_WFCORE, //29
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.APROBACION_SOLICITUDES_SOLICITUDES_APROBADAS_WFCORE, //30
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_DATOS_VEHICULO_REGISTRADO_WFCORE, //31
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_REGISTRO_OBSERVADO_WFCORE, //32
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //33
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_CONTRACTUALES_FIRMADOS_OV, //10
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus: MotorcycleStatuses.ACTIVACION_CREDITO_ACTIVADOS_WFCORE, //11
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus: MotorcycleStatuses.ERROR_DATOS_ERRADOS_IDENTIDAD, //-1
      shouldShowModal: true,
      titulo: 'Estimado Cliente',
      message: 'Verifique su número de carnet y su fecha',
    },
    {
      prospectStatus: MotorcycleStatuses.ERROR_DATOS_ERRADOS_IDENTIDAD_MENOREDAD, //-2
      shouldShowModal: true,
      titulo: 'Estimado Cliente',
      message: 'El DNI ingresado no es válido.',
    },
  ],
  [codPage.POLICY_EVALUATION]: [
    {
      prospectStatus: MotorcycleStatuses.PROSPECCION_CLIENTES_RECHAZADOS_OV, //23
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_REJECTION,
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV, //24
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Nos comunicaremos sobre el resultado de tu evaluación',
      reset: 'moto',
    },
    {
      prospectStatus: MotorcycleStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS_OV, //25
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
  ],
  [codPage.REGISTRATION_PERSONAL_DATA]: [
    {
      prospectStatus: MotorcycleStatuses.PROSPECCION_CLIENTES_RECHAZADOS_OV, //23
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_REJECTION,
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV, //24
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Nos comunicaremos sobre el resultado de tu evaluación',
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus: MotorcycleStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
  ],
  [codPage.CREDI_SIMULATION]: [
    {
      prospectStatus:
        MotorcycleStatuses.APROBACION_SOLICITUDES_SOLICITUDES_APROBADAS_WFCORE, //30
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    {
      prospectStatus:
        MotorcycleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    {
      prospectStatus: MotorcycleStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.DOCUMENT_REGISTRATION,
    },
    {
      prospectStatus: MotorcycleStatuses.OBSERVADO_SIMULACION_CREDITO_APROBADO, //91
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    /*{
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_CARTA_APROBACION, //91
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_CARTA_PRE_APROBACION, //92
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },*/
  ],
  [codPage.DOCUMENT_REGISTRATION]: [
    {
      prospectStatus: MotorcycleStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
  ],
  [codPage.LOADING_PROCESS]: [
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //30
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_DETAIL,
    },
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_CONTRACTUALES_FIRMADOS_OV, //10
      shouldShowModal: true,
      message: 'Ya cuenta con un crédito aprobado',
    },
  ],
  [codPage.IDENTITY_VALIDATION]: [
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //0
      shouldGoNextPage: true,
      nextPage: codPage.CONTRACT_DOCUMENTS,
    },
    ////////////////////////CODIGOS DE RESPUESTA/////////////////////////
    {
      prospectStatus: ResponseCode.NO_SUPERO_VALIDACION_IDENTIDAD, //01
      shouldShowModal: true,
      message: 'Lo sentimos, Usted no superó la validación de identidad.',
      reload: true,
    },
    {
      prospectStatus: ResponseCode.EXCEDIO_INTENTOS_24_HORAS, //02
      shouldShowModal: true,
      message:
        'Lo sentimos, Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 24 horas.',
      push: '/',
    },
    {
      prospectStatus: ResponseCode.EXCEDIO_INTENTOS_15_DIAS, //03
      shouldShowModal: true,
      message:
        'Lo sentimos, Ha excedido el número de intentos permitidos. Vuelva a intentarlo dentro de 15 días.',
      push: '/',
    },
    {
      prospectStatus: ResponseCode.NO_CALIFICA_OFERTA, //04
      shouldShowModal: true,
      message: 'Por ahora no tenemos una oferta disponible.',
      push: '/',
    },
  ],
  [codPage.CONTRACT_DOCUMENTS]: [
    {
      prospectStatus:
        MotorcycleStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //0
      shouldGoNextPage: true,
      nextPage: codPage.ELECTRONIC_SIGNATURE,
    },
  ],
  [codPage.ELECTRONIC_SIGNATURE]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //00
      shouldGoNextPage: true,
      nextPage: codPage.CONGRATULATIONS_CREDIT,
    },
    {
      prospectStatus: ResponseCode.TOKEN_INCORRECTO, //01
      shouldShowModal: true,
      message: 'Lo sentimos, el token ingresado es incorrecto.',
    },
  ],
}

export const pagesMoto = [
  {
    step: codPage.PRE_EVALUATION, //1
    name: 'PreEvaluation',
    nameSpace: 'moto',
    nameProduct: 'Moto',
    imgProduct: 'moto/motoHome.png',
    catalogs: [
      'listaTiposDocumentos',
      'listaTipoPerfil',
      'listaEstadosCiviles',
      'listaNivelesEducacion'
    ],
    /* codigoProducto: ProductCode.MOTO */
  },
  {
    step: codPage.POLICY_EVALUATION, //2
    name: 'PolicyEvaluation',
    nameSpace: 'moto',
    numberSteps: Array(0).fill(''),
    imgProductStep: 'moto/motoStep.png',
    evaluationPhases: [
      {
        id: 1,
        state: false,
        time: 2000,
        texto: 'Cargando Datos',
        icono: 'CargandoDatos.png',
      },
      {
        id: 2,
        state: false,
        time: 1000,
        texto: 'Verificando',
        icono: 'Verificando.png',
      },
      {
        id: 3,
        state: false,
        time: 2000,
        texto: 'Validando',
        icono: 'Validando.png',
      },
      {
        id: 4,
        state: false,
        texto: 'Evaluando',
        icono: 'Evaluando.png',
      },
    ],
  },
  {
    step: codPage.REGISTRATION_PERSONAL_DATA, //3
    name: 'RegistrationPersonalData',
    nameSpace: 'moto',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(1).fill(''),
    catalogs: [
      'listaTiposDocumentos',
      'listaTiposResidencias',
      'listaActividadEconomica',
      'listaSectorEconomico',
      'listaProfesion',
      'listaCargaFamiliar',
      'listaTipoUsoMoto'
    ],
  },
  {
    step: codPage.CREDI_SIMULATION, //4
    name: 'CreditSimulation',
    nameSpace: 'moto',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(2).fill(''),
    catalogs: ['M'],
  },
  {
    step: codPage.DOCUMENT_REGISTRATION, //5
    name: 'DocumentRegistration',
    nameSpace: 'moto',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(3).fill(''),
  },
  {
    step: codPage.EVALUATION_SUBMISSION_CONFIRMATION, //6
    name: 'EvaluationSubmissionConfirmation',
    nameSpace: 'moto',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(4).fill(''),
  },
  {
    step: codPage.CREDIT_APPROVAL, //7
    name: 'CreditApproval',
    nameSpace: 'moto',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(5).fill(''),
  },
  {
    step: codPage.EVALUATION_REJECTION, //8
    name: 'EvaluationRejection',
    nameSpace: 'moto',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(6).fill(''),
  },
]
