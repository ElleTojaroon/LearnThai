<template>
  <div class="container">
    <div class="jumbotron" id="home-card">
      <h3>Learn Thai language = fun <i class="fa fa-smile-o" aria-hidden="true"></i></h3>
      <hr>
      <p><el-button type="primary" @click="goGame">Let's Play!</el-button></p>
      <p><el-button type="primary" @click="goHistory">Vocab summary</el-button></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['currGameLevel'],
    methods: {
      goHistory() {
        this.$router.push('/history');
      },
      goGame() {
        this.$router.push('/game/' + this.currGameLevel);
      }
    }
  }
</script>

<style type="text/css">
  #home-card {
    margin-top: 3rem;
    background-color: rgba(255,255,255,0.7);
    text-align: center;
  }
</style>