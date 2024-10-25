<template>
  <v-dialog v-model="dialogVisible" :max-width="maxWidth">
    <div class="sending-letter-modal">
      <div class="sending-letter-modal__container-title">
        <p class="sending-letter-modal__title">
          Envío de carta de {{ tipoCartaMensaje }}
        </p>
      </div>
      <p class="sending-letter-modal__description">
        Selecciona el medio por el cual deseas enviar la carta de
        {{ tipoCartaMensaje }}
      </p>
      <v-radio-group v-model="radios">
        <v-radio
          class="sending-letter-modal__container-phone"
          value="cellPhoneNumber"
        >
          <template v-slot:label>
            <p class="sending-letter-modal__phone">
              Al número de teléfono <span>{{ cellPhoneNumber }}</span>
            </p>
          </template>
        </v-radio>
        <v-radio
          v-if="email"
          class="sending-letter-modal__container-email"
          value="email"
        >
          <template v-slot:label>
            <p class="sending-letter-modal__email">
              Al correo electrónico <span>{{ email }}</span>
            </p>
          </template>
        </v-radio>
      </v-radio-group>
      <div class="sending-letter-modal__container-button">
        <v-btn
          class="sending-letter-modal__button-send"
          :loading="loadingEnviar"
          rounded
          dark
          @click="sendApprovalLetter"
          >Enviar</v-btn
        >
        <v-btn
          class="sending-letter-modal__button-download"
          :loading="loadingDescargar"
          rounded
          dark
          @click="downloadApprovalLetter"
          >Descargar</v-btn
        >
      </div>
    </div>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { ProductCode } from '@/enums/global-enums'
export default {
  props: {
    email: { type: String, default: '' },
    cellPhoneNumber: { type: String, default: '' },
    loadingEnviar: { type: Boolean, default: false },
    loadingDescargar: { type: Boolean, default: false },
    maxWidth: { type: Number, default: 450 },
    estadoProspecto: { type: Number, default: 0 },
  },
  data() {
    return {
      dialogVisible: false,
      radios: 'cellPhoneNumber',
      mapeo: {
        email: 'correo',
        cellPhoneNumber: 'telefono',
      },
      averageCosts: {
        telefono: '',
        correo: '',
      },
    }
  },
  computed: {
    ...mapGetters('moto', ['productCode']),
    tipoCartaMensaje() {
      return (this.productCode === ProductCode.MOTO &&
        this.estadoProspecto === 90 || this.estadoProspecto === 92) ||
        this.codigoProducto === ProductCode.MOTO_NO_BANCARIADOS
        ? 'pre-aprobacion'
        : 'aprobación'
    },
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    sendApprovalLetter() {
      const data = {
        ...this.averageCosts,
        ...{ [this.mapeo[this.radios]]: this[this.radios] },
      }
      this.$emit('send-approval-letter', data)
    },
    downloadApprovalLetter() {
      this.$emit('downlload-approval-letter')
    },
  },
}
</script>

<style lang='scss'>
.sending-letter-modal {
  background: white !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 14px;
  &__container-title {
    background-color: #ff4e00 !important;
    background-image: linear-gradient(
      315deg,
      #ff4e00 0%,
      #ec9f05 74%
    ) !important;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    margin: 4px;
    border-radius: 14px;
    width: 98%;
  }
  &__title {
    width: 51%;
    text-align: center;
  }
  &__description {
    margin-top: 16px;
    width: 90%;
    color: orange;
  }
  &__container-phone {
    border: 1px solid orange;
    border-radius: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 32px;
    padding: 2px;
    margin-left: 20px;
    margin-right: 20px;
  }
  &__phone {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 0px !important;
    width: 94%;
    overflow: hidden;
    span {
      color: green;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &__container-email {
    border: 1px solid orange;
    border-radius: 14px;
    margin-top: 8px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 32px;
    padding: 2px;
    margin-left: 20px;
    margin-right: 20px;
  }
  &__email {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 0px;
    display: flex;
    white-space: nowrap;
    margin-bottom: 0px !important;
    width: 68%;
    overflow: hidden;
    span {
      color: green;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 4px;
    }
  }
  &__container-button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
  &__button-send {
    width: 43%;
    margin-right: 4px;
    font-size: 12px !important;
    background-color: #ff4e00 !important;
    background-image: linear-gradient(
      315deg,
      #ff4e00 0%,
      #ec9f05 74%
    ) !important;
  }
  &__button-download {
    width: 43%;
    margin-left: 4px;
    font-size: 12px !important;
    background: silver !important;
  }
}
</style>
