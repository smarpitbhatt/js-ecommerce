var aAddProduct = document.getElementById("aAddProduct");
var divAddProduct = document.getElementById("divAddProduct");
var divProductList = document.getElementById("divProductList");
var panelCreated = false;
var productArray = [];
var productCounter = 1;

function savedProducts() {

    axios.get('http://127.0.0.1:8000/getProducts')
        .then(response => {

            if (response.data.arr == undefined) productArray = [];
            else
                productArray = response.data.arr;
            console.log(productArray);
            console.log("products server->", response);

            productCounter = response.data.count || 1;

            updateDOM();
        });
}

var lblProductList = document.createElement("label");
lblProductList.innerHTML = "<br><br><br>PRODUCTS LIST:";
divProductList.appendChild(lblProductList);

// Add Event Listener on addproduct link //

aAddProduct.addEventListener("click", (event) => {
    aAddProduct.style.display = "none";

    createAddProductPanel();
});



function createAddProductPanel() {

    deleteAllChildren(divAddProduct);

    var productAddPanel = document.createElement("div")
    productAddPanel.className = 'container w-50 mx-auto bg-light';

    //Adding Div top label
    var lblAddProduct = document.createElement("label");
    lblAddProduct.innerHTML = "<br>ADD PRODUCTS<br>";
    productAddPanel.appendChild(lblAddProduct);

    //Adding name fields

    var inputAddName = document.createElement("input");
    inputAddName.setAttribute("placeholder", "Name Of Product");
    inputAddName.setAttribute("id", "name");
    productAddPanel.appendChild(inputAddName);

    addBreak(productAddPanel);

    //Adding Description Field
    var inputAddDesc = document.createElement("textarea");
    inputAddDesc.setAttribute("placeholder", "Enter Description");
    inputAddDesc.setAttribute("id", "description");
    productAddPanel.appendChild(inputAddDesc);

    addBreak(productAddPanel);

    //Adding Price Field
    var inputAddPrice = document.createElement("input");
    inputAddPrice.setAttribute("placeholder", "Enter Price");
    inputAddPrice.setAttribute("id", "price");
    productAddPanel.appendChild(inputAddPrice);

    var inputAddQty = document.createElement("input");
    inputAddQty.setAttribute("placeholder", "Enter Qty");
    inputAddQty.setAttribute("id", "qty");
    productAddPanel.appendChild(inputAddQty);

    addBreak(productAddPanel);

    //Submit Product
    var submitButton = document.createElement("button");
    submitButton.className = 'btn btn-success';
    submitButton.setAttribute("id", "submit");
    submitButton.innerHTML = "Add Product";

    submitButton.addEventListener("click", (event) => {
        aAddProduct.style.display = "block";
        console.log(JSON.stringify(obj));

        var obj = addObjectToArray(0);
        addProductToDOM(obj);
        $('#productAddPanel').hide();
        deleteAllChildren(productAddPanel);
    });
    productAddPanel.appendChild(submitButton);

    //Cancel Button
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel");
    cancelButton.innerHTML = "cancel";
    cancelButton.addEventListener("click", (event) => {
        aAddProduct.style.display = "block";
        deleteAllChildren(productAddPanel);
        $('#productAddPanel').hide();
    });
    productAddPanel.appendChild(cancelButton);

    divAddProduct.appendChild(productAddPanel);
}

function addObjectToArray(i) {
    var product = Object();

    product.name = document.getElementById("name").value;
    product.description = document.getElementById("description").value;
    product.price = document.getElementById('price').value;
    product.qty = document.getElementById('qty').value;
    product.id = productCounter++;

    if (i === 1) return product;

    productArray.push(product);

    console.log(productArray);

    saveLocal();
    return product;
}

function addProductToDOM(obj) {

    var divProduct = document.createElement("div");
    var btnDelete = document.createElement("button");
    var btnEdit = document.createElement("button");

    divProduct.className = 'w-25 h-25 bg-light border border-success rounded mt-1 mx-auto container';

    btnDelete.setAttribute("href", "#");
    btnDelete.setAttribute("id", obj.id);
    btnDelete.innerHTML = "Delete";
    btnDelete.className = 'btn btn-danger';

    btnEdit.setAttribute("href", "#");
    btnEdit.setAttribute("id", obj.id);
    btnEdit.innerHTML = "Edit";
    btnEdit.className = 'btn btn-warning';

    btnDelete.addEventListener("click", (event) => {
        deleteProductArray(btnDelete.getAttribute("id"));
        var lblProductList = document.createElement("label");
        lblProductList.innerHTML = "<br><br><br>PRODUCTS LIST:";
        divProductList.appendChild(lblProductList);
        updateDOM();
    });

    btnEdit.addEventListener("click", (event) => {
        var obj = getProductArray(btnEdit.getAttribute("id"));
        console.log("EDIT", obj);
        createEditProductPanel(obj);
    });

    divProduct.setAttribute("style", "border:1px solid;width:200px");
    divProduct.innerHTML += "<center class='h4'>" + obj.name + "</center><br>";
    divProduct.innerHTML += obj.description + "<br>";
    divProduct.innerHTML += obj.price + "<br>";
    divProduct.innerHTML += "qty " + obj.qty + "<br>";

    divProduct.appendChild(btnDelete);
    divProduct.appendChild(btnEdit);
    divProductList.appendChild(divProduct);

    addBreak(divProductList);
}


function updateDOM() {
    deleteAllChildren(divProductList);
    for (i = 0; i < productArray.length; i++) {
        addProductToDOM(productArray[i]);
    }
}

function deleteAllChildren(targetElement) {
    while (targetElement.hasChildNodes()) {
        targetElement.removeChild(targetElement.childNodes[0]);
    }
}

function addBreak(targetElement) {
    var br = document.createElement("br");
    targetElement.appendChild(br);

    var br = document.createElement("br");
    targetElement.appendChild(br);
}

function deleteProductArray(id) {
    id = Number(id);
    var obj;

    for (i = 0; i < productArray.length; i++) {
        if (productArray[i].id === id) {
            obj = productArray[i]; productArray.splice(i, 1);
            saveLocal(); return i;
        }
    }
}

function getProductArray(id) {
    id = Number(id);
    var obj;

    for (i = 0; i < productArray.length; i++) {
        if (productArray[i].id === id) {
            obj = productArray[i]; return obj; break;
        }
    }
}

function getProductIndex(id) {
    id = Number(id);
    var obj;

    for (i = 0; i < productArray.length; i++) {
        if (productArray[i].id === id) {
            obj = productArray[i]; return i; break;
        }
    }
}

function createEditProductPanel(obj) {

    deleteAllChildren(divAddProduct);

    var productAddPanel = document.createElement("div")
    productAddPanel.className = 'container w-50 mx-auto border border-primary bg-light';
    //Adding Div top label
    var lblAddProduct = document.createElement("label");
    lblAddProduct.innerHTML = "<br>Edit PRODUCTS<br>";
    productAddPanel.appendChild(lblAddProduct);

    //Adding name fields

    var inputAddName = document.createElement("input");
    inputAddName.setAttribute("placeholder", "Name Of Product");
    inputAddName.setAttribute("id", "name");
    inputAddName.value = obj.name;
    productAddPanel.appendChild(inputAddName);

    addBreak(productAddPanel);

    //Adding Description Field
    var inputAddDesc = document.createElement("textarea");
    inputAddDesc.setAttribute("placeholder", "Enter Description");
    inputAddDesc.setAttribute("id", "description");
    inputAddDesc.value = obj.description;
    productAddPanel.appendChild(inputAddDesc);

    addBreak(productAddPanel);

    //Adding Price Field
    var inputAddPrice = document.createElement("input");
    inputAddPrice.setAttribute("placeholder", "Enter Price");
    inputAddPrice.setAttribute("id", "price");
    inputAddPrice.value = obj.price;
    productAddPanel.appendChild(inputAddPrice);

    addBreak(productAddPanel);

    var inputAddQty = document.createElement("input");
    inputAddQty.setAttribute("placeholder", "Enter Qty");
    inputAddQty.setAttribute("id", "qty");
    inputAddQty.value = obj.qty;
    productAddPanel.appendChild(inputAddQty);

    addBreak(productAddPanel);

    //Submit Product
    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.innerHTML = "Edit Product";

    //event listener submit
    console.log("Edit Panel", obj);

    submitButton.addEventListener("click", (event) => {
        aAddProduct.style.display = "block";


        var product = addObjectToArray(1);
        product.id = obj.id;

        console.log("Edit EVENT Panel", product);

        for (i = 0; i < productArray.length; i++) {
            if (productArray[i].id === product.id) {
                productArray[i].name = product.name;
                productArray[i].price = product.price;
                productArray[i].description = product.description;
                productArray[i].qty = product.qty;
                saveLocal();


            }
        }

        updateDOM();
        deleteAllChildren(productAddPanel);
    });
    productAddPanel.appendChild(submitButton);

    //Cancel Button
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel");
    cancelButton.innerHTML = "cancel";
    cancelButton.addEventListener("click", (event) => {
        aAddProduct.style.display = "block";
        deleteAllChildren(productAddPanel);
    });
    productAddPanel.appendChild(cancelButton);

    divAddProduct.appendChild(productAddPanel);
}

function saveLocal() {

    // localStorage.products = JSON.stringify(productArray);
    axios.post('http://127.0.0.1:8000/storeProducts', { arr: productArray, count: productCounter })
        .then(response => console.log(response));
}




