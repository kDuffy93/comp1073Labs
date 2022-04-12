const liquidFieldSet = document.getElementById("liquidFieldSet");
const fruitFieldSet = document.getElementById("fruitFieldSet");
const veggieFieldSet = document.getElementById("veggieFieldSet");
const protienFieldSet = document.getElementById("protienFieldSet");
const specialtyFieldSet = document.getElementById("specialtyFieldSet");
const fillerFieldSet = document.getElementById("fillerFieldSet");
const flavorFieldSet = document.getElementById("flavorFieldSet");
const grainFieldSet = document.getElementById("grainFieldSet");
const submitButton = document.getElementById("submitButton");
let objectName = 'orderNumber';
let orderNumber = 1;
const output = document.getElementById("output");
const output2 = document.getElementById("output2");


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




    outputDescription() {
        output.textContent = `Size: ${this.size}`;
        let tempString = "";
        let mainIngridentsArray = [];
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
        if (mainIngridentsArray.length <= 1) {
            tempString += `The main ingrident will be: ${mainIngridentsArray[0]} `;
        }

        if (this.flavors.length === 1) {
            tempString += `And to top it all off, it will be flavoured with ${this.flavors[0]} `;
        }
        if (this.flavors.length > 1) {
            tempString += `And to top it all off, it will be flavoured with`;
            for (let i = 0; i < this.flavors.length; i++) {
                if (i == this.flavors.length - 1) {
                    tempString += `and ${this.flavors[i]}.`;
                }
                if (i != this.flavors.length - 1) {
                    tempString += `${this.flavors[i]}, `;
                }
            }
        }




        output2.textContent = tempString;





    }
}

//
async function populate() {
    const requestURL =
        "https://kduffy93.github.io/comp1073Labs/assignment3/js/SmoothieMachine.json";
    const request = new Request(requestURL);
    const response = await fetch(request);
    const smoothieMachineOptions = await response.json();
    populateOptions(smoothieMachineOptions);
}
populate();

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
        fieldset.appendChild(input);
        fieldset.appendChild(label);
    }
};

let placeOrder = () => {
    let size = document.querySelector('input[name="size"]:checked').value;

    let selectedLiquidElements = getSelectedItems("liquidsCheckbox");
    let selectedLiquidsArray = getSelectedValues(selectedLiquidElements);

    let selectedFruitElements = getSelectedItems("fruitsCheckbox");
    let selectedFruitsArray = getSelectedValues(selectedFruitElements);

    let selectedProtienElements = getSelectedItems("protiensCheckbox");
    let selectedProtiensArray = getSelectedValues(selectedProtienElements);

    let selectedVeggieElements = getSelectedItems("veggiesCheckbox");
    let selectedVeggiesArray = getSelectedValues(selectedVeggieElements);

    let selectedSpecialtyElements = getSelectedItems("specialtiesCheckbox");
    let selectedSpecialtiesArray = getSelectedValues(selectedSpecialtyElements);

    let selectedFillerElements = getSelectedItems("fillersCheckbox");
    let selectedFillersArray = getSelectedValues(selectedFillerElements);

    let selectedFlavorElements = getSelectedItems("flavorsCheckbox");
    let selectedFlavorsArray = getSelectedValues(selectedFlavorElements);

    let selectedGrainElements = getSelectedItems("grainsCheckbox");
    let selectedGrainArray = getSelectedValues(selectedGrainElements);


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
};

let getSelectedItems = (checkName) => {
    return document.querySelectorAll(`input[name="${checkName}"]:checked`);
};

let getSelectedValues = (elementsArray) => {
    let tempArray = [];
    elementsArray.forEach((selectedOption) => {
        tempArray.push(selectedOption.value);
    });
    return tempArray;
};

submitButton.addEventListener("click", placeOrder);