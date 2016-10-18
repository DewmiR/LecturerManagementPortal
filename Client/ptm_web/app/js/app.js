var myApp = angular.module('myApp', ['ngRoute','ngMaterial']);

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
    when('/my_courses', {
      templateUrl: 'views/my_courses.html',
      controller: 'MyCoursesController'
    }).
    when('/my_coursee_grid', {
      templateUrl: 'views/course-list-grid.html',
      controller: 'MyCourseGrideController'
    }).
    when('/single_course/:id?', {
      templateUrl: 'views/course-single.html',
      controller: 'SingleCourseController'
    }).
    when('/my_friends/:cid', {
      templateUrl: 'views/my-friends.html',
      controller: 'MyfriendsController'
    }).
    when('/friend_requests', {
      templateUrl: 'views/friend_requests.html',
      controller: 'RequestController'
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
