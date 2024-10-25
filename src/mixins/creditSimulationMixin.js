export default {
  methods: {
    async simulateCreditConditions(data) {
      try {        
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/simulateCreditConditions`, data);
      } catch (error) {
        this.$showError(error);
      }
    },
    async confirmCreditCondition(data) {
      try {
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/confirmCreditConditions`, data);
        this.analyzeProspectStatus();
      } catch (error) {
        this.$showError(error);
      }
    },
    editSimulateCreditConditions(value) {
      this.$store.commit(`${this.currentComponent.nameSpace}/SET_CREDIT_CONDITIONS`, value);
    },
  },
};