document.addEventListener('DOMContentLoaded', function () {
    const carData = localStorage.getItem('selectedCar');

    if (carData) {
        const car = JSON.parse(carData);

        // Update DOM elements with car data
        document.querySelector('.car-image').src = car.photo1;
        document.querySelector('.fullname').textContent = car.fullname;
        document.querySelector('.price').textContent = car.price;
        document.querySelector('.name').textContent = car.name;
        document.querySelector('.fuel').textContent = car.fuel;
        document.querySelector('.transmission').textContent = car.transmission;
        document.querySelector('.type').textContent = car.type;

        // Add event listener to "Add to Cart" button
        document.querySelector('.add-to-cart-button').addEventListener('click', function () {
            addToCart(car);
        });
    } else {
        console.error('No car data found in local storage');
    }
});

function addToCart(car) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the current car to the cart
    cartItems.push(car);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}