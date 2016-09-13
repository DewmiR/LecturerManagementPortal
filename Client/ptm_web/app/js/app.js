var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/course', {
      templateUrl: 'views/courses.html',
      controller: 'CourseController'
    }).
    when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController'
    }).
    when('/my_courses', {
      templateUrl: 'views/my_courses.html',
      controller: 'MyCoursesController'
    }).
    when('/single_course/:id?', {
      templateUrl: 'views/course-single.html',
      controller: 'SingleCourseController'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
