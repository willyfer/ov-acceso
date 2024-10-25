<template>
  <div class="documents-register-list">
    <DocumentsRegisterListItem  
      v-for="(document, index) in listaDocumentosRegistrar" 
      :key="index" 
      :document='document'
      :itemNumber='(index + 1)'
      @attach-file='(obj) => $emit("attach-file", obj)'
    />
  </div>
</template>

<script>
import DocumentsRegisterListItem from '@/components/shared/documentRegistration/DocumentsRegisterListItem';

export default {
  components: {
    DocumentsRegisterListItem,
  },
  props: {
    listaDocumentosRegistrar: { type: Array, default: () => ([]) },
  },
}
</script>

<style lang='scss'>
  .documents-register-list {
    margin: 0 22px 30px 22px;
    padding-top: 20px;
    border-bottom: 1px solid #ff4e00;
    border-left: 1px solid #ff4e00;
    border-right: 1px solid #ff4e00;
    border-radius: 0 0 20px 20px;
  }
</style>