import { codPage } from '~/enums/extraefectivo/pages'

export const ResponseCode = {
  CORRECTO: '00',
  NO_CALIFICADO: '01',
  CUENTA_CON_CREDITO_V1: '10',
  CUENTA_CON_CREDITO_V2: '11',
  NO_SUPERO_VALIDACION_IDENTIDAD: '01',
  EXCEDIO_INTENTOS_24_HORAS: '02',
  EXCEDIO_INTENTOS_15_DIAS: '03',
  NO_CALIFICA_OFERTA: '04',
  APROBADO_PILOTO_BIOMETRIA: '00',
  NO_APROBADO_PILOTO_BIOMETRIA: '01',
  REINTENTO_BIOMETRIA: '01',
  ERROR: '99',
}

export const extraefectivoStatuses = {}

export const actionsByProspectCodeExtraefectivo = {
  [codPage.ONBOARDING]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //0
      shouldGoNextPage: true,
      nextPage: codPage.IDENTITY_VALIDATION,
    },
    {
      prospectStatus: ResponseCode.NO_CALIFICADO,
      shouldShowModal: true,
      img: 'warning',
      titulo: '¡Lo sentimos!',
      message: `<p style="color: #005092">Usted no se encuentra calificado para esta campaña</p>`,
    },
    {
      prospectStatus: ResponseCode.CUENTA_CON_CREDITO_V1,
      shouldShowModal: true,
      img: 'warning',
      titulo: '¡Recuerda!',
      message: '<p style="color: #005092">Ya tienes tu crédito aprobado.</p>',
    },
    {
      prospectStatus: ResponseCode.CUENTA_CON_CREDITO_V2,
      shouldShowModal: true,
      img: 'warning',
      titulo: '¡Estimado Cliente!',
      message: '<p style="color: #005092">Ya tienes tu crédito aprobado.</p>',
    },
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
  [codPage.IDENTITY_VALIDATION]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //0
      shouldGoNextPage: true,
      nextPage: codPage.OFFERS,
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
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
  [codPage.OFFERS]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //0
      shouldGoNextPage: true,
      nextPage: codPage.CONFIRM_DATA,
    },
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
  [codPage.CONFIRM_DATA]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //0
      shouldGoNextPage: true,
      nextPage: codPage.CONTRACT_DOCUMENTS,
    },
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
  [codPage.CONTRACT_DOCUMENTS]: [
    {
      prospectStatus: ResponseCode.APROBADO_PILOTO_BIOMETRIA,
      shouldGoNextPage: true,
      nextPage: codPage.BIOMETRIC_VALIDATION,
    },
    {
      prospectStatus: ResponseCode.NO_APROBADO_PILOTO_BIOMETRIA,
      shouldGoNextPage: true,
      nextPage: codPage.ELECTRONIC_SIGNATURE,
    },
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
  [codPage.BIOMETRIC_VALIDATION]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //0
      shouldGoNextPage: true,
      nextPage: codPage.ELECTRONIC_SIGNATURE,
    },
    {
      prospectStatus: ResponseCode.REINTENTO_BIOMETRIA,
      shouldShowModal: true,
      nextPage: codPage.BIOMETRIC_VALIDATION,
      titulo: 'Estimado Cliente!',
      message: 'Por favor vuelva a intentar su verificación facial',
    },
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
  [codPage.ELECTRONIC_SIGNATURE]: [
    {
      prospectStatus: ResponseCode.CORRECTO, //0
      shouldGoNextPage: false,
    },
    {
      prospectStatus: ResponseCode.ERROR,
      shouldShowModal: true,
      img: 'warning',
      titulo: 'Lo sentimos!',
      message:
        'En en estos momentos no podemos procesar tu solicitud, por favor inténtalo en unos minutos.',
      reset: 'extraefectivo',
    },
  ],
}
