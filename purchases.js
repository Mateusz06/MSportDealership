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

document.addEventListener('DOMContentLoaded', function () {
    displayPurchaseItems();
});

function displayPurchaseItems() {
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData')) || [];
    const purchaseContainer = document.querySelector('.purchase-items');

    purchaseContainer.innerHTML = '';
    for (let i = 0; i < purchaseData.length; i++) {
        purchaseData[i].forEach(function (car) {
            const card = document.createElement('div');
            card.classList.add('purchase-item');
    
            const img = document.createElement('img');
            img.src = car.photo1;
            img.alt = car.fullname;
    
            const fullname = document.createElement('p');
            fullname.textContent = `Full Name: ${car.fullname}`;
    
            const price = document.createElement('p');
            price.textContent = `Price: ${car.price}`;
    
            card.appendChild(img);
            card.appendChild(fullname);
            card.appendChild(price);
    
            purchaseContainer.appendChild(card);
        });
        purchaseContainer.innerHTML += "<hr>";
    }
}
