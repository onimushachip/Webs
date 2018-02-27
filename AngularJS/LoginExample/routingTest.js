var user1 = {
    "username" : "onimushachip",
    "password" : "def",
    "date" : "1-2-1",
    "info" : {
        "address" : "11 Berwick Way",
        "phone" : "123456789"
    }
}

var user2 = {
    "username" : "abc",
    "password" : "def",
    "date" : "1-2-1",
    "info" : {
        "address" : "1812 Hellion Road",
        "phone" : "241256789"
    }
}

var user3 = {
    "username" : "thetester",
    "password" : "def",
    "date" : "1-2-1",
    "info" : {
        "address" : "112 Lakeview Way",
        "phone" : "999956789"
    }
}

var allusers = [
    user1,
    user2,
    user3
]

var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "welcomeLogin.htm"
    })
    .when("/listUser", {
        templateUrl : "listUser.htm",
        controller : "listUserController"
    })
    .when("/addUser", {
        templateUrl : "addUserDirective.htm",
        controller : "addUserController"
    });
});

app.controller("listUserController", function ($scope, userService) {
    $scope.userList = allusers;
    $scope.userNumbers = userService.getUserCount();
});

app.controller("addUserController", function ($scope) {
    $scope.username = "";
    $scope.password = "";
    $scope.address = "";
    $scope.phone = "";
    $scope.addUser = function () {
        alert("Trying to add an user");
        var newUser = {
            "username" : "",
            "password" : "",
            "date" : "",
            "info" : {
                "address" : "",
                "phone" : ""
            }
        }
        newUser.username = $scope.username;
        newUser.password = $scope.password;
        newUser.info.address = $scope.address;
        newUser.info.phone = $scope.phone;

        allusers.push(newUser);
        console.log("Add User Successfully!");
        alert("Add User Successfully!");
    }
});

app.directive("addUserDirective", function() {
    return {
        templateUrl : "addUser.htm"
    };
});

app.service("userService", function() {
    this.getUserCount = function () {
        return allusers.length;
    }
});



// var app = angular.module("myApp", ["ngRoute"]);
// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "welcomeLogin.htm"
//     })
//     .when("/red", {
//         templateUrl : "red.htm"
//     })
//     .when("/green", {
//         templateUrl : "green.htm"
//     })
//     .when("/blue", {
//         templateUrl : "blue.htm"
//     });
// });