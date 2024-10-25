const codPage = {
  LOADING_PROCESS: 101,
  CREDIT_DETAIL: 102,
  IDENTITY_VALIDATION: 103,
  CONTRACT_DOCUMENTS: 104,
  ELECTRONIC_SIGNATURE: 105,
  CONGRATULATIONS_CREDIT: 106,
}

const pageFirma = [
  {
    step: codPage.LOADING_PROCESS,
    name: 'LoadingProcess',
    nameSpace: 'firma',
  },
  {
    step: codPage.CREDIT_DETAIL,
    name: 'CreditDetail',
    imgProductStep: 'moto/motoStep.png',
    nameSpace: 'firma',
  },
  {
    step: codPage.IDENTITY_VALIDATION,
    name: 'IdentityValidation',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(1).fill(''),
    nameSpace: 'firma',
  },
  {
    step: codPage.CONTRACT_DOCUMENTS,
    name: 'ContractDocuments',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(2).fill(''),
    nameSpace: 'firma',
  },
  {
    step: codPage.ELECTRONIC_SIGNATURE,
    name: 'ElectronicSignature',
    imgProductStep: 'moto/motoStep.png',
    numberSteps: Array(3).fill(''),
    nameSpace: 'firma',
  },
  {
    step: codPage.CONGRATULATIONS_CREDIT,
    name: 'CongratulationsCredit',
    nameSpace: 'firma',
  },
]

export { codPage, pageFirma }
