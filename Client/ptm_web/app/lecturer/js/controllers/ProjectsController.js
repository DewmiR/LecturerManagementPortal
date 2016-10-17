lectApp.controller('ProjectsController', ['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams) {

    $scope.message = "Adooooo"


	$scope.addProjectFormSubmit = function() {


		$http.post('/projects/createProject', {
            name: $scope.formData.pname,
            desc: $scope.formData.pdes
        }).success(
            function(data){
                if(data == "pass"){
                    console.log("created")
                }else{
                    console.log("failed")
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );

	}

}]).controller('AssignProjectsController', ['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams) {


    $scope.message = "Adooooo"
    
    $http({
        method: 'GET',
        url:'/projects/getAllProjects'
    }).then(
            function success(response) {
                $scope.projects = response.data
            },
            function error(error) {
                console.log('Failed to load courses');
            }
    );


}]);
    