let dropdown = document.querySelectorAll(".dropdown-selector select")
let btn = document.querySelector("button");
const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
let fromCountry = document.querySelector(".from-dropdown-selector select")
let toCountry = document.querySelector(".to-dropdown-selector select")

for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode; 
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

function updateFlag(element) {
    let countryCode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/32.png`
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = newSrc;
}

const getExchangeRate = async () => {
    let amtField = document.querySelector(".amount-field input");
    let outputDisplay = document.querySelector(".output-display");
    let amtValue = amtField.value;
    if (amtValue === ""){
        amtValue = 1;
    }else if( amtValue < 0){
        alert("Amount can not be negative Value.");
        amtField.value = 100;
        outputDisplay.style.visibility = "hidden";
        return;
    }
    const URL = `${BaseURL}${fromCountry.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    exchangerate = data[fromCountry.value.toLowerCase()][toCountry.value.toLowerCase()];   
    outputDisplay.innerText = `${amtValue} ${fromCountry.value} = ${(exchangerate*amtValue).toFixed(2)} ${toCountry.value}`;
    outputDisplay.style.visibility = "visible"

}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
})



