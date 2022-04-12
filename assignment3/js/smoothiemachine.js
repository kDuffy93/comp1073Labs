const liquidFieldSet = document.getElementById("liquidFieldSet");
const fruitFieldSet = document.getElementById("fruitFieldSet");
const veggieFieldSet = document.getElementById("veggieFieldSet");
const protienFieldSet = document.getElementById("protienFieldSet");
const specialtyFieldSet = document.getElementById("specialtyFieldSet");
const fillerFieldSet = document.getElementById("fillerFieldSet");
const flavorFieldSet = document.getElementById("flavorFieldSet");
const grainFieldSet = document.getElementById("grainFieldSet");
const submitButton = document.getElementById("submitButton");
let currentlySelectedSize = document.querySelector('input[name="size"]:checked').value;


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

    let size = currentlySelectedSize;
    console.log(size);

    let iceChips = document.getElementById("iceChips").checked == true ? true : false;
    console.log(iceChips);

    let selectedLiquidElements = getSelectedItems("liquidsCheckbox");
    let selectedLiquidsArray = getSelectedValues(selectedLiquidElements);

    let selectedFruitElements = getSelectedItems("fruitsCheckbox");
    let selectedFruitsArray = getSelectedValues(selectedFruitElements);

    let selectedProtienElements = getSelectedItems("protiensCheckbox");
    let selectedProtiensArray = getSelectedValues(selectedProtienElements);

    let selectedVeggieElements = getSelectedItems("veggiesCheckbox");
    let selectedVeggiesArray = getSelectedValues(selectedVeggieElements);

    let selectedSpecialtyElements = getSelectedItems("specialtiesCheckbox");
    let selectedFpecialtiesArray = getSelectedValues(selectedSpecialtyElements);

    let selectedFillerElements = getSelectedItems("fillersCheckbox");
    let selectedFillersArray = getSelectedValues(selectedFillerElements);

    let selectedFlavorElements = getSelectedItems("flavorsCheckbox");
    let selectedFlavorsArray = getSelectedValues(selectedFlavorElements);

    let selectedGrainElements = getSelectedItems("grainsCheckbox");
    let selectedGrainArray = getSelectedValues(selectedGrainElements);


    console.log(`
    selected Liquids: ${selectedLiquidsArray}
    selected Fruits: ${selectedFruitsArray}
    selected Protien:${selectedProtiensArray}
    selected Veggies:${selectedVeggiesArray}
    selected Specialty: ${selectedFpecialtiesArray}
    selected Fillers:${selectedFillersArray}
    selected Flavors:${selectedFlavorsArray}
    selected Grains:${selectedGrainArray}
    `);
};

let getSelectedItems = (checkName) => {
    return document.querySelectorAll(`input[name="${checkName}"]:checked`);
};

getSelectedValues = (elementsArray) => {
    let tempArray = [];
    elementsArray.forEach((selectedOption) => {
        tempArray.push(selectedOption.value);
    });
    return tempArray;
};

submitButton.addEventListener("click", placeOrder);