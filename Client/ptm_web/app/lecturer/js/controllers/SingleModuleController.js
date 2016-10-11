/**
 * Created by PathmilaWK on 9/30/2016.
 */
lectApp.controller('SingleModuleController', ['$scope','$http','$location','$routeParams', function($scope,$http,$location,$routeParams) {

    $scope.$parent.body_class = "";
    $scope.init = function(){

        console.log("Init started(single module)");
        $scope.moduleId = $routeParams.id;
        $scope.moduleDetails = [];
        $scope.lecturers = [];
        $scope.lecturersDiv=false;
        $scope.loadSingleModules();
        $scope.loadLecturers();
    };

    $scope.loadSingleModules = function () {
 

        $http.post('/getModulesSingle', {
            id: $scope.moduleId
        }).success(
            function(data){
                console.log(data);
                $scope.moduleDetails = data;
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
    }

    $scope.showLecturersDiv = function () {
        $scope.lecturersDiv = true;
        console.log("lec div shown");
    }

    $scope.hideLecturersDiv = function () {
        $scope.lecturersDiv = false;
    }

    $scope.loadLecturers = function () {
        var params = {};
        $http({
            method: 'GET',
            url:'/getAllLecturers',
            params: params
        }).then(
            function success(response) {
                //console.log(response.data);

                Array.prototype.push.apply($scope.lecturers, response.data);
                console.log($scope.lecturers)

            },
            function error(error) {
                console.log('Failed to load lecturers');
            }
        );
    }

    $scope.init();

}]);
