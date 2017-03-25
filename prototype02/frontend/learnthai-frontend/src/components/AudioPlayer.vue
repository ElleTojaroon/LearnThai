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
        audio: document.getElementById('myAudio'),
        ctx: {},
        analyser: {},
        bufferLength: {},
        array: [],
        average: 0,
        values: 0,
        length: 0,
        input: {},
        processor: {},
        SW: {}
      };
    },
    methods: {
      initAudioPlayer: function() {
        // this.audio = document.getElementById('myAudio');
        // console.log('init')
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.connect(this.ctx.destination);
        this.analyser.fftSize = 2048;

        this.bufferLength = this.analyser.frequencyBinCount;

        console.log('audio1', this.audio);
        console.log('ctx1', this.ctx);
        console.log('analyser1', this.analyser);
        console.log('bufferLength1', this.bufferLength);
      },
      getAverageVolume: function(data) {
        // console.log('in getAverageVolume');
        // console.log('inside getAverageVolume ', this.getAverageVolume);
        this.values = 0;
        this.length = data.length;
        // // console.log('data ', data);
        for (var i = 0; i < data.length; i++) {
          this.values += data[i];
        }
        // // console.log('values ', this.values);
        return this.values / data.length;
      },
      processAudio: function() {
        // console.log('processAudio');
        // // console.log('inside analyser.frequencyBinCount ', this.analyser.frequencyBinCount);
        this.array =  new Uint8Array(this.analyser.frequencyBinCount);
        console.log('inside array1 ', this.array);
        this.analyser.getByteFrequencyData(this.array);
        console.log('analyser1 ', this.analyser);
        this.average = this.getAverageVolume(this.array);
        console.log('average1 ', this.average);
        console.log('SW1 ', this.SW);
        this.SW.setAmplitude(this.average / 140);
      },
      updateAudioSource: function(s) {
        // console.log('update')
        document.getElementById('myAudioSource').src = '../../static/music/level1/airport.mp3';
        // console.log('audio ', this.audio);
        this.input = this.ctx.createMediaElementSource(this.audio);
        // console.log('input ', this.input);

        // console.log('analyser ', this.analyser);
        this.input.connect(this.analyser);

        this.processor = this.ctx.createScriptProcessor(2048, 1, 1);
        this.processor.connect(this.ctx.destination);
        // console.log('processor ', this.processor);
        // console.log('ctx.destination ', this.ctx.destination);
      }

    },
    mounted() {
      this.SW = new SiriWave({
        style: 'ios',
        speed: 0.1,
        amplitude: 0.2,
        speedInterpolationSpeed: 0,
        container: document.getElementById('siriContainer'),
        autostart: true
      });
      this.initAudioPlayer();
      console.log('audio', this.audio);
      console.log('ctx', this.ctx);
      console.log('analyser', this.analyser);
      console.log('bufferLength', this.bufferLength);

      this.updateAudioSource();
      console.log('inside array ', this.array);
      console.log('analyser ', this.analyser);
      console.log('average ', this.average);
      console.log('SW ', this.SW);



      // function getAverageVolume(data) {
      //   // console.log('in getAverageVolume');
      //   // console.log('inside getAverageVolume ', this.getAverageVolume);
      //   this.values = 0;
      //   this.length = data.length;
      //   // // console.log('data ', data);
      //   for (var i = 0; i < data.length; i++) {
      //     this.values += data[i];
      //   }
      //   // // console.log('values ', this.values);
      //   return this.values / data.length;
      // };
      // function processAudio() {
      //   // console.log('processAudio');
      //   // // console.log('inside analyser.frequencyBinCount ', this.analyser.frequencyBinCount);
      //   this.array =  new Uint8Array(this.analyser.frequencyBinCount);
      //   console.log('inside array ', this.array);
      //   this.analyser.getByteFrequencyData(this.array);
      //   console.log('analyser ', this.analyser);
      //   this.average = getAverageVolume(this.array);
      //   console.log('average ', this.average);
      //   console.log('SW ', this.SW);
      //   this.SW.setAmplitude(this.average / 140);
      // };

      // this.processor.onaudioprocess = function() {
      //   this.array =  new Uint8Array(this.analyser.frequencyBinCount);
      //   console.log('inside array ', this.array);
      //   this.analyser.getByteFrequencyData(this.array);
      //   console.log('analyser ', this.analyser);
      //   this.average = getAverageVolume(this.array);
      //   console.log('average ', this.average);
      //   console.log('SW ', this.SW);
      //   this.SW.setAmplitude(this.average / 140);
      // };

      this.processor.onaudioprocess = this.processAudio();

    }
  };
</script>


