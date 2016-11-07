'use strict';

services.factory('Popup',
    ['$rootScope', '$mdDialog',
        function ($rootScope, $mdDialog) {


        	var popup = {};

        	/* show image dialog */
            popup.imageDialog = function (url, $event) {

                var locals = {
                    url: url
                };

                return $mdDialog.show({
                    targetEvent: $event,
                    templateUrl: 'sharedComponents/imageDialog/imageDialog.html',
                    controller: 'imageDialogCtrl',
                    locals: locals
                });

            };

            popup.alertPopup = function (title, description, ok, $event) {

                var alert = $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title(title)
                    .content(description)
                    .ariaLabel('alert popup')
                    .ok(ok)
                    .targetEvent($event);

                return $mdDialog.show(alert);

            };

            return popup;

        }
    ]
);