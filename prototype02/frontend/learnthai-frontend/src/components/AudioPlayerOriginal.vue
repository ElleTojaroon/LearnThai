<template>
  <div>
    <audio id="myAudio"
             controls
             autoplay
             preload="auto"
             style="visibility: hidden; height: 0;"
             class="lb-flex-row
                    lb-align-center
                    lb-justify-center
                    lb-flex-0">
      <source id="myAudioSource" src="" type="audio/mp3">
    </audio>
    <div id="siriContainer" style="width: 100%; height: 100px;"></div>
  </div>
</template>

<script>
  import * as SiriWave from 'siriwavejs-master'

  export default {
    name: 'lt-audio-visualizer',
    data() {
      return {
        // myAudioSource: document.getElementById('myAudioSource'), // need to change to computed property

      };
    },
    methods: {
      updateAudioSource: function(s) {
        currAudioSource.src = s;
      }
    },
    mounted() {
      // // // console.log('siriContainer ', document.getElementById('siriContainer'));
      var SW = new SiriWave({
        style: 'ios',
        speed: 0.1,
        amplitude: 0.2,
        speedInterpolationSpeed: 0,
        container: document.getElementById('siriContainer'),
        autostart: true
      });

      // console.log('init audio');
      var audio = document.getElementById('myAudio');
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = ctx.createAnalyser();
      analyser.connect(ctx.destination);
      analyser.fftSize = 2048;

      var bufferLength = analyser.frequencyBinCount;

      console.log('audio', audio);
      console.log('ctx', ctx);
      console.log('analyser', analyser);
      console.log('bufferLength', bufferLength);

      function getAverageVolume(data) {
        var values = 0;
        var length = data.length;
        for (var i = 0; i < data.length; i++) {
          values += data[i];
        }
        return values / data.length;
      }

      // // console.log('update');
      document.getElementById('myAudioSource').src = '../../static/music/level1/airport.mp3';

      // // console.log('audio ', audio);
      var input = ctx.createMediaElementSource(audio);

      // // console.log('analyser ', analyser);
      input.connect(analyser);
      // // console.log('input ', input);

      var processor = ctx.createScriptProcessor(2048, 1, 1);
      processor.connect(ctx.destination);
      // // console.log('processor ', processor);
      // // console.log('ctx.destination ', ctx.destination);

      // // console.log('before onaudioprocess');
      processor.onaudioprocess = function() {
        var array =  new Uint8Array(analyser.frequencyBinCount);
        // console.log('inside array ', array);
        analyser.getByteFrequencyData(array);
        // console.log('analyser ', analyser);
        var average = getAverageVolume(array);
        // console.log('average ', average);
        // console.log('SW ', SW);
        SW.setAmplitude(average / 140);
      };
    }
  };
</script>


