import { editHelicopter } from "./api.js";

export const EDIT_NAME = "edit-name";
export const EDIT_AMOUNT_OF_PASSENGERS = "edit-amount-of-passengers";
export const EDIT_MAXIMUM_SPEED = "edit-maximum-speed";
export const EDIT_PRICE = "edit-price";

const nameEditInput = document.getElementById("name_edit");
const amountOfPassengersEditInput = document.getElementById("amount_of_passengers_edit");
const maximumSpeedEditInput = document.getElementById("maximum_speed_edit");
const priceEditInput = document.getElementById("price_edit");

const init = () => {
    if (!!nameEditInput && !!amountOfPassengersEditInput && !!maximumSpeedEditInput && !!priceEditInput) {
        nameEditInput.value = sessionStorage.getItem(EDIT_NAME)
        amountOfPassengersEditInput.value = sessionStorage.getItem(EDIT_AMOUNT_OF_PASSENGERS)
        maximumSpeedEditInput.value = sessionStorage.getItem(EDIT_MAXIMUM_SPEED)
        priceEditInput.value = sessionStorage.getItem(EDIT_PRICE)
    }
}

init()

const editCompleteButton = document.getElementById("edit_accept_button");

const update = () => {
    if (!!editCompleteButton) {
        editCompleteButton.addEventListener('click', () => {
            const itemToEditId = sessionStorage.getItem('item-id')

            const name = nameEditInput.value
            const amount_of_passengers = amountOfPassengersEditInput.value
            const maximum_speed = maximumSpeedEditInput.value
            const price = priceEditInput.value

            editHelicopter(itemToEditId, {
                name, 
                amount_of_passengers,
                maximum_speed,
                price
            })

            console.log("DUPA");

            sessionStorage.clear()

            window.location.href = "index.html"
        })
    }
}

update()