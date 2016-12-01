var lectApp = angular.module('lectApp', ['ngRoute','ngAnimate','ngMaterial','hSweetAlert']);

/*lectApp.directive('data-mask', function(){
    return {
        restrict: 'A',
        link: function(scope, el, attrs){
            $(el).inputmask(scope.$eval(attrs.inputMask));
            $(el).on('change', function(){
                scope.$eval(attrs.ngModel + "='" + el.val() + "'");
                // or scope[attrs.ngModel] = el.val() if your expression doesn't contain dot.
            });
        }
    };
});*/

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
    when('/assignLecturer/:id?', {
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
    when('/myProjects', {
        templateUrl: 'views/myProjects.html',
        controller: 'MyProjectsController'
    }).
    when('/addLecturer', {
        templateUrl: 'views/add_lecturer.html',
        controller: 'moduleController'
    }).
    when('/supervisorCal', {
        templateUrl: 'views/supervisorCalendar.html',
        controller: 'supervisorController'
    }).
    otherwise({
      redirectTo: '/lecturer'
    });
}]);


