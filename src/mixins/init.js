

export const mixins = {
  computed: {
    currentComponent() {
      let name = null
      switch (this.step) {
        case -1:
          name = 'LazyLoading'
          break
        case 0:
          name = 'LoadingComponent'
          break
        case 1:
          name = 'PreEvaluate'
          break
        case 2:
          name = 'Expediente'
          break
        case 3:
          name = 'EnviarDocumentos'
          break
        case 4:
          name = 'PreAprobado'
          break
        case 5:
          name = 'ProcesoAprobado'
          break
        default:
          /* code */
          break
      }
      return name
    }
  },
  methods: {
    isCreated(codigoProducto, codigoSubProducto, marcaDeLd) {
      this.$store.commit('default/RESET_STATES')
      const placa = this.$route.query.placa
      const origenLead = this.$route.query.origen ? this.$route.query.origen : 0
      const codigoReferidos = this.$route.query.ref
      if (placa || origenLead || codigoReferidos) {
        this.$store.commit('default/UPDATE_DATOS', {
          placa,
          origenLead,
          codigoReferidos
        })
      }
      this.$store.commit('default/UPDATE_BUSSINES', {
        codigoProducto,
        codigoSubProducto,
        marcaDeLd
      })
    },
    isNewCreated(codigoProducto) {
      this.$store.dispatch('express/resetStates')
      const channel = this.promotor.state ? this.promotor.channel : 1
      let origen = this.$route.query.origen ? this.$route.query.origen : 4
      console.log('promotor : ', this.promotor)
      if (this.promotor.state) {
        if (this.promotor.channel != 5) {
          origen = 5
        } else {
          origen = 6
        }
      }
      console.log('origen: ', origen, 'chanel: ', channel)
      this.$store.commit('express/UPDATE_DATOS', { origen, channel })
    }
  }
}
