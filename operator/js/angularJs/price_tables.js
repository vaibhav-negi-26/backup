var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/hotel', {
            templateUrl: "pricetables/hotel.html",
            controller: "hotelCtrl"
        })
        .when('/cab', {
            templateUrl: "pricetables/cab.html",
            controller: "cabCtrl"
        })
        .when('/package', {
            templateUrl: "pricetables/package.html",
            controller: "packCtrl"
        })
        .otherwise({
            redirectTo: "/hotel"
        });
});
app.controller("homeCtrl",function ($scope) {
    $scope.type = "Hotel";
    $scope.category = function (id) {
        if (id == 1) {
            $scope.type = "Hotel";
        }else if (id == 2) {
            $scope.type = "Cab";
        } 
        else if (id == 3) {
            $scope.type = "Tour & Package";
        } 
    }
});
app.controller("hotelCtrl",function ($scope) {
  
});
app.controller("cabCtrl",function ($scope) {
 
});
app.controller("packCtrl",function ($scope) {

});