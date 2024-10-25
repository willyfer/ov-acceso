<template>
  <div class="shared-header-without-stepper" >
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss'>
.shared-header-without-stepper {
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0 20px 0;
  position: relative;
}
</style>