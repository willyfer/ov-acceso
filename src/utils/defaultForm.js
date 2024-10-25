export const defaultForm = {
  codigoExpediente: null,
  tipoDocumento: 1,
  codigoEntidad: null,
  documento: null,
  fechaNacimiento: null,
  propietario: true,
  telefono: null,
  email: null,
  placa: null,
  apellidoPaterno: null,
  apellidoMaterno: null,
  nombres: null,       
  nivelEducacion: 'SC',
  ingresoMensual: null,
  situacionLaboral: null,
  sectorEconomico: null, //28
  profesion: null,
  pep: null,
  actividadEconomica: null,
  tipoVia: null,
  genero: 'M',
  estadoCivil: null,
  codigoAnalistaSBS: null,
  departamento: 15,
  recorridoxDia: null,
  terminosCondiciones: '1',
  numeroAsientos: null,
  claseVehiculo: null,
  tipoVehiculo: null,
  precioVehiculo: null,
  precioVehiculoAcceso: null,
  importeMaximoFinanciar: null,
  importeFinanciar: null,
  numeroCuotas: 24,
  codigoReferidos: null,
  marcaVehiculo: null, // Cred.Veh.
  modeloVehiculo: null, // Cred.Veh.
  marcaVehiculoAcceso: null, // Cred.Veh.
  modeloVehiculoAcceso: null, // Cred.Veh.
  kilometraje: null, // Cred.Veh.
  anioFabricacion: null, // Cred.Veh.
  importePrecioVehiculo: null, // Cred.Veh.
  importeCuotaInicial: null, // Cred.Veh.
  origenLead: 0,
  isCategory: true,
  nacionalidad: null,
  paisResidencia: null,
  cargaFamiliar: null,
  tipoDocumentoVendedor: 1,
  documentoVendedor: null,
  nombreVendedor: null,
  tipoDocumentoConyuge: 1,
  documentoConyuge: null,
  nombreConyuge: null,
  apellidoPaternoConyuge: null,
  apellidoMaternoConyuge: null,
  fechaNacimientoConyuge: null,
  categoriaFormalidad: null,
  tipoRegimenLaboral: null,
  mafScore: null,
  cantidadCuotas: null,
  ingresoEstimado: null,
  tipoResidencia: null,
  tipoDocumentoConyugue: 1,
  documentoConyugue: null,
  edadConyugue: null,
  nombreConyugue: null,
  apellidoPaternoConyugue: null,
  apellidoMaternoConyugue: null,
  transaccionCanal: 1234,
  idptipovia: '',
  nomvia: '',
  numcasa: '',
  distrito: '',
  clasesVehiculo: '',
  tiposVehiculos: '',
  marcasVehiculos: '',
  modelosVehiculos: '',
  anosFabricacion: null,
  numeroMotor: '',
  numeroSerie: '',
  telefon: '',
  provincia: '',
  // Rimac
  ciiu: null,
  correo: null,
  direccion: null,
  fecFundacion: null,
  fecNacimiento: null,
  idetercero: null,
  indCrearTercero: null,
  indRequiereDireccion: null,
  nomCompleto: null,
  nombreComercial: null,
  numDocumento: null,
  paisNacimiento: null,
  razonSocial: null,
  sexo: null,
  stsTercero: null,
  tipoPersona: null,
  //
  revisionTecnica: null,
  hojaResumen: null,
  solicitudDelCredito: null,
  contrato: null,
  cronograma: null,
  codigoEnviodeSMSValidacionDeDocumentos: null,
  claseVehi: null,
  tipoVehi: null,
  marcaVehiMar: null,
  marcaVehiMod: null,
  transaccionCanalEmitir: null,
  jsonEmision: null,
  numeroPoliza: null,
  urlEmision: null,
  pais: 1,
  residencia: null,
  isCheckValorados: [], // signture
  tipoCliente: 1,
  usoVehiculo: 1,
  sede: 1
}

export const expressForm = {
  codigoProducto: 0, // default
  tipoDocumento: 1, // 1: documento, 2 : carnet extranjeria
  documento: '', // 8 documento, 9 ce 43085939
  placa: '', // 6 DIGITOS AUV612
  fechaNacimiento: null, // FORMATO
  canalAtencion: 2, // DEFAULT 2 CANAL WEB
  origen: 4, // default
  channel: 1, // default
  codigoUsuario: null, // default por el momento
  codigoEntidad: 1, // default por el momento
  recorridoxDia: null, // 	1: 0 - 50 Km ,2: 51 - 100 Km ,3: más de 100 Km
  telefono: '', //'941885678',
  email: '',//'diego.urbina@acceso.com.pe',
  terms: '1',
  sede: null,
  isCheckValorados: [], // signture,
  sectorEconomico: null,
  importeFinanciar: null,
  cuotas: null,
  importeCuotas: null,
  tasa: null,
  anioFabricacion: null,
  sitCrediticia: false,
  estadoBio: false,
  tipoPago: null,
  selectCuenta: null,
  cuentaBanco: null,
  selectOficina: null, 
  departamento: null,
  provincia: null,
  distrito: null,
  ubigeo: null
}

export const prospeccionForm = {
  codigoProducto: 13, // default
  tipoDocumento: 1, // 1: documento, 2 : carnet extranjeria
  documento: '', // 8 documento, 9 ce
  placa: '', // 6 DIGITOS
  fechaNacimiento: null, // FORMATO
  canalAtencion: 2, // DEFAULT 2 CANAL WEB
  origen: 4, // default
  channel: 1, // default
  codigoUsuario: null, // default por el momento
  codigoEntidad: 1, // default por el momento
  recorridoxDia: null, // 	1: 0 - 50 Km ,2: 51 - 100 Km ,3: más de 100 Km
  telefono: null,
  email: null,
  terms: '1',
  sede: null,
  isCheckValorados: [], // signture,
  sectorEconomico: null,
  importeFinanciar: null,
  cuotas: null,
  importeCuotas: null,
  tasa: null,
  anioFabricacion: null,
  sitCrediticia: false,
  nombres: null,
  apellidoPaterno: null,
  apellidoMaterno: null,
  ingresoMensual: null,
  condicionAuto: true,
  marca: null,
  modelo: null,
  situacionLaboral: null
}
