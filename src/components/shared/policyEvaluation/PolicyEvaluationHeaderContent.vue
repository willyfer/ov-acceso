<template>
  <div class="policy-evaluation-processing">
    <h1 class="policy-evaluation-processing__title">Espera un momento, estamos procesando tu solicitud</h1>
    <v-row class="pa-4">
      <v-col cols="3" v-for="phase in evaluationPhases" :key="phase.id">
        <PolicyEvaluationStepSquare
          :ready="phase.state"
          :icono="phase.icono"
          :texto="phase.texto"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PolicyEvaluationStepSquare from '@/components/shared/policyEvaluation/PolicyEvaluationStepSquare';

export default {
  name: 'PolicyEvaluationHeaderContent',
  components: {
    PolicyEvaluationStepSquare,
  },
  props: {
    evaluationPhases: { type: Array, default: () => ([]) },
  },
}
</script>

<style lang='scss'>
  .policy-evaluation-processing {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;
    .policy-evaluation-processing__title {
      width: 80%;
      margin-top: 50px;
      margin-bottom: 50px;
      line-height: 1.2;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
  }
</style>