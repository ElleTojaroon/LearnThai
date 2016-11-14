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
        otherwise('/learn-thai');
    }
  ]);
