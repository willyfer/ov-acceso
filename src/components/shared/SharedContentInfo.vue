<template>
  <div class="footer">
    <img v-show="srcImage" class="footer__img" :src="srcImage" alt="" />
    <p class="footer__text mb-0">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SharedContentInfo',
  props: ['typeInfo'],
  computed: {
    srcImage() {
      let urlImage
      switch (this.typeInfo) {
        case 'sms':
          urlImage = require('@/assets/img/firma/sms.png')
          break
        case 'email':
          urlImage = require('@/assets/img/firma/email.png')
          break
        default:
          urlImage = ''
      }
      return urlImage
    },
  },
}
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #797979;
  border-radius: 30px;
  padding: 5px 10px;
}
.footer__img {
  width: 100%;
  max-width: 40px;
}
.footer__text {
  color: #797979;
  font-size: 0.65em;
  font-weight: bold;
  line-height: 1.2;
}
a {
  color: #0a4e88;
}
</style>