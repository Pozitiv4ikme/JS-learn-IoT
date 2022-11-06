import { 
    clearInputs,
    renderItemLists,
    getInputValues
} from "./dom_util.js";  // file for work with DOM

import {
    getAllHelicopters,
    postHelicopter
} from "./api.js";

// return your html elemets into js
const submitButton = document.getElementById("submit_button")
const findInput = document.getElementById("find_input");
const searchButton = document.getElementById("search_button");
const clearFindlButton = document.getElementById("clear_find_button");
const totalSumOfHelicoptersPrice = document.getElementById("total_sum_of_helicopters_price")
const countPricePrintDiv = document.getElementById("count_price_print_div")
const sortByTheAmountOfPassenfersButton = document.getElementById("sort_by_the_amount_of_passengers_button")

// for elemets and work with your data
let helicopters = [];

export const refetchAllHelicopters = async () => {
    const allHelicopters = await getAllHelicopters();

    helicopters = allHelicopters;

    renderItemLists(helicopters);
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const { name, amount_of_passengers, maximum_speed, price } = getInputValues();

    // if form inputs are empty - create modal window with message
    if (name.trim() == '' || amount_of_passengers == '' || maximum_speed == '' || price == '') {
    
        // create div for modal window
        let modalWindowDiv = document.createElement("div");
        
        // create p tag with message
        let modalText = document.createElement("p")

        // create button to accept close modal window
        let modalCloseBtn = document.createElement("button")

        modalText.innerText = 'All fields must be filled! Please enter information.'
        modalCloseBtn.innerText = 'Close'

        // add classes for our html tags
        modalWindowDiv.classList.add('modal-window')
        modalText.classList.add('modal-window__text')
        modalCloseBtn.classList.add('modal-window__close-btn')

        // add close animation
        modalCloseBtn.addEventListener("click", () => {
            modalWindowDiv.classList.add('modal-window__close-animation')
        });

        // add into div modal text and button
        modalWindowDiv.append(modalText, modalCloseBtn)
        
        // add div modal into html body
        document.body.appendChild(modalWindowDiv)
    
    // else - create item and clear inputs
    } else {
        clearInputs();

        postHelicopter({ 
            name, 
            amount_of_passengers, 
            maximum_speed, 
            price 
        }).then(refetchAllHelicopters);
    }
});


searchButton.addEventListener("click", () => {
    const foundHelicopters = helicopters.filter(h => h.name.search(findInput.value) !== -1);

    renderItemLists(foundHelicopters);
});


clearFindlButton.addEventListener("click", () => {
    renderItemLists(helicopters);

    findInput.value = "";
});


totalSumOfHelicoptersPrice.addEventListener("click", () => {
    countPricePrintDiv.innerHTML = "";

    let totalSum = 0;
    for (let helicopter of helicopters) {
        for (let priceField in helicopter) {
            if (priceField == 'price') {
                // +(...) - casting string into int
                totalSum += +(helicopter[priceField])
            }
        }
    }

    if (totalSum != 0) {
        countPricePrintDiv.insertAdjacentHTML(
            'beforeend', 
            `
            <br>
            <p id="count-helicopters-price-field" class="view-page__tools-count__sum-field"> Total sum: ${totalSum} $</p>
            `
        )
    }
});

// in real time button no active
let sortBtnState = false;

sortByTheAmountOfPassenfersButton.addEventListener("click", () => {

    // if sort button active - renderItemLists
    if (sortBtnState) {
        sortBtnState = false;
        renderItemLists(helicopters)
        
    // if sort button active - do sort
    } else {
        sortBtnState = true;

        let copyHelicopters = JSON.parse(JSON.stringify(helicopters));

        let sortHelicoptres = copyHelicopters.sort((a, b) => {
            return a.amount_of_passengers - b.amount_of_passengers;
        })

        renderItemLists(sortHelicoptres)
    }
    
});

// main code
refetchAllHelicopters();