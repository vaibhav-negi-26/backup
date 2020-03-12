var app = angular.module("myRoute", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/mhall', {
            templateUrl: "temp/MHall.html"
        })
        .when('/mhcancel', {
            templateUrl: "temp/MHcancel.html"
        })
        .when('/dbprofile', {
            templateUrl: "temp/dbprofile.html"
        })
        .when('/dbprofiledit', {
            templateUrl: "temp/dbprofiledit.html"
        })
        .when('/dbrefund', {
            templateUrl: "temp/dbrefund.html"
        })
        .otherwise({
            redirectTo: "/dbprofile"
        });
});