myApp.controller('ModuleGroupController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {
 	

      	
    $scope.init = function () {
      console.log("ModuleGroupController started");
        $scope.courseId=$routeParams.id;
        $scope.group=[];
        $scope.getAllGroups();
    }

    $scope.getAllGroups = function (){
        
        $http.post('/getAllCourseGroups', {
            cid: $scope.courseId
            }).success(
                function(data){
                    Array.prototype.push.apply($scope.group, data);
                }
            ).error(
                function(error){
                  console.log(error)
                }
            );
        
    };

    $scope.sendFriendRequest = function (id,gId){
        console.log(id);
        
        
        $http.post('/getUser').success(
            function(data){
                console.log("Sending request to " + id + " from "+data._id+"...")

                $http.post('/sendRequestToFriend', {
                    from: data._id,
                    fromName: data.name,
                    to: id,
                    cid: $scope.courseId,
                    gid: gId,
                    status: "0"
                }).success(
                    function(data){
                        if(data == "pass"){
                            //$location.url('/profile');

                        }else{
                            //$location.url('/login');
                        }
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