<template>
  <lt-game-box>
    <component :is="currLevel" :curr-game-level="currGameLevel" ></component>
  </lt-game-box>
</template>

<script>
  export default {
    props: ['currGameLevel'],
    data() {
      return {
        currLevel: 'lt-game-level' + this.currGameLevel,
        dmndLevel: this.$route.params.level,
        isDmndLevel: false
      }
    },
    methods: {
      incrLevel: function() {
        this.currGameLevel += 1;
        // this.$emit('incrLevel');
        console.log('incrLevel');
      }
    },
    mounted() {
      console.log('this.$route ', typeof this.$route.params.level != 'undefined');
      this.isDmndLevel = typeof this.$route.params.level != 'undefined';

      if (!this.isDmndLevel) {
        this.currLevel = 'lt-game-level' + this.currGameLevel;
      } else {
        this.currLevel = 'lt-game-level' + this.dmndLevel;
      }
    }
  }
</script>