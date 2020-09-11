var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var productSearchInput = document.getElementById("productSearchInput");
var submit = document.getElementById("submit");
var updateBtnClick = 1 ;
var updateIndex;
var productList;
if(localStorage.getItem("ourProducts") == null)
{
    productList = [];
}
else
{
    productList = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct(productList);
}


function getValues()
{
    var gettingValues = 
    {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
    }
    if(updateBtnClick==1)
    {
        productList.push(gettingValues);
    }
    else
    {
        productList[updateIndex].index = updateIndex;
        productList[updateIndex].name = productNameInput.value;
        productList[updateIndex].price = productPriceInput.value;
        productList[updateIndex].category = productCategoryInput.value;
        productList[updateIndex].description = productDescriptionInput.value;
        submit.textContent = "add Product";
        updateBtnClick=1;
    }
    localStorage.setItem("ourProducts" ,JSON.stringify(productList));
    displayProduct(productList);
    clearForm();
}

function displayProduct(anyArray)
{
    cartoona = "";
    for(var i=0 ; i<anyArray.length ; i++)
    {
        cartoona+= `<tr>
                        <td>${i}</td>
                        <td>${anyArray[i].name}</td>
                        <td>${anyArray[i].price}</td>
                        <td>${anyArray[i].category}</td>
                        <td>${anyArray[i].description}</td>
                        <td>
                            <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}

function clearForm()
{
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function deleteProduct(index)
{
    productList.splice(index,1);
    localStorage.setItem("ourProducts" ,JSON.stringify(productList));
    displayProduct(productList);
}

function searchProduct()
{
    var searchItem = productSearchInput.value;
    var wantedList = [];
    for(var i=0 ; i<productList.length ; i++)
    {
        if(productList[i].name.toLowerCase().includes(searchItem.toLowerCase()) == true)
        {
            wantedList.push(productList[i]);
        }
    }
    displayProduct(wantedList);
}


function updateProduct(index)
{
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    productDescriptionInput.value = productList[index].description;
    submit.textContent = "Save Update";
    updateBtnClick++;
    updateIndex = index;
}
