<template>
  <div class="onBoarding__contaiener">
    <div>
      <Hero :loading="loading" @submit="submit" />
    </div>
    <div class="OnBoarding__contents content__secondary">
      <div>
        <Contents />
      </div>
     <!--  <div>
        <Form :color="color" :loading="loading" @submit="submit" />
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hero from '@/components/compra-deuda/evaluation/Hero'
import Contents from '@/components/compra-deuda/evaluation/Contents'
import Form from '@/components/compra-deuda/evaluation/Form'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
export default {
  props: {
    currentComponent: { type: Object, default: () => ({}) },
    color: String,
  },
  components: {
    Hero,
    Contents,
    Form,
  },
  mixins: [actionsByCodeMixin],
  computed: {
    ...mapGetters('users', ['canal', 'channel', 'productCode']),
    ...mapGetters('compra-deuda', ['estadoProspecto']),
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async submit(payload) {
      const dataForm = {
        ...payload,
        codigoProducto: this.currentComponent.codigoProducto,
        channel: 2,
      }
      this.loading = true
      await this.$store.dispatch('compra-deuda/actionValidaCliente', dataForm)
      this.analyzeProspectStatus()
      this.loading = false
    },
  },
}
</script>
<style scoped>
.onBoarding__contaiener {
  width: 100%;
  max-width: 2000px;
}
.OnBoarding__contents {
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 10px;
}
@media (min-width: 1024px) {
  .onBoarding__contaiener {
    margin-top: -60px;
  }
}
</style>
