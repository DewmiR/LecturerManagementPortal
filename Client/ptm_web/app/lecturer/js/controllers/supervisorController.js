/**
 * Created by DewmiR on 10/17/2016.
 */

lectApp.controller('supervisorController', ['$scope','$http','$location', function($scope,$http,$location) {

    $scope.init = function () {
        $scope.meetings = [];
        $scope.getMeetingAppoinments();
    };

    $scope.getMeetingAppoinments = function () {
        $http({
            method: 'GET',
            url:'/getMeetings'
        }).then(
            function success(response) {
                //console.log(response.data);
                Array.prototype.push.apply($scope.meetings, response.data);
                //console.log($scope.meetings);

              /*  var today = new Date();
                var dd = today.getDate();
                var timeInMss = Date.now()

                console.log(today);*/


            },
            function error(error) {
                // console.log('Failed to load Lecturers');
            }
        );

    };



    $scope.init();

}]);