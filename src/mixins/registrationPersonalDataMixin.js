import { mapGetters } from 'vuex';
import io from 'socket.io-client'
import { SocketTimedOut } from '~/errors';
let socket = null

export default {
  data() {
    return {
      isFinishedSocket: false,
    }
  },
  computed: {
    ...mapGetters('users', [
      'productCode',
    ]),
  },
  methods: {
    async getProvinces(idDepartment) {
      await this.$store.dispatch('ubigeo/getProvinces', idDepartment);
    },
    async getDistricts(idProvince) {
      await this.$store.dispatch('ubigeo/getDistricts', idProvince);
    },
    activarSocket() {
      socket = io.connect(process.env.NUXT_ENV_BASE_KONG, {
        transports: ['websocket'],
        upgrade: false,
        forceNew: true,
        path: '/credinstantev2',
      })
      socket.on(this.codigoProspecto, (data) => {
        this.isFinishedSocket = true;
        this.$store.commit(`${this.currentComponent.nameSpace}/SET_PROSPECT`, data);
        this.analyzeProspectStatus();
        this.$showSpinner(false);
      })
    },
    async registrationPersonalData(data) {
      try {
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/registrationPersonalData`, data)
        this.activarSocket()     
        this.maximumTimeEvaluate();   
      } catch (error) {
        this.$showError(error);
      }
    },
    maximumTimeEvaluate() {
      setTimeout(() => {
        if(!this.isFinishedSocket) {
          this.$showSpinner(false);
          socket.disconnect();
          this.$showError(new SocketTimedOut({}));
        }
      }, 150000);
    },
  },
  beforeDestroy() {
    if (socket) {
      socket.disconnect()
    }
  },
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
};