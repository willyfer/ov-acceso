export const apiAttachFile = (axios, data) => 
  axios.$post('/kong/prospecto/v2.0/adjuntarArchivo', data);

export const apiContactStatusChanges = (axios, data) => 
  axios.$post('/kong/prospecto/v2.0/rechazado/intencion-contacto', data);