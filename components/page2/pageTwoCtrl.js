controllers.controller('PageTwoCtrl',
    ['$scope', '$rootScope','$location',
        function ($scope, $rootScope,$location) {

    		$scope.go =  function (){
				$location.url('page1');
			}; 
            
            // search() will get the key at the end of url
			$scope.userh = $location.search().user;

			$scope.name = 'sks';

			$scope.number = 10;

			$scope.cal = function (){
				return 10 + 1;
			};
        	
        }
    ]
);

