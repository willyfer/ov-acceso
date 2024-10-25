<template>
  <div class="container-moto">
    <component
      :is="currentComponent.name"
      :currentComponent="currentComponent"
      @open-modal-menssage-prospectus="openModalMenssageProspectus"
    />
    <ModalAlertGlobal ref="modalAlertGlobal" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { ProductCode } from "@/enums/global-enums";
import PreEvaluation from "@/components/moto/preEvaluation/PreEvaluation";

export default {
  layout: "default",
  name: "moto",
  middleware: "authenticated",
  components: {
    PreEvaluation,
    PolicyEvaluation: () => import("@/components/shared-pages/PolicyEvaluation"),
    RegistrationPersonalData: () =>
      import("@/components/moto/registrationPersonalData/RegistrationPersonalData"),
    CreditSimulation: () => import("@/components/moto/creditSimulation/CreditSimulation"),
    DocumentRegistration: () => import("@/components/shared-pages/DocumentRegistration"),
    EvaluationSubmissionConfirmation: () =>
      import("@/components/moto/evaluationSubmission/EvaluationSubmissionConfirmation"),
    CreditApproval: () => import("@/components/moto/creditApproval/CreditApproval"),
    EvaluationRejection: () => import("@/components/shared-pages/EvaluationRejection"),
    ModalAlertGlobal: () => import("@/components/modals/ModalAlertGlobal"),
  },
  computed: {
    ...mapGetters("moto", ["currentComponent"]),
  },
  methods: {
    openModalMenssageProspectus(data) {
      this.$refs.modalAlertGlobal.open(data);
    },
  },
  created() {
    this.$store.commit("moto/CLEAR_ALL");
    this.$store.commit("users/SET_PRODUCT_CODE", ProductCode.SIN_DEFINIR);
    this.$store.commit("moto/SET_PRODUCT_CODE", ProductCode.SIN_DEFINIR);
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector(".v-main.mainLayout").style.paddingTop = "1px";
    });
  },
};
</script>
<style scoped>
.container {
  width: 100% !important;
}
.container-moto {
  max-width: 450px;
  margin: auto;
}
</style>
