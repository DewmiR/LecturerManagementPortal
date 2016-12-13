/**
 * Created by DewmiR on 9/26/2016.
 */

lectApp.controller('lecturerController', ['$scope','$http','$location','$routeParams','sweet', function($scope,$http,$location,$routeParams, sweet) {


    $scope.init = function () {
        $scope.moduleId = $routeParams.id;
        $scope.moduleDetails = [];
      //  $scope.moduleLecturers=[];
        $scope.loadSingleModules();

        $scope.lec = "Lecturers";
        $scope.lecturers = [];
        $scope.matchLecturers = [];
        $scope.count=0;
        $scope.temp=[];
        $scope.t=[];
        $scope.namesArr=[];
        $scope.match=[];
        $scope.displayLecturers();

        $scope.mod = "modules";
        $scope.modules = [];
        $scope.displayAllModules();


        $scope.posts = [ {post: 'Lecturer'}, {post: 'Supervisor'}];
        $scope.moduleName="";
        $scope.selectedPost="";
        $scope.lname="";
        $scope.details=[];
        $scope.displayAsgnDetails();
        $scope.image="";

        $scope.error="false";
        $scope.errorMsg = "";
        $scope.counter = 0;
        $scope.matchLect();

    };

    //load Module details
    $scope.loadSingleModules = function () {

        $http.post('/getModulesSingle', {
            id: $routeParams.id
        }).success(
            function(data){
                //$scope.moduleDetails = data;
                $scope.moduleDetails.push(data);
                $scope.getLecturersForModule();
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
    };

    //Get lecturers and supervisors for the module
    $scope.getLecturersForModule = function () {

        angular.forEach($scope.moduleDetails, function(value) {

            $scope.moduleName= value.courseName;

            $scope.moduleLecturers=[];

            $http.post('/getAssignedLecturers', {
                courseName: value.courseName
            }).success(
                function(data){
                    Array.prototype.push.apply($scope.moduleLecturers, data);
                    //console.log($scope.moduleLecturers);
                }
            ).error(
                function(error){
                    console.log(error)
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
                //console.log(response.data);
                Array.prototype.push.apply($scope.modules, response.data);
               // console.log($scope.modules);

            },
            function error(error) {
               // console.log('Failed to load modules');
            }
        );

    };

    $scope.updateLec = function() {

    };

    $scope.assignLecs = function() {

        //get all selected lecturers
        $scope.getSelectedLecturer = function(){
            $scope.nameArr = [];
            angular.forEach($scope.lecturers, function(lecturer) {
                if (lecturer.selected) {

                $scope.nameArr.push(lecturer.name);
                $scope.image = lecturer.image;
              //  $scope.success();
                  }
            });
        };


        /*
        * Get all seleted Lecturers
        * */
        $scope.getSelectedLecturer();
         //validations
          if($scope.nameArr.length == 0){
              $scope.error="true";
              $scope.errorMsg="* Please select one or more Lecturers";

          }else if(angular.isUndefined($scope.lPost)){

              $scope.error="";
              $scope.errorMsg="";

              $scope.error="true";
              $scope.errorMsg="* Please select a post";

         }else{

             $scope.error="";
             $scope.errorMsg="";

        //get selected post
        $scope.selectedPost=$scope.lPost.post;

       //for each selected lecturer , add a new record to db
        angular.forEach($scope.nameArr, function(value) {

        $http.post('/assignLecturer', {
            courseName: $scope.moduleName,
            userName : value,
            post : $scope.selectedPost,
            image: $scope.image

        }).success(
            function(data){
               //$scope.getLecturersForModule();
                $scope.lecturers=[];
                $scope.match=[];
                $scope.t=[];
                $scope.moduleLecturers.push(data);
                $scope.success();
                $scope.displayLecturers();

            }
        ).error(
            function(error){
                console.log(error);
            }
        );

       });

         }
    };

    $scope.displayAllModules = function () {
        $http({
            method: 'GET',
            url:'/displayAllModules'
        }).then(
            function success(response) {
               // console.log(response.data);
                Array.prototype.push.apply($scope.modules, response.data);
               // console.log($scope.modules);
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


    //Display all lecturers to be selected
    $scope.displayLecturers = function () {
        $http({
            method: 'GET',
            url:'/getAllLecturers'
        }).then(
            function success(response) {

                Array.prototype.push.apply($scope.match, response.data);

                $http({
                    method: 'GET',
                    url:'/getAllAssigenedLecturers'
                }).then(
                    function success(response) {

                        Array.prototype.push.apply($scope.t, response.data);

                        angular.forEach($scope.match, function(value) {

                            $scope.counter=0;

                            angular.forEach($scope.t, function(name) {

                                if(name.userName != value.name){
                                    $scope.counter++;
                                }
                            });

                            if($scope.counter == $scope.t.length){
                                $scope.lecturers.push(value);
                                console.log($scope.counter);
                            }
                        });

                    },
                    function error(error) {
                        console.log('Failed to load Lecturers');
                    }
                );

            },
            function error(error) {
                console.log('Failed to load Lecturers');
            }
        );

    };


    $scope.matchLect = function () {

       // console.log(matchVal);

    };


    $scope.success = function() {
        sweet.show('Assigned successfully');
    };
    $scope.init();

    


}]);
