<template>
  <v-card class="text-center ma-1">
    <!-- <v-card-title class="justify-center  text-center "> -->
    <div>
      <h5 class="mainTitleDoc">{{ item.title2 }}</h5>
    </div>
    <v-icon class="iconSize">description</v-icon>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon v-if="signature" style="fontSize:14px" color="express2">check_circle</v-icon>
      <a

        class="mainSubTitleDoc font"
        :href="
          `${url}/api/acr/${this.item.doc}/${this.datos.codigoExpediente}/0`
        "
        target="_blank"
        @click="changeState"
      >{{ signature ? 'VISUALIZADO' : 'VISTA PREVIA' }}</a>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['item', 'maxItems'],
  data() {
    return {
      actions: false,
      signature: false,
      url: process.env.DEFAULT_URL
    }
  },
  computed: {
    ...mapGetters('extraefectivo', ['datos']),
    isCheckValorados() {
      return this.datos.isCheckValorados
    }
  },
  watch: {
    isCheckValorados(val) {
      console.log("this.maxItems: ", this.maxItems);
      if (val.length === this.maxItems) {
        this.signature = true
      }
    }
  },
  mounted() {
    this.$ga.event('Activacion', 'DocumentoFirmar')
  },
  methods: {
    changeState() {
      const isCheckValorados = this.datos.isCheckValorados

      if (!this.signature) {
        isCheckValorados.push(this.item)
        this.$store.commit('default/UPDATE_DATOS', { isCheckValorados })
      }
      this.signature = true
    }
  }
}
</script>

<style scoped>
.iconSize {
  padding: 1px;
  font-size: 25px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 720px) {
  .mainSubTitleDoc {
    font-size: 10px;
  }
  h5.mainTitleDoc {
    height: 40px !important;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
  }
  .iconSize {
    padding: 1px;
    font-size: 25px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media (min-width: 721px) {
  .mainSubTitleDoc {
    font-size: 16px;
  }
  h5.mainTitleDoc {
    height: 40px !important;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;
    background: #fafafa;
  }
  .iconSize {
    padding: 1px;
    font-size: 40px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}


</style>
