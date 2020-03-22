// hotel add data
var app = angular.module("myApp",[]);
app.controller("myCtrl", function ($scope) {
    // data

    var details = {
         listing_name : "vaibhav" ,
         contact_person : "" ,
         listing_des : "" ,
         amenity : "" ,
    };
    $scope.room_data = [];
    var Social = {
        facebook : "fb",
        googleplus : "",
        twitter : "",
        linkedin : "",
        whatsapp : "",
        vk : "",
    };
    var Contact = {
        contact_name : "",
        a_contact_name : "",
        phone_no : "",
        mobile_no : "",
        email : "",
        address : "",
    };
    var hotel_data = [details,$scope.room_data,Social,Contact];

    // functions

    //console.log(hotel_data[2].facebook);    
    $scope.Add_detail = function () {
        if ($scope.LN != undefined && $scope.CP != undefined && $scope.LD != undefined && $scope.A != undefined) {
            //console.log($scope.LN+" : "+$scope.CP+" : "+$scope.LD+" : "+$scope.A);
            details.listing_name = $scope.LN;
            details.contact_person = $scope.CP;
            details.listing_des = $scope.LD;
            details.amenity = $scope.A;
            console.log(details);
        }
    }
    $scope.Add_room = function () {
        var insert = {
            category : $scope.Category,
            price : $scope.Price,
        }
        //var input = $scope.Category+" and Price : "+$scope.Price;
        if ( $scope.Category != undefined && $scope.Price != undefined) {
            $scope.room_data.push(insert);
            console.log($scope.room_data);
        }
        $('#myForm').trigger("reset");
            $scope.Category = undefined;
            $scope.Price = undefined;

    }
    $scope.Add_Social = function () {
        if ($scope.FB != undefined && $scope.GP != undefined && $scope.T != undefined && $scope.LIN != undefined && $scope.WN != undefined && $scope.VK != undefined) {
            Social.facebook = $scope.FB;
            Social.googleplus = $scope.GP;
            Social.twitter = $scope.T;
            Social.linkedin = $scope.LIN;
            Social.whatsapp = $scope.WN;
            Social.vk = $scope.VK;
            console.log(Social);
            
        }
    }
    $scope.Add_Contact = function () {
        if ($scope.CN != undefined && $scope.ACN != undefined && $scope.PH != undefined && $scope.MNO != undefined && $scope.E != undefined && $scope.ADD != undefined) {
            Contact.contact_name = $scope.CN;
            Contact.a_contact_name = $scope.ACN;
            Contact.phone_no = $scope.PH;
            Contact.mobile_no = $scope.MNO;
            Contact.email = $scope.E;
            Contact.address = $scope.ADD;
            console.log(Contact); 
            console.log(hotel_data);
        }
    }    
});