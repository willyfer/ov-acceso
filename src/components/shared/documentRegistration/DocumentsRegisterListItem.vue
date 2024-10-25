<template>
  <div  @click="openFile" class="document-register-list-item">
    <input class="myfileid" accept="image/png, image/jpeg, application/pdf" type="file" style="display:none;" @change="attachFile">
    <div class="list-item__containe-item-image">
      <img v-if="document.isUploadedImage" class="list-item__item_image" src="@/assets/img/imgUpload.png" alt="">
      <img v-if="!document.isUploadedImage" class="list-item__item_image" src="@/assets/img/item-step.png" alt="">
      <span v-if="!document.isUploadedImage" class="list-item__item_value">{{ itemNumber }}</span>
    </div>
    <div class="list-item__content">
      <span class="list-item__title">{{ document.nombre }}</span>
      <span class="list-item__meta-data">{{ document.descripcion }}</span>
    </div>
    <div>
      <img class="list-item__photo_image" src="@/assets/img/camara.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    document: { type: Object, default: () => ({}) },
    itemNumber: { type: Number, default: 0 },
  },
  methods: {
    openFile(event) {
      const ele = event.target.closest('.document-register-list-item');
      ele.querySelector('.myfileid').click();
    },
    attachFile(event) {     
      this.$emit('attach-file', { event, documentType: this.document.tipoDocumento });
    },
    
  },
}
</script>

<style lang='scss'>
  .document-register-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 20px 25px 20px;
    .list-item__containe-item-image {
      position: relative;
    }
    .list-item__item_image {
      width: 28px;
    }
    .list-item__item_value {
      position: absolute;
      color: white;
      left: 4px;
      text-align: center;
    }
    .list-item__content {
      display: flex;
      flex-direction: column;
      margin: 0 8px 0 5px;
      flex: 2;
    }
    .list-item__title {
      color: #ff4e00;
      font-size: 12px;
      font-weight: bold;
    }
    .list-item__meta-data {
      font-size: 9px;
    }
    .list-item__photo_image {
      width: 40px;
      cursor: pointer;
    }
  }
</style>