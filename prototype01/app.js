/* create a new module called learnThai, but we will refer its variable named
 * app */
var app = angular.module('learnThai', [
    'ngRoute',
    'ngResource',
    'lbControllers', // lbControllers are the controllers for the pages
]);

/* run to kickstarts the application
 * Run after: 1. all the services have been configured
 *            2. injector has been created
 * Should: be in isolated modules
 *  - because hard to unit-test
 *  - so they can be ignored in the unit-tests
 *
 *
 * Buzz word: Injector = responsible for creating instances for our services
 * read more: https://github.com/angular/angular.js/wiki/Understanding-
 * Dependency-Injection
*/
app.run(function($rootScope){
	$rootScope.user = null;
});