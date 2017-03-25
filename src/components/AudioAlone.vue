<template>
  <div>
    <button class="button red-button" v-on:click.stop.prevent="toggleRecording"><br>
      <i class="stop icon" v-show="isRecording"></i><br>
      <i class="record icon" v-show="!isRecording"></i><br>
      <span v-show="!isRecording">Start recording</span><br>
      <span v-show="isRecording">Stop recording</span><br>
    </button><br>
    <button class="button green-button" v-if="dataUrl.length > 0" v-on:click.stop.prevent="togglePlay"><br>
        <i class="play icon"></i> Play recording<br>
    </button><br>
    <button class="remove-recording" v-if="dataUrl.length > 0" v-on:click.stop.prevent="removeRecording"><br>
      <i class="remove icon"></i> Delete recording<br>
    </button><br>
    <button class="button green-button"><br>
        <i class="send icon"></i> Send recording<br>
    </button><br>
    <audio id="audio" preload="auto"></audio>
  </div>
</template>

<script>
  export default {
      data: function () {
          return {
            isRecording: false,
            audioRecorder: null,
            recordingData: [],
            dataUrl: ''
          };
      },
      methods:
      {
          toggleRecording: function() {
            var that = this;
            this.isRecording = !this.isRecording;

            if (this.isRecording) {
              navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
              navigator.getUserMedia({
                  audio: true,
                  video: false
                }, function(stream) {
                  that.stream = stream;
                  that.audioRecorder = new MediaRecorder(stream, {

                      audioBitsPerSecond : 96000
                  });

                  that.audioRecorder.start();

                  console.log('Media recorder started');
                }, function(error) {
                  alert(JSON.stringify(error));
              });
            }
            else {
              this.audioRecorder.stop();
              this.audioRecorder.ondataavailable = function(event) {
                  that.recordingData.push(event.data);
              }

              this.audioRecorder.onstop = function(event) {
                  console.log('Media recorder stopped');

                  var blob = new Blob(that.recordingData, { type: 'audio/ogg'});
                  that.dataUrl = window.URL.createObjectURL(blob);
              }
            }
          },
          removeRecording: function() {
            this.isRecording = false;
            this.recordingData = [];
            this.dataUrl = '';
          },
          togglePlay: function() {
            var audioElement = document.getElementById("audio");
            if (audioElement.paused === false) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
          },
          submitRecording: function() {

          }
      }
  };
</script>


