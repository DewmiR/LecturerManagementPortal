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
        $scope.meetingsForMonth = [];
        $scope.getAllMeetingsForMonths();

        $scope.from="";
        $scope.to="";
        $scope.date="";
        $scope.time="";
        $scope.venue="";
        $scope.subject="";
        $scope.body="";
        var d = new Date();
        $scope.month = d.getMonth()+1;
        $scope.year = d.getFullYear();
        $scope.status="Pending";

        $scope.allMeetings=[];
        $scope.getAllMeetings();

        $scope.appoinment=[];

        $scope.appTo="";
        $scope.appDate="";
        $scope.appTime="";
        $scope.appVenue="";
        $scope.appHeader="";
        $scope.appBody="";

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
   /* $scope.sendMeetingRequest = function () {

        /!*$http.post('/getUser').success(
            function(data){
                $scope.from=data.email;
                console.log($scope.from);

                $scope.getMeetingDetails();
            }
        ).error(
            function(error){
                console.log(error)
            }
        );*!/
           console.log("called");

        $http({
                  method: 'post',
                  url:'/sendMeetingReq'
             }).then(
                    function success(response) {
                         console.log(response);
                     },
                       function error(error) {
                                console.log(error);
                             }
                );
    };
*/
    $scope.sendMeetingRequest=function () {

        $scope.to=$scope.mailto;
        $scope.date=$scope.maildate;
        $scope.time=$scope.mailtime;
        $scope.venue=$scope.mailvenue;
        $scope.subject=$scope.mailsubject;
        $scope.body=$scope.mailbody;

        console.log($scope.maildate);
        console.log($scope.mailtime);

        $http.post('/sendMeetingReq',{
            
           from:$scope.from,
           to:$scope.to,
           date:$scope.date,
           time:$scope.time,
           venue:$scope.venue,
           subject:$scope.subject,
           body:$scope.body,
           month:$scope.month,
           year:$scope.year,
           status:$scope.status 


        }).success(
            function(data){
               // $scope.name=data.name;
                console.log(data);
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
    };



    /*
     * Get Current User
     * */
     $scope.getAllMeetings=function () {

         $http.post('/getUser').success(
             function(data){
                 $scope.name=data.name;
                 console.log($scope.name);

                 $http.post('/getMeetings',{
                     user : $scope.name,
                     year :$scope.year
                 }).success(
                     function(data){
                         Array.prototype.push.apply($scope.allMeetings, data);
                         console.log($scope.allMeetings);
                         /*angular.forEach($scope.allMeetings, function(value){
                          $scope.allSupervisorModules.push(value.courseName);

                          });*/

                     }
                 ).error(
                     function(error){
                         console.log(error)
                     }

                 );


             }
         ).error(
             function(error){
                 console.log(error)
             }
         );

     };


    $scope.getAllMeetingsForMonths=function () {
        $http.post('/getUser').success(
            function(data){
                $scope.name=data.name;
                console.log($scope.year);
                console.log($scope.name);
                console.log($scope.month);

                $http.post('/getMeetingsForMonth',{
                    user : $scope.name,
                    year :$scope.year,
                    month:$scope.month
                }).success(
                    function(data){
                        Array.prototype.push.apply($scope.meetings, data);
                        console.log($scope.meetings);
                        angular.forEach($scope.meetings, function(value){
                         $scope.meetingsForMonth.push(value.courseName);
                            console.log($scope.meetingsForMonth);

                         });

                    }
                ).error(
                    function(error){
                        console.log(error)
                    }

                );


            }
        ).error(
            function(error){
                console.log(error)
            }
        );

    };

    
    $scope.getAppDeatils=function (id) {
        console.log(id);
        $http.post('/findMeetingById',{
            id : id
        }).success(
            function(data){
                $scope.appoinment=data;
            }
        ).error(
            function(error){
                console.log(error)
            }

        );

    };


    $scope.updateAppoinment=function (id) {
      /*  console.log(id);
       console.log($scope.appoinment.header);
            console.log($scope.appoinment.body);
            console.log($scope.appoinment.date);
            console.log($scope.appoinment.time);
            console.log($scope.appoinment.venue);
*/

         $http.post('/updateMeetingAppointment',{
             _id : id,
             header:$scope.appoinment.header,
             body:$scope.appoinment.body,
             date:$scope.appoinment.date,
             time : $scope.appoinment.time,
             venue:$scope.appoinment.venue


         }).success(
             function(data){
                 console.log(data);
             }
         ).error(
             function(error){
                 console.log(error)
             }

         );



    };
    

    $scope.init();


}]);