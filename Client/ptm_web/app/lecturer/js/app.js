var lectApp = angular.module('lectApp', ['ngRoute']);

lectApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/lecturer', {
      templateUrl: 'views/courses.html',
      controller: ''
    }).
  when('/assignLecturer', {
    templateUrl: 'views/assignLecturer.html',
    controller: 'lecturerController'
  }).
  when('/supervisorView', {
    templateUrl: 'views/supervisorView.html',
    controller: 'supervisorController'
  }).
    otherwise({
      redirectTo: '/lecturer'
    });
}]);
