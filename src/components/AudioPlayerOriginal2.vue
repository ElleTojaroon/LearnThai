<template>
  <div>
    <audio id="myAudio"
             controls
             autoplay
             preload="auto"
             style="visibility: visible; height: 0;"
             class="lb-flex-row
                    lb-align-center
                    lb-justify-center
                    lb-flex-0">

      <source id="myAudioSource" :src="audioSrcVar" type="audio/mp3">
    </audio>
    <div id="siriContainer" style="width: 100%; height: 100px;"></div>
    <el-button type="primary"
      @click="updateAudioSource()">food</el-button>
  </div>
</template>

<script>
  import * as SiriWave from 'siriwavejs'

  export default {
    name: 'lt-audio-visualizer',
    data() {
      return {
        audioSrcVar: '../../static/music/level1/food.mp3'
      };
    },
    methods: {
      updateAudioSource: function() {
        console.log('src', this.audioSrcVar);
        this.audioSrcVar = '../../static/music/level1/airport.mp3'
        console.log('src', this.audioSrcVar);
        var myAudio = document.getElementById("myAudio");
          if (myAudio.paused) {
            myAudio.play();
          }
      }
    },
    mounted() {
      // // // // console.log('siriContainer ', document.getElementById('siriContainer'));
      var SW = new SiriWave({
        style: 'ios',
        speed: 0.1,
        amplitude: 0.2,
        speedInterpolationSpeed: 0,
        container: document.getElementById('siriContainer'),
        autostart: true
      });

      // // console.log('init audio');
      var audio = document.getElementById('myAudio');
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = ctx.createAnalyser();
      analyser.connect(ctx.destination);
      analyser.fftSize = 2048;

      var bufferLength = analyser.frequencyBinCount;

      // console.log('audio', audio);
      // console.log('ctx', ctx);
      // console.log('analyser', analyser);
      // console.log('bufferLength', bufferLength);

      function getAverageVolume(data) {
        var values = 0;
        var length = data.length;
        for (var i = 0; i < data.length; i++) {
          values += data[i];
        }
        return values / data.length;
      }

      // // // console.log('update');
      // document.getElementById('myAudioSource').src = '../../static/music/level1/food.mp3';

      // // // console.log('audio ', audio);
      var input = ctx.createMediaElementSource(audio);

      // // // console.log('analyser ', analyser);
      input.connect(analyser);
      // // // console.log('input ', input);

      var processor = ctx.createScriptProcessor(2048, 1, 1);
      processor.connect(ctx.destination);
      // // // console.log('processor ', processor);
      // // // console.log('ctx.destination ', ctx.destination);

      // // // console.log('before onaudioprocess');
      processor.onaudioprocess = function() {
        var array =  new Uint8Array(analyser.frequencyBinCount);
        // // console.log('inside array ', array);
        analyser.getByteFrequencyData(array);
        // // console.log('analyser ', analyser);
        var average = getAverageVolume(array);
        // // console.log('average ', average);
        // // console.log('SW ', SW);
        SW.setAmplitude(average / 140);
      };
    }
  };
</script>


