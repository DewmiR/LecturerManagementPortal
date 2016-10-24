myApp.controller('CourseModuleForumController', ['$scope','$http','$location', '$routeParams','$route','$mdDialog', function($scope,$http,$location,$routeParams,$route,$mdDialog) {

  //  $scope.$parent.body_class = "leftmenu memberprofile";

    $scope.init = function () {
        $scope.n={};
        $scope.groupFormedStatus=false;
//      $scope.n.leaderName="dsds";
      console.log("CourseModuleForumController started");
      //$scope.courseId=$routeParams.id;
      $scope.studentId=$routeParams.id;
      $scope.getReceivedRequests();
      $scope.requestFromNameArr=[];
      $scope.currentUserId="";
      $scope.getCurrentUser();
      $scope.isGroupFormed();
     
       
        
//      /* $rootScope.$on('$routeChangeSuccess', function() {
//    $route.reload();*/
//});
        
        setInterval(function(){ $scope.requestFromNameArr=[];$scope.getReceivedRequests(); }, 1000000);
    }
    
     $scope.getReceivedRequests = function () {
        
       $http.post('/getUser').success(
        function(data){
            $http.post('/getReceivedRequests', {
                userId: data._id,
                status: "0"
            }).success(
                function(data){
                    $scope.myRequests = data.length;
                    console.log(data);
                    Array.prototype.push.apply($scope.requestFromNameArr, data);
                    
                }
            ).error(
                function(error){
                    console.log(error);
                }
            );
        }
    ).error(
	    function(error){
        	console.log(error)
      	}
    );
         
    }
     
     
     $scope.test = function (id){
         
         console.log(id+"dfgdf");
         $location.url('/course_received_request/'+id+'/'+$routeParams.id);
     }
     
     $scope.getCurrentUser = function(){
       
        $http.post('/getUser').success(
        function(data){
           $scope.currentUserId=data._id;
//            console.log("userId");
//            console.log($scope.currentUserId);
        }
        ).error(
            function(error){
                console.log(error)
            }
        );
         
     };
    
    
    $scope.isGroupFormed = function() {
        
//        $http.post('/createNewcourseModuleGroups', {
//            userId: "o",
//            status: "0"
//        }).success(
//        function(data){
//           console.log(data);
//        }
//        ).error(
//            function(error){
//                console.log(error)
//            }
//        );
       
        
        
          $http.post('/getUser').success(
        function(data){
            
            
        $http.post('/getGroupId', {
        userId:data._id,
        courseId:$scope.studentId
        }).success(
        function(data){
           console.log(data[0].gId);
            
            //
            
                $http.post('/getGroupCount',{
                 gid: data[0].gId
                }).success(
                function(data){
                   console.log(data);
                    if(data=="1"){
                        console.log("Group Formed");
                        $scope.groupFormedStatus=true;
                    }
                    
                }
                ).error(
                    function(error){
                        console.log(error)
                    }
                );
            //
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
//        
//        
      
//        
        
        
    };
    
    
  

  $scope.showAdvanced = function(ev) {
   
      console.log("goda");
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen
    })
    .then(function(answer) {
//      $scope.status = 'You said the information was "' + answer + '".';
        if(answer=='A'){
            console.log($scope.n);
        }else{
            console.log("cancelled");
        }
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

 


  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

    $scope.init();




}]);
