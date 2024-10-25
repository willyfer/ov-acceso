<template>
  <div class="document-registration-motorcycle">
    <SharedHeaderWithStepper
      :numberSteps="currentComponent.numberSteps"
      :imgVehiculo="currentComponent.imgProductStep"
    >
      <DocumentRegisterHeaderContent />
    </SharedHeaderWithStepper>
    <DocumentsRegisterList
      :listaDocumentosRegistrar="documents"
      @attach-file="attachFile"
    />
    <div
      class="button-entendido d-flex justify-center"
      v-if="showButton"
    >
      <SharedButton
        text="Continuar"
        :buttonOrange="true"
        :totalWidth="80"
        :loading="loading"
        @click="confirmDocumentRegistration"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Compressor from 'compressorjs'
import SharedHeaderWithStepper from '@/components/shared/SharedHeaderWithStepper'
import DocumentRegisterHeaderContent from '@/components/shared/documentRegistration/DocumentRegisterHeaderContent'
import DocumentsRegisterList from '@/components/shared/documentRegistration/DocumentsRegisterList'
import SharedButton from '@/components/shared/SharedButton'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'

export default {
  components: {
    SharedHeaderWithStepper,
    DocumentsRegisterList,
    DocumentRegisterHeaderContent,
    SharedButton,
  },
  mixins: [actionsByCodeMixin],
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  async fetch() {
    try {
      this.updateDocumentsRegistered()
    } catch (error) {
      this.$showError(error);
    }
  },
  data() {
    return {
      documents: [],
      loading: false,
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
      documentos (state, getters) {
        return getters[`${this.currentComponent.nameSpace}/documentos`] || [];
      },
      listaDocumentosRegistrar (state, getters) {
        return getters[`${this.currentComponent.nameSpace}/listaDocumentosRegistrar`]
      },
    }),
    ...mapGetters('users', [
      'productCode',
    ]),
    showButton() {
      return !(this.documents.filter(item => !item.isUploadedImage).length);
    },
  },
  methods: {
    async attachFile({ event, documentType }) {
      try {
        const file = event.srcElement.files[0]
        let fileCompress = file;
        if(!file.type.includes('pdf'))
          fileCompress = await this.compressFile(file)
        const fileBase64 = await this.convertToBase64(fileCompress)
        const newFileBase64 = fileBase64.split(',')[1]
        const extension = file.type.split("/")
        const data = {
          codigoProspecto: this.codigoProspecto,
          tipoDocumento: documentType,
          url: newFileBase64,
          ext: extension[1],
        }
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/attachFile`, data)
        this.updateDocumentsRegistered(documentType)
      } catch (error) {
        this.$showError(error);
      }
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (e) => reject(e)
      })
    },
    compressFile(file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          success: (result) => resolve(result),
          error: (err) => reject(err),
        })
      })
    },
    updateDocumentsRegistered(ti_docume = '') {
      const uploadedDocuments = [
        ...JSON.parse(JSON.stringify(this.documentos)),
        { ti_docume },
      ];
      const listaDocumentosRegistrar = JSON.parse(
        JSON.stringify(this.listaDocumentosRegistrar)
      );
      const newList = listaDocumentosRegistrar.map((item) => {
        if (uploadedDocuments.find((d) => d.ti_docume == item.tipoDocumento))
          item.isUploadedImage = true
        else item.isUploadedImage = false
        return item
      })
      this.$store.commit(`${this.currentComponent.nameSpace}/SET_UPLOADED_DOCUMENTS`, uploadedDocuments);
      this.documents = newList
    },
    async confirmDocumentRegistration() {
      try {        
        this.loading = true
        await this.$store.dispatch(`${this.currentComponent.nameSpace}/changeStateFinal`, {
          codigoProspecto: this.codigoProspecto,
        })
        this.loading = false
        this.analyzeProspectStatus()
      } catch (error) {
        this.$showError(error);
      }
    },
  },
}
</script>

<style lang='scss'>
.document-registration-motorcycle {
  padding: 4px 8px 20px 8px;
}
</style>