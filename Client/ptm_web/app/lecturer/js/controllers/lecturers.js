/**
 * Created by DewmiR on 9/26/2016.
 */

myApp.controller('lecturerController', ['$scope','$http','$location', function($scope,$http,$location) {


    $scope.init = function () {
        $scope.lec = "Lecturers";
        $scope.lecturers = [];
        $scope.displayLecturers();
    };


    $scope.displayLecturers = function () {
        $http({
            method: 'GET',
            url:'/getAllLecturers',
        }).then(
            function success(response) {
                console.log(response.data);
                Array.prototype.push.apply($scope.lecturers, response.data);
                console.log($scope.lecturers);

            },
            function error(error) {
                console.log('Failed to load Lecturers');
            }
        );
    }



    $scope.init();

}]);
