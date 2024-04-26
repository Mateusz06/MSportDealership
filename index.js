function updateCartIndicator() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartIndicator = document.getElementById('cart-indicator');
    if (cartItems.length > 0) {
        cartIndicator.classList.add('red-dot');
    } else {
        cartIndicator.classList.remove('red-dot');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateCartIndicator(); // Update cart indicator on page load
});
