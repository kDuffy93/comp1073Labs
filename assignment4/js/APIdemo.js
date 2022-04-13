const nameInput = document.getElementById("nameInput");
const firstLetterInput = document.getElementById("firstLetterInput");
const ingredientDetailsInput = document.getElementById("ingredientDetailsInput");
const ingredientInput = document.getElementById("ingredientInput");


let getCocktailsByName = async() => {
    let data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameInput.value}`)
        .then((response) => response.json())
        .then((data) => { return data });

    console.log(data);




};


let getIngredientByName = () => {};

let getCocktailsByIngredient = () => {};

let getCocktailsByFirstLetter = () => {};

let getrandom = () => {};

//get the buttons

let buttons = document.querySelectorAll(`input[type="button"]`);

buttons[0].addEventListener("click", getCocktailsByName);