<template>
  <div>
    <v-card class="contentContractDocuments__card">
      <p class="contentContractDocuments__text">
        {{ item.title2 }}
      </p>
      <div class="d-flex align-center" @click="changeState">
        <label for="vistaPrevia" class="mr-1">
          <a
            :href="`${url}/api/acr/${item.doc}/${codigoExpediente}/0`"
            target="_blank"
            class="contentContractDocuments__text--link"
            >Vista previa</a
          >
        </label>
        <input
          class="contentContractDocuments__check"
          type="checkbox"
          :checked="isCheck"
          id="vistaPrevia"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'SharedBoxContractual',
  props: ['item', 'codigoExpediente', 'maxItems'],
  computed: {
    ...mapGetters('firma', ['arrayDocuments', 'terminos']),
    isCheck: {
      set(value) {
        this.checkValue = value
      },
      get() {
        if (this.terminos) {
          return true
        } else {
          return this.checkValue
        }
      },
    },
  },
  data() {
    return {
      url: process.env.DEFAULT_URL,
      checkValue: false,
    }
  },
  methods: {
    ...mapMutations('firma', ['SET_ARRAY_DOCUMENTS']),
    changeState() {
      if (!this.isCheck) {
        const documents = this.arrayDocuments
        documents.push(this.item)
        this.SET_ARRAY_DOCUMENTS(documents)
        this.isCheck = true
      }
    },
  },
}
</script>

<style scoped>
.contentContractDocuments__card {
  margin: 5px;
  width: 100px;
  height: 60px;
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