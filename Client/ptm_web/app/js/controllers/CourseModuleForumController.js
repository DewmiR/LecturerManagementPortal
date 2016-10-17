myApp.controller('CourseModuleForumController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
      console.log("CourseModuleForumController started");
      $scope.studentId=$routeParams.id;
    }



    $scope.init();




}]);
