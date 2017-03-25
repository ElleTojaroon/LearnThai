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
        currLevel: 'lt-game-level' + this.currGameLevel
      }
    },
    methods: {
      incrLevel: function() {
        this.currGameLevel += 1;
        // this.$emit('incrLevel');
        console.log('incrLevel');
      }
    }
  }
</script>