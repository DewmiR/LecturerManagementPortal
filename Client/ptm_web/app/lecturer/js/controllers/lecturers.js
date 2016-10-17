/**
 * Created by DewmiR on 9/26/2016.
 */

lectApp.controller('lecturerController', ['$scope','$http','$location', function($scope,$http,$location) {


    $scope.init = function () {
        $scope.lec = "Lecturers";
        $scope.lecturers = [];
        $scope.displayLecturers();

        $scope.mod = "modules";
        $scope.modules = [];
        $scope.displayAllModules();
    };


    $scope.displayLecturers = function () {
        $http({
            method: 'GET',
            url:'/getAllLecturers'
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

    };

    $scope.displayAllModules = function () {
        $http({
            method: 'GET',
            url:'/displayAllModules'
        }).then(
            function success(response) {
                console.log(response.data);
                Array.prototype.push.apply($scope.modules, response.data);
                console.log($scope.modules);

            },
            function error(error) {
                console.log('Failed to load modules');
            }
        );

    };


    $scope.getAssignLecs = function(courseName) {
        // console.log(courseName);
        //
        // $http.post('/getAssigenedLecturers', {
        //     courseName: courseName
        // }).success(
        //     function(data){
        //         Array.prototype.push.apply($scope.lecturers, data);
        //     }
        // ).error(
        //     function(error){
        //         console.log(error);
        //     }
        // );



    };

    $scope.init();

}]);
