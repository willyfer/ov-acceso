<template>
  <div class="container-mototaxi">
    <component
      :is="currentComponent.name"
      :currentComponent='currentComponent'
      @open-modal-menssage-prospectus='openModalMenssageProspectus'
    />
    <ModalAlertGlobal ref="modalAlertGlobal" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PreEvaluation from '@/components/mototaxi/preEvaluation/PreEvaluation'
import { ProductCode } from '@/enums/global-enums'

export default {
  layout: 'default',
  name: 'mototaxi',
  middleware: 'authenticated',
  components: {           
    PreEvaluation,
    PolicyEvaluation: () => import('@/components/shared-pages/PolicyEvaluation'),   
    RegistrationPersonalData: () => import('@/components/mototaxi/registrationPersonalData/RegistrationPersonalData'),    
    CreditSimulation: () => import('@/components/mototaxi/creditSimulation/CreditSimulation'),   
    DocumentRegistration: () => import('@/components/shared-pages/DocumentRegistration'),    
    EvaluationSubmissionConfirmation: () => import('@/components/mototaxi/evaluationSubmission/EvaluationSubmissionConfirmation'),    
    EvaluationRejection: () => import('@/components/shared-pages/EvaluationRejection'),   
    ModalAlertGlobal: () => import('@/components/modals/ModalAlertGlobal'),
  },
  created() {
    this.$store.commit('mototaxi/CLEAR_ALL');
    this.$store.commit('users/SET_PRODUCT_CODE', ProductCode.MOTOFURGON);
    this.$store.commit('mototaxi/SET_PRODUCT_CODE', ProductCode.MOTOFURGON);
  },
  computed: {
    ...mapGetters('mototaxi', ['currentComponent']),    
  },
  methods: {
    openModalMenssageProspectus(data) {
      this.$refs.modalAlertGlobal.open(data);
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('.v-main.mainLayout').style.paddingTop = '1px';
    });
  },

}
</script>
<style scoped>
  .container {
    width: 100% !important;
  }
  .container-mototaxi {
    max-width: 450px;
    margin: auto;
  }
</style>
