<template>
  <div>
    <v-card class="contentContractDocuments__card">
      <p class="contentContractDocuments__text">
        {{ item.title2 }}
      </p>
      <div class="d-flex align-center" @click="changeState">
        <label for="vistaPrevia" class="mr-1">
          <a
            :href="`${url}/api/acr/${item.doc}/${resConfirmarDatos.codigoExpediente}/0`"
            target="_blank"
            class="contentContractDocuments__text--link"
            >Vista previa</a
          >
        </label>
        <!-- <input
          class="contentContractDocuments__check"
          type="checkbox"
          :checked="isCheck"
          id="vistaPrevia"
        /> -->
      </div>
    </v-card>
  </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['item', 'maxItems'],
  data() {
    return {
      actions: false,
      signature: false,
      url: process.env.DEFAULT_URL,
      isCheck: false,
    }
  },
  computed: {
    ...mapState('credinstante', ['datos', 'resConfirmarDatos']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    }
  },
  watch: {
    isCheckValorados(val) {
      console.log("this.maxItems: ", this.maxItems);
      if (val.length === this.maxItems) {
        this.signature = true
      }
    }
  },
  mounted() {
    this.$ga.event('Activacion', 'DocumentoFirmar')
  },
  methods: {
    changeState() {
      const isCheckValorados = this.datos.isCheckValorados

      if (!this.signature) {
        isCheckValorados.push(this.item)
        this.$store.commit('default/UPDATE_DATOS', { isCheckValorados })
      }
      this.signature = true
    }
  }
}
</script>

<style scoped>
.contentContractDocuments__card {
  margin: 5px;
  width: 100px;
  height: 80px;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contentContractDocuments__text {
  font-size: 0.7em !important;
  margin-bottom: 0;
  padding: 0 5px;
  text-align: center;
  color: white;
  font-weight: bold;
}
.contentContractDocuments__text--link {
  font-size: 0.6em !important;
  color: white;
}
.contentContractDocuments__check {
  width: 11px;
  height: 11px;
  border: 1px solid white;
}
</style>
