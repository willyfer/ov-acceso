<template>
  <div class="evaluation-submission-header-content">
    <p class="nombres">¡{{ nombreTitular }} {{ apellidoPaterno }}!</p>
    <p>tu evaluación esta siendo gestionada por nuestro equipo!</p>
    <p>Importante</p>
    <p>
      En 24 horas te estaremos comunicando el resultado de la evaluación de tu
      solicitud.
    </p>
    <p>
      En caso se haya ingresado un documento erroneo, nos pondremos en contacto
      contigo.
    </p>
  </div>
</template>

<script>
export default {
  props: ['nombreTitular', 'apellidoPaterno'],
}
</script>

<style lang='scss'>
.nombres {
  text-align: center;
}
.evaluation-submission-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  & :nth-child(1) {
    margin-top: 30px;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 0px;
  }
  & :nth-child(2) {
    margin: 0 60px 0 60px;
    text-align: center;
  }
  & :nth-child(3) {
    margin-top: 40px;
    border: 1px solid white;
    border-radius: 20px;
    width: 80%;
    text-align: center;
  }
  & :nth-child(4) {
    margin: 0 30px 20px 30px;
    font-size: 12px;
    text-align: center;
  }
  & :nth-child(5) {
    margin: 0 30px 40px 30px;
    font-size: 12px;
    text-align: center;
  }
}
</style>