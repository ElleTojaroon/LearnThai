<template>
  <div>
    <!-- nav bar -->
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="navbar-brand" id="lt-navbar-logo">
            <div class="row">
              <div class="col-md-4 col-md-offset-0">
                <!-- <img src="../../static/images/icons/learnthai_icon.jpg" id="lt-navbar-icon"> -->
              </div>
            </div>
            <div class="row">Learn Thai</div>
          </div>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
          <ul class="nav navbar-nav">
            <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-2"><router-link to="/">Home<span class="sr-only">(current)</span></router-link></li>
            <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-2"><router-link to="/history">History</router-link></li>
            <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-2"><router-link to="/about">What is Learn Thai?</router-link></li>
            <li data-toggle="collapse" data-target="#bs-example-navbar-collapse-2"><router-link to="/game-level-1">Play!</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="http://www.cs.cornell.edu/~eland/" target="_blank">Andersen Group</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- content -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style>
  #lt-navbar-icon {
    width: 6rem;
  }

  #lt-navbar-logo {
    padding-top: 5px;
    padding-left: 20px;
  }
</style>