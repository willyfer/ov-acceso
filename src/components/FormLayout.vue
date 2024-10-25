<template>
  <v-col
    id="ldForm"
    cols="12"
    sm="12"
    md="7"
    class="mainLayoutForm"
    :style="backgroundStyle"
  >
    <div class="mainForm">
      <div class="headerLayout" :style="bg">
        <h1 class="white--text">{{ tituloCabecera }}</h1>
        <!--         <v-btn class="headerBtn" text @click.native="userLogin">CLIC AQUÍ</v-btn> -->
      </div>
      <div class="ld-column-right">
        <slot name="formulario" />
      </div>
    </div>
  </v-col>
</template>
<script>
import { mapState } from 'vuex'
export default {
  /* props: ['background', 'color'], */
  props: {
    color: String,
    background: String,
    tituloCabecera: {
      type: String,
      default: '¿Ya te evaluaste?'
    }
  },
  computed: {
    ...mapState('default', ['step', 'bussines']),
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
      dialog: false,
      isCreated: false
    }
  },
  mounted() {
    this.isCreated = true
  },
  methods: {
    userLogin() {
      this.$ga.event('Reingreso', 'Abrir Modal')
      this.$store.commit('default/UPDATE_LOGIN_MODAL', true)
    }
  }
}
</script>

<style>
.mainLayoutForm {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: center !important;
  padding: 8px !important;
  /* border: 2px solid red !important */
}

.mainForm {
  border-radius: 12px;
  border: 3px solid white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5);
  width: 100%;
  /*max-height: 796px;*/
  min-height: 500px;
  height: auto;
}
.headerLayout {
  /*background-color: #eb7531;*/
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 72px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.ld-column-right {
  border-radius: 0 0 8px 8px;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;
  padding: 16px !important;
  width: 100% !important;
  min-height: 600px !important;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(255, 255, 255, 1)),
    color-stop(47%, rgba(246, 246, 246, 1)),
    color-stop(100%, rgba(237, 237, 237, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 1) 0%,
    rgba(246, 246, 246, 1) 47%,
    rgba(237, 237, 237, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=1 );
}
.headerH3 {
  font-size: 18px;
  color: white;
}

.headerBtn {
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: bold !important;
  padding: 0px !important;
  margin: 0px 5px !important;
  text-decoration: underline !important;
}

@media (min-width: 769px) and (max-width: 1024px) {
  .mainLayoutForm {
    align-items: center !important;
  }
}

@media (max-width: 768px) {
  .mainLayoutForm {
    align-items: center !important;
    padding: 20px 10px !important;
    min-height: calc(100vh - 48px) !important;
  }
  .ld-column-right {
    padding: 16px;
    top: 24px !important;
    min-height: 500px !important;
    height: 100% !important;
  }
}
</style>
