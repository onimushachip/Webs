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
        "phone" : "123456789"
    }
}

var user3 = {
    "username" : "thetester",
    "password" : "def",
    "date" : "1-2-1",
    "info" : {
        "address" : "112 Lakeview Way",
        "phone" : "123456789"
    }
}

var allusers = [
    user1,
    user2,
    user3
]

var submitBt = document.getElementById("submitBt");
submitBt.setAttribute("onclick", "getUser()");

function getUser () {
    var userName = String(document.getElementById("usernameField").value);
    var userPassword = String(document.getElementById("userPasswordField").value);
    console.log(userName);
    console.log(userPassword);
    // console.log(userPassword);
    // console.log(allusers[1].username);
    // console.log(allusers[1].username == userName);
    for (i = 0; i < allusers.length; i++) {
        // console.log(item.username);
        if (allusers[i].username == userName && allusers[i].password == userPassword) {
            alert("Login Successfully!");
            // console.log("This is your address: " + allusers[i].info.address);
            // var bodyHTML = document.getElementById("body");
            // var infoDiv = document.createElement("DIV");
            // infoDiv.textContent = "Login Successfully!";
            // bodyHTML.appendChild(infoDiv);
            window.location.replace("welcomePage.html");
        }
    }
}

var app = angular.module("loginExample", []);

app.controller("loginController", function($scope) {
    $scope.userName = "username";
    $scope.userPassword = "xxxxxxxx";
});



// console.log(allusers[0].info.address);