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
    when('/assignLecturer', {
      templateUrl: 'views/assignLecturer.html',
      controller: 'lecturerController'
    }).
    when('/addProjects', {
      templateUrl: 'views/add_projects.html',
      controller: 'ProjectsController'
    }).
    when('/assignProjects', {
      templateUrl: 'views/assignProjects.html',
      controller: 'AssignProjectsController'
    }).
    when('/myProjects', {
      templateUrl: 'views/myProjects.html',
      controller: 'MyProjectsController'
    }).
    otherwise({
      redirectTo: '/lecturer'
    });
}]);


