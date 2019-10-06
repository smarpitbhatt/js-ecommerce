var userArray=[];
var userId = 0;

validation = ()=> {
var error = document.getElementById("error");
var password = document.getElementById("password").value;
var passwordCheck = document.getElementById("passwordCheck").value;

if(password!=passwordCheck) {
    error.innerHTML='password mismatch';
    error.setAttribute("style","color: red");
}
else {
    error.innerHTML='';
    registerUser();
}

}

try {
    userArray = JSON.parse(localStorage.users);
    userId = JSON.parse(localStorage.userId); 
}
catch(e) {
    userArray=[];
    userId = 1;
}

registerUser = ()=> {
    var user = Object();

    user.id = userId++;
    user.name = document.getElementById("name").value;
    user.email = document.getElementById("email").value;
    user.contact = document.getElementById("contact").value;
    user.password = document.getElementById("password").value;

    userArray.push(user);

    localStorage.users = JSON.stringify(userArray);
    localStorage.userId = JSON.stringify(userId);

    window.location = './login.html';
}