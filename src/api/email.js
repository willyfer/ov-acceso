export const enviarCorreo = async (axios, payload) => {
  axios
    .post(`/api/private/v1.0/correosAdjuntos`, payload, {
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj'
      }
    })
    .then((response) => {
      console.log('Correo Enviado')
    })
    .catch((error) => {
      console.log('No se envio correo')
      console.log(error)
    })
}
