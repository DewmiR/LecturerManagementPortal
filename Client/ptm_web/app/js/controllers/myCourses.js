myApp.controller('MyCoursesController', ['$scope','$http','$location','$mdDialog', function($scope,$http,$location,$mdDialog) {
 	
$scope.$parent.body_class = "leftmenu memberprofile";
  	
$scope.init = function () {
    $scope.courses = [];
    $scope.loadCourses();
    $scope.showTextBoxState=false;
    $scope.status = '  ';
    
}
    
$scope.loadCourses = function () {
    var params = {};
    $http({
        method: 'GET',
        url:'/getAllCourses',
        params: params
    }).then(
            function success(response) {
                //console.log(response.data);
                Array.prototype.push.apply($scope.courses, response.data);
                console.log($scope.courses)
	
            },
            function error(error) {
                console.log('Failed to load courses');
            }
    );
}

$scope.showEnrollmentKeyPrompt = function(ev,cid) {
    
    var studentID="57e214a19e7ead1198a69d88";
    var courseID=cid;
    
    var confirm = $mdDialog.prompt()
      .title()
      .textContent()
      .placeholder('Enrollment Key')
      .ariaLabel('Enrollment Key')
//      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Ok')
      .cancel('Cancel\'');
    $mdDialog.show(confirm).then(function(result) {
     // console.log(studentID);
        console.log(courseID);
        
        $http.post('/getEnrollmentkeyByCourseId', {
        cid: courseID
        }).success(
            function(data){
                console.log(data[0].enrollmentKey);
                if(data[0].enrollmentKey==result){
                    console.log("Matched");
                    $location.url('/single_course/'+courseID);  
                }
            
            }
        ).error(
            function(error){
              console.log(error)
            }
        );
            
        
     }, function() {
        console.log("Don't");
    });   
   
  };
    
$scope.loadMembers = function(cid){

    $location.url('/my_friends/'+ cid);  
    
    // $http.post('/getUsersEnrolledInCourse', {
    //     cid: cid
    // }).success(
    //     function(data){
    //         console.log(data);
    //     }
    // ).error(
    //     function(error){
    //       console.log(error)
    //     }
    // );

}

$scope.showTextBox = function(index){

    console.log($scope.showTextBoxState);
    $scope.showTextBoxState=true;
    console.log($scope.showTextBoxState);
};

$scope.checkEnrollKey = function(id,txt){
    console.log(id);
    console.log("enroll Key Pressed");
    console.log(txt);

    $http.post('/checkEnrollmentKey', {
        cid: txt
    }).success(
        function(data){
            if(data==1){
                console.log("done");
            }
           
        }
    ).error(
        function(error){
          if(error==1){
            $location.url('/single_course/'+id);  
          }
        }
    );


};


$scope.init();
  	

}]);