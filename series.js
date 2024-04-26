function displaySeriesFromLocalStorage() {
        const storedData = localStorage.getItem('seriesData');
        if (storedData) {
            const data = JSON.parse(storedData);
            displaySeries(data);
        } else {
            console.error('No series data found in localStorage getting new data');
            fetch('series.json')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('seriesData', JSON.stringify(data));

                    displaySeries(data);
                })
                .catch(error => console.error('Error fetching series:', error));

        }
    }

function displaySeries(data) {
    const container = document.querySelector('.allCards');
    container.innerHTML = '';
    data.forEach(car => {
        const card = document.createElement('div');
        card.classList.add('card');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.src = car.photo1;
        img.alt = car.fullname;
        img.dataset.index = 0;

        const leftArrow = document.createElement('button');
        leftArrow.classList.add('arrow', 'left');
        leftArrow.textContent = '<';
        leftArrow.addEventListener('click', () => scrollImage(-1, img, car));

        const rightArrow = document.createElement('button');
        rightArrow.classList.add('arrow', 'right');
        rightArrow.textContent = '>';
        rightArrow.addEventListener('click', () => scrollImage(1, img, car));

        imgContainer.appendChild(leftArrow);
        imgContainer.appendChild(img);
        imgContainer.appendChild(rightArrow);

        const fullnameParagraph = document.createElement('h1');
        fullnameParagraph.textContent = `${car.fullname}`;

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `Name: ${car.name}`;

        const fuelParagraph = document.createElement('p');
        fuelParagraph.textContent = `Fuel: ${car.fuel}`;

        const transmissionParagraph = document.createElement('p');
        transmissionParagraph.textContent = `Transmission: ${car.transmission}`;

        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = `Type: ${car.type}`;

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: ${car.price}`;

        const button = document.createElement('button');
        button.textContent = 'View Model';
        button.classList.add('card-button');
        button.addEventListener('click', () => {
            // Save car data to local storage
            localStorage.setItem('selectedCar', JSON.stringify(car));
            // Redirect to profile.html
            window.location.href = 'profile.html';
        });

        card.appendChild(imgContainer);
        card.appendChild(fullnameParagraph);
        card.appendChild(priceParagraph);
        card.appendChild(nameParagraph);
        card.appendChild(fuelParagraph);
        card.appendChild(transmissionParagraph);
        card.appendChild(typeParagraph);
        card.appendChild(button);
        container.appendChild(card);
    });
}


function scrollImage(direction, image, car) {
    const images = [car.photo1, car.photo2, car.photo3, car.photo4];
    const currentIndex = parseInt(image.dataset.index);
    const newIndex = (currentIndex + direction + images.length) % images.length;
    image.src = images[newIndex];
    image.dataset.index = newIndex;
}


function applyFilters() {
    const carModel = document.getElementById('carModel').value;
    const carEngine = document.getElementById('carEngine').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const modelMatch = carModel === 'all' || card.dataset.model === carModel;
        const engineMatch = carEngine === 'all' || card.dataset.engine === carEngine;
        const priceMatch = checkPriceRange(card.dataset.price, minPrice, maxPrice);
        
        if (modelMatch && engineMatch && priceMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function checkPriceRange(price, minPrice, maxPrice) {
    const carPrice = parseFloat(price.replace(/,/g, ''));
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    return carPrice >= min && carPrice <= max;
}

const applyFiltersBtn = document.getElementById('applyFiltersBtn');
applyFiltersBtn.addEventListener('click', applyFilters);

// Update engine options based on selected model
const carModelSelect = document.getElementById('carModel');
const carEngineSelect = document.getElementById('carEngine');

carModelSelect.addEventListener('change', () => {
    const selectedModel = carModelSelect.value;
    // Clear previous options
    carEngineSelect.innerHTML = '<option value="all">Everything</option>';
    
    // Add engine options based on selected model
    if (selectedModel === '1') {
        carEngineSelect.innerHTML += `
        <option value="18i">18i</option>
        <option value="20i">20i</option>
        `;
    } else if (selectedModel === '2') {
        carEngineSelect.innerHTML += `
        <option value="25e">25e</option>
        <option value="30e">30e</option>
        <option value="18i">18i</option>
        <option value="20i">20i</option>
        <option value="23i">23i</option>
        `;
    } else if (selectedModel === '3') {
        carEngineSelect.innerHTML += `
        <option value="20e">20e</option>
        <option value="30e">30e</option>
        <option value="18i">18i</option>
        <option value="20i">20i</option>
        <option value="30i">30i</option>
        `;
    } else if (selectedModel === '4') {
        carEngineSelect.innerHTML += `
        <option value="i4 35">i4 35</option>
        <option value="i4 40">i4 40</option>
        <option value="i4 M50">i4 M50</option>
        <option value="20i">20i</option>
        <option value="30i">30i</option>
        `;
    } else if (selectedModel === '5') {
        carEngineSelect.innerHTML += `
        <option value="i5 40">i5 40</option>
        <option value="i5 M60">i5 M60</option>
        <option value="i540">i540</option>
        <option value="30e">30e</option>
        <option value="50e">50e</option>
        <option value="20i">20i</option>
        `;
    } else if (selectedModel === '6') {
        carEngineSelect.innerHTML += `
        <option value="30i">30i</option>
        `;
    } else if (selectedModel === '7') {
        carEngineSelect.innerHTML += `
        <option value="i7 50">i7 50</option>
        <option value="i7 60">i7 60</option>
        <option value="i7 M70">i7 M70</option>
        <option value="50e">50e</option>
        <option value="M60e">M60e</option>
        `;
    } else if (selectedModel === '8') {
        carEngineSelect.innerHTML += `
        <option value="40i">40i</option>
        <option value="M50i">M50i</option>
        `;
    } else if (selectedModel === 'X') {
        carEngineSelect.innerHTML += `
        <option value="iX 40">iX 40</option>
        <option value="iX50">iX50</option>
        <option value="iX M60">iX M60</option>
        <option value="25e">25e</option>
        <option value="30e">30e</option>
        <option value="18i">18i</option>
        <option value="20i">20i</option>
        <option value="23i">23i</option>
        `;
    }
});
displaySeriesFromLocalStorage();

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
