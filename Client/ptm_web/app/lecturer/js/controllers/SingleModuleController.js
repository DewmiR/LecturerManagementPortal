/**
 * Created by PathmilaWK on 9/30/2016.
 */
lectApp.controller('SingleModuleController', ['$scope','$http','$location','$routeParams','$mdToast', function($scope,$http,$location,$routeParams,$mdToast) {

    $scope.$parent.body_class = "";
    $scope.init = function(){

        console.log("Init started(single module)");
        $scope.teams=[];
        $scope.allMembers=[];
        $scope.members=[];
        $scope.loadAllGroups();
        $scope.moduleId = $routeParams.id;
        $scope.moduleDetails = [];
        $scope.lecturers = [];
        $scope.curLecName;
        $scope.lecturersDiv=false;
        $scope.loadSingleModules();
        $scope.loadLecturers();
    };
    
    $scope.loadAllGroups = function () {
        console.log("woops");
        $http.post('/getModuleTeams', {
            cid: $routeParams.id
        }).success(
            function(data){
               console.log(data);
                Array.prototype.push.apply($scope.teams, data);
            }
        ).error(
            function(error){
                console.log(error)
            }
        );

    }
    
    $scope.viewMembers = function (gid){
        
        console.log(gid);
        $http.post('/getGroupMembers', {
            gid: gid
        }).success(
            function(data){
                console.log("iggg");
               console.log(data);
                
                   for(var x=0;x<data.length;x++){
                    console.log(x);
                       
                       $http.post('/getUsers', {
                            uid: data[x].userId
                        }).success(
                            function(data){
                             //  console.log(data);
                                $scope.allMembers.push(data);
                               // console.log($scope.allMembers);
                              // Array.prototype.push.apply($scope.members, data);
                            }
                        ).error(
                            function(error){
                                console.log(error)
                            }
                        );
                       
                       
                }
                console.log($scope.allMembers);
                 Array.prototype.push.apply($scope.members, $scope.allMembers);
                $scope.allMembers=[];
                
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
       
    }

    $scope.loadSingleModules = function () {
 

        $http.post('/getModulesSingle', {
            id: $scope.moduleId
        }).success(
            function(data){
                console.log(data);
                $scope.moduleDetails = data;
                //$scope.currentModuleLecInCharge=data.lecInCharge;
            }
        ).error(
            function(error){
                console.log(error)
            }
        );
    }
    
    $scope.acceptTeam = function (id) {
        console.log(id);
        
        
        
        $http.post('/UpdateLecturerAcceptStaus', {
            id: id
        }).success(
            function(data){
                console.log(data);
                $mdToast.show($mdToast.simple().textContent("Accepted Successfully").position('bottom right').hideDelay(5000));
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

    $scope.lecName = function (name) {
        $scope.curLecName = name;
    }

    $scope.assignLecturerForModule = function (moduleName, lecName) {

        $http.post('/assignLecturerForModule', {
            moduleName: moduleName,
            lecName: lecName,
            
        }).success(
            function(data){
                if(data == "pass"){
                    $scope.moduleDetails.lecInCharge = lecName;
                    $mdToast.show($mdToast.simple().textContent("Lecturer assigned successfully").position('bottom right').hideDelay(5000));
                }else{
                    
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );
    }

    $scope.changeEnrolmentKey = function (moduleName,newKey) {
        console.log(newKey);
        $http.post('/changeEnrolmentKey', {
            newKey: newKey,
            moduleName: moduleName,
        }).success(
            function(data){
                if(data == "pass"){
                    $scope.moduleDetails.enrollmentKey = newKey;

                }else{

                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );
    }
    
    $scope.init();

}]);
