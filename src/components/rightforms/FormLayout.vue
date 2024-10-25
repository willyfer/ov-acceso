<template>
  <v-col id="ldForm" class="crLayoutForm" :style="backgroundStyle">
    <div class="mainForm">
      <div class="headerLayout" :style="bg">
        <h2 class="white--text">{{ tituloCabecera }}</h2>
      </div>
      <div class="cr-column-right pa-2">
        <slot name="step1" />
      </div>
    </div>
  </v-col>
</template>
<script>
export default {
  props: {
    background: String,
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?'
    }
  },
  computed: {
    backgroundStyle() {
      if (this.isCreated && this.$vuetify.breakpoint.name === 'xs') {
        return { background: this.background }
      }
    },
    bg() {
      return { background: this.background }
    }
  },
  data() {
    return {
      isCreated: false
    }
  },
  mounted() {
    this.isCreated = true
  },
}
</script>

<style>
.crLayoutForm {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: center !important;
}

.mainForm {
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  height: auto;
}
.headerLayout {
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 72px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.cr-column-right {
  border-radius: 0 0 8px 8px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;
  padding: 16px !important;
  width: 100% !important;
  min-height: 550px !important;
  height: 100%;
  background-color: #dcdcdc;
}

@media (min-width: 769px) and (max-width: 1024px) {
  .crLayoutForm {
    align-items: center !important;
  }
}

@media (max-width: 768px) {
  .crLayoutForm {
    align-items: center !important;
    padding: 16px !important;
    min-height: calc(100vh - 48px) !important;
  }
  .cr-column-right {
    padding: 16px;
    top: 24px !important;
    min-height: 500px !important;
    height: 100% !important;
  }
}
</style>
