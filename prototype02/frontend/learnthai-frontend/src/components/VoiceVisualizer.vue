<template>
  <div id="siriContainer" style="width: 100%; height: 100px;"></div>
</template>

<script>
  import * as SiriWave from 'siriwavejs-master'

  export default {
    name: 'lt-audio-visualizer',
    data() {
      return {

      };
    },
    mounted() {
      // console.log('siriContainer ', document.getElementById('siriContainer'));
      var SW = new SiriWave({
        style: 'ios9',
        speed: 0.1,
        amplitude: 0.2,
        speedInterpolationSpeed: 0,
        container: document.getElementById('siriContainer'),
        autostart: true
      });

      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = ctx.createAnalyser();
      analyser.connect(ctx.destination);
      analyser.fftSize = 2048;

      var bufferLength = analyser.frequencyBinCount;

      function getAverageVolume(data) {
        var values = 0;
        var length = data.length;
        for (var i = 0; i < data.length; i++) {
          values += data[i];
        }
        return values / data.length;
      }

      window.navigator.getUserMedia({ audio: true },
        function(stream) {
          var input = ctx.createMediaStreamSource(stream);
          input.connect(analyser);

          var processor = ctx.createScriptProcessor(2048, 1, 1);
          processor.connect(ctx.destination);

          processor.onaudioprocess = function() {
            var array =  new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var average = getAverageVolume(array);
            SW.setAmplitude(average / 140);
          };
        },
        function(){}
      );
    },
    methods: {
    }
  };
</script>


