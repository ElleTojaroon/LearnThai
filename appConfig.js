// app config is used to switch between pages
app.
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/page1', { // add nicknames to the page and associate it with the related html and js files
          templateUrl: 'components/page1/page1.html',
          controller : 'PageOneCtrl'
        }).
        when('/page2', {
          templateUrl: 'components/page2/page2.html',
          controller : 'PageTwoCtrl'
        }).
        when('/learn-thai', {
          templateUrl: 'components/learnThai/learnThai.html',
          controller : 'learnThaiCtrl'
        }).
        when('/learn-thai-level2', {
          templateUrl: 'components/learnThaiL2/learnThaiL2.html',
          controller : 'learnThaiL2Ctrl'
        }).
        otherwise('/learn-thai');
    }
  ]);
