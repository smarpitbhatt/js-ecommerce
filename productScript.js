var divProductsPanel = document.getElementById("divProducts");
var userinfo = document.getElementById("user-info");

var prodArr = [], cartArr = [], loggedInUserId, userArr, loggedInUser;


loadFromLocalStorage = ()=> {
    
try {
    prodArr = JSON.parse(localStorage.products);
    cartArr = JSON.parse(localStorage.cart);
}
catch(e) {
    console.log("cart arr empty");
}

try {
userArr = JSON.parse(localStorage.users);
loggedInUserId = JSON.parse(sessionStorage.loggedInUserId);
}
catch(e) {
console.log("user arr empty");
}

    checkUserStatus();
    addProductsToDOM();
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

addProductsToDOM = ()=> {
    console.log(prodArr);

    for(i=0; i<prodArr.length; i++) {
        var divProd = document.createElement("div");
        var inputQty = document.createElement("input"); 
        var btnAddToCart = document.createElement("button");

        
        divProd.setAttribute("class","divProd");

        divProd.setAttribute("prodId",prodArr[i].id);

        divProd.innerHTML += "Name: "+prodArr[i].name+"<br>";
        divProd.innerHTML += "Price: "+prodArr[i].price+"<br>";
        divProd.innerHTML += "Description: "+prodArr[i].description+"<br>";

        btnAddToCart.innerHTML = "Add To Cart";
        btnAddToCart.setAttribute("prodId", prodArr[i].id);
        inputQty.setAttribute("id", "input"+prodArr[i].id);

        btnAddToCart.addEventListener("click",function(event) {
            
            var qty = document.getElementById("input"+this.getAttribute("prodId")).value;
            console.log("qty",qty);
            var status = addToCart(this.getAttribute("prodId"), qty);

            if(status<0) alert("Invalid Quantity!");

        });

        divProd.appendChild(inputQty);
        divProd.appendChild(btnAddToCart);
        
        var p = document.createElement("text");
        p.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<small style='color:red'>Out Of Stock</small>";
        if(prodArr[i].qty==0) divProd.appendChild(p);

        divProductsPanel.appendChild(divProd);
    }

    if(cartArr.length!=0&&loggedInUser) {
        
        var inputId;

        for( i=0; i<cartArr.length; i++) {
            if(cartArr[i].userId!=loggedInUserId) continue;
            inputId = document.getElementById("input"+cartArr[i].id);
            inputId.setAttribute("value", cartArr[i].qty);
        }
    }
}

addToCart = (id, qty)=> {
        var cartProd={}, arrProd= {};

        for(i=0; i<prodArr.length; i++) {
            if(id==prodArr[i].id) {
                arrProd = prodArr[i];
                break;
            }
        }

        console.log(arrProd);
        
        if(qty>JSON.parse(arrProd.qty) || qty<=0) {return -1;}
        else {
            flag=0;
            cartProd.id = arrProd.id;
            cartProd.qty = qty;
            cartProd.price = arrProd.price;

            if(loggedInUser)
            cartProd.userId = loggedInUser.id;

            for(i=0; i<cartArr.length; i++) {
                if(cartProd.id==cartArr[i].id) {
                    cartArr[i] = cartProd;
                    flag=1;break;
                }
            }

            if(flag==0) cartArr.push(cartProd);

            console.log(cartArr);
            
            alert("Added To Cart!");
            
            localStorage.cart = JSON.stringify(cartArr);

            return 1;
        }
        
}

