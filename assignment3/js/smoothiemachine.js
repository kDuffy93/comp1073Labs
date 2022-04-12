const liquidFieldSet = document.getElementById("liquidFieldSet");
const fruitFieldSet = document.getElementById("fruitFieldSet");
const veggieFieldSet = document.getElementById("veggieFieldSet");
const protienFieldSet = document.getElementById("protienFieldSet");
const specialtyFieldSet = document.getElementById("specialtyFieldSet");
const fillerFieldSet = document.getElementById("fillerFieldSet");
const flavorFieldSet = document.getElementById("flavorFieldSet");
const grainFieldSet = document.getElementById("grainFieldSet");
const submitButton = document.getElementById("submitButton");
const newOrderButton = document.getElementById("newOrder");
const smoothieMachineSection = document.getElementById("smoothieMachineSection");
const yourOrderSection = document.getElementById("yourOrderSection");
let objectName = 'orderNumber';
let orderNumber = 1;
const output = document.getElementById("output");
const output2 = document.getElementById("output2");

// smoothie class
class smoothie {
    constructor(
            size,
            liquids,
            fruits,
            veggies,
            protiens,
            specialties,
            fillers,
            flavors,
            grains
        ) {
            this.size = size;
            this.liquids = liquids;
            this.fruits = fruits;
            this.veggies = veggies;
            this.protiens = protiens;
            this.specialties = specialties;
            this.fillers = fillers;
            this.flavors = flavors;
            this.grains = grains;
        }
        // description method
    outputDescription() {
        output.textContent = `Size: ${this.size}`;
        let tempString = "";
        let mainIngridentsArray = [];
        //build the base liquid part of the string 
        if (this.liquids.length > 1) {
            for (let i = 0; i < this.liquids.length; i++) {
                if (i == this.liquids.length - 1) {
                    tempString += `and ${this.liquids[i]}`
                }
                if (i != this.liquids.length - 1) {
                    tempString += `${this.liquids[i]}, `;
                }
            }

            tempString = `Your smoothie will have a mixture of ${tempString} as a base.`;
        }
        if (this.liquids.length <= 1) {
            tempString = `Your smoothie will have ${this.liquids[0]} as a base.`;
        }
        // build the main ingredients array and build the correct ingredients part of the string
        this.fruits.length > 0 ? this.fruits.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        this.veggies.length > 0 ? this.veggies.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        this.protiens.length > 0 ? this.protiens.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        this.specialties.length > 0 ? this.specialties.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        this.fillers.length > 0 ? this.fillers.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        this.grains.length > 0 ? this.grains.forEach(ingredient => { mainIngridentsArray.push(ingredient); }) : mainIngridentsArray.push();
        if (mainIngridentsArray.length > 1) {
            tempString += `The main ingridents will include: `
            for (let i = 0; i < mainIngridentsArray.length; i++) {
                if (i == mainIngridentsArray.length - 1) {
                    tempString += `and ${mainIngridentsArray[i]}.`;
                }
                if (i != mainIngridentsArray.length - 1) {
                    tempString += `${mainIngridentsArray[i]}, `;
                }
            }
        }
        if (mainIngridentsArray.length == 1) {
            tempString += `The main ingrident will be: ${mainIngridentsArray[0]} `;
        }
        // add the correct flavors part of the string
        if (this.flavors.length === 1) {
            tempString += ` And to top it all off, it will be flavoured with ${this.flavors[0]} `;
        }
        if (this.flavors.length > 1) {
            tempString += ` And to top it all off, it will be flavoured with`;
            for (let i = 0; i < this.flavors.length; i++) {
                if (i == this.flavors.length - 1) {
                    tempString += `and ${this.flavors[i]}.`;
                }
                if (i != this.flavors.length - 1) {
                    tempString += `${this.flavors[i]}, `;
                }
            }
        }
        //output the string to the output element
        output2.textContent = tempString;
    }
}

// async function to get the json data
async function populate() {
    const requestURL =
        "https://kduffy93.github.io/comp1073Labs/assignment3/js/SmoothieMachine.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    const smoothieMachineOptions = await response.json();
    populateOptions(smoothieMachineOptions);
}
populate();
// function that is called to populate the fieldsets with the json data
function populateOptions(options) {
    // grab and assign each group of options to a corrosponding varible
    let liquids = options.liquids;
    let fruits = options.fruits;
    let veggies = options.veggies;
    let protiens = options.protien;
    let specialties = options.specialty;
    let fillers = options.fillers;
    let flavors = options.flavors;
    let grains = options.grains;
    // call populateFieldSet for each fieldset to be dynamically filled.
    populateFieldSet(liquidFieldSet, liquids, "liquids");
    populateFieldSet(fruitFieldSet, fruits, "fruits");
    populateFieldSet(veggieFieldSet, veggies, "veggies");
    populateFieldSet(protienFieldSet, protiens, "protiens");
    populateFieldSet(specialtyFieldSet, specialties, "specialties");
    populateFieldSet(fillerFieldSet, fillers, "fillers");
    populateFieldSet(flavorFieldSet, flavors, "flavors");
    populateFieldSet(grainFieldSet, grains, "grains");
}
// populate the corrosponding fieldset with the JSON Data.
let populateFieldSet = (fieldset, jsonObj, key) => {
    for (let i = 0; i < jsonObj.length; i++) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = "checkbox";
        input.id = `${jsonObj[i]["name"]}Checkbox`;
        input.name = `${key}Checkbox`;
        input.value = `${jsonObj[i]["name"]}`;
        label.for = `${jsonObj[i]["name"]}Checkbox`;
        label.textContent = `${jsonObj[i]["name"]}`;
        let container = document.createElement("div");
        container.appendChild(input);
        container.appendChild(label);
        fieldset.appendChild(container);
    }
};

// the function to be called when the place order button is clicked. 
let placeOrder = () => {
    // grab the correct values
    const size = document.querySelector('input[name="size"]:checked').value;
    const selectedLiquidElements = getSelectedItems("liquidsCheckbox");
    const selectedLiquidsArray = getSelectedValues(selectedLiquidElements);
    const selectedFruitElements = getSelectedItems("fruitsCheckbox");
    const selectedFruitsArray = getSelectedValues(selectedFruitElements);
    const selectedProtienElements = getSelectedItems("protiensCheckbox");
    const selectedProtiensArray = getSelectedValues(selectedProtienElements);
    const selectedVeggieElements = getSelectedItems("veggiesCheckbox");
    const selectedVeggiesArray = getSelectedValues(selectedVeggieElements);
    const selectedSpecialtyElements = getSelectedItems("specialtiesCheckbox");
    const selectedSpecialtiesArray = getSelectedValues(selectedSpecialtyElements);
    const selectedFillerElements = getSelectedItems("fillersCheckbox");
    const selectedFillersArray = getSelectedValues(selectedFillerElements);
    const selectedFlavorElements = getSelectedItems("flavorsCheckbox");
    const selectedFlavorsArray = getSelectedValues(selectedFlavorElements);
    const selectedGrainElements = getSelectedItems("grainsCheckbox");
    const selectedGrainArray = getSelectedValues(selectedGrainElements);
    // ensure there is atleast one base before creating a new smoothie obj
    if (selectedLiquidsArray.length == 0) {
        alert(`You must select atleast one base liquid.`);
        return;
    }
    // if so create the new smoothie obj and assign it to a window varible in order to name it dynamically
    window[objectName + orderNumber] = new smoothie(
        size,
        selectedLiquidsArray,
        selectedFruitsArray,
        selectedProtiensArray,
        selectedVeggiesArray,
        selectedSpecialtiesArray,
        selectedFillersArray,
        selectedFlavorsArray,
        selectedGrainArray
    );
    window[objectName + orderNumber].outputDescription();
    orderNumber++;
    yourOrderSection.style.display = "";
    smoothieMachineSection.style.display = "none";
};
// function to be reused by the place order function multiple times to return the selected items for the corrosponsing fieldset
let getSelectedItems = (checkName) => {
    return document.querySelectorAll(`input[name="${checkName}"]:checked`);
};
// function to be reused by the place order function multiple times to pull the values out of the array of elements
let getSelectedValues = (elementsArray) => {
    let tempArray = [];
    elementsArray.forEach((selectedOption) => {
        tempArray.push(selectedOption.value);
    });
    return tempArray;
};
//event listenet for the place order button
submitButton.addEventListener("click", placeOrder);

//event listener for the New Order Button
newOrderButton.addEventListener("click", () => {
    smoothieMachineSection.style.display = "";
    yourOrderSection.style.display = "none";
    let allCheckBoxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
    //uncheck all currently selected checkboxes
    allCheckBoxes.forEach((inputElement) => { inputElement.checked = false; });
    // select small as default every reset
    document.querySelector('input[id="small"]').checked = true;
});