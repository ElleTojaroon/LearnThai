// app config is used to switch between pages
app.
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/learn-thai', {
          templateUrl: 'components/learnThai/learnThai.html',
          controller : 'learnThaiCtrl'
        }).
        when('/chapter-summary', {
          templateUrl: 'components/chapterSummary/chapterSummary.html',
          controller : 'chapterSummaryCtrl'
        }).
        when('/learn-thai-map', {
          templateUrl: 'components/learnThaiMap/learnThaiMap.html',
          controller : 'learnThaiMapCtrl'
        }).
        otherwise('/chapter-summary');
    }
  ]);
