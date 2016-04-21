var app = angular.module('myApp', ['ngRoute']);
    app.controller('MainController', function($scope, $http) {

    $scope.messages = [];
    $scope.sayHelloToServer = function() {
        $http.get("/api").then(function(response) {
            $scope.messages.push(response.data);

            // METRICS            
            // $http.get("/metrics").then(function(response) {
            //     $scope.metrics = response.data;
            // });
        });
    };
    
    $scope.sayHelloToServer();
    
    var styles = [];
    var colors = ["gray", "green", "red", "blue", "orange", "black"];
    var color = 0;
    $scope.getStyle = function(message) {
        if (!styles[message]) {
            styles[message] = {'color': colors[color]};
            color = color < colors.length - 1 ? color + 1 : 0;
        }
        return styles[message];
    }

});
