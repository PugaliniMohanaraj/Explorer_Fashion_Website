
// initializeAddedProducts()
window.addEventListener("load", initializeAddedProducts);
function initializeAddedProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (!products.length) return;

  const productsContainerElement = document.querySelector("#js-added-items-wr");
  //   const productsContainerElement = document.querySelector('#js-kajee')
  let html = "";

  //   for(let i = 0; i < products.length; i++) {
  //     html += getProductElement(products[i])
  //   }

  products.forEach((product) => {
    html += getProductElement(product);
  });

  productsContainerElement.innerHTML = html;

  initializeButtonListeners();

  function initializeButtonListeners() {

    Array.from(document.querySelectorAll('.product-close-btn')).forEach(btn => {
      btn.addEventListener('click', () => onCloseButtonClick(btn))
    })

    const incrementBtn = document.querySelectorAll(".js-increment");
    console.log({ incrementBtn });
    for (let i = 0; i < incrementBtn.length; i++) {
      const btn = incrementBtn[i];
      btn.addEventListener("click", function () {
        // collect the value of `quantity` textContent,
        // based on clicked `increment` button sibling.
        let increment = Number(btn.previousElementSibling.textContent);

        // plus `increment` variable value by 1
        increment++;

        // show the `increment` variable value on `quantity` element
        // based on clicked `increment` button sibling.
        btn.previousElementSibling.textContent = increment;

        subtotal(btn)
        totalCalc();
      });
    }
  }

  deinitializeButtonListeners();
  function deinitializeButtonListeners() {
    const decrementBtn = document.querySelectorAll(".js-decrement");

    decrementBtn.forEach(dbtn => {
      dbtn.addEventListener("click", function () {
        //   // collect the value of `quantity` textContent,
        //   // based on clicked `decrement` button sibling.
        let decrement = Number(dbtn.nextElementSibling.textContent);
  
        //   // minus `decrement` variable value by 1 based on condition
        decrement <= 1 ? 1 : decrement--;
  
        //   // show the `decrement` variable value on `quantity` element
        //   // based on clicked `decrement` button sibling.
        this.nextElementSibling.textContent = decrement;
// console.log (JSON.stringify (Number));
        subtotal(dbtn)
  
        totalCalc();
      });
    })
    //   console.log({incrementBtn})
    // for (let i = 0; i < decrementBtn.length; i++) {
  
  }
  //   debugger

  function subtotal(btn){
    
    // get unit price
    // btn.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product')
    const unitPrice = JSON.parse(btn.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-product')).price
    // get quantity
    // +temp1.parentElement.querySelector('#quantity').textContent
    const quantity= +btn.parentElement.querySelector('#quantity').textContent
    // calculate subtotal
const total = unitPrice * quantity
    // set the calculated value on DOM
    btn.parentElement.parentElement.querySelector('span.price').textContent = total
  }

  function getProductElement(product) {
    // const productElement = document.createElement('div')
    // productElement.classList.add('kajee')
    // const preElement = document.createElement('pre')
    // preElement.textContent = J

    return `<div data-product='${JSON.stringify(product)}' class="product-card">

    <div class="card" style="padding:15px 15px 15px 15px;  border-bottom: 1px solid #eee;">

      <div class="itemPhoto col-4 d-flex align-center">
      <img src="${product.img}" class="img-fluid" width="40%"/>

      </div>

      <div class="detail">
      <div class="itemProd col d-flex align-items-center">
      <div class="prodInfo p-2">
          <h5 class="name">${product.items}</h5>
      </div>
  </div>
      

        <div class="wrapper">

          <div class="product-qty">
            <button class="js-decrement">
              <ion-icon name="remove-outline"></ion-icon>
            </button>

            <span id="quantity">1</span>

            <button class="js-increment">
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>

          <div class="price">
            <span class="price">${product.price}</span>
          </div>

        </div>

      </div>
     
      <button class="product-close-btn">
      <span name="close-outline">Remove</span>
    </button>

    </div>

  </div>
    `;
 
  }
}

// all initial elements
const payAmountBtn = document.querySelector("#payAmount");
const decrementBtn = document.querySelectorAll("#decrement");
let quantityElem = document.querySelectorAll("#quantity");
// const incrementBtn = document.querySelectorAll('#increment');
let priceElem = document.querySelectorAll("#price");
const subtotalElem = document.querySelector("#subtotal");
const taxElem = document.querySelector("#tax");
const shiping = document.querySelector("#shipping");
const totalElem = document.querySelector("#total");



// function: for calculating total amount of product price
function totalCalc() {
  let total = Array.from(document.querySelectorAll('span.price'))
  .map(e => +e.textContent).reduce((a, b) => a + b, 0)

  // show the `subtotal` variable value on `subtotalElem` element
  subtotalElem.textContent = total.toFixed(2);


  total += 100;

  // show the `total` variable value on `totalElem` & `payAmountBtn` element
  totalElem.textContent = total.toFixed(2);
  payAmountBtn.textContent = total.toFixed(2);
};

var form = document.getElementById('form');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var email_1 = document.getElementById('email_1').value;
            var phone_1 = document.getElementById('phone_1').value;
            var city_1 = document.getElementById('city_1').value;
            var address_1 = document.getElementById('address_1').value;
          

  const formData = new FormData(form);

  const data = Object.fromEntries(formData);
  
data.products = Array.from(document.querySelectorAll('.product-card')).map(e => {
  const prod = JSON.parse(e.getAttribute('data-product'))
  prod.quantity = +e.querySelector('#quantity').textContent
})
// data.subTotal = document.querySelector('#sub-total').textContent // set the selector accordingly
data.products = JSON.parse(localStorage.getItem("products")) || [];
debugger
 

  fetch("http://localhost:5000/api/orderdata", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      email_1:email_1,
      phone_1: phone_1,
      city_1:city_1,
      address_1:address_1
  }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
});




// post to Back end

function onCloseButtonClick(btn) {
  // remove from localstorage
  // 1. get all products from localstorage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // debugger
  // 2. get object to remove
  const product = JSON.parse(
    btn.parentElement.parentElement.getAttribute("data-product")
  );

  const filteredProducts = products.filter((p) => p["_id"] !== product["_id"]);

  localStorage.setItem("products", JSON.stringify(filteredProducts));

  btn.parentElement.parentElement.remove();

}