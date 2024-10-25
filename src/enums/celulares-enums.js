export const codPage = {

  PRE_EVALUATION: 1,//OnBoarding
  OFERTA: 2,//simulacion de oferta
  CONFIRMAR_OFERTA: 3,//confirmar oferta
  VALIDACION_IDENTIDAD: 4,// validar identidad preguntas
  DOCUMENTOS_ADICIONALES:5 // formulario de datos adicionales
}

export const ResponseCode = {
  CORRECTO: '00',
  DNI_NO_ENCONTRADO: '03',
}

export const pagesCelulares = [
  {
    step: codPage.PRE_EVALUATION, //1
    name: 'OnBoarding',
    nameSpace: 'celulares',
    nameProduct: 'Celulares',
    imgProduct: 'celulares/motoHome.png',
    catalogs: [],
  },
  {
    step: codPage.OFERTA, //2
    name: 'Oferta',
    nameSpace: 'celulares',
    nameProduct: 'Celulares',
    imgProduct: 'celulares/motoHome.png',
    catalogs: [],
  },
  {
    step: codPage.CONFIRMAR_OFERTA,
    name: 'ConfirmarOferta',
    nameSpace: 'celulares',
    numberSteps: Array(2).fill(''),
    imgProductStep: 'celulares/credinstanteStep.png',
  },
  {
    step: codPage.VALIDACION_IDENTIDAD,
    name: 'ValidacionIdentidad',
    nameSpace: 'celulares',
    numberSteps: Array(3).fill(''),
    imgProductStep: 'celulares/credinstanteStep.png',

  },
  {
    step: codPage.DATOS_ADICIONALES,
    name: 'DatosAdicionales',
    nameSpace: 'celulares',
    numberSteps: Array(4).fill(''),
    imgProductStep: 'celulares/credinstanteStep.png',
    catalogs: [
      'listaEstadosCiviles',
      'listaNivelesEducacion',
    ],
  },
  {
    step: codPage.VISTA_CONTRACTUALES,
    name: 'DocumentosValorados',
    nameSpace: 'celulares',
    numberSteps: Array(5).fill(''),
    imgProductStep: 'celulares/credinstanteStep.png',
  },
  {
    step: codPage.INGRESAR_TOKEN_FIRMAS,
    name: 'ElectronicSignature',
    nameSpace: 'celulares',
    imgProductStep: 'celulares/credinstanteStep.png',
  },
  {
    step: codPage.APROBAR_CREDITO,
    name: 'ProcesoAprobacion',
    nameSpace: 'celulares',
    imgProductStep: 'celulares/credinstanteStep.png',
  },

]
export const CelularesStatuses = {
  PROSPECTO_NUEVO: 0,
  PROSPECCION_CLIENTES_RECHAZADOS_OV: 23, //La ov rechaza el prospecto
  PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV: 24, //La ov aun no termina de evaluar el prospecto
  PROSPECCION_CLIENTES_EXISTE_PROCESO: 34, // Ya existe un prospecto en curso
  PROSPECCION_CLIENTES_PRE_APROBADOS_OV: 25, //La OV pre aprueba el prospecto
  ERROR_PROSPECCION_DNI_NO_ENCONTRADO: 3,

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
  ERROR_DATOS_ERRADOS_IDENTIDAD: -1,
  ERROR_DATOS_ERRADOS_IDENTIDAD_MENOREDAD: -2,
  OTORGAMIENTO_CREDITO_CARTA_APROBACION: 91,
  OTORGAMIENTO_CREDITO_CARTA_PRE_APROBACION: 92
}
export const actionsByProspectCodeCelulares = {
  [codPage.PRE_EVALUATION]: [
    {
      prospectStatus: CelularesStatuses.PROSPECTO_NUEVO, //0
      shouldGoNextPage: true,
      nextPage: codPage.OFERTA,
    },
     
    {
      prospectStatus: CelularesStatuses.PROSPECCION_CLIENTES_RECHAZADOS_OV, //23
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus: CelularesStatuses.PROSPECCION_CLIENTES_PRE_APROBADOS_OV, //25
      shouldGoNextPage: true,
      nextPage: codPage.REGISTRATION_PERSONAL_DATA,
    },
    {
      prospectStatus:
        CelularesStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus:
        CelularesStatuses.DESISTIMIENTO_CREDITO_DESISTIMIENTO_WFCORE, //12
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus:
        CelularesStatuses.APROBACION_SOLICITUDES_SOLICITUDES_RECHAZADAS_WFCORE, //28
      shouldGoNextPage: true,
      nextPage: codPage.POLICY_EVALUATION,
    },
    {
      prospectStatus: CelularesStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus: CelularesStatuses.ERROR_PROSPECCION_DNI_NO_ENCONTRADO, //03
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Estimado Cliente',
      message: 'El número de dni ingresado no es válido'
    },
    {
      prospectStatus:
        CelularesStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV, //24
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.PROSPECCION_CLIENTES_EXISTE_PROCESO, //34
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.APROBACION_SOLICITUDES_PENDIENTE_VALIDAR_SOLICITUD_OV, //27
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.APROBACION_SOLICITUDES_SOLICITUDES_OBSERVADAS_WFCORE, //29
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.APROBACION_SOLICITUDES_SOLICITUDES_APROBADAS_WFCORE, //30
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_DATOS_VEHICULO_REGISTRADO_WFCORE, //31
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_REGISTRO_OBSERVADO_WFCORE, //32
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //33
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_CONTRACTUALES_FIRMADOS_OV, //10
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    {
      prospectStatus: CelularesStatuses.ACTIVACION_CREDITO_ACTIVADOS_WFCORE, //11
      shouldShowModal: true,
      message: 'Ya cuenta con solicitud en proceso',
    },
    
    {
      prospectStatus: CelularesStatuses.ERROR_DATOS_ERRADOS_IDENTIDAD_MENOREDAD, //-2
      shouldShowModal: true,
      titulo: 'Estimado Cliente',
      reload: true,
      message: 'El DNI ingresado no es válido.',
    },
  ],
  
  [codPage.OFERTA]: [
    {
      prospectStatus: CelularesStatuses.PROSPECCION_CLIENTES_RECHAZADOS_OV, //23
      shouldGoNextPage: true,
      nextPage: codPage.EVALUATION_REJECTION,
    },
    {
      prospectStatus:
        CelularesStatuses.PROSPECCION_CLIENTES_PENDIENTE_EVALUAR_OV, //24
      shouldShowModal: true,
      img: 'success',
      titulo: 'Estimado Cliente',
      message: 'Nos comunicaremos sobre el resultado de tu evaluación',
    },
    {
      prospectStatus:
        CelularesStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
    {
      prospectStatus: CelularesStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDI_SIMULATION,
    },
  ],
  [codPage.CREDI_SIMULATION]: [
    {
      prospectStatus:
        CelularesStatuses.APROBACION_SOLICITUDES_SOLICITUDES_APROBADAS_WFCORE, //30
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    {
      prospectStatus:
        CelularesStatuses.PROSPECCION_CLIENTES_DATOS_PERSONALES_ACTUALIZADOS_OV, //26
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    {
      prospectStatus: CelularesStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.DOCUMENT_REGISTRATION,
    },
  ],
  [codPage.DOCUMENT_REGISTRATION]: [
    {
      prospectStatus: CelularesStatuses.OBSERVADO_SIMULACION_CREDITO, //90
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
  ],
  [codPage.LOADING_PROCESS]: [
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //30
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_DETAIL,
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_CONTRACTUALES_FIRMADOS_OV, //10
      shouldShowModal: true,
      message: 'Ya cuenta con un crédito aprobado',
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_CARTA_APROBACION, //91
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_CARTA_PRE_APROBACION, //92
      shouldGoNextPage: true,
      nextPage: codPage.CREDIT_APPROVAL,
    },
  ],
  [codPage.IDENTITY_VALIDATION]: [
    {
      prospectStatus:
        CelularesStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //0
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
        CelularesStatuses.OTORGAMIENTO_CREDITO_REGISTRO_APROBADO_WFCORE, //0
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

export const CONTENIDO_TYC = `
      <ol>
          <li>
            <div>TÉRMINOS Y CONDICIONES DE CREDINSTANTE</div>
            <p style="text-align: justify;">
             Edpyme Acceso Crediticio S.A., en adelante “Acceso”, otorga créditos a los Usuarios Solicitantes hasta por los siguientes montos: S/. 1,000.00, S/ 1,250.00, S/ 2,000.00, S/2,500.00, S/ 3,500.00, S/4,000.00 o de S/4,500.00 sujeto a previa evaluación crediticia e información emitida por la SBS. El plazo para cancelar el crédito es de 12 o 18 meses, dependiendo el monto del crédito. El monto de las cuotas varía entre S/ 133.00 a S/ 350.00, lo cual estará sujeto al monto otorgado. Tasa de costo efectiva anual (TCEA) calculada en base a 360 días: 60% - 107%. Tasa de interés moratoria efectiva anual calculada en base a 360 días: 120% aplicable sobre el importe de la cuota vencida desde el primer día de atraso. Tipo de cambio referencial S/ 3.45 Dicha información se proporciona con arreglo de la Ley N° 28587 Ley Complementaria a la ley de Protección al Consumidor en Materia de Servicios Financieros y al Reglamento de Gestión de Conducta de Mercado, aprobado mediante Resolución SBS N° 3274-2017. Para mayor información sobre tasa de interés, comisiones y gastos, consulta el tarifario en acceso.com.pe. Por otro lado, en caso de existir alguna observación con la información brindada por el Usuario Solicitante, Acceso queda facultado, más no obligado, a comunicarle y solicitarle subsane las observaciones existentes para culminar con el proceso de aprobación del crédito; sin embargo, es responsabilidad del Usuario Solicitante brindar información clara y veraz. El Usuario Solicitante, ante la activación del crédito “CredInstante”, adquirirá de manera automática y gratuita el beneficio del Programa de “Asistencia Médica”, el cual también podrá solicitar, sin pago único, adicional o parcial, se brinde hasta a tres (3) de sus dependientes (esposa, hijos y/o padres), sin afectar al crédito otorgado por Acceso, para esto último deberá presentar su solicitud dentro de los treinta (30) primeros días calendarios de la activación de su crédito, llamando a los números telefónicos del Grupo MOK señalados al final del presente enunciado. El tiempo de activación de la “Asistencia Médica”, es por el mismo plazo de activación del crédito del Usuario Solicitante, dicha asistencia no se verá afectado si este último decide pre-cancelar la totalidad del crédito, subsistiendo así la “Asistencia Médica” hasta por el plazo que originalmente se suscribió el crédito. La información sobre la cobertura de la “Asistencia Médica”, será enviada al correo electrónico que el Usuario Solicitante haya brindado previamente en el formulario de evaluación de crédito, o de ser el caso, se enviará un mensaje de texto al número de celular designado por este, adjuntando el link de descarga de toda la información sobre el programa “Atención Médica” o la entrega de la información de manera física. El Usuario Solicitante designa a Acceso, de forma libre y voluntaria la cuenta de ahorros o cuenta corriente donde se destinará el desembolso del importe solicitado, el cual es de su titularidad. En caso Acceso verifique que la cuenta designada por éste es errónea, le solicitará por única vez que realice la corrección del número de cuenta al teléfono consignado en la solicitud de crédito en un plazo máximo de 3 días calendarios de comunicado a fin de proceder con la culminación del proceso de desembolso, en caso el Usuario Solicitante no cumpla con la corrección en el plazo señalado o ingrese una cuenta errónea por segunda vez se dejará sin efecto los documentos de crédito suscrito digitalmente por el Usuario Solicitante, y en consecuencia al no proceder con el desembolso se le comunicará la resolución del contrato al correo electrónico designado en la solicitud de crédito, sin penalización alguna en su contra. Quedando eximida Acceso de toda responsabilidad u obligación frente al Usuario Solicitante”.
            </p>
            <p>Más información en www.acceso.com.pe Dirección: Av. 28 de Julio 334, Jesús María Teléfono: (01) 605 5555 Para hacer uso de la asistencia médica, reclamos o incidencias, los clientes deben llamar a los siguientes números de Grupo MOK Lima: 7006642 - Provincia: 080074042 o comunicarse al siguiente correo de MOK: plataforma.peru@grupomok.com Cabe señalar que no se podrá hacer uso de la asistencia médica llamando directamente a las clínicas o acercándose a las mismas. Podrán hacer uso de la asistencia médica únicamente a través de MOK, llamándolos o enviándoles correo, será MOK quien gestione su solicitud para el uso de la asistencia médica.</p>
          </li>
          <li>
            <div>FACULTADES DE ACCESO</div>
            <p style="text-align: justify;">
              <b>ACCESO</b> se reserva el derecho de descartar las participaciones que pueda considerar fraudulentas, así como las que no reúnan los requisitos y condiciones establecidas en los presentes Términos y Condiciones, sin asumir ningún tipo de responsabilidad. <b>ACCESO</b> podrá introducir las modificaciones que juzgue convenientes en cuanto a las condiciones y características de la presente Campaña, sin que ello genere reclamo alguno por parte de los Clientes, lo cual los Clientes declaran conocer y aceptar.
            </p>
          </li>
          <li>
            <div>POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</div>
            <p style="text-align: justify;">
              <b>ACCESO</b> se preocupa por la protección y privacidad de los datos personales de sus Clientes y/o usuarios. Por ello, se ha comprometido a garantizar la absoluta confidencialidad de la información que recolecten o le sea proporcionada, en especial sobre datos personales; para lo cual, emplea altos estándares de seguridad, a fin de evitar su alteración, pérdida, tratamiento o uso no autorizado. Los Clientes y/o usuarios autorizan expresamente a <b>ACCESO</b> hacer uso y trato de los datos personales que brinde durante la presente Campaña, así como la información que se derive del mismo, de conformidad con sus Políticas de Privacidad contenidas en el siguiente link: https://acceso.com.pe/transparencia-acceso/politica-de-privacidad/ Los Clientes declaran haber leído y entendido el contenido de las mismas, en consecuencia, aceptas sus términos y condiciones y otorga su consentimiento libre, expreso, gratuito e indubitable para que <b>ACCESO</b> pueda dar tratamiento y hacer uso de sus datos personales de conformidad con sus Políticas de Privacidad. Asimismo, el Cliente en cualquier momento podrá revocar la autorización para el tratamiento de sus datos personales, de conformidad con lo previsto en la Ley 29733 y el Reglamento. Para ejercer este derecho, o cualquier otro previsto en dichas normas, deberás presentar tu solicitud entrando al link indicado en el párrafo precedente.
            </p>
          </li>
          <li>
            <div>USO DE IMAGEN</div>
            <p style="text-align: justify;">
              La participación en la presente Campaña importará la expresa autorización a <b>ACCESO</b> para la difusión pública, transmisión, retransmisión, reproducción o publicación de las filmaciones, fotografías, imágenes o grabaciones de las imágenes y voces de los Clientes, en todos los medios de comunicación (incluyendo, pero sin limitarse, a gráficos, visuales, audiovisuales, televisión por aire, antena, cable o satélite, radio e Internet) con fines publicitarios sin que el Cliente tenga derecho a reclamo de indemnización, contraprestación o retribución alguna. Los Clientes garantizan que no existen terceros que tengan derechos de exclusividad sobre la exhibición, publicación, difusión, reproducción o puesta en el comercio de su imagen, voz y datos personales. En caso contrario, se comprometen a mantener libres de toda responsabilidad a <b>ACCESO</b> respecto de cualquier reclamo que por este motivo pudieran formular terceros. Asimismo, prestan su conformidad para la publicación del material relacionado a su derecho de imagen respecto de las fotografías (u otras) que se puedan tomar como parte de la Campaña cediendo a <b>ACCESO</b> los derechos sobre los mismos. Esta cesión de derechos incluye los de reproducción, comunicación pública, distribución, puesta a disposición interactiva, edición por cualquier medio y formato, para todo el mundo y durante todo el tiempo de duración de los derechos de propiedad intelectual del material en el que se utilicen, sin que ello genere derechos a favor del Cliente de recibir contraprestación alguna. Los Clientes renuncian a cualquier reclamo que pudieran efectuar por la disminución de sus ingresos o cualquier otro daño o perjuicio que se les pudiera derivar de su participación en la Campaña o por la cesión de sus derechos de imagen objeto de estos Términos y Condiciones.
            </p>
          </li>
          <li>
            <div>RESPONSABILIDAD</div>
            <p style="text-align: justify;">
              <b>ACCESO</b> no se responsabilizará por cualquier daño o perjuicio que afecte a los ganadores del Sorteo detallado en el numeral 2. por caso fortuito o fuerza mayor, siendo de responsabilidad de los Ganadores cualquier responsabilidad al respecto luego de recibido el Premio. Asimismo, los Clientes y/o usuarios, Ganadores se comprometen a mantener indemne a <b>ACCESO</b>, sus empresas vinculadas, empleados o representantes ante cualquier reclamo, indemnización por daños, obligación, pérdida, deuda, costo o gasto que pudieren surgir como consecuencia de: (i) el incumplimiento por parte del Cliente de los Términos y Condiciones; (ii) la violación por parte de los Clientes de derechos de terceros, incluidos, entre otros, los derechos de autor, de propiedad o de privacidad; (iii) cualquier reclamo administrativo, extrajudicial y/o judicial por daños y/o cualquier otro concepto, como consecuencia de la utilización del premio del Sorteo o la obtención de algún beneficio. La presente obligación de defensa e indemnidad subsistirá aún una vez extinguidos los Términos y Condiciones.
            </p>
          </li>
          <li>
            <div>NORMATIVA APLICABLE</div>
            <p style="text-align: justify;">
              Para cualquier controversia que pudiera derivarse de la realización de la Campaña, los Clientes y/o usuarios y <b>ACCESO</b> se someterán a la jurisdicción de los jueces y tribunales del distrito Judicial de Lima. Los Clientes declaran su sometimiento a dichos jueces y tribunales. En todo lo no contenido en los Términos y Condiciones, serán de aplicación las leyes vigentes peruanas. Los Clientes y/o usuarios al aceptar los términos y condiciones descritos en el presente documento, declara/n estar conforme con estos.
            </p>
          </li>
          <li>
            <div>POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES</div>
            <p style="text-align: justify;">
              <b>Autorización de Datos Personales</b>
              Quien/es suscribe/n el presente documento (en adelante <b>EL/LOS CLIENTE/S</b> ) autoriza/n a <b>EDPYME ACCESO</b> de forma libre, inequívoca y expresa para que pueda dar tratamiento y hacer uso de mis/nuestros datos personales, por tiempo indefinido, obtenidos a través de la información que le proporcione/mos a <b>EDPYME ACCESO</b> de manera libre y voluntaria, cuando acceda/mos a sus sitios webs o landings page, participe/mos en eventos y/o promociones, envíe/mos consultas o comunique/mos incidencias, en general a través de cualquiera de sus plataformas , sea interacciones web, telefónica, presencial, documentaria y además de la información que se derive del uso de los servicios contratos con EDPYME
              ACCESO
              De conformidad con la Ley N° 29733 - Ley de Protección de Datos Personales y su Reglamento, aprobado mediante Decreto Supremo N° 003-2013-JUS, y cualquier otra disposición aplicable o modificatorias, sustitutorias y revocatorias (en adelante “La Norma”), <b>EDPYME ACCESO</b>, garantiza la absoluta confidencialidad de la información que recolecte o le proporcione/n <b>EL/LOS CLIENTE/S</b> , en especial sobre sus datos personales, para lo cual emplea altos estándares de seguridad, tomando las medidas técnicas, organizativas y legales necesarias a fin de evitar su alteración, perdida, tratamiento o acceso no autorizado.
              Por su parte, <b>EL/LOS CLIENTE/S</b> garantiza/n a <b>EDPYME ACCESO</b>, la exactitud, veracidad y autenticidad de los datos personales proporcionados, comprometiéndose a mantenerlos en vigencia. <b>EL/LOS CLIENTE/S</b> declara/n conocer que la falsedad de los datos personales proporcionados, constituye una falta grave frente a <b>EDPYME ACCESO</b>.
              Asimismo, <b>EL/LOS CLIENTE/S</b> declara/n y autoriza/n a <b>EDPYME ACCESO</b>:
              A utilizar sus datos personales en la gestión administrativa, comercial, para los fines referidos en actividades relacionadas con el objeto social en materia financiera, procesamiento de datos, formalizaciones contractuales, cobro de deudas, gestión de operaciones financieras, evaluar su comportamiento en el sistema crediticio y capacidad de pago, remisión de correspondencia, entre otros, la misma que podrá ser realizada a través de terceros.
              De acuerdo a lo que señala el Decreto Legislativo N° 1930 que modificó la Ley N° 29571, Código de Protección y Defensa del Consumidor; Al remitirle información comercial y/o publicitaria de los servicios y productos que ofrece <b>EDPYME ACCESO</b> , directamente o por medio de terceros debidamente autorizados, a través del teléfono fijo o celular, dirección de correo electrónico y otros medios que <b>EDPYME ACCESO</b> tenga a su disposición. Por su parte, <b>EL/LOS CLIENTE/S</b> podrá manifestar su voluntad de rechazar o renunciar la recepción de información bastando para ello una comunicación a ACCESO a través de la siguiente dirección URL http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR , y de esa manera revocar en cualquier momento y conforme a la normativa que rige la protección de datos personales.
              A usar, ceder, disponer, compartir o transferir bajo cualquier título, oneroso o gratuito, sus datos personales con las empresas vinculadas a EDPYME ACCESO o lo conformen en el futuro, así como con sus socios comerciales o cualquier otra empresa, organización o persona natural, tanto dentro como fuera del país, nacionales o extranjeros, públicos o privados, para que estos le den el tratamiento legal que consideren oportuno para sus propios fines de conformidad con La Norma.
              A ofrecerle productos o servicios financieros o relacionados, desarrollar acciones comerciales, realizar estudios de
              mercado, elaborar perfiles de compra, enviar o remitir publicidad, obsequios, ofertas e información en general (personalizada o general) por cualquier medio, lo que se podrá realizar a través de terceras personas.
              Actualizar los registros y programas de sistemas de <b>EDPYME ACCESO</b> o utilizarlos en los casos de fusión, escisión o adquisición de <b>EDPYME ACCESO</b>, o en el caso de cambio de razón o denominación social
              A el tratamiento de sus datos personales para fines de auditoría interna, externa o en cumplimiento a los requerimientos por parte de cualquier autoridad competente, sea policial, judicial o administrativa o para salvaguardar el interés público o, así como contribuir con la administración de justicia.
              De acuerdo a lo dispuesto en La Norma, <b>EL/LOS CLIENTE/S</b> declara/n conocer que le asisten los derechos de acceso, rectificación, oposición y cancelación de los datos personales, los cuales podrá ejercer mediante la opción de contacto con <b>EDPYME ACCESO</b> a través de la siguiente dirección URL http://ftp.edpymeaccesocrediticio.com.pe:8080/emailPaginaWebArco/envioEmailPanel.do?%20tipo_proyecto=AR es indispensable que la persona solicitante sea el Titular de los Datos, o, su representante legal, por lo que en ambos casos deberá ser acreditada documentalmente con la que se ostente.
              <b>EL/LOS CLIENTE/S</b> ratifica/n su expreso consentimiento para que <b>EDPYME ACCESO</b> utilice la información de sus datos personales, de acuerdo a lo detallado en el presente documento. Por su parte, <b>EDPYME ACCESO</b>, garantiza el derecho fundamental a la protección de los datos personales de <b>EL/LOS CLIENTE/S</b> a través de su tratamiento adecuado; en un marco de respeto de los demás derechos fundamentales que en ella se reconocen.
            </p>
          </li>
        </ol>`
