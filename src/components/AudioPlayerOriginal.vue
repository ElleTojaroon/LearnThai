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
    <div id="siriContainer" style="width: 100%; height: 50px;"></div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-button type="text"
        @click="replayAudio()">replay audio</el-button>
    </el-row>
  </div>
</template>

<script>
  import * as SiriWave from 'siriwavejs'

  export default {
    props: ['audioSrc'],
    data() {
      return {
        audioPlayer: {}
      };
    },
    watch: {
      audioSrc: function (newAudio) {
        this.updateAudio();
        this.replayAudio();
      }
    },
    methods: {
      replayAudio: function() {
        this.audioPlayer.pause();
        this.audioPlayer.load();
        this.audioPlayer.play();
      },
      updateAudio: function() {
        this.audioPlayer.src = this.audioSrc;
      }
    },
    mounted() {
      var SW = new SiriWave({
        style: 'ios',
        speed: 0.1,
        amplitude: 0.2,
        speedInterpolationSpeed: 0,
        container: document.getElementById('siriContainer'),
        autostart: true,
        color: "#4DB3FF"
      });

      var audio = document.getElementById('myAudio');
      this.audioPlayer = audio;
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

      document.getElementById('myAudioSource').src = this.audioSrc;

      var input = ctx.createMediaElementSource(audio);
      input.connect(analyser);

      var processor = ctx.createScriptProcessor(2048, 1, 1);
      processor.connect(ctx.destination);

      processor.onaudioprocess = function() {
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var average = getAverageVolume(array);
        SW.setAmplitude(average / 140);
      };
    }
  };
</script>


