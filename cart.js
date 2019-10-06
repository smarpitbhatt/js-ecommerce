var divCart = document.getElementById("divCart");
var tableBody = document.getElementById("tableBody");
var aCheckOut = document.getElementById("aCheckOut");
var userinfo = document.getElementById("user-info");

var userArr, productArr, loggedInUser, loggedInUserId, cartArr;

loadSavedData = ()=> {
    try {
        cartArr = JSON.parse(localStorage.cart);
        productArr = JSON.parse(localStorage.products);
    }
    catch(e) {
        console.log("Exception LS");
    }

    try {
        userArr = JSON.parse(localStorage.users);
        loggedInUserId = JSON.parse(sessionStorage.loggedInUserId);
    }
        catch(e) {
        console.log("user arr empty");
    }
    checkUserStatus();
    loadCartToDom();
}

checkUserStatus = ()=> {
    
    //Find loggedInUser
    if(userArr&&loggedInUserId) {
        for(i=0; i<userArr.length; i++) {
            if(loggedInUserId==userArr[i].id) {
                loggedInUser= userArr[i];
                console.log(loggedInUser.name);
            }
        }
    }
    
    addUserStatusToDOM()
}

addUserStatusToDOM = ()=>{
    if(loggedInUser) {
        var p = document.createElement("p");
        var logout = document.createElement("button");

        logout.innerHTML= "logout";
        logout.addEventListener("click",(event)=> {
            alert("Logged Out");
            sessionStorage.removeItem("loggedInUser");
            sessionStorage.removeItem("loggedInUserId");
            window.location.reload();
        });

        p.innerHTML = "Hello, "+(loggedInUser.name).toUpperCase()+'&nbsp; &nbsp;&nbsp; &nbsp;';
        p.appendChild(logout);
        userinfo.appendChild(p);
    }
    else {
        var p = document.createElement("p");
        var login = document.createElement("button");

        login.innerHTML= "login";
        login.addEventListener("click",(event)=> {
            alert("redirecting to login");
            window.location = './login.html';
        });
        
        p.appendChild(login);userinfo.appendChild(p);
    }
}


loadCartToDom = ()=>{
    
    console.log(cartArr);
    console.log(productArr);

    var total=0;
    for(i=0; i<cartArr.length; i++) {
    if(cartArr[i].userId!=loggedInUserId) continue;
     var product = productArr.find(product=> product.id==cartArr[i].id);     
     total+=JSON.parse(product.price);

     var tr = document.createElement("tr");
     var td = document.createElement("td");
     var buttonDel = document.createElement("button");

     td.innerHTML = product.name;
     tr.appendChild(td);

     td = document.createElement("td");
     td.innerHTML = cartArr[i].qty;
     tr.appendChild(td);

     td = document.createElement("td");
     td.innerHTML = cartArr[i].price;
     tr.appendChild(td);

     buttonDel.innerHTML = "delete";
     buttonDel.setAttribute("id",cartArr[i].id);
     td = document.createElement("td");
     
     buttonDel.addEventListener("click",function (event){
        deleteProductCart(this.getAttribute("id"));
     });
     
     td.appendChild(buttonDel);
     tr.appendChild(td);
     tr.setAttribute("id",cartArr[i].id);
     tableBody.appendChild(tr);
    }
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "TOTAL-"
    td.setAttribute("colspan","2");
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = total; 
    tr.appendChild(td);
    tableBody.appendChild(tr);
    
}

deleteProductCart = (id)=> {
    cartArr=cartArr.filter(product=> product.id!=id);
    
    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    localStorage.cart = JSON.stringify(cartArr);
    loadCartToDom();
}

aCheckOut.addEventListener("click", (event)=>{
    if(cartArr.length==0) {alert("Your Cart seems empty!"); return;}
    if(!loggedInUserId) {alert("Login First"); return;}
    
    // if userid is not attached to cart array items::
    if(!cartArr[0].userId&&loggedInUser) {
        for(i=0; i<cartArr.length; i++) {
            cartArr[i].userId = loggedInUser.id;
        }
    }

        for(i=0; i<cartArr.length; i++) {
            for(j=0; j<productArr.length; j++) {
                if(productArr[j].id==cartArr[i].id&&productArr[i].qty>0&&cartArr[i].userId==loggedInUserId) {
                    productArr[j].qty = ""+eval(productArr[i].qty-cartArr[i].qty);
                    break;
                }
            }
        }
        
        cartArr = cartArr.filter((value)=>value.userId!=loggedInUserId);
        
        localStorage.products = JSON.stringify(productArr);
        localStorage.cart = JSON.stringify(cartArr);
        
        alert("CHECKED OUT!");
});




