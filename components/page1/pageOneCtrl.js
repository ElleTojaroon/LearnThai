controllers.controller('PageOneCtrl',
    ['$scope', '$rootScope','$location',
        function ($scope, $rootScope,$location) {

        	$scope.users=[
			  {picURL:"http://cdn.labradortraininghq.com/wp-content/uploads/2014/02/How-to-crate-train-a-puppy-happy-lab.jpg", fname:"John", lname:"Smith", email:"johnsmith@sks.com"}, 
			{picURL:"https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00_400x400.jpg", fname:"Adam", lname:"Lavine", email:"adamlavine@sks.com"}
			  ];

			$scope.go =  function (user){
				$rootScope.user = user;

				var s = JSON.stringify(user);
                
                // go to page2 (refer to nickname (when) of the page in appConfig)
                // the url will be appended with a string containing keys 
                // in form: key=blah&key=blah&key=%2 
                // %12 is a symbol for things that are not allowed in url's
				$location.url('page2?user=' + s);
			};        	

        }
    ]
);