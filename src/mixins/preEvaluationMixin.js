import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('catalogue', [
      'listaTiposDocumentos',
      'listaTipoPerfil',
      'listaEstadosCiviles',
      'listaNivelesEducacion',
      'listaEntidadesProducto',
    ]),
    ...mapGetters('users', [
      'canal',
      'channel',
      'codigoEntidad',
      'codigoUsuario',
      'productCode',
    ]),
  },
  methods: {    
    async sendPreevaluation(data) {
      try {
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/sendPreevaluation`, data);
        this.analyzeProspectStatus();        
      } catch (error) {
        this.$showError(error);
      }
    },
  },
};