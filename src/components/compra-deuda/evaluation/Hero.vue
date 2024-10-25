<template>
  <div class="hero">
    <Form class="hero__form" :loading="loading" @submit="submit" />
  </div>
</template>

<script>
import Form from '@/components/compra-deuda/evaluation/Form'
export default {
  name: 'Hero',
  props: {
    loading: Boolean,
  },
  components: {
    Form,
  },
  data() {
    return {
      imgBanner: require('@/assets/img/compra-deuda/banner.png'),
      imgBorder: require('@/assets/img/compra-deuda/borderOrange.png'),
    }
  },
  methods: {
    submit(payload) {
      this.$emit('submit', payload)
    },
  },
}
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  min-width: 300px;
  min-height: 400px;
  background-color: #082642;
}
@media (min-width: 768px) {
  .hero {
    background-image: url('~assets/img/compra-deuda/banner.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
@media (min-width: 1024px) {
  .hero__form {
    position: relative;
    left: -70px;
  }
  .hero {
    min-height: 500px !important;
  }
}
@media (min-width: 1440px) {
  .hero__form {
    position: relative;
    left: -80px;
  }
}
</style>