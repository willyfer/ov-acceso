export const fraudeLD = (payload) => {
  const html = `<div>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'>Estimado (s),</span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'></span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'> </span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'>Mediante la presente, notificamos el aviso del intento de fraude en donde se intent&oacute; suplantar la identidad del cliente </span><strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'> ${payload.apellidoPaterno} ${payload.apellidoMaterno} ${payload.nombres} con DNI ${payload.documento}</span></b></strong><span style='font-family: Calibri; font-size: 11.0000pt;'>&nbsp;en las oficinas de Acceso.</span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'>Se solicita al &Aacute;rea de Gesti&oacute;n Comercial, enviar la documentaci&oacute;n al &Aacute;rea Legal para que se pueda formular las denuncias respectivas. </span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'>A continuaci&oacute;n, exponemos los detalles del cr&eacute;dito.</span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'>&nbsp;</span></p>
                <p style='text-align: justify; margin: 0px;'><span style='font-family: Calibri; font-size: 11.0000pt;'>Datos del cr&eacute;dito</span></p>
                <ol>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Placa: <strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'>${payload.placa}</span></b></strong></li>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Origen de la atenci&oacute;n: <strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'>${payload.tipoOrigen}</span></b></strong></li>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Canal de atenci&oacute;n: <strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'>${payload.tipoCanal}</span></b></strong></li>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Nombre del promotor: <strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'>${payload.nombrePromotor}</span></b></strong></li>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Nombre del asesor comercial: <strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'>${payload.nombreAsegurador}</span></b></strong></li>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Nombre del procurador: <strong><b><span style='font-family: Calibri; font-size: 11.0000pt;'>${payload.nombreProcurador}</span></b></strong></li>
                <li style='text-align: justify; margin: 0px;'><span style='font-family: Calibri;'>Nombre del cajero:</span></li>
                </ol>
              </div>`
  return html
}
