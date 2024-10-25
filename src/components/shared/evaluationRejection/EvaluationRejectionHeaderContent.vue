<template>
  <div class="evaluation-rejection-header-content">
    <img src="@/assets/img/rechazo.png" alt="">
    <p>Lo sentimos, no podemos ofrecerte un préstamo</p>
    <p>Queremos asegurarte que estamos otorgando créditos con seguridad. Según tus ingresos y gastos, no podemos ofrecerte un producto en este momento.</p>
    <p>Podemos informarte si esto cambia. No dudes en volver a consultar en cualquier momento.</p>
  </div>
</template>

<script>
export default {
  name: 'EvaluationRejectionHeaderContent',
}
</script>

<style lang='scss'>
  .evaluation-rejection-header-content {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & :nth-child(1) {
      width: 14%;
    }
    & :nth-child(2) {
      margin: 30px 60px 60px 60px;
      text-align: center;
    }
    & :nth-child(3) {
      margin: 0 30px 20px 30px;
      font-size: 12px;
      text-align: center;
    }
    & :nth-child(4) {
      margin: 0 30px 20px 30px;
      font-size: 12px;
      text-align: center;
    }
  }
</style>