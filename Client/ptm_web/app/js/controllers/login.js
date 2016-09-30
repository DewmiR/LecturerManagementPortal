myApp.controller('LoginController', ['$scope','$http','$location','toastr', function($scope,$http,$location,toastr) {

    $scope.$parent.body_class = "";
    $scope.init = function(){

        console.log("Init started");

        $scope.registerContent = false;
        $scope.loginContent = true;
    };


  	$scope.login = function(email,password) {
    	console.log(email +"  "+password);

      $http.post('/login', {
        username: email,
        password: password
      }).success(
        function(data){
          if(data == "pass"){
              $location.url('/profile');
          }else{
            $location.url('/login');
          }
        }
      ).error(
        function(error){
          console.log(error)
        }
      );

    }

    $scope.register = function(name,email,itnum,password) {
        console.log(email +"  "+password);

        $http.post('/registerUser', {
            name: name,
            username: email,
            itnum: itnum,
            password: password
        }).success(
            function(data){
                if(data == "pass"){
                    $location.url('/profile');
                    toastr.success('You have successfully registered!', 'Welcome');
                }else{
                    $location.url('/login');
                }
            }
        ).error(
            function(error){
                console.log(error);
            }
        );

    }

    $scope.showregister = function () {
        $scope.registerContent = true;
    }

    $scope.showlogin = function () {
        $scope.registerContent = false;
    }
    
    $scope.init();


}]);