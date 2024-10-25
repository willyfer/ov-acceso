<template>
  <v-app light>
    <HomeToolbar></HomeToolbar>
    <v-main class="mainLayout">
      <LoadingGeneral :isLoading='isLoading' />
      <nuxt />
    </v-main>
    <AlertError ref="errorModal" />
  </v-app>
</template>
<script>
import HomeToolbar from '@/components/toolbar/HomeToolbar'
import LoadingGeneral from '@/components/shared/loading/LoadingGeneral'
import AlertError from '@/components/modals/AlertError';
import { eventBus } from '~/event-bus'

export default {
  name: 'layoutDefault',
  components: {
    HomeToolbar,
    LoadingGeneral,
    AlertError,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  mounted() {
    this.$nextTick(() => {
      eventBus.$on('openModalError', (data) => {
        this.$refs.errorModal.open(data)
      })
    })
  },
  destroyed() {
    eventBus.$off('openModalError')
  }
}
</script>

<style scoped>

</style>
