<template>
  <div class="container">
    <div class="jumbotron" id="home-card">
      <h1>Learn Thai language = fun <i class="fa fa-smile-o" aria-hidden="true"></i></h1>
      <hr>
      <p><router-link to="/game-level-1" class="btn btn-primary btn-lg" role="button">Let's Play!</router-link></p>
      <p><router-link to="/history" class="btn btn-primary btn-lg" href="#" role="button">Vocab summary</router-link></p>
    </div>
  </div>
</template>

<style type="text/css">
  #home-card {
    margin-top: 3rem;
    background-color: rgba(255,255,255,0.7);
    text-align: center;
  }
</style>