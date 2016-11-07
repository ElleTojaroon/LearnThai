'use strict';

var app = angular.module('LearningBreeze', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ngMaterial',
    'ngCordova',
    'lbControllers',
    'lbDirectives',
    'lbServices',
    'lbDataModels',
    'lbStorage',
    'lbConstants',
    'ionic',
    'angular.filter',
    'angularFileUpload',
    'ngFileUpload',
    'angulartics',
    'angulartics.google.analytics',
    'angular-intro'
]);

var controllers = angular.module('lbControllers', [
    'ui.bootstrap', 'ngSanitize', 'chart.js'
]);

var services = angular.module('lbServices', [
    'ngSanitize'
]);

var storages = angular.module('lbStorage', [

]);

var constants = angular.module('lbConstants', [

]);

var dataModels = angular.module('lbDataModels', [

]);

var directives = angular.module('lbDirectives', [
    'ngSanitize'
]);

app.run(
    ['$rootScope', '$location','$timeout','PushService','IBeacon',
        function ($rootScope, $location,$timeout,PushService,IBeacon) {
                            
            //$animate.enabled(false);

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                console.debug(fromState);
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                
                console.debug(fromState);

            });

            if (!(document.URL.indexOf('http://') != 0 && document.URL.indexOf('https://') != 0)) {


		    } else {

                var aid = 'aid_bwm';

                var tags = [];
                tags.push(aid);

		    	PushService.register(tags);

                if($rootScope.currentUser != null){
                    IBeacon.startRangingBeacons();
                }
		    }

            clearInterval(loadingJsPage);                        
            drawProgressCircle(100,true);
            // hide splash screen after 0.5s 
            $timeout(function () {                
                $('#pnlLoadingOnloadjs').remove();
            }, 2200);
            
        }
    ]
);

$(document).ready(function () {
    
    if (!(document.URL.indexOf('http://') != 0 && document.URL.indexOf('https://') != 0)) {

        angular.bootstrap(document, ['LearningBreeze']);

        /* prevent double fire function when click on button in IE */
        window.addEventListener('click', function (event) {
            if (Object.prototype.toString.call(event) == '[object PointerEvent]') {
                event.stopPropagation();
            }
        }, true);


    } else {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

});

function onDeviceReady() {

    console.debug('device ready');

    angular.bootstrap(document, ['LearningBreeze']);

    StatusBar.hide();

};

services.service('PushService',
    ['$window', '$rootScope',
        function ($window,$rootScope) {

            var GCM_SENDER_ID = '301648626690'; //Replace with your own ID
            $window.mobileServiceClient = null;
            var pushNotification = null;

            var azure_url = 'https://bmwstore.azure-mobile.net/';
            var azure_key = 'ptcnfqqohobEhmMOZBHnbzmlJXOOEo74';

            var self = this;

            self.tags = null;

            // Create the Azure client register for notifications.
            this.register = function (tags) {

                //alert(JSON.stringify(tags));

                self.tags = tags;

                if (azure_url != null
                    && azure_key != null
                    && angular.isDefined(window.plugins)
                    && angular.isDefined(window.plugins.pushNotification)) {

                    $window.mobileServiceClient = new WindowsAzure.MobileServiceClient(
                                    azure_url,
                                    azure_key);

                    // Create a pushNotification (from the PushPlugin).
                    pushNotification = window.plugins.pushNotification;
                    ////alert('create push');
                    // Platform-specific registrations.
                    if (device.platform == 'android' || device.platform == 'Android') {
                        // Register with GCM for Android apps.
                        pushNotification.register($window.successHandler, $window.errorHandler,
                        {
                            "senderID": GCM_SENDER_ID,
                            "ecb": "onGcmNotification"
                        });

                        ////alert('register android');
                    } else if (device.platform === 'iOS') {
                        // Register with APNS for iOS apps.
                        pushNotification.register(tokenHandler, $window.errorHandler,
                            {
                                "badge": "false",
                                "sound": "false",
                                "alert": "true",
                                "ecb": "onApnsNotification"
                            });
                        ////alert('register ios');
                    }
                }
            };

            // Handle a GCM notification.
            $window.onGcmNotification = function (e) {
                switch (e.event) {
                    case 'registered':
                        // Handle the registration.
                        if (e.regid.length > 0) {
                            console.log('gcm id ' + e.regid);
                            if ($window.mobileServiceClient) {
                                // Template registration.
                                //var template = '{ "data" : {"message":"$(message)","content" : { "title":"$(title)","description":"$(description)","is_action":"$(is_action)","route_url":"$(route_url)","params":"$(params)","link":"$(link)" } } }';
                                var template = '{ "data" : {"message":"$(message)","inAppMessage":"$(inAppMessage)"} }';

                                // Register for notifications.
                                var promise = $window.mobileServiceClient.push.gcm.registerTemplate(e.regid,
                                    'lbTemplate', template, self.tags)
                                    .then(function () {
                                        console.debug('Registered template with Azure!');
                                    }, function (error) {
                                        console.debug('Failed registering with Azure: ' + error);
                                    });

                            }
                        }
                        break;
                    case 'message':
                        //e.foreground Handle the received notification when the app is running
                        //alert(JSON.stringify(e.payload.inAppMessage));
                        break;
                    case 'error':
                        ////alert('GCM error: ' + e.message);
                        break;
                    default:
                        ////alert('An unknown GCM event has occurred');
                        break;
                }
            };

            // Receive the APNS token.
            function tokenHandler(result) {

                if ($window.mobileServiceClient) {
                    ////alert(result);
                    // This is a template registration.
                    var template = "{\"aps\":{\"alert\":\"$(message)\"},\"inAppMessage\":\"$(inAppMessage)\"}";
                    // Register for notifications.
                    // (deviceId, templateName, templateBody, expiration, ["tag1","tag2"]) // template params w/ tags
                    $window.mobileServiceClient.push.apns.registerTemplate(result, 'lbTemplate', template, null, self.tags)
                        .then(function () {
                            console.debug('Registered template with Azure!');
                        }, function (error) {
                            console.debug('Failed registering with Azure: ' + error);
                        });
                }

            };

            $window.onApnsNotification = function (event) {
                ////alert(event);
                if (event.alert) {
                    $window.messagePushManament(JSON.parse(event.inAppMessage));
                }
            };

            // GCM registration success handler.
            $window.successHandler = function (result) {
                console.debug('GCM registration result: ' + result);
            };

            // registration error handler.
            $window.errorHandler = function(error) {
                console.debug('An error occured during registration: ' + error);
            };

            $window.messagePushManament = function (message){

	          	var obj = message;

	          	console.debug(obj);

	          	if(obj.route_url == 'customeralert'){
	          		$rootScope.btnCustomerServices();
	          	}
	          	else if(obj.route_url == 'saleaccept'){
	          		$rootScope.btnNeedHelp();
	          	}


            };

        }
    ]
);

services.factory('IBeacon',
    ['$filter','$rootScope','$http',
        function ($filter,$rootScope,$http) {

            var iBeacon = {};
            
            iBeacon.currentBeacon = null;

            iBeacon.register = {
                "beacons": [
                    {
                        "name": "mint",
                        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                        "major": "58157",
                        "minor": "15637",
                        "actions": [
                            {
                                "id": "450acf95-109a-453f-a5ae-ace4641107fe",
                                "name": "",
                                "path": "vehicle-info?t=2&p=backCar",
                                "max_tx": "",
                                "min_tx": "",
                                "max_range": "",
                                "min_range": "",
                                "proximately": 1,
                                "isDisplay" : false
                            }
                        ]
                    },
                    {
                        "name": "blueberry",
                        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                        "major": "44223",
                        "minor": "32193",
                        "actions": [
                            {
                                "id": "adf78634-b214-4423-8b2b-177706ea6ccc",
                                "name": "",
                                "path": null,
                                "max_tx": "",
                                "min_tx": "",
                                "max_range": "",
                                "min_range": "",
                                "proximately": null,
                                "isDisplay" : false
                            }
                        ]
                    },
                    {
                        "name": "ice",
                        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
                        "major": "11903",
                        "minor": "65308",
                        "actions": [
                            {
                                "id": "7bd30feb-61d3-468a-b9ec-37d8160ea71e",
                                "name": "",
                                "path": "vehicle-info?t=2&p=frontCar",
                                "max_tx": "",
                                "min_tx": "",
                                "max_range": "",
                                "min_range": "",
                                "proximately": 1,
                                "isDisplay" : false
                            }
                        ]
                    }
                ]
            };


            iBeacon.beaconInfo = null;

            iBeacon.isCall = false;

            function createBeaconHTML(beacon)
            {

                var html = 'color : ' + beacon.color + ' , mj : ' + beacon.major + ' , mi : ' + beacon.minor + ' , ri : ' + beacon.rssi;

                html = html + ' , px : ' + beacon.proximity;

                html = html + ' , dt : ' + beacon.distance;

                var g = '<div>' + html + '</div>';

                return g;
            };

            iBeacon.displayBeconInfo = function() {

                if(iBeacon.beaconInfo != null && $rootScope.currentUser != null && $rootScope.currentUser.role == 'customer' && !iBeacon.isCall){

                    // Sort beacons by distance.
                    /*iBeacon.beaconInfo.beacons.sort(function(beacon1, beacon2) {
                        return beacon1.distance > beacon2.distance; 
                    });

                    
                    if(iBeacon.beaconInfo.beacons.length > 0 && (iBeacon.currentBeacon == null ||  iBeacon.currentBeacon.uuid != iBeacon.beaconInfo.beacons[0].uuid)){

                        iBeacon.currentBeacon = iBeacon.beaconInfo.beacons[0];

                        var regist = $filter('filter')(iBeacon.register.beacons, {
                            uuid : iBeacon.currentBeacon.uuid
                        });

                        var element = $(createBeaconHTML(iBeacon.currentBeacon));
                        $('#id-screen-range-beacons').before(element);

                    }
                    else if(iBeacon.currentBeacon != null) {
                        var element = $(createBeaconHTML(iBeacon.currentBeacon));
                        $('#id-screen-range-beacons').before(element);
                    }; 

                    console.debug(element);
                    console.debug($('#id-screen-range-beacons'));
                    */

                    // Generate HTML for beacons.
                    $.each(iBeacon.beaconInfo.beacons, function(key, beacon) {

                        //console.debug(beacon.proximityUUID);
                        //console.debug(beacon);

                        var found = null;
                        for(var i in iBeacon.register.beacons){

                            var be = iBeacon.register.beacons[i];
                            if(be.major == beacon.major && be.minor == beacon.minor && angular.lowercase(be.uuid) == angular.lowercase(beacon.proximityUUID)){

                            	if(be.actions[0].proximately == null && !be.actions[0].isDisplay) {
                                    iBeacon.isCall = true;
                            		found = be;
                            	}
                                else if(!be.actions[0].isDisplay && beacon.proximity == be.actions[0].proximately && be.actions[0].proximately != null){
                                    iBeacon.isCall = true;
                                    found = be;
                                }
                                else if(be.actions[0].isDisplay && beacon.proximity != be.actions[0].proximately && be.actions[0].proximately != null){
                                    be.actions[0].isDisplay = false;
                                }

                            }
                            else if(be.actions[0].isDisplay && be.actions[0].proximately != null) {
                        		be.actions[0].isDisplay = false;
                            }

                        }


                        if(found != null){

                            found.actions[0].isDisplay = true;
                            //console.debug('round : ' + found.actions[0].path);

                            $http({
                              method: 'GET',
                              url: 'https://bmwstoreservice.azurewebsites.net/activity?userid=' + $rootScope.currentUser.id +  '&roleid='+ $rootScope.currentUser.role_id +  '&activityid=' + found.actions[0].id
                            }).then(function successCallback(response) {
                        		//console.debug(response);
                        		//alert('success');
                        		console.debug('success');
                                iBeacon.isCall = false;
                        		//alert(response);
                          	}, function errorCallback(response) {
                                iBeacon.isCall = false;
                          		//console.debug(response);
                          	});

                            if(found.actions[0].path != null){   
                                $rootScope.mainView.slideLeft(found.actions[0].path);
                                $rootScope.$apply();
                            }
                        }

                        

                    });

                }

            };      

	         iBeacon.displayRegionInfo = function (regionState){
	         	console.debug(regionState);
	         };

            iBeacon.startRangingBeacons  = function (){

                function onRange(beaconInfo) {
                    iBeacon.beaconInfo = beaconInfo;
                    iBeacon.displayBeconInfo();
                }

                function onMonitor(regionState){
					iBeacon.displayRegionInfo(regionState);
				}

                function onError(errorMessage) {
                    console.debug('Range error: ' + errorMessage);
                }

                // Request authorisation.
                EstimoteBeacons.requestAlwaysAuthorization();

                // Start ranging.
                EstimoteBeacons.startRangingBeaconsInRegion(
                    {}, // Empty region matches all beacons.
                    onRange,
                    onError);


            };

            iBeacon.stopRangingBeacons = function(){
                EstimoteBeacons.stopRangingBeaconsInRegion({});
                iBeacon.beaconInfo = null;
            };

            return iBeacon;

        }
    ]
);