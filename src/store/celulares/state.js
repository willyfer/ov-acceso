import { codPage } from '~/enums/celulares-enums';

export const expressForm = {
        "codigoProducto": 0,
        "tipoDocumento": 1,
        "documento": "",
        "placa": "",
        "fechaNacimiento": null,
        "canalAtencion": 2,
        "origen": 4,
        "channel": 1,
        "codigoUsuario": null,
        "codigoEntidad": 1,
        "recorridoxDia": 3,
        "telefono": "",
        "email": "",
        "terms": true,
        "sede": null,
        "isCheckValorados": [],
        "sectorEconomico": null,
        "importeFinanciar": null,
        "cuotas": null,
        "importeCuotas": null,
        "tasa": null,
        "anioFabricacion": null,
        "sitCrediticia": false,
        "estadoBio": false,
        "tipoPago": null,
        "selectCuenta": null,
        "cuentaBanco": null,
        "selectOficina": null,
        "departamento": null,
        "provincia": null,
        "distrito": null,
        "ubigeo": null

}

export default () => ({
  step: codPage.PRE_EVALUATION,
  responseCode: "",
  productCode: 39,
  prospectus: "",
  estadoProspecto: "",
  lista_marcas_cel:[],
  lista_modelos_cel:[]
})
