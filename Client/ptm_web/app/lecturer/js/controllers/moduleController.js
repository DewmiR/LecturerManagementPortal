/**
 * Created by PathmilaWK on 9/23/2016.
 */
lectApp.controller('moduleController', ['$scope','$http','$location', function($scope,$http,$location) {

    $scope.$parent.body_class = "";
    $scope.init = function(){

        console.log("Init started(module home)");
        $scope.courses = [];
        $scope.loadModulesFirstYear();
    };


    $scope.loadModulesFirstYear = function () {
        var params = {};
        $http({
            method: 'GET',
            url:'/getAllCoursesFirstYear',
            params: params
        }).then(
            function success(response) {
                //console.log(response.data);

                Array.prototype.push.apply($scope.courses, response.data);
                console.log($scope.courses)

            },
            function error(error) {
                console.log('Failed to load modules');
            }
        );
    }

    $scope.loadModulesSecondYear = function () {
        var params = {};
        $http({
            method: 'GET',
            url:'/getAllCoursesSecondYear',
            params: params
        }).then(
            function success(response) {
                //console.log(response.data);
                $scope.courses = [];
                Array.prototype.push.apply($scope.courses, response.data);
                console.log($scope.courses)

            },
            function error(error) {
                console.log('Failed to load modules');
            }
        );
    }

    $scope.init();


}]);
