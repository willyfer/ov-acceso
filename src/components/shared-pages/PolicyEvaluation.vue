<template>
  <div class="policyEvaluation-motorcycle">
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <PolicyEvaluationHeaderContent :evaluationPhases="phases" />
    </SharedHeaderWithStepper>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import io from 'socket.io-client'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import PolicyEvaluationHeaderContent from '@/components/shared/policyEvaluation/PolicyEvaluationHeaderContent'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
import { SocketTimedOut } from '~/errors';
let socket = null

export default {
  components: {
    SharedHeaderWithStepper,
    PolicyEvaluationHeaderContent,
  },
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  mixins: [actionsByCodeMixin],
  data() {
    return {
      phases: [],
      isFinishedSocket: false,
    }
  },
  computed: {
    ...mapState({
      codigoProspecto (state, getters) {
        return getters[`${this.currentComponent.nameSpace}/codigoProspecto`]
      },      
      estadoProspecto (state, getters) {
        return getters[`${this.currentComponent.nameSpace}/estadoProspecto`]
      },
    }),
    ...mapGetters('users', ['productCode']),
  },
  methods: {
    maximumTimeEvaluate() {
      setTimeout(() => {
        if(!this.isFinishedSocket) {
          this.$showSpinner(false);
          socket.disconnect();
          this.$showError(new SocketTimedOut({}));
        }
      }, 200000);
    },
    goNextValidation(phase) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          phase.state = true
          resolve()
        }, phase.time)
      })
    },
    async EmpiezaSteps() {
      for (const phase of this.phases.slice(0, 3)) {
        await this.goNextValidation(phase)
      }
    },
  },
  async created() {
    socket = io.connect(process.env.NUXT_ENV_BASE_KONG, {
      transports: ['websocket'],
      upgrade: false,
      forceNew: true,
      path: '/credinstantev2',
    })
    socket.on(this.codigoProspecto, (data) => {
      this.isFinishedSocket = true;
      this.$store.commit(`${this.currentComponent.nameSpace}/SET_PROSPECT`, data)
      this.analyzeProspectStatus()
    })
    this.phases = JSON.parse(
      JSON.stringify(this.currentComponent.evaluationPhases)
    )
  },
  mounted() {
    this.EmpiezaSteps();
    this.maximumTimeEvaluate();
  },
  beforeDestroy() {
    socket.disconnect()
  },
}
</script>

<style lang='scss'>
.policyEvaluation-motorcycle {
  padding: 4px 8px 0 8px;
  margin-bottom: 20px;
}
</style>