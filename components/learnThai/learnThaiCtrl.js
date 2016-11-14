
'use strict';

controllers.controller('learnThaiCtrl',
  ['$scope', '$rootScope', '$timeout','$location',
    function ($scope, $rootScope, $timeout, $location) {
      /************************* scope variables ******************************/
      $scope.choices;
      $scope.questionString;
      $scope.audio;
      $scope.timeoutId = null;
      $scope.hasAnswered = false;
      $scope.score = 0;
      $scope.totalLife = 5;
      $scope.life = 5;
      $scope.audioRepeats = 0;
      $scope.btnReplay = "Tap to replay";

      /************************* local variables ******************************/
      var timer;
      var canvas, ctx, source, context, analyser;
      var fbc_array, bars, bar_x, bar_y, bar_width, bar_height;
      var questions;
      var questionIdx = -1;
      var audio = document.getElementById('myAudio');
      var canvas = document.getElementById('analyser_render');

      /************************* functions ************************************/
      $timeout(function (){
        $scope.pageLoad();
      },0.5);

      $scope.pageLoad = function (){
        initMp3Player();
        getJSON("json/level1.json", function(json) {
          questions = json;
          incQuestion();
          $timeout(function (){
            updateAudioSource();
            // test
            audio.addEventListener("ended", function(){
              $scope.checkAnswer(); // before every check ans, check if the audio is finished
            });
          },100);
        });
      };

      $scope.aud_play = function () {
        var myAudio = document.getElementById("myAudio");
          if (myAudio.paused) {
            myAudio.play();
            $scope.audioRepeats += 1;
          }
      };

      function updateAudioSource() {
        var currAudioSource = document.getElementById('myAudioSource');
        audio.load(); //call this to just preload the audio without playing
        currAudioSource.src =
          '../../music/level1/' + $scope.audio;
        // need to disconnect media element source from the previous audio
        // Re-route audio playback into the processing graph of the AudioContext
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
        audio.play(); //call this to play the song right away
      };

      /* Initialize the MP3 player after the page loads
       * all of its HTML into the window */
      function initMp3Player(){
        // AudioContext instance
        context = new (window.AudioContext || window.webkitAudioContext)();
        analyser = context.createAnalyser(); // AnalyserNode method
        canvas = document.getElementById('analyser_render');
        ctx = canvas.getContext('2d');

        // Re-route audio playback into the processing graph of AudioContext
        source = context.createMediaElementSource(audio);
      }

      /* frameLooper() animates any style of graphics you wish to
       * the audio frequency
       * Looping at the default frame rate that the browser
       * provides(approx. 60 FPS) */
      function frameLooper(){
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#c7d8c6'; // Color of the bars
        bars = 100;
        for (var i = 0; i < bars; i++) {
          bar_x = i * 4;
          bar_height = (fbc_array[i]/2 - 40)*1.4;
          bar_y = (canvas.height - bar_height)/2;
          bar_width = 2;
          if (bar_height < 0) {
            bar_height = 0;
          }
          // fillRect( x, y, width, height )
          ctx.fillRect(bar_x, bar_y, bar_width, bar_height);
        }
      }

      $scope.checkAnswer = function (){
        console.log("check")
        if($scope.timeoutId){
            $timeout.cancel($scope.timeoutId);
            $scope.timeoutId = null;
        }
        $scope.timeoutId = $timeout(function (){
          $("[is-correct='true']").one('click', function() {
            $scope.hasAnswered = true;
            if (! $(this).hasClass('hvr-push')) {
              $scope.score += 100;
            }
            $(this).addClass('hvr-push lt-correct-choice');
            $scope.nextQuestion();
            if (!$scope.$$phase) {
                $scope.$apply();
            }
          });
          $("[is-correct='false']").one('click', function() {
            if (!$scope.hasAnswered) {
              if (! $(this).hasClass('hvr-wobble-horizontal')) {
                $scope.life -= 1;
              }
              if (!$scope.$$phase) {
                $scope.$apply();
              }
              $(this).addClass('hvr-wobble-horizontal lt-wrong-choice');
              $("[is-correct='false']").addClass('lt-wrong-pics');
              $scope.hasAnswered = true;
              $("[is-correct='true']").addClass('hvr-push lt-correct-choice');
              $scope.nextQuestion();
            }
          });
        },100);
      };

      /* update question and audio */
      function nextQuestion_helper() {
        $scope.hasAnswered = false;
        incQuestion();
        updateAudioSource();
        // test
        audio.addEventListener("ended", function(){
          $scope.checkAnswer(); // before every check ans, check if the audio is finished
        });
      };

      function incQuestion() {
        questionIdx += 1;
        $scope.questionString = questions[questionIdx].question;
        $scope.choices = questions[questionIdx].choices;
        $scope.audio = questions[questionIdx].audioWord;
      };

      $scope.nextQuestion = function() {
        if (questionIdx < questions.length - 1) {
          $timeout(function () {
            nextQuestion_helper();
          }, 1500);
        } else {
          $timeout(function () {
            nextLevel();
          }, 1500);
        }
      };

      /* parsing JSON file */
      function readTextFile(file, callback) {
          var rawFile = new XMLHttpRequest();
          rawFile.overrideMimeType("application/json");
          rawFile.open("GET", file, true);
          rawFile.onreadystatechange = function() {
              if (rawFile.readyState === 4 && rawFile.status == "200") {
                  callback(rawFile.responseText);
              }
          }
          rawFile.send(null);
      };

      function getJSON(url, callback) {
        readTextFile(url, function(text){
          callback(JSON.parse(text));
        });
      };

      $rootScope.mainView = {
        action : '',
        slideRight: function (path) {
          $rootScope.mainView.action = 'slide-right';
          $location.url(path);
        },
        slideLeft: function (path) {
          $rootScope.mainView.action = 'slide-left';
          $location.url(path);
        }
      };

      function nextLevel() {
        $location.url('learn-thai-level2');
      };
    }
  ]
);