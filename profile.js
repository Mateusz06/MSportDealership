document.addEventListener('DOMContentLoaded', function () {
    const carData = localStorage.getItem('selectedCar');

    if (carData) {
        const car = JSON.parse(carData);

        document.querySelector('.car-image').src = car.photo1;
        document.querySelector('.fullname').textContent = car.fullname;
        document.querySelector('.price').textContent = car.price;
        document.querySelector('.name').textContent = car.name;
        document.querySelector('.fuel').textContent = car.fuel;
        document.querySelector('.transmission').textContent = car.transmission;
        document.querySelector('.type').textContent = car.type;

        document.querySelector('.add-to-cart-button').addEventListener('click', function () {
            addToCart(car);
            location.reload();
        });
    } else {
        console.error('No car data found in local storage');
    }
});

function addToCart(car) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? [];
    cartItems.push(car);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartIndicator();
}

function updateCartIndicator() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const cartIndicator = document.getElementById('cart-indicator');
    if (cartItems.length > 0) {
        cartIndicator.classList.add('red-dot');
    } else {
        cartIndicator.classList.remove('red-dot');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCartIndicator();
});
