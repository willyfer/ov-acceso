<template>
  <div class="container-firma-electronica">
    <component
      :is="currentComponent.name"
      :currentComponent="currentComponent"
      @open-modal-menssage-prospectus="openModalMenssageProspectus"
    />
    <ModalAlertGlobal 
      :currentComponent='currentComponent'
      ref="modalAlertGlobal" 
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreditDetail from '@/components/firma/CreditDetail'
import LoadingProcess from '@/components/firma/LoadingProcess'
import ModalAlertGlobal from '@/components/modals/ModalAlertGlobal'
function lazyComponent(name) {
  return () => ({
    component: import(`@/components/firma/${name}`),
  })
}
export default {
  layout: 'default',
  components: {
    LoadingProcess,
    CreditDetail: lazyComponent('CreditDetail'),
    IdentityValidation: lazyComponent('IdentityValidation'),
    ContractDocuments: lazyComponent('ContractDocuments'),
    ElectronicSignature: lazyComponent('ElectronicSignature'),
    CongratulationsCredit: lazyComponent('CongratulationsCredit'),
    ModalAlertGlobal,
  },
  methods: {
    openModalMenssageProspectus(data) {
      this.$refs.modalAlertGlobal.open(data)
    },
  },
  computed: {
    ...mapGetters('firma', ['currentComponent']),
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('.v-main.mainLayout').style.paddingTop = '1px'
    })
  },
}
</script>

<style>
.container-firma-electronica {
  max-width: 450px !important;
  margin: 0 auto;
}
</style>