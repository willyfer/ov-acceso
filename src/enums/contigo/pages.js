const codPage = {
  LAZY_LOADING: 'A',
  LOADING_COMPONENT: 'B',
  LOGIN: 1,
  VALIDACION_IDENTIDAD: 2,
  OFERTAS: 3,
  CONFIRMAR_DATOS: 4,
  DOCUMENTOS_VALORADOS: 5,
}

const pageContigo = [
  {
    step: codPage.LAZY_LOADING,
    name: 'LazyLoading',
    nameSpace: 'contigo',
  },
  {
    step: codPage.LOADING_COMPONENT,
    name: 'LoadingComponent',
    nameSpace: 'contigo',
  },
  {
    step: codPage.LOGIN,
    name: 'Login',
    nameSpace: 'contigo',
  },
  {
    step: codPage.VALIDACION_IDENTIDAD,
    name: 'ValidacionIdentidad',
    nameSpace: 'contigo',
  },
  {
    step: codPage.OFERTAS,
    name: 'Ofertas',
    nameSpace: 'contigo',
  },
  {
    step: codPage.CONFIRMAR_DATOS,
    name: 'ConfirmarDatos',
    nameSpace: 'contigo',
  },
  {
    step: codPage.DOCUMENTOS_VALORADOS,
    name: 'DocumentosValorados',
    nameSpace: 'contigo',
  },
]

export {
  codPage,
  pageContigo,
}
