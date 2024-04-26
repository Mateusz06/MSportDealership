document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    displayTotalPrice();
});

function addToCart(car) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the current car to the cart
    cartItems.push(car);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh cart items display
    displayCartItems();
    displayTotalPrice();
}

function removeCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Remove the car at the specified index
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh cart items display
    displayCartItems();
    displayTotalPrice();
}

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.cart-items');

    cartContainer.innerHTML = '';

    cartItems.forEach(function (car, index) {
        const card = document.createElement('div');
        card.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = car.photo1;
        img.alt = car.fullname;

        const fullname = document.createElement('p');
        fullname.textContent = `Full Name: ${car.fullname}`;

        const price = document.createElement('p');
        price.textContent = `Price: ${car.price}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            removeCartItem(index);
        });

        card.appendChild(img);
        card.appendChild(fullname);
        card.appendChild(price);
        card.appendChild(deleteButton);

        cartContainer.appendChild(card);
    });
}

function displayTotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartItems.forEach(function (car) {
        totalPrice += parseFloat(car.price);
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    var buyButton = document.getElementById('buy-button');

    if (buyButton && !(localStorage.getItem('cartItems') == null)) {
        buyButton.addEventListener('click', function () {
            let data = JSON.parse(localStorage.getItem('purchaseData'));
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            if (data) {
                data.push(cartItems)
                localStorage.setItem('purchaseData', JSON.stringify(data));
            } else {
                data = []
                data.push(cartItems)
                localStorage.setItem('purchaseData', JSON.stringify(data));
            }

            localStorage.removeItem('cartItems');
            window.location.href = 'payment.html';
        });
    } else { buyButton.classList.add("disable")}
});

document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    displayTotalPrice();
    updateCartIndicator();
});

function updateCartIndicator() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartIndicator = document.getElementById('cart-indicator');
    if (cartItems.length > 0) {
        cartIndicator.classList.add('red-dot');
    } else {
        cartIndicator.classList.remove('red-dot');
    }
}

function addToCart(car) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(car);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    displayTotalPrice();
    updateCartIndicator();
}

function removeCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    displayTotalPrice();
    updateCartIndicator();
}