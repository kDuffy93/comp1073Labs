const firstLetterInput = document.getElementById("firstLetterInput");
const ingredientInput = document.getElementById("ingredientInput");
const nameInput = document.getElementById("nameInput");
const nameOutput = document.getElementById("nameOutput");
const Output2 = document.getElementById("Output2");
const output2Title = document.getElementById("output2Title");
const Output3 = document.getElementById("Output3");
const output3Title = document.getElementById("output3Title");
const featureImage = document.getElementById("featureImage");

workingDataSet = [];
let currentIndex = 0;


let getCocktailsBy = async(evt) => {
    workingDataSet = [];
    currentIndex = 0;
    let endpoint;
    let query;
    if (evt.target.id.startsWith("n")) {
        endpoint = "search.php?s=";
        query = nameInput.value
    }
    if (evt.target.id.startsWith("f")) {
        endpoint = "search.php?f=";
        query = firstLetterInput.value;
    }
    if (evt.target.id.startsWith("i")) {
        endpoint = "filter.php?i=";
        query = ingredientInput.value;
    }
    if (evt.target.id.startsWith("r")) {
        endpoint = "random.php";
        query = "";
    }

    let data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint == undefined ? "" : endpoint}${query}`)
        .then((response) => response.json())
        .then((data) => {
            data.drinks.forEach(element => {
                workingDataSet.push(element);
            });;
            return data;
        });

    updateOutput();
};


let updateOutput = () => {
    nameOutput.textContent = workingDataSet[currentIndex].strDrink;
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
        if (workingDataSet[currentIndex][`strIngredient${i}`] != null) {
            ingredients.push(workingDataSet[currentIndex][`strIngredient${i}`]);
        }
    }
    // add foreach ingredient append hyperlink instead of add text
    Output2.replaceChildren();
    ingredients.forEach(ingredient => {
        let tempLink = document.createElement("p");
        tempLink.classList.add("link");
        tempLink.textContent = ingredient;
        Output2.appendChild(tempLink);

    });
    output3Title.textContent = "Preperation Instructions";
    Output3.textContent = workingDataSet[currentIndex].strInstructions;
    featureImage.src = workingDataSet[currentIndex].strDrinkThumb;
    link = document.querySelectorAll(`.link`);
    link.forEach((element) => {
        element.addEventListener("click", getIngredients);
    });
};


//get the buttons and add their event listners
let buttons = document.querySelectorAll(`input[type="button"]`);
buttons[0].addEventListener("click", getCocktailsBy);
buttons[1].addEventListener("click", getCocktailsBy);
buttons[2].addEventListener("click", getCocktailsBy);
document.getElementById("randomSubmit").addEventListener("click", getCocktailsBy);


// get next and prev buttons and add event listners
let nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", () => {
    if (currentIndex < workingDataSet.length - 1) {
        currentIndex++;
        updateOutput();
    }

});
let prevButton = document.getElementById("prevButton");
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateOutput();
    }
});


// build get ingredients to change output for ingredients and do the search. 

let getIngredients = async(evt) => {

    let query = evt.target.textContent;
    let endpoint = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=";


    let data = await fetch(`${endpoint}${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });

    nameOutput.textContent = data.ingredients[0].strIngredient;
    Output2.replaceChildren();
    let tempLink = document.createElement("p");
    tempLink.classList.add("link");
    tempLink.textContent = "Back";
    tempLink.style = 'scale:200%'
    Output2.appendChild(tempLink);
    link = document.querySelectorAll(`.link`);
    link.forEach((element) => {
        element.addEventListener("click", updateOutput);
    });

    let div = document.createElement("div");
    let title = document.createElement("p");
    title.style = "text-decoration: underline;";
    let p = document.createElement("p");
    div.appendChild(title);
    div.appendChild(p);
    p.textContent = data.ingredients[0].strABV == null ? "No Data Available" : data.ingredients[0].strABV;
    title.textContent = "AVB";
    output3Title.textContent = "description";
    Output3.textContent = data.ingredients[0].strDescription == null ? "No Description Available" : data.ingredients[0].strDescription;
    Output3.appendChild(div);
};