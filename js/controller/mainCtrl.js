'use strict';


controllers.controller('MainCtrl',
    ['$scope', '$rootScope','$mdSidenav','$location','$mdBottomSheet','$mdDialog','Popup','IBeacon',
        function ($scope, $rootScope,$mdSidenav,$location,$mdBottomSheet,$mdDialog,Popup,IBeacon) {
                      

            $rootScope.currentUser = null;

            $rootScope.user = {
                "users": [
                    {
                        "id": "f4303dcb-7484-4cf0-af10-a9b999068d93",
                        "username": "chaiwat.ung@skstechnology.com",
                        "password": "123456",
                        "fist_name": "Thomas",
                        "last_name": "Cruise",
                        "role_id": "e3adfbef-40e6-4dc8-bef4-02571a17b411",
                        "role": "customer",
                        "image_url": "images/temp/Picture3.jpg",
                        "car" : 'BMW 7 Series Sedan'
                    },
                    {
                        "id": "20ffd886-1416-4ca6-8b7a-d747db2234c9",
                        "username": "apichat.kha@skstechnology.com",
                        "password": "123456",
                        "fist_name": "ธิตา",
                        "last_name": "วิโรจน์",
                        "role_id": "25fb5f24-d841-48b4-b898-9612ecd5e0c8",
                        "role": "sale",
                        "image_url": "images/temp/4904dbb9-8fe5-402d-8762-5779b4f3b459.png",
                        'car' : null
                    }
                ]
            };

            $scope.menuIndex = 1;

            $rootScope.btnSelectMenu = function (index){
                $scope.menuIndex = index;

                if(index == 4){
                   $rootScope.mainView.slideLeft('user-profile'); 
                }
                else if(index == 1){
                    $rootScope.mainView.slideLeft('bmw-vehicle'); 
                }
                else if(index == 2){
                    $rootScope.mainView.slideLeft('promotions'); 
                }
                else if(index == 3){
                    $rootScope.mainView.slideLeft('dealer-location'); 
                }
                else if(index == 7){
                    $rootScope.mainView.slideLeft('event-calendar'); 
                }
                else if(index == 8){
                    $rootScope.mainView.slideLeft('i-beacons'); 
                }
                else if (index == 9){
                    $rootScope.mainView.slideLeft('settings'); 
                }

                $mdSidenav('left').close();
                $mdBottomSheet.hide();

            };

            $rootScope.btnNeedHelp = function (){

                    $mdBottomSheet.show({
                        controller: 'NeedHelpCtrl',
                      templateUrl: 'components/needHelp.html'
                    }).then(function() {

                    });

            };

            $rootScope.btnCustomerServices = function (){

                $mdDialog.show({
                  controller: 'CustomerServicesCtrl',
                  templateUrl: 'components/customerServices/customerServices.html',
                });

            };

            $rootScope.btnLogout = function (){

                $rootScope.currentUser = null;
                if (!(document.URL.indexOf('http://') != 0 && document.URL.indexOf('https://') != 0)) {


                } else {
                    IBeacon.stopRangingBeacons();
                }

                for (var i in IBeacon.register.beacons) {
                    var be = IBeacon.register.beacons[i];
                    be.actions[0].isDisplay = false;
                };
                

                $rootScope.mainView.slideRight('login');
                $mdSidenav('left').close();
            };

            $rootScope.viewImagePopup = function ($event,url){


                var targetUrl = '';
                if($event.target.tagName == 'IMG'){
                    targetUrl = $event.target.src;
                }
                
                if(angular.isDefined(url)){
                    targetUrl = url;
                };

                Popup.imageDialog(targetUrl, $event);
            };            


            $rootScope.menuPanel = {
                open: function () {                    
                    $('.md-sidenav-left').animate({scrollTop:0}, '100');
                    $mdSidenav('left').open();
                },
                close: function () {
                    $mdSidenav('left').close();
                },
                toggle: function () {
                    $mdSidenav('left').toggle();
                }                
            };

            $rootScope.mainView = {
                action : '',
                slideRight: function (path) {
                    $rootScope.mainView.action = 'slide-right';
                    $location.url(path);
                },
                slideLeft: function (path) {
                    console.debug(path);
                    $rootScope.mainView.action = 'slide-left';                    
                    $location.url(path);
                }
            };

            $rootScope.loader = {
                visible: false,
                text: '',
                percent: {
                    visible: false,
                    value: 0
                },
                count: 0,
                show: function (message) {
                    $rootScope.loader.visible = true;
                    if (message != null) {
                        //$rootScope.loader.text = LanguageConstant.translate(message, $rootScope.uiConfig.language);
                        $rootScope.loader.text = message;
                    }
                    $rootScope.loader.count = $rootScope.loader.count + 1;
                },
                hide: function () {
                    $rootScope.loader.count = $rootScope.loader.count - 1;
                    if ($rootScope.loader.count < 0) {
                        $rootScope.loader.count = 0;
                    }                    
                    if ($rootScope.loader.count == 0) {
                        $rootScope.loader.visible = false;
                        $rootScope.loader.text = '';
                    }
                },
                setMessage: function (message) {
                    //$rootScope.loader.text = LanguageConstant.translate(message, $rootScope.uiConfig.language);
                }
            };
           
            $scope.initMainCtrl = function () {

                
            };                       
            
        }
    ]
);