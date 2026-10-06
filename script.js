/* =====================================================
   SPACE ART CREW
   JAVASCRIPT
===================================================== */


/* =====================================================
   PRODUCTS
===================================================== */

const products = [

    {
        id: 1,
        name: "Cloud Mug",
        price: 45000,
        category: "ceramics",
        image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Earth Vase",
        price: 68000,
        category: "home",
        image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Moon Plate",
        price: 52000,
        category: "ceramics",
        image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Clay Candle",
        price: 38000,
        category: "home",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Little Star",
        price: 29000,
        category: "gift",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Stone Bowl",
        price: 59000,
        category: "ceramics",
        image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Terra Vase",
        price: 72000,
        category: "home",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Mini Gift Set",
        price: 85000,
        category: "gift",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    }

];


/* =====================================================
   CART
===================================================== */

let cart = [];


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return price.toLocaleString("en-US") + "₮";

}


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(list = products) {

    const grid = document.getElementById("product-grid");

    if (!grid) return;

    if (list.length === 0) {

        grid.innerHTML = `
            <div style="grid-column:1/-1;padding:60px;text-align:center;">
                <h3>Бүтээгдэхүүн олдсонгүй.</h3>
                <p>Өөр хайлт хийж үзнэ үү.</p>
            </div>
        `;

        return;
    }


    grid.innerHTML = list.map(product => `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>


                <div class="product-buttons">

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        ADD TO CART
                    </button>

                    <button
                        class="favorite-btn"
                        onclick="favoriteProduct(this)"
                    >
                        ♡
                    </button>

                </div>

            </div>

        </article>

    `).join("");

}


/* =====================================================
   FILTER
===================================================== */

function filterProducts(category) {

    const select = document.getElementById("category-select");

    if (select) {
        select.value = category;
    }


    let filtered;

    if (category === "all") {

        filtered = products;

    } else {

        filtered = products.filter(
            product => product.category === category
        );

    }

    displayProducts(filtered);

    document
        .getElementById("shop")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const input =
        document
            .getElementById("search-input")
            .value
            .toLowerCase()
            .trim();

    const results = products.filter(product => {

        return (
            product.name.toLowerCase().includes(input) ||
            product.category.toLowerCase().includes(input)
        );

    });

    displayProducts(results);

}


/* =====================================================
   FOCUS SEARCH
===================================================== */

function focusSearch() {

    document
        .getElementById("shop")
        ?.scrollIntoView({
            behavior: "smooth"
        });

    setTimeout(() => {

        document
            .getElementById("search-input")
            ?.focus();

    }, 600);

}


/* =====================================================
   FAVORITE
===================================================== */

function favoriteProduct(button) {

    button.innerHTML =
        button.innerHTML === "♡"
            ? "♥"
            : "♡";

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    const countElement =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("cart-total");

    const orderTotal =
        document.getElementById("order-total");

    const cartItems =
        document.getElementById("cart-items");


    if (countElement) {

        countElement.textContent = count;

    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);

    }


    if (orderTotal) {

        orderTotal.textContent =
            formatPrice(total);

    }


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="padding:40px 0;text-align:center;">
                <p>Таны cart хоосон байна.</p>
            </div>
        `;

        return;

    }


    cartItems.innerHTML =
        cart.map(item => `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${formatPrice(item.price)}
                    </p>


                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    REMOVE
                </button>

            </div>

        `).join("");

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            product => product.id === productId
        );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== productId
            );

    }


    updateCart();

}


/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    updateCart();

}


/* =====================================================
   CLEAR CART
===================================================== */

function clearCart() {

    cart = [];

    updateCart();

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    updateCart();

    document
        .getElementById("cart-modal")
        .classList.add("active");

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    document
        .getElementById("cart-modal")
        .classList.remove("active");

}


/* =====================================================
   OPEN ORDER
===================================================== */

function openOrderForm() {

    if (cart.length === 0) {

        alert("Эхлээд бүтээгдэхүүн сонгоно уу.");

        return;

    }


    closeCart();

    updateCart();

    document
        .getElementById("order-modal")
        .classList.add("active");

}


/* =====================================================
   CLOSE ORDER
===================================================== */

function closeOrderForm() {

    document
        .getElementById("order-modal")
        .classList.remove("active");

}


/* =====================================================
   SUBMIT ORDER
===================================================== */

function submitOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Таны cart хоосон байна.");

        return;

    }


    const name =
        document
            .getElementById("customer-name")
            .value
            .trim();

    const phone =
        document
            .getElementById("customer-phone")
            .value
            .trim();

    const address =
        document
            .getElementById("customer-address")
            .value
            .trim();

    const receipt =
        document
            .getElementById("payment-receipt")
            .files[0];


    if (!receipt) {

        alert(
            "Гүйлгээний баримтаа оруулна уу."
        );

        return;

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    console.log(
        "ORDER",
        {
            name,
            phone,
            address,
            receipt,
            cart,
            total
        }
    );


    alert(
        "Захиалга амжилттай илгээгдлээ! 🎉\n\n" +
        "Бид таны захиалгыг шалгаад холбогдох болно."
    );


    cart = [];

    updateCart();

    closeOrderForm();

    document
        .getElementById("order-form")
        .reset();

}


/* =====================================================
   WORKSHOP
===================================================== */

function openWorkshop() {

    document
        .getElementById("workshop-modal")
        .classList.add("active");

}


function closeWorkshop() {

    document
        .getElementById("workshop-modal")
        .classList.remove("active");

}


function registerWorkshop() {

    alert(
        "Workshop-ийн бүртгэл удахгүй нээгдэнэ. ✦"
    );

}


/* =====================================================
   NEWSLETTER
===================================================== */

function subscribeNewsletter(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("newsletter-email")
            .value
            .trim();


    if (!email) return;


    alert(
        "Баярлалаа! ✦\n" +
        email +
        " бүртгэгдлээ."
    );


    event.target.reset();

}


/* =====================================================
   CLOSE MODAL BY CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains("modal")
        ) {

            event.target.classList.remove("active");

        }

    }
);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".modal.active")
                .forEach(modal => {

                    modal.classList.remove("active");

                });

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

displayProducts();

updateCart();