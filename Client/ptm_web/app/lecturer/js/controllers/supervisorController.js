/**
 * Created by DewmiR on 10/17/2016.
 */


lectApp.controller('supervisorController', ['$scope','$http','$location', function($scope,$http,$location) {


    $scope.init = function () {

        $scope.date = new Date();
        $scope.time = new Date();
        $scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.maxDate = moment().add(1, 'month');


        $scope.modInChg=false;
        $scope.getCurrentUser();
        $scope.name="";
        $scope.lecInchg=[];
        $scope.modInChgName=[];

        $scope.alllecModules=[];
        $scope.alllecModulesDetails=[];
        $scope.supModDetails=[];
        $scope.allSupervisorModules=[];
        $scope.lec=false;
        $scope.mod=false;

        $scope.meetings = [];
        $scope.getMeetingAppoinments();

        $scope.to="";
    };



    /*
    * Get Current User
    * */
    $scope.getCurrentUser=function () {

        $http.post('/getUser').success(
            function(data){
                $scope.name=data.name;
                $scope.getModulesInCharge();
                $scope.getLecturingModulesAssigned();
                $scope.getSupModulesAssigned();
            }
        ).error(
            function(error){
                console.log(error)
            }
        );

    };


    /*
     * Get Modules in charge
     * */
    $scope.getModulesInCharge=function () {
        $http.post('/getModulesInCharge',{
            lecName : $scope.name
        }).success(
            function(data){
                if(data==""){
                    $scope.modInChg="true";
                }else{
                    Array.prototype.push.apply($scope.lecInchg, data);
                    angular.forEach($scope.lecInchg, function(value){
                        $scope.modInChgName.push(value.courseName);

                     });
                }
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };


    /*
    * Get all lecturing modules assigned
    * */
    $scope.getLecturingModulesAssigned=function () {
        $http.post('/getModulesAssignedForLecturer',{
            lecName : $scope.name
        }).success(
            function(data){
                if(data==""){
                    $scope.lec="true";
                }else{
                    Array.prototype.push.apply($scope.alllecModulesDetails, data);
                    angular.forEach($scope.alllecModulesDetails, function(value){
                        $scope.alllecModules.push(value.courseName);

                    });
                }
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };


    /*
     * Get all Supervisor modules assigned
     * */
    $scope.getSupModulesAssigned=function () {
        $http.post('/getModulesAssignedForSupervisor',{
            lecName : $scope.name
        }).success(
            function(data){
                if(data==""){
                    $scope.mod="true";
                }else{
                    Array.prototype.push.apply($scope.supModDetails, data);
                    angular.forEach($scope.supModDetails, function(value){
                        $scope.allSupervisorModules.push(value.courseName);

                    });
                }
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };



    /*
    * Get monthly meeting schedule
    * */
    $scope.getMeetingAppoinments = function () {
        $http({
            method: 'GET',
            url:'/getMeetings'
        }).then(
            function success(response) {
                Array.prototype.push.apply($scope.meetings, response.data);
            },
            function error(error) {
                console.log('Failed to load Lecturers');
            }
        );

    };


    /*
    * Send meeting request
    * */
    $scope.sendMeetingRequest = function () {


        $http.post('/getUser').success(
            function(data){
                $scope.name=data.name;
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
    };


    $scope.getMeetingDetails=function () {

        $http.post('/sendMeetingReq',{

        }).success(
            function(data){
                $scope.name=data.name;
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
    };

    $scope.init();

}]);