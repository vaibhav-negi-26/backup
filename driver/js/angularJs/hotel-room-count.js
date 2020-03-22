var app = angular.module("myApp",[]);
app.controller("myCtrl", function ($scope) {
    $scope.room_count = [];
$scope.Add_room = function () {
    var insert = {
        category : $scope.Category,
        count : $scope.Count,
    }
    //var input = $scope.Category+" and Price : "+$scope.Price;
    if ( $scope.Category != undefined && $scope.Count != undefined) {
        $scope.room_count.push(insert);
        console.log($scope.room_count);
    }
    $('#myForm').trigger("reset");
        $scope.Category = undefined;
        $scope.Count = undefined;

}
});