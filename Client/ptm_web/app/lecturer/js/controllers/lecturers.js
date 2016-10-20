/**
 * Created by DewmiR on 9/26/2016.
 */

myApp.controller('lecturerController', ['$scope','$http','$location', function($scope,$http,$location) {


    $scope.init = function () {
        $scope.lec = "Lecturers";
        $scope.lecturers = [];
        $scope.displayLecturers();

        $scope.mod = "modules";
        $scope.modules = [];
        $scope.displayAllModules();


        $scope.posts = [ {post: 'lecturer'}, {post: 'Supervisor'}];
        $scope.slectedCourse="";
        $scope.selectedPost="";
        $scope.lname="";
        $scope.details=[];
        $scope.displayAsgnDetails();



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


    $scope.update = function() {
        slectedCourse=$scope.item.courseName;
        console.log($scope.item.courseName);
        console.log(slectedCourse);


    };

    $scope.updateLec = function() {
        selectedPost=$scope.lPost.post;
        console.log($scope.lPost.post);
        console.log(selectedPost);


    };


    $scope.getName = function () {
            lname=$scope.lec.name;
            console.log(lname)

    };


    $scope.assignLecs = function() {

        $http.post('/assignLecturer', {
            courseName: slectedCourse,
            userName : lname,
            post : selectedPost

        }).success(
            function(data){
               console.log(data);
            }
        ).error(
            function(error){
                console.log(error);
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


    $scope.displayAsgnDetails = function () {
        $http({
            method: 'GET',
            url:'/getAllAssigenedLecturers'
        }).then(
            function success(response) {
                console.log(response.data);
                Array.prototype.push.apply($scope.details, response.data);
                console.log($scope.details);

            },
            function error(error) {
                console.log('Failed to load Lecturers');
            }
        );

    };




    $scope.init();

}]);
