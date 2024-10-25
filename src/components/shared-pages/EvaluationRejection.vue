<template>
  <div class="evaluation-rejection-motorcycle">
    <SharedHeaderWithoutStepper>
      <EvaluationRejectionHeaderContent />
    </SharedHeaderWithoutStepper>
    <div>
      <SharedButton
        text="Avísame si esto cambia"
        :buttonOrange="true"
        :totalWidth="70"
        @click="avisame"
      />
    </div>
    <div>
      <SharedButton
        text="Entiendo"
        :buttonSilver="true"
        :totalWidth="70"
        @click="entiendo"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SharedHeaderWithoutStepper from '@/components/shared/SharedHeaderWithoutStepper'
import EvaluationRejectionHeaderContent from '@/components/shared/evaluationRejection/EvaluationRejectionHeaderContent'
import SharedButton from '@/components/shared/SharedButton'

export default {
  components: {
    EvaluationRejectionHeaderContent,
    SharedHeaderWithoutStepper,
    SharedButton,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      page: '',
    }
  },
  computed: {
    ...mapState({
      codigoProspecto (state, getters) {
        return getters[`${this.currentComponent.nameSpace}/codigoProspecto`]
      },
    }),
  },
  methods: {
    async avisame() {
      try {
        const data = {
          "codigoProspecto": this.codigoProspecto,
          "flag": true
        };
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/contactStatusChanges`, data);
        this.$store.commit(`${this.currentComponent.nameSpace}/SET_STEP`, this.page)
      } catch (error) {
        this.$showError(error);
      }
    },
    entiendo() {
      this.$store.commit(`${this.currentComponent.nameSpace}/SET_STEP`, this.page)
    },
  },
  async mounted() {
    let { codPage } = await import(`@/enums/${this.currentComponent.nameSpace}-enums`);
    this.page = codPage.PRE_EVALUATION; 
  }
}
</script>

<style lang='scss'>
.evaluation-rejection-motorcycle {
  padding: 4px 8px 8px 8px;
  > div:nth-child(2) {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  > div:nth-child(3) {
    display: flex;
    justify-content: center;
    margin: 20px 0 80px 0;
  }
}
</style>