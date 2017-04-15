<template>
  <div>
    <div class="container" id="lt-container-box">
      <h1 class="lt-text-center">Chapters</h1>
      <el-row type="flex" class="row-bg" justify="center">
        <el-button
          :plain="hasDone(1)" type="success"
          @click="goGame(1)">Game 1, Level 1</el-button>
        <el-button
          :plain="hasDone(2)" type="success"
          @click="goGame(2)">Game 1, Level 2</el-button>
        <el-button
          :plain="hasDone(3)" type="success"
          @click="goGame(3)">Game 1, Level 3</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['currGameLevel'],
    data() {
      return {

      }
    },
    methods: {
      hasDone(gameLevel) {
        // console.log('this.currGameLevel ', this.currGameLevel);
        return gameLevel < this.currGameLevel
      },
      goGame(level) {
        this.$router.push({ name: 'game', params: { level: level }});
      }
    }
  }

</script>