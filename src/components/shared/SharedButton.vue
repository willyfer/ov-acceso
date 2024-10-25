<template> 
  <v-btn
    rounded
    dark
    @click="$emit('click', $event)"
    class="shared-button"
    :class="{'shared-button-orange': buttonOrange, 'shared-button-silver': buttonSilver}"
    :style="{ width: totalWidth + '%' }"
    :type="type"
    :loading="loading"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: {
    loading: {type: Boolean, default: false},
    type: {type: String, default: 'button'},
    text: { type: String, default: '' },
    buttonOrange: { type: Boolean, default: false },
    buttonSilver: { type: Boolean, default: false },    
    totalWidth: { type: Number, default: 0 },
  }
}
</script>

<style lang='scss'>
  .shared-button {
    border-radius: 20px;
    color: white;
    padding: 3px;
  }
  .shared-button-orange {
    background-color: #ff4e00 !important;
    background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%) !important;
  }
  .shared-button-silver {
    background: silver !important;
  }
</style>