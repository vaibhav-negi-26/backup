var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope) {

    // net price

    $scope.netPrice = 0;

    // cab data

    $scope.cabs = [{
        id: 1,
        name: "innova",
        price: 2000,
        view: "https://www.google.co.in/"
    }, {
        id: 2,
        name: "swift",
        price: 3000,
        view: "https://www.google.co.in/"
    }, {
        id: 3,
        name: "scorpio",
        price: 5000,
        view: "https://www.google.co.in/"
    }];
    var destination_cab = 0;
    $scope.selected_cab_d = function (id) {
        destination_cab = id;
        $scope.netPrice = $scope.netPrice + $scope.cabs[id-1].price;
        // console.log("cab id d:" +destination_cab);
    }
    var returning_cab = 0;
    $scope.selected_cab_r = function (id) {
        returning_cab = id;
        $scope.netPrice = $scope.netPrice + $scope.cabs[id-1].price;
        // console.log("cab id r:" +returning_cab);
    }

    //hotel data
    $scope.rooms;
    $scope.show_hotel = false;
    $scope.hotels = [{
        id: 1,
        name: "Green acers",
        location: "Hinoo, Ranchi",
        view: "https://www.google.co.in/",
        room_types: [{
            id: 1,
            type: "Deluxe"
        }, {
            id: 2,
            type: "Premium"
        }, {
            id: 3,
            type: "Normal"
        }]
    }, {
        id: 2,
        name: "Capital hill",
        location: "Main Road, Ranchi",
        view: "https://www.google.co.in/",
        room_types: [{
            id: 1,
            type: "Deluxe"
        }, {
            id: 2,
            type: "Super-Deluxe"
        }, {
            id: 3,
            type: "Normal"
        }]
    }, {
        id: 3,
        name: "Radiison Blue",
        location: "Ashok nagar, Ranchi",
        view: "https://www.google.co.in/",
        room_types: [{
            id: 1,
            type: "Deluxe"
        }, {
            id: 2,
            type: "Super-Deluxe"
        }, {
            id: 3,
            type: "Premium"
        }, {
            id: 4,
            type: "Normal"
        }]
    }];
    var hotel_selected = -1;
    $scope.selected_hotel = function (id) {
        hotel_selected = id - 1;
        // console.log("hotel id :" +hotel_selected);
        $scope.rooms = $scope.hotels[hotel_selected].room_types;
    }

    $scope.room_types = ["Deluxe", "Premium", "Normal"];

    //this much days customer will stay
    $scope.datediff = function () {
        var value = 1000 * 60 * 60 * 24;
        var one = $scope.arrival;
        var two = $scope.departure;
        var days = (two - one) / value;
        console.log(days);
    }

    $scope.myHotel = function () {
            $scope.show_hotel = false;
    }

    $scope.test_input = function () {
        if ($scope.test === undefined) {
            $scope.show_hotel = false;
        } else {
            $scope.show_hotel = true;
        }
    }
})