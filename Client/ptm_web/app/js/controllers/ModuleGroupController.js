myApp.controller('ModuleGroupController', ['$scope','$http','$location', '$routeParams', function($scope,$http,$location,$routeParams) {
 	

      	
    $scope.init = function () {
      console.log("ModuleGroupController started");
        $scope.group=[];
        $scope.getAllGroups();
    }

    $scope.getAllGroups = function (){
        
        $http.post('/getAllCourseGroups', {
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

    $scope.init();




}]);