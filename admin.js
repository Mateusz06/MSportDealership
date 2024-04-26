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

        const rightArrow = document.createElement('button');
        rightArrow.classList.add('arrow', 'right');
        rightArrow.textContent = '>';

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

        const typeInput = document.createElement('input');
        typeInput.type = 'text';
        typeInput.value = car.type;
        typeInput.placeholder = 'Type';

        const priceInput = document.createElement('input');
        priceInput.type = 'text';
        priceInput.value = car.price;
        priceInput.placeholder = 'Price';

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => {
            car.type = typeInput.value;
            car.price = parseFloat(priceInput.value);

            const storedData = JSON.parse(localStorage.getItem('seriesData'));
            const carIndex = storedData.findIndex(item => item.id === car.id);
            if (carIndex !== -1) {
                storedData[carIndex] = car;
                localStorage.setItem('seriesData', JSON.stringify(storedData));
                alert('Car details updated successfully!');
            } else {
                console.error('Car not found in stored data.');
            }

            updateCartItems(car);

            updateSelectedCar(car);
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteProduct(car.id);
        });

        card.appendChild(imgContainer);
        card.appendChild(fullnameParagraph);
        card.appendChild(nameParagraph);
        card.appendChild(fuelParagraph);
        card.appendChild(transmissionParagraph);
        card.appendChild(typeInput);
        card.appendChild(priceInput);
        card.appendChild(updateButton);
        card.appendChild(deleteButton); // Append delete button to card
        container.appendChild(card);
    });
}

function updateCartItems(car) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = cartItems.map(item => {
        if (item.id === car.id) {
            return {
                ...item,
                price: car.price,
                type: car.type
            };
        }
        return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
}

function updateSelectedCar(car) {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    if (selectedCar && selectedCar.id === car.id) {
        localStorage.setItem('selectedCar', JSON.stringify(car));
    }
}

function deleteProduct(productId) {
    const storedData = JSON.parse(localStorage.getItem('seriesData')) || [];
    const updatedData = storedData.filter(product => product.id !== productId);
    localStorage.setItem('seriesData', JSON.stringify(updatedData));
    displaySeriesFromLocalStorage(); // Refresh display after deletion
}

document.addEventListener('DOMContentLoaded', function () {
    const resetButton = document.getElementById('adbutton3');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            localStorage.removeItem('seriesData');
            displaySeriesFromLocalStorage()
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('adbutton4');
    if (addButton) {
        addButton.addEventListener('click', function () {
            addNewProduct();
        });
    }
});

function addNewProduct() {
    const storedData = JSON.parse(localStorage.getItem('seriesData')) || [];
    const newProduct = {
        id: storedData.length + 1,
        name: 'New Product',
        price: 0,
        fuel: 'Petrol',
        transmission: 'Automatic',
        photo1: 'new-product.jpg',
        fullname: 'New Product Full Name',
        type: 'New Type'
    };
    storedData.push(newProduct);
    localStorage.setItem('seriesData', JSON.stringify(storedData));
}

displaySeriesFromLocalStorage();
