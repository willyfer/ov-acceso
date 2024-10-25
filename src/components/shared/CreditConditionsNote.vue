<template>
  <div class="info-credito">
    <div class="info-credito__container-img">
      <img class="info-credito__img" :src="imgNota" />
    </div>
    <span>Un asesor se podrá en contacto para continuar con su solicitud de crédito</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgNota: require('@/assets/img/moto/nota.png'),
    }
  },
}
</script>

<style>
  .info-credito {
    margin: 15px 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.65em;
    color: #797979;
  }

  .info-credito__container-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }

  .info-credito__img {
    width: 100%;
  }
</style>
