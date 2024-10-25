export const codPage = {
  LazyLoading: -1,
  LoadingComponent: 0,
  PRE_EVALUATION: 1,//OnBoarding
  POLICY_EVALUATION: 2,//Procesando
  CREDIT_APPROVAL: 3, //ProcesoAprobacion
  IDENTITY_VALIDATION: 4,//ValidacionIdentidad
  CONFIRMAR_DATOS: 5, //ConfirmarDatos
  CHOOSE_PAYMENT: 6, // Elegir medio de pago
  PAYMENT_DETAILS: 7, // Detalles de pago
  CONTRACT_DOCUMENTS: 8,//DocumentosValorados
  PAGINA_OBSERVADA: 9,//ObservadoPage
  ELECTRONIC_SIGNATURE: 10, //ElectronicSignature
  FELICITACION_PAGE: 11 //Felicitaciones
}

export const ResponseCode = {
  CORRECTO: '00',
  NO_SUPERO_VALIDACION_IDENTIDAD: '01',
  EXCEDIO_INTENTOS_24_HORAS: '02',
  EXCEDIO_INTENTOS_15_DIAS: '03',
  NO_CALIFICA_OFERTA: '04',
}

export const pagesCredinstante = [
  {
    step: codPage.LazyLoading,
    name: 'LazyLoading',
    nameSpace: 'credinstante',    
  },
  {
    step: codPage.LoadingComponent,
    name: 'LoadingComponent',
    nameSpace: 'credinstante',
  },
  {
    step: codPage.PRE_EVALUATION,
    name: 'OnBoarding',
    nameSpace: 'credinstante',
  },
  {
    step: codPage.POLICY_EVALUATION,
    name: 'Procesando',
    nameSpace: 'credinstante',
    numberSteps: Array(0).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
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
    step: codPage.IDENTITY_VALIDATION,
    name: 'ValidacionIdentidad',
    nameSpace: 'credinstante',
    numberSteps: Array(1).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
  },
  {
    step: codPage.CONFIRMAR_DATOS,
    name: 'ConfirmarDatos',
    nameSpace: 'credinstante',
    numberSteps: Array(2).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
  },  
  {
    step: codPage.CHOOSE_PAYMENT,
    name: 'ChoosePayment',
    nameSpace: 'credinstante',
    numberSteps: Array(3).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
  },  
  {
    step: codPage.PAYMENT_DETAILS,
    name: 'PaymentDetails',
    nameSpace: 'credinstante',
    numberSteps: Array(4).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
  },  
  {
    step: codPage.CONTRACT_DOCUMENTS,
    name: 'DocumentosValorados',
    nameSpace: 'credinstante',
    numberSteps: Array(5).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
  },
  {
    step: codPage.ELECTRONIC_SIGNATURE,
    name: 'ElectronicSignature',
    nameSpace: 'credinstante',
    numberSteps: Array(6).fill(''),
    imgProductStep: 'credInstante/credinstanteStep.png',
  },
  {
    step: codPage.CREDIT_APPROVAL,
    name: 'ProcesoAprobacion',
    nameSpace: 'credinstante',
    imgProductStep: 'credInstante/credinstanteStep.png',
  },
  {
    step: codPage.PAGINA_OBSERVADA,
    name: 'ObservadoPage',
    nameSpace: 'credinstante',
    imgProductStep: 'credInstante/credinstanteStep.png',
  },
  {
    step: codPage.FELICITACION_PAGE,
    name: 'FelicitacionPage',
    nameSpace: 'credinstante',
  },
]