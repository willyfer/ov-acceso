import { pagesCelulares } from '~/enums/celulares-enums';
export default  {
    currentComponent: (state) => pagesCelulares.find((p) => p.step === state.step),
    productCode: (state) => state.productCode,
    estadoProspecto: (state) => state.prospectus.codigoRespuesta,
    /*numberOfQuestions: (state) => state.numberOfQuestions,
    validationQuestions: (state) => state.validationQuestions,
    dataCreateProceedings: (state) => state.dataCreateProceedings,
    additionalDataForm: (state) => state.additionalDataForm*/
}
