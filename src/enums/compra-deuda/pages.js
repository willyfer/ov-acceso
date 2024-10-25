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

const pageCompraDeuda = [
  {
    step: codPage.LOADING_COMPONENT,
    name: 'LoadingComponent',
    nameSpace: 'compra-deuda',
    codigoProducto: ProductCode.COMPRA_DEUDA,
  },
  {
    step: codPage.ONBOARDING,
    name: 'OnBoarding',
    nameSpace: 'compra-deuda',
    codigoProducto: ProductCode.COMPRA_DEUDA,
  },
  {
    step: codPage.IDENTITY_VALIDATION,
    name: 'IdentityValidation',
    nameSpace: 'compra-deuda',
  },
  {
    step: codPage.OFFERS,
    name: 'Offers',
    nameSpace: 'compra-deuda',
  },
  {
    step: codPage.CONFIRM_DATA,
    name: 'ConfirmData',
    nameSpace: 'compra-deuda',
  },
  {
    step: codPage.CONTRACT_DOCUMENTS,
    name: 'ContractDocuments',
    nameSpace: 'compra-deuda',
  },
  {
    step: codPage.BIOMETRIC_VALIDATION,
    name: 'BiometricValidation',
    nameSpace: 'compra-deuda',
  },
  {
    step: codPage.ELECTRONIC_SIGNATURE,
    name: 'ElectronicSignature',
    nameSpace: 'compra-deuda',
  },
]

export { codPage, pageCompraDeuda }
