myApp.controller('CourseReceivedRequestCintroller', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
      console.log("CourseReceivedRequestCintroller started");
      console.log($routeParams.id);
      $scope.loadRequest();
      $scope.myRequestsArr=[];

    }
    
   $scope.loadRequest = function(){
       
       	$http.post('/getUser').success(
        function(data){
            $http.post('/getMyFriendsRequests', {
                userId: $routeParams.id
            }).success(
                function(data){
                    console.log(data);
                    Array.prototype.push.apply($scope.myRequestsArr, data);
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


    $scope.init();




}]);
