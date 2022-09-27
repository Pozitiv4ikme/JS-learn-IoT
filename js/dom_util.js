import {
    addItem
} from "./index.js";

export const EDIT_BUTTON_PREFIX = "edit-button-";

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

const itemTemplate = ({ id, name, amount_of_passengers, maximum_speed, price }) => `
<div id="${id}" class="view-page__items__card">
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
    <button type="button" class="view-page__items__card-content__edit-button" id="${EDIT_BUTTON_PREFIX}${id}">Edit</button>
</div>
`;

export const addItemToPage = (id, name, amount_of_passengers, maximum_speed, price) => {
    itemsContainer.insertAdjacentHTML(
        'afterbegin',
        itemTemplate(id, name, amount_of_passengers, maximum_speed, price)
    );
};

// for get info from backend
export const renderItemLists = (items) => {
    itemsContainer.innerHTML = "";

    if (sessionStorage.length <= 1) {
        for (const item of items) {
            addItemToPage(item);
        }
    } else {
        const items = JSON.parse(sessionStorage.getItem('items'))
        for (const item of items) {
            addItem(item);
        }
        sessionStorage.clear()
    }
};