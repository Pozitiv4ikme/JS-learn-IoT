import { 
    EDIT_NAME,
    EDIT_AMOUNT_OF_PASSENGERS,
    EDIT_MAXIMUM_SPEED,
    EDIT_PRICE
} from "./edit-index.js";

import { deleteHelicopter } from "./api.js";

import { refetchAllHelicopters } from "./index.js";

const nameInput = document.getElementById("name_input");
const amountOfPassengersInput = document.getElementById("amount_of_passengers_input");
const maximumSpeedInput = document.getElementById("maximum_speed_input");
const priceInput = document.getElementById("price_input");
const itemsContainer = document.getElementById("items_container");

export const getInputValues = () => {
    return {
        name: nameInput.value,
        amount_of_passengers: amountOfPassengersInput.value,
        maximum_speed: maximumSpeedInput.value,
        price: priceInput.value,
    };
};

export const clearInputs = () => {
    nameInput.value = "";
    amountOfPassengersInput.value = "";
    maximumSpeedInput.value = "";
    priceInput.value = "";
};

const itemTemplate = ({id, name, amount_of_passengers, maximum_speed, price}) => `
<div class="view-page__items__card">
    <img 
        src="./card-img/helicopter.jpg"
        class="view-page__items-image"
        alt="helicopter-image"
    />
    <h4 class="view-page__items__card-content__title">Name - ${name}</h4>
    <hr class="view-page__items__card-content_hr">
    <p class="view-page__items__card-content__passangers">Max passangers - ${amount_of_passengers}</p>
    <p class="view-page__items__card-content__maximum-speed">Max speed - ${maximum_speed} (km/h)</p>
    <h5 class="view-page__items__card-content__price">Price: ${price} ($) </h5>
    <div class="view-page__items__buttons">
        <button type="button" class="view-page__items__card-content__edit-button" id="edit-btn">Edit</button>
        <button type="button" class="view-page__items__card-content__delete-button" id="delete-btn">Delete</button>
    </div>
</div>
`;

export const addItemToPage = (id, name, amount_of_passengers, maximum_speed, price) => {
    itemsContainer.insertAdjacentHTML(
        'afterbegin',
        itemTemplate(id, name, amount_of_passengers, maximum_speed, price)
    );

    const editBtn = document.getElementById('edit-btn')
    editBtn.addEventListener('click', () => {
        sessionStorage.setItem('item-id', id.id)
        sessionStorage.setItem(`${EDIT_NAME}`, id.name)
        sessionStorage.setItem(`${EDIT_AMOUNT_OF_PASSENGERS}`, id.amount_of_passengers)
        sessionStorage.setItem(`${EDIT_MAXIMUM_SPEED}`, id.maximum_speed)
        sessionStorage.setItem(`${EDIT_PRICE}`, id.price)
        window.location.href = 'edit-index.html' 
    })

    const deleteBtn = document.getElementById('delete-btn')
    deleteBtn.addEventListener('click', () => {
        deleteHelicopter(id.id)
        window.location.reload()
    })
};

// for get info from backend
export const renderItemLists = (items) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item);
    }
};