<template>
  <lt-game-box>
    <component :is="currLevel" :curr-game-level="levelToPlay" ></component>
  </lt-game-box>
</template>

<script>
  export default {
    props: ['currGameLevel'],
    data() {
      return {
        currLevel: 'lt-game-level' + this.currGameLevel,
        dmndLevel: this.$route.params.level,
        levelToPlay: 1,
        isDmndLevel: false,
        difficulty: 1
      }
    },
    methods: {
      incrLevel: function() {
        this.currGameLevel += 1;
        // this.$emit('incrLevel');
        // console.log('incrLevel');
      }
    },
    created() {
      // console.log('this.$route ', typeof this.$route.params.level != 'undefined');
      this.isDmndLevel = typeof this.$route.params.level != 'undefined';

      if (!this.isDmndLevel) {
        this.currLevel = 'lt-game-level' + this.difficulty;
      } else {
        // this.currLevel = 'lt-game-level' + this.dmndLevel;

        this.currLevel = 'lt-game-level' + this.difficulty;
        this.levelToPlay = this.dmndLevel;
        console.log('this.levelToPlay', this.levelToPlay);
      }
    }
  }
</script>