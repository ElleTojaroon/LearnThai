
'use strict';

controllers.controller('chapterSummaryCtrl',
  ['$scope', '$controller', '$rootScope', '$timeout','$location',
    function($scope, $controller, $rootScope, $timeout, $location) {

      $controller('learnThaiCtrl',
        {$scope: $scope, $rootScope: $rootScope,
        $timeout: $timeout, $location: $location}); //This works

      $scope.records = [
        {
          pic: "cinema.jpg",
          audio: "cinema.mp3"
        },
        {
          pic: "bakery.jpg",
          audio: "bakery.mp3"
        },
        {
          pic: "restaurant.jpg",
          audio: "restaurant.mp3"
        }
      ];

      $scope.playRecord = function (record) {
        record = "../../music/level1/" + record;
        $scope.updateAudioSource(record);
      };

      /**************************** Summary Events ****************************/

      $(document.body).on('mouseenter', '.lt-summary-picture', function(ev){
        var target = $(ev.target);
        target.addClass('lt-mouse-enter-pic');
      });

      $(document.body).on('mouseleave', '.lt-summary-picture', function(ev){
        var target = $(ev.target);
        target.removeClass('lt-mouse-enter-pic');
      });












    }
  ]);
