myApp.controller('MyCoursesController', ['$scope','$http','$location', function($scope,$http,$location) {
 	
$scope.$parent.body_class = "leftmenu memberprofile";
  	
$scope.init = function () {
    $scope.courses = [];
    $scope.loadCourses();
    $scope.showTextBoxState=false;
    
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