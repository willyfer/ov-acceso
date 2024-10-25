<template>
  <div class="preevaluation-credinstante-header-conntent">
    <div class="preevaluation-credinstante-header-conntent__name-product">
      <span>Taxista</span>
      <span>¿Necesitas plata?</span>
      <span>¡Píde tu préstamo ya!</span>
    </div>
    <div class="preevaluation-credinstante-header-conntent__container-logo">
      <img class="preevaluation-credinstante-header-conntent__logo" src="@/assets/logo_header.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreevaluationHeaderContent',
}
</script>

<style lang='scss'>
.preevaluation-credinstante-header-conntent {  
  display: flex;
  align-items: center;
  justify-content: center;
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
    align-items: center;
    margin-bottom: 40px;
    font-style: italic;
    & :nth-child(1) {
      font-size: 46px;
      line-height: 0.8;
    }
    & :nth-child(2) {
      font-size: 22px;
      margin-bottom: 10px;
    }
    & :nth-child(3) {
      border: 1px solid white;
      border-radius: 20px;
      padding: 2px 40px;
    }
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