
'use strict';

controllers.controller('chapterSummaryCtrl',
  ['$scope', '$controller', '$rootScope', '$timeout','$location',
    function($scope, $controller, $rootScope, $timeout, $location) {

      $controller('learnThaiCtrl',
        {$scope: $scope, $rootScope: $rootScope,
        $timeout: $timeout, $location: $location}); //This works

      $scope.aud_play = function () {
        console.log("Hi");
      }

    }
  ]);
