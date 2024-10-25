import { ProductCode } from '~/enums/global-enums'
const codPage = {
  LOADING_COMPONENT: 0,
  ONBOARDING: 1,
  IDENTITY_VALIDATION: 2,
  OFFERS: 3,
  CONFIRM_DATA: 4,
  CONTRACT_DOCUMENTS: 5,
  BIOMETRIC_VALIDATION: 6,
  ELECTRONIC_SIGNATURE: 7,
}

const pageExtraefectivo = [
  {
    step: codPage.LOADING_COMPONENT,
    name: 'LoadingComponent',
    nameSpace: 'extraefectivo',
    codigoProducto: ProductCode.EXTRA_EFECTIVO,
  },
  {
    step: codPage.ONBOARDING,
    name: 'OnBoarding',
    nameSpace: 'extraefectivo',
    codigoProducto: ProductCode.EXTRA_EFECTIVO,
  },
  {
    step: codPage.IDENTITY_VALIDATION,
    name: 'IdentityValidation',
    nameSpace: 'extraefectivo',
  },
  {
    step: codPage.OFFERS,
    name: 'Offers',
    nameSpace: 'extraefectivo',
  },
  {
    step: codPage.CONFIRM_DATA,
    name: 'ConfirmData',
    nameSpace: 'extraefectivo',
  },
  {
    step: codPage.CONTRACT_DOCUMENTS,
    name: 'ContractDocuments',
    nameSpace: 'extraefectivo',
  },
  {
    step: codPage.BIOMETRIC_VALIDATION,
    name: 'BiometricValidation',
    nameSpace: 'extraefectivo',
  },
  {
    step: codPage.ELECTRONIC_SIGNATURE,
    name: 'ElectronicSignature',
    nameSpace: 'extraefectivo',
  },
]

export { codPage, pageExtraefectivo }
