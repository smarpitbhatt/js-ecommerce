var userArr;

try {
    userArr = JSON.parse(localStorage.users);
}
catch(e) {
    console.log("Sign in userarr Err-exception");
    userArr = [];
}

login =()=> {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var error = document.getElementById("error");

    for(i=0; i<userArr.length; i++) {
        if(email==userArr[i].email) {
            if(password==userArr[i].password) {
                sessionStorage.loggedInUserId = JSON.stringify(userArr[i].id);
                error.innerHTML='';
                window.location = './products.html'
            }
            else {
                error.innerHTML = "Password incorrect";
            }
            return;
        }
    }
    error.innerHTML = "Email does'nt exist";
}