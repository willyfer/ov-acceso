<template>
  <v-container fluid pa-0>
    <v-row class="d-flex flex-row">
      <v-col lg="6" md="6" class="v-col-left d-flex align-center">
        <Banner :logo="imgBanner" />
      </v-col>
      <v-col
        lg="6"
        md="6"
        class="d-flex flex-column justify-center align-center"
      >
        <Form
          :background="color"
          :color="color"
          :loading="loading"
          @submit="submit"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import Banner from '@/components/extraefectivo/evaluation/Banner'
import Form from '@/components/extraefectivo/evaluation/Form'
import actionsByCodeMixin from '@/mixins/actionsByCodeMixin'
export default {
  props: {
    currentComponent: { type: Object, default: () => ({}) },
  },
  components: {
    Banner,
    Form,
  },
  mixins: [actionsByCodeMixin],
  computed: {
    ...mapGetters('users', ['canal', 'channel', 'productCode']),
    ...mapGetters('extraefectivo', ['estadoProspecto']),
  },
  data() {
    return {
      color: '#ff7729',
      loading: false,
      imgBanner: require('@/assets/img/extraefectivo/KV_Acceso.png'),
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
      await this.$store.dispatch('extraefectivo/actionValidaCliente', dataForm)
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
  background: white;
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
