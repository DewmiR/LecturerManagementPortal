lectApp.controller('ProjectsController', ['$scope','$http','$location','$mdDialog','$routeParams', function($scope,$http,$location,$routeParams,$mdDialog) {

    $scope.message = "Adooooo"


	$scope.addProjectFormSubmit = function() {


		$http.post('/projects/createProject', {
            name: $scope.formData.pname,
            desc: $scope.formData.pdes
        }).success(
            function(data){
                if(data == "pass"){
                    console.log("created")
                }else{
                    console.log("failed")
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );

	}

}]).controller('AssignProjectsController', ['$scope','$http','$location','$routeParams','$mdDialog','$mdToast', function($scope,$http,$location,$routeParams,$mdDialog,$mdToast) {


    $http({
        method: 'GET',
        url:'/projects/getAllProjects'
    }).then(
            function success(response) {
                $scope.projects = response.data
            },
            function error(error) {
                console.log('Failed to load courses');
            }
    );

    $http({
        method: 'GET',
        url:'/getAllCourses'
    }).then(
        function success(response) {
            $scope.courses = response.data;
        },
        function error(error) {
            console.log('Failed to load courses');
        }
    );

    $scope.viewProjet = function(ev,name,desciption) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent:ev,
            clickOutsideToClose:true,
            template:
            '<md-dialog aria-label="JIT Math" >' +
                '<form ng-cloak>' +
                    '<md-toolbar>' +
                      '<div class="md-toolbar-tools">' +
                        '<h2>'+name+'</h2>' +
                      '</div>' +
                    '</md-toolbar>' +
                    '<md-dialog-content>' +
                      '<div class="md-dialog-content">' +
                        '<h4>Description</h4>' +
                        '<p>'+desciption+'</p>' +
                      '</div>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions layout="row">' +
                        '<span flex></span>' +
                        '<md-button ng-click="answer()">Assign</md-button>' +
                    '</md-dialog-actions>' +
                '</form>' +
            '</md-dialog>',
            locals: {
            },
            controller: DialogController
        });

        function DialogController($scope, $mdDialog) {
            $scope.answer = function(answer) {
              $mdDialog.hide(answer);
            };
        }
    }


    $scope.assignProjet = function(ev,name,pId,project) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: ev,
            clickOutsideToClose:true,
            template:
                '<md-dialog aria-label="JIT Math" >' +
                    '<form ng-cloak>' +
                        '<md-dialog-content>' +
                          '<div class="md-dialog-content">' +
                            '<h3>'+name+'</h3>' +
                            '<p>Please Select the Course</p>' +
                             '<md-select ng-model="ctrl">' +
                                '<md-option ng-repeat="course in courses" ng-value="course">{{course.courseName}}</md-option>' +
                            '</md-select>' +
                          '</div>' +
                        '</md-dialog-content>' +
                        '<md-dialog-actions layout="row">' +
                            '<md-button ng-click="answer(ctrl)">Assign</md-button>' +
                        '</md-dialog-actions>' +
                    '</form>' +
                '</md-dialog>',
            locals: {
                courses: $scope.courses,
                projectId: pId,
                projectName: name,
                project: project
            },
            controller: AsignController
        });

        function AsignController($scope, $mdDialog, courses, projectId, projectName,project) {

            $scope.courses = courses;
            //$scope.project = project;

            $scope.answer = function(ctrl) {
                $mdDialog.hide();

                $http.post('/projects/createProjectOfCourse', {
                    course: ctrl,
                    project: project
                }).success(
                    function(data){
                        if(data == "pass"){
                            $mdToast.show($mdToast.simple().textContent(projectName+ " successfuly assigned to "+ctrl.courseName).position('bottom right').hideDelay(5000));
                        }else{
                            $mdToast.show($mdToast.simple().textContent("Project assign Failed!").position('bottom right').hideDelay(5000));
                        }
                    }
                ).error(
                    function(error){
                        console.log(error);
                    }
                );



            }
        }
    }


}]).controller('MyProjectsController', ['$scope','$http','$location','$routeParams','$mdDialog','$mdToast', function($scope,$http,$location,$routeParams,$mdDialog,$mdToast) {

    var getAllProjects = function(){

        $http({
            method: 'GET',
            url:'/projects/getAllProjectOfCourse'
        }).then(
            function success(response) {
                $scope.projects = response.data
            },
            function error(error) {
                console.log('Failed to load courses');
            }
        );
    }

    getAllProjects()


    $scope.approve = function(bid,poc){
        $http.post('/projects/approveBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Approved!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }


    $scope.decline = function(bid,poc){
 
        $http.post('/projects/declineBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Rejected!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }


    $scope.recover = function(bid,poc){
 
        $http.post('/projects/recoverBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Recovered!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }


    $scope.delete = function(bid,poc){

        $http.post('/projects/removeBit', {
            bid: bid,
            poc: poc
        }).success(
            function(data){
               getAllProjects()
               $mdToast.show($mdToast.simple().textContent("Bid Successfuly Deleted!").position('bottom right').hideDelay(5000));
            }
        ).error(
            function(error){
                console.log("Failed to decline bit");
            }
        );
    }





}]);