<template>
  <div class="preevaluation-header-conntent">
    <div class="preevaluation-header-conntent__name-product">
      <span>Finaciamos la</span>
      <span>{{ nameProduct }}</span>
      <span>que tanto deseas</span>
      <img class="preevaluation-header-conntent__image-product" :src="require(`@/assets/img/${imgProduct}`)" />
    </div>
    <div class="preevaluation-header-conntent__container-logo">
      <img class="preevaluation-header-conntent__logo" src="@/assets/logo_header.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreevaluationHeaderContent',
  props: {
    nameProduct: {
      type: String,
    },
    imgProduct: {
      type: String,
    }
  },
}
</script>

<style lang='scss'>
.preevaluation-header-conntent {  
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 156px;
  border-radius: 24px;
  color: white;
  font-weight: bold;
  width: 100%;
  &__name-product {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 62%;
    margin-left: 40px;
    margin-bottom: 40px;
    font-style: italic;
    & :nth-child(1), & :nth-child(3) {
      margin-left: 30px;
    }
    & :nth-child(2) {
      font-size: 28px;
      border: 1px solid white;
      border-right: 0;
      border-radius: 20px 0 0 20px;
      padding-left: 30px;
      line-height: 1;
    }

  }
  &__image-product {
    position: absolute;
    width: 70px;
    right: -52px;
  }
  &__container-logo {
    background: white;    
    position: absolute;
    bottom: -20px;
    left: 14%;
    width: 72%;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
  }
  &__logo {
    height: 82%;
    width: auto;    
  }  
}
</style>