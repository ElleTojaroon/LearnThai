
'use strict';

app.config(
    ['$stateProvider', '$urlRouterProvider','$ionicConfigProvider',
        function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            $ionicConfigProvider.views.maxCache(0);
            $ionicConfigProvider.views.swipeBackEnabled(false);

            $stateProvider

            .state('login', {
                url: '/login',
                cache: false,
                templateUrl: "components/login/login.html",
                controller: 'LoginCtrl'
            })

            .state('userProfile', {
                url: '/user-profile',
                cache: false,
                templateUrl: "components/userProfile/userProfile.html",
                controller: 'UserProfileCtrl'
            })

            .state('bmw-vehicle', {
                url: '/bmw-vehicle',
                cache: false,
                templateUrl: "components/bmwvehicle/bmwvehicle.html",
                controller: 'BmwvehicleCtrl'
            })

            .state('bmw-cars', {
                url: '/bmw-cars',
                cache: false,
                templateUrl: "components/bmwcars/bmwcars.html",
                controller: 'BmwcarsCtrl'
            })

            .state('vehicleInfo', {
                url: '/vehicle-info',
                cache: false,
                templateUrl: "components/vehicleInfo/vehicleInfo.html",
                controller: 'VehicleInfoCtrl'
            })

            .state('promotions', {
                url: '/promotions',
                cache: false,
                templateUrl: "components/promotions/promotions.html",
                controller: 'PromotionsCtrl'
            })

            .state('eventInfo', {
                url: '/event-info',
                cache: false,
                templateUrl: "components/eventInfo/eventInfo.html",
                controller: 'EventInfoCtrl'
            })

            .state('customerServices', {
                url: '/customer-services',
                cache: false,
                templateUrl: "components/customerServices/customerServices.html",
                controller: 'CustomerServicesCtrl'
            })

            .state('dealerLocation', {
                url: '/dealer-location',
                cache: false,
                templateUrl: "components/dealerLocation/dealerLocation.html",
                controller: 'DealerLocationCtrl'
            })

            .state('floorLocations', {
                url: '/floor-locations',
                cache: false,
                templateUrl: "components/floorLocations/floorLocations.html",
                controller: 'FloorLocationsCtrl'
            })


            .state('floorLocationInfo', {
                url: '/floor-location-info',
                cache: false,
                templateUrl: "components/floorLocationInfo/floorLocationInfo.html",
                controller: 'FloorLocationInfoCtrl'
            })

            .state('eventCalendar', {
                url: '/event-calendar',
                cache: false,
                templateUrl: "components/eventCalendar/eventCalendar.html",
                controller: 'EventCalendarCtrl'
            })

            .state('eventDay', {
                url: '/event-day',
                cache: false,
                templateUrl: "components/eventDay/eventDay.html",
                controller: 'EventDayCtrl'
            })

            .state('iBeacons', {
                url: '/i-beacons',
                cache: false,
                templateUrl: "components/iBeacons/iBeacons.html",
                controller: 'IBeaconsCtrl'
            })

            .state('userProfileAnother', {
                url: '/user-profile-another',
                cache: false,
                templateUrl: "components/userProfileAnother/userProfile.html",
                controller: 'UserProfileAnotherCtrl'
            })

            .state('settings', {
                url: '/settings',
                cache: false,
                templateUrl: "components/settings/settings.html",
                controller: 'SettingsCtrl'
            })

            .state('videoViewer', {
                url: '/video-viewer',
                cache: false,
                templateUrl: "components/videoViewer/videoViewer.html",
                controller: 'VideoViewerCtrl'
            })

            ;

            $urlRouterProvider.otherwise("/login");


        }
    ]
);

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);