import { ProductCode } from '~/enums/global-enums'
export const codPage = {
  PRE_EVALUATION: 1,
  POLICY_EVALUATION: 2,
  REGISTRATION_PERSONAL_DATA: 3,
  CREDI_SIMULATION: 4,
  DOCUMENT_REGISTRATION: 5,
  EVALUATION_SUBMISSION_CONFIRMATION: 6,
  EVALUATION_REJECTION: 7,
}

export const MotorcyTaxicleStatuses = {
  PROSPECTO_NUEVO: 0,
  PROSPECCION_CLIENTES_RECHAZADOS: 23,
  PROSPECCION_CLIENTES_PENDIENTE_EVALUAR: 24,
  PROSPECCION_CLIENTES_PRE_APROBADOS: 25,
  PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS: 26,
  APROBACION_SOLICITUDES_PENDIENTE_VALIDAR_SOLICITUD: 27,
  APROBACION_SOLICITUDES_PENDIENTE__AGENDAMIENTO_DOCUMENTOS: 30,
  APROBACION_SOLICITUDES_PENDIENTE_AGENDAMIENTO_CONVERUS: 34,
  PROSPECCION_CLIENTES_OBSERVADO: 90,
  PROSPECCION_CLIENTES_RECHAZADOS_01: 91,
  PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_01: 92,
  PROSPECCION_CLIENTES_PRE_APROBADOS_01: 93,
  ERROR_DATOS_ERRADOS_IDENTIDAD: -1,
}

export const actionsByProspectCodeMotoTaxi = {
  [codPage.PRE_EVALUATION]: [
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECTO_NUEVO, //0
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_RECHAZADOS, //23
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS, //25
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR, //24
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.APROBACION_SOLICITUDES_PENDIENTE_AGENDAMIENTO_CONVERUS, //34
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.APROBACION_SOLICITUDES_PENDIENTE_VALIDAR_SOLICITUD, //27
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_RECHAZADOS_01, //91
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_REJECTION,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_01, //92
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS_01, //93
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.APROBACION_SOLICITUDES_PENDIENTE__AGENDAMIENTO_DOCUMENTOS, //30
      shouldGoNextPage: true,
      nextPage: codPage.DOCUMENT_REGISTRATION,
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.ERROR_DATOS_ERRADOS_IDENTIDAD, //-1
      shouldShowModal: true,
      titulo: 'Estimado Cliente',
      message: 'Verifique su número de carnet y su fecha',
    },
  ],
  [codPage.POLICY_EVALUATION]: [
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_RECHAZADOS, //23
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_REJECTION,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR, //24
      shouldShowModal: true,
      reset: 'mototaxi',
      titulo: 'Estimado Cliente',
      message: 'Nos comunicaremos sobre el resultado de tu evaluación',
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS, //25
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
  ],
  [codPage.REGISTRATION_PERSONAL_DATA]: [
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_RECHAZADOS, //23
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_REJECTION,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR, //24
      shouldShowModal: true,
      message: 'Nos comunicaremos sobre el resultado de tu evaluación',
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS, //25
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_OBSERVADO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
  ],
  [codPage.CREDI_SIMULATION]: [
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS, //26
      shouldGoNextPage: true,
      nextPage: codPage.DOCUMENT_REGISTRATION,
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_OBSERVADO, //90
      shouldGoNextPage: true,
      nextPage: codPage.DOCUMENT_REGISTRATION,
    },
  ],
  [codPage.DOCUMENT_REGISTRATION]: [
    {
      prospectStatus:
        MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS, //26
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_SUBMISSION_CONFIRMATION,
    },
    {
      prospectStatus:
        MotorcyTaxicleStatuses.APROBACION_SOLICITUDES_PENDIENTE_AGENDAMIENTO_CONVERUS, //34
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_SUBMISSION_CONFIRMATION,
    },
    {
      prospectStatus: MotorcyTaxicleStatuses.PROSPECCION_CLIENTES_OBSERVADO, //90
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_SUBMISSION_CONFIRMATION,
    },
  ],
}

export const pagesMotoTaxi = [
  {
    step: codPage.PRE_EVALUATION, //1
    name: 'PreEvaluation',
    nameProduct: {
      mototaxi: 'Mototaxi',
      motofurgon: 'Motofurgón'
    },
    nameSpace: 'mototaxi',
    imgProduct: {
      mototaxi: 'mototaxi/motoTaxiHome.png',
      motofurgon: 'motofurgon/logo-motofurgon.png'
    },
    catalogs: [
      'listaTiposDocumentos',
      'listaTipoPerfil',
      'listaEstadosCiviles',
      'listaNivelesEducacion',
    ],
    codigoProducto: ProductCode.MOTOTAXI
  },
  {
    step: codPage.POLICY_EVALUATION, //2
    name: 'PolicyEvaluation',
    nameSpace: 'mototaxi',
    numberSteps: Array(0).fill(''),
    imgProductStep: 'mototaxi/motoTaxiStep.png',
    evaluationPhases: [
      {
        id: 1,
        state: false,
        time: 1000,
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
        time: 1000,
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
    nameSpace: 'mototaxi',
    imgProductStep: 'mototaxi/motoTaxiStep.png',
    numberSteps: Array(1).fill(''),
    catalogs: [
      'listaTiposDocumentos',
      'listaTiposResidencias',
      'listaActividadEconomica',
      'listaSectorEconomico',
      'listaProfesion',
      'listaCargaFamiliar',
      'listaTiposAvalista',
      'listaTiposLicencia',
    ],
  },
  {
    step: codPage.CREDI_SIMULATION, //4
    name: 'CreditSimulation',
    nameSpace: 'mototaxi',
    imgProductStep: 'mototaxi/motoTaxiStep.png',
    numberSteps: Array(2).fill(''),
    catalogs: ['listaPlazos', 'listaTiposCombustibles', 'M'],
  },
  {
    step: codPage.DOCUMENT_REGISTRATION, //5
    name: 'DocumentRegistration',
    nameSpace: 'mototaxi',
    imgProductStep: 'mototaxi/motoTaxiStep.png',
    numberSteps: Array(3).fill(''),
  },
  {
    step: codPage.EVALUATION_SUBMISSION_CONFIRMATION, //6
    name: 'EvaluationSubmissionConfirmation',
    nameSpace: 'mototaxi',
    imgProductStep: 'mototaxi/motoTaxiStep.png',
    numberSteps: Array(4).fill(''),
  },
  {
    step: codPage.EVALUATION_REJECTION, //7
    name: 'EvaluationRejection',
    nameSpace: 'mototaxi',
    imgProductStep: 'mototaxi/motoTaxiStep.png',
    numberSteps: Array(6).fill(''),
  },
]

export const defaultValues = {
  ECONOMIC_SECTOR: 28,
  ECONOMIC_ACTIVITY: 338,
  PROFESSION_AND_OCCUPATION: 37,
}
