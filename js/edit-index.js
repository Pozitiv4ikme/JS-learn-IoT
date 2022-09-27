export const EDIT_NAME = "edit-name";
export const EDIT_AMOUNT_OF_PASSENGERS = "edit-amount-of-passengers";
export const EDIT_MAXIMUM_SPEED = "edit-maximum-speed";
export const EDIT_PRICE = "edit-price";

const nameEditInput = document.getElementById("name_edit");
const amountOfPassengersEditInput = document.getElementById("amount_of_passengers_edit");
const maximumSpeedEditInput = document.getElementById("maximum_speed_edit");
const priceEditInput = document.getElementById("price_edit");

const editForm = document.getElementById("edit")

const init = () => {
    if (!!nameEditInput && !!amountOfPassengersEditInput && !!maximumSpeedEditInput && !!priceEditInput) {
        nameEditInput.value = localStorage.getItem(EDIT_NAME)
        amountOfPassengersEditInput.value = localStorage.getItem(EDIT_AMOUNT_OF_PASSENGERS)
        maximumSpeedEditInput.value = localStorage.getItem(EDIT_MAXIMUM_SPEED)
        priceEditInput.value = localStorage.getItem(EDIT_PRICE)
    }
}

init()

// const updateName = () => {
//     const updateName = localStorage.setItem(EDIT_NAME, nameEditInput.value)
//     // sessionStorage.getItem(localStorage.getItem('edit-item-id').name = nameEditInput.value)
// }

// const updateAmountOfPassengers = () => {
//     localStorage.setItem(EDIT_AMOUNT_OF_PASSENGERS, amountOfPassengersEditInput.value)
// }

// const updateMaximumSpeed = () => {
//     localStorage.setItem(EDIT_MAXIMUM_SPEED, maximumSpeedEditInput.value)
// }

// const updatePrice = () => {
//     localStorage.setItem(EDIT_PRICE, priceEditInput.value)
// }

const editCompleteButton = document.getElementById("edit_accept_button");

const update = () => {

    if (!!editCompleteButton) {
        editCompleteButton.addEventListener('click', () => {
            let helicopters = JSON.parse(sessionStorage.getItem('items'))
            const itemToEditId = localStorage.getItem('edit-item-id')

            for (let i = 0; i < helicopters.length; i++) {
                if (JSON.stringify(helicopters[i].id) === itemToEditId) {
                    helicopters[i] = {
                        id: itemToEditId,
                        name: nameEditInput.value,
                        amount_of_passengers: amountOfPassengersEditInput.value,
                        maximum_speed: maximumSpeedEditInput.value,
                        price: priceEditInput.value
                    }
                }
            }

            sessionStorage.setItem('items', JSON.stringify(helicopters))

            window.location.href = "index.html"
        })
    }
}

update()