var lectApp = angular.module('lectApp', ['ngRoute','ngAnimate','ngMaterial']);

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
  when('/modules', {
      templateUrl: 'views/modules.html',
      controller: 'moduleController'
  }).
  when('/modules_single/:id?', {
      templateUrl: 'views/modules_single.html',
      controller: 'SingleModuleController'
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


