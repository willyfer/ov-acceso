<template>
  <v-container class="d-flex flex-column pt-1">
    <v-row class="pt-0">
      <v-col cols="12" class="pt-0">
        <SharedHeaderWithStepper
          :numberSteps="currentComponent.numberSteps"
          :imgVehiculo="currentComponent.imgProductStep"
        >
          <div class="headerCreditDetail">
            ¡Felicitaciones
            <br />
            <strong class="headerCreditDetail--name"
              >{{ fullName }}</strong
            >
            <br />
            tienes un préstamo aprobado!
          </div>
        </SharedHeaderWithStepper>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <InformationContainer title="Condiciones del crédito" align="center">
          <CreditConditions :creditConditions="detallesCredito" />
        </InformationContainer>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <SharedButton
          text="Confirmar tu préstamo aquí"
          :buttonOrange="true"
          :totalWidth="95"
          @click="confirmCredit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import InformationContainer from '@/components/shared/InformationContainer'
import CreditConditions from '@/components/shared/CreditConditions'
import SharedButton from '@/components/shared/SharedButton'
export default {
  name: 'CreditDetail',
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  components: {
    SharedHeaderWithStepper,
    InformationContainer,
    CreditConditions,
    SharedButton,
  },
  computed: {
    ...mapGetters('firma', ['fullName', 'detallesCredito']),
  },
  methods: {
    ...mapMutations('firma', ['SET_STEP']),
    confirmCredit() {
      this.SET_STEP(103)
    },
  },
}
</script>

<style scoped>
.headerCreditDetail {
  color: white;
  padding: 10px 30px;
  text-align: center;
  font-size: 1.1em;
}
.headerCreditDetail--name {
  font-size: 1.3em;
}
</style>