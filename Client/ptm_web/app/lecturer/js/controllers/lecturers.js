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


        $scope.posts = [ {post: 'lecturer'}, {post: 'Supervisor'}];
        $scope.slectedCourse="";
        $scope.selectedPost="";
        $scope.lname="";
        $scope.details=[];
        $scope.displayAsgnDetails();



    };

//
    $scope.displayLecturers = function () {
        $http({
            method: 'GET',
            url:'/getAllLecturers'
        }).then(
            function success(response) {
                //console.log(response.data);
                Array.prototype.push.apply($scope.lecturers, response.data);
                //console.log($scope.lecturers);

            },
            function error(error) {
               // console.log('Failed to load Lecturers');
            }
        );

    };

    $scope.displayAllModules = function () {
        $http({
            method: 'GET',
            url:'/displayAllModules'
        }).then(
            function success(response) {
                //console.log(response.data);
                Array.prototype.push.apply($scope.modules, response.data);
               // console.log($scope.modules);

            },
            function error(error) {
               // console.log('Failed to load modules');
            }
        );

    };


    $scope.update = function() {
        slectedCourse=$scope.item.courseName;
       // console.log($scope.item.courseName);
       // console.log(slectedCourse);


    };

    $scope.updateLec = function() {
        selectedPost=$scope.lPost.post;
      //  console.log($scope.lPost.post);
       // console.log(selectedPost);


    };


   /* $scope.getName = function () {
            lname=$scope.lec.name;
            console.log(lname)

    };*/


    $scope.assignLecs = function() {

        //get all selected lecturers
        $scope.getSelectedLecturer = function(){
            $scope.nameArr = [];
            angular.forEach($scope.lecturers, function(lecturer){
                if (lecturer.selected) $scope.nameArr.push(lecturer.name);
                //console.log( $scope.nameArr);
            });
        };


        $scope.getSelectedLecturer();

       //for each selected lecturer , add a new record to db
        angular.forEach($scope.nameArr, function(value) {
            console.log(value);

        $http.post('/assignLecturer', {
            courseName: slectedCourse,
            userName : value,
            post : selectedPost

        }).success(
            function(data){
               $scope.displayAsgnDetails();
               console.log(data);
            }
        ).error(
            function(error){
                console.log(error);
            }
        );

       });

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
                //console.log(response.data);
                Array.prototype.push.apply($scope.details, response.data);
               // console.log($scope.details);

            },
            function error(error) {
                console.log('Failed to load Lecturers');
            }
        );

    };




    $scope.init();

}]);
