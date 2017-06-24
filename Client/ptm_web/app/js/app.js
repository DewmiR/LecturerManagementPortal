var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'toastr','ngMaterial','notifications']);


myApp.config(['$routeProvider','toastrConfig', function($routeProvider,toastrConfig) {
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
    when('/single_course/:id?', {
      templateUrl: 'views/course-single.html',
      controller: 'SingleCourseController'
    }).
    otherwise({
      redirectTo: '/login'
    });



  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    messageClass: 'toast-message',
    onHidden: null,
    onShown: null,
    onTap: null,
    progressBar: true,
    tapToDismiss: true,
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 5000,
    titleClass: 'toast-title',
    toastClass: 'toast',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      preventOpenDuplicates: true
  });

}]);
