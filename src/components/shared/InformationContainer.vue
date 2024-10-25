<template>
  <div class="information-container">
    <div class="header" :style="{ 'justify-content': align }">{{ title }}</div>
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationContainer',
  props:["title", 'align']
}
</script>

<style scoped>
.information-container {
  width: 100%;
}
.header {
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 30px 0 30px;
  border-radius: 50px;
  color: white;
  font-size: .9em;
  /* margin: 0 12px; */
}
.content {
  border: 1px solid #F36E47;
  margin: 0 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
}
</style>