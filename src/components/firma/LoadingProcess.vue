<template>
  <div class="containerLoading">
    <LoadingComponent color="#0A4E88" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { verify } from 'jsonwebtoken'
import LoadingComponent from '@/components/shared/loading/LoadingComponent'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'

export default {
  name: 'LoadingProcess',
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  components: {
    LoadingComponent,
  },
  mixins: [actionsByCodeMixin],
  async mounted() {
    try {
      const { key } = this.$route.query;
      await this.$store.dispatch('firma/actionContinuarProceso', key);
      this.analyzeProspectStatus()      
    } catch (error) {
      this.$showError(error);      
    }
  },
  computed: {
    ...mapGetters('firma', [ 
      'estadoProspecto', 
      'productCode'
    ]),
  },
}
</script>

<style scoped>
.containerLoading {
  margin-top: 30vh;
}
</style>