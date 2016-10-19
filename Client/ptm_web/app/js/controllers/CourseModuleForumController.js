myApp.controller('CourseModuleForumController', ['$scope','$http','$location', '$routeParams','$route', function($scope,$http,$location,$routeParams,$route) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
      console.log("CourseModuleForumController started");
      $scope.courseId=$routeParams.id;
      $scope.getReceivedRequests();
      $scope.requestFromNameArr=[];
        
//      /* $rootScope.$on('$routeChangeSuccess', function() {
//    $route.reload();*/
//});
        
        setInterval(function(){ $scope.requestFromNameArr=[];$scope.getReceivedRequests(); }, 1000000);
    }
    
     $scope.getReceivedRequests = function () {
        
       $http.post('/getUser').success(
        function(data){
            $http.post('/getReceivedRequests', {
                userId: data._id,
                status: "0"
            }).success(
                function(data){
                    $scope.myRequests = data.length;
                    console.log(data);
                    Array.prototype.push.apply($scope.requestFromNameArr, data);
                    
                }
            ).error(
                function(error){
                    console.log(error);
                }
            );
        }
    ).error(
	    function(error){
        	console.log(error)
      	}
    );
    }
     
     
     $scope.test = function (id){
         console.log(id+"dfgdf");
         $location.url('/course_received_request/'+id);
     }


    $scope.init();




}]);
