const firstLetterInput = document.getElementById("firstLetterInput");
const ingredientInput = document.getElementById("ingredientInput");
const nameInput = document.getElementById("nameInput");
const nameOutput = document.getElementById("nameOutput");
const Output2 = document.getElementById("Output2");
const output2Title = document.getElementById("output2Title");
const Output3 = document.getElementById("Output3");
const output3Title = document.getElementById("output3Title");
const featureImage = document.getElementById("featureImage");
const currentList = document.getElementById("currentList");
let workingDataSet = [];
let currentIndex = 0;
let controller;



let getCocktailsBy = async(evt, newController) => {
    // if controller is defined, abort all pending and future requests using it and create a new controller.
    if (controller) controller.abort();
    controller = new AbortController();
    const signal = controller.signal;
    currentList.replaceChildren();
    workingDataSet = [];
    currentIndex = 0;
    let endpoint;
    let query;
    // check which button was pressed and set the endpoint and query accordingly.
    if (evt.target.id.startsWith("n")) {
        endpoint = "search.php?s=";
        query = nameInput.value;
    }
    if (evt.target.id.startsWith("f")) {
        endpoint = "search.php?f=";
        query = firstLetterInput.value;
    }
    if (evt.target.id.startsWith("i")) {
        endpoint = "filter.php?i=";
        query = ingredientInput.value;
    }
    if (evt.target.className.startsWith("l")) {
        evt.preventDefault();
        endpoint = "filter.php?i=";
        query = evt.target.textContent;
    }
    if (evt.target.id.startsWith("r")) {
        endpoint = "random.php";
        query = "";
    }
    // fetch the data with the endpoint and query from above
    let dataSet = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint == undefined ? "" : endpoint}${query}`, { signal })
        .then((response) => response.json())
        .then((data) => {
            data.drinks.forEach((element) => {
                workingDataSet.push(element);
                let templi = document.createElement("li");
                templi.textContent = element.strDrink;
                currentList.appendChild(templi);
            });
            return data;
        })
        .catch(function(e) {
            console.log('Download error: ' + e.message);
        });
    updateOutput();
    // if the event was an ingredients search then we need to do a second api call to get the correct data
    if (evt.target.id.startsWith("i") || evt.target.className.startsWith("l")) {
        if (evt.target.className.startsWith("l")) {
            ingredientInput.value = evt.target.textContent;
        } // if the search was from right clicking a link then put that links text in the ingredient input box.
        endpoint = "lookup.php?i=";
        console.log();
        workingDataSet = [];
        let iter = 0;
        // for each drink we have fetch its corrosponding information with the look up by ID apo call and push it to the working data set.
        for (const element of dataSet.drinks) {
            query = element.idDrink;
            await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint == undefined ? "" : endpoint}${query}`, { signal })
                .then((response) => response.json())
                .then((data) => {
                    data.drinks.forEach((element) => {
                        workingDataSet.push(element);
                    });
                })
                .catch(function(e) {
                    console.log('Download error: ' + e.message);
                });
            //update the page with the first record before continuing the loop
            if (iter == 0 || iter == 1) {
                updateOutput();
            }
            iter++;
        }
        iter = 0;
    }
    updateOutput();
};



let updateOutput = () => {
    // show both buttons
    nextButton.style.opacity = "1";
    prevButton.style.opacity = "1";
    nextButton.style.disabled = false;
    prevButton.style.disabled = false;
    //set the name output to the currently selected drinks name
    nameOutput.textContent = workingDataSet[currentIndex].strDrink;
    //remove all selected classes from the li's and add it back to the proper one.
    let lis = document.querySelectorAll("li")
    for (const element of lis) {
        element.classList.remove("selected");
    }
    document.querySelector(`li:nth-of-type(${currentIndex+1})`).classList.add("selected");
    // build the ingreditents array
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
        if (workingDataSet[currentIndex][`strIngredient${i}`] != null) {
            ingredients.push(workingDataSet[currentIndex][`strIngredient${i}`]);
        }
    }
    // clear output 2
    Output2.replaceChildren();
    // create the new li's in output 2 and append them to it.
    ingredients.forEach(ingredient => {
        let tempLink = document.createElement("p");
        tempLink.classList.add("link");
        tempLink.textContent = ingredient;
        tempLink.title = `Left Click to view ingreditent information. || Right click to search cocktails by the clicked ingredient.`;
        Output2.appendChild(tempLink);

    });
    // ensure the proper title is appearing in output 3
    output3Title.textContent = "Preperation Instructions";
    // set output 3's text content to the instructions on how to make it.
    Output3.textContent = workingDataSet[currentIndex].strInstructions;
    // set the img to the selected drinks thumbnail
    featureImage.src = workingDataSet[currentIndex].strDrinkThumb;
    // get all the links in output 2 and add the event listeners for when its right or left clicked.
    links = document.querySelectorAll(`.link`);
    links.forEach((element) => {
        element.addEventListener("click", getIngredients);
        element.addEventListener("contextmenu", getCocktailsBy);
    });
    // hide the next button if nessesary
    if (currentIndex == workingDataSet.length - 1) {
        nextButton.style.opacity = "0";
        nextButton.disabled = true;
    }
    // hide the prev button if nessesary
    if (currentIndex == 0) {
        prevButton.style.opacity = "0";
        prevButton.disabled = true;
    }
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
    // make sure we have a next item, if so increment the current index and call update output. if not do nothing. though it should be hidden and disabled if we dont have a next item.
    if (currentIndex < workingDataSet.length - 1) {
        currentIndex++;
        updateOutput();
    }
});

let prevButton = document.getElementById("prevButton");
prevButton.addEventListener("click", () => {
    // make sure we have a prev item, if so decrement the current index and call update output. if not do nothing. though it should be hidden and disabled if we dont have a prev item.
    if (currentIndex > 0) {
        currentIndex--;
        updateOutput();
    }
});


// build get ingredients to change output for ingredients and do the search. 
let getIngredients = async(evt) => {
    // get the ingreditents information
    let query = evt.target.textContent;
    let endpoint = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=";
    let data = await fetch(`${endpoint}${query}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
    // set the name to the ingredient name
    nameOutput.textContent = data.ingredients[0].strIngredient;
    // remove the other ingreditens from output 2 and add a back button
    Output2.replaceChildren();
    let tempLink = document.createElement("p");
    tempLink.classList.add("link");
    tempLink.textContent = "Back";
    tempLink.style = 'scale:200%';
    Output2.appendChild(tempLink);
    // add event listner to the back button to simply update the outputs again
    link = document.querySelectorAll(`.link`);
    link.forEach((element) => {
        element.addEventListener("click", updateOutput);
    });
    // greate an alchol by volume title and paragraph, append them to a div and append that div to output 3 after updating its main title and description
    let div = document.createElement("div");
    let title = document.createElement("p");
    title.style = "text-decoration: underline;";
    let p = document.createElement("p");
    div.appendChild(title);
    div.appendChild(p);
    // if stravb is null change text content to no data available if not set it to the value.
    p.textContent = data.ingredients[0].strABV == null ? "No Data Available" : data.ingredients[0].strABV;
    title.textContent = "AVB";
    // change output 3 text content and title to description and the description of the ingreditent
    output3Title.textContent = "description";
    // if strDescription is null change text content to no description available if not set it to the description.
    Output3.textContent = data.ingredients[0].strDescription == null ? "No Description Available" : data.ingredients[0].strDescription;
    Output3.appendChild(div);
};

// when the page first loads click the random button programitically to populate the outputs with a random cocktail
document.getElementById("randomSubmit").click();