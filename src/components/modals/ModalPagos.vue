<template>
  <v-dialog v-model="isModalPagos" persistent :max-width="maxWhidth" height="auto">
    <form @submit.prevent="confirmModal">
      <v-card class="ld-modal">
        <v-card-title>
          Forma de Pago - {{ formaPago }}
        </v-card-title>
        <v-card-subtitle>
          <p v-html="speech"></p>
        </v-card-subtitle>
        <v-card-text style="padding-top: 0px !important;">
          <slot name="inputs-modal"></slot>
        </v-card-text>
        <v-card-actions>
          <v-row no-gutters>
            <v-col cols="12" order-md="2" md="7" class="text-center pa-1">
              <v-btn type="submit" class="ld-btn" :color="color" :loading="loading">OK</v-btn>
            </v-col>
            <v-col cols="12" order-md="1" md="5" class="text-center pa-1">
              <v-btn class="ld-btn-secondary" @click="closeModal">CANCELAR</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isModalPagos: {
      default: false
    },
    maxWhidth: {
      default: '500'
    },
    formaPago: {
      default: null
    },
    speech: {
      default: null
    },
    color: {
      default: 'acceso'
    },
    loading: {
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    confirmModal() {
      this.$emit('modalpagosconfirm')
    },
    closeModal() {
      this.$emit('modalpagosclose')
    }
  }
}
</script>

<style>

</style>