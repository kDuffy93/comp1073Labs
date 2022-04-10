const output = document.getElementById("output");
const title = document.getElementById("title");


/* STEP 1a: Create a new object using a regular function */
function createNewPerson(name) {
    let obj = {};
    obj.name = name;
    obj.greeting = function() {
        output.textContent = `Hi, I'm ${this.name}.`;
    };
    return obj;
}

/* STEP 1b: Use the console to create a new person, and then invoke the function represented by .greeting() */
let scott = createNewPerson("Scott");

/* STEP 2a: In order to be a bit more concise, JavaScript allows us to use constructor functions - rewrite the above function, without returning anything. Capitalize the name of the function. */
// function Person(name){
//     this.name = name;
//     this.greeting = function(){
//         output.textContent = `Hi, I'm ${this.name}.`;
//     };
// };

/* STEP 2b: Use the console to create a couple of different people, using the 'new' keyword, and again invoking the .greeting() method for each person */

/* STEP 3a: Build the complete constructor for the object Person (comment out the above function first). Include name (first and last), age, gender, interests, bio (function), and greeting (function). */
function Person(first, last, age, gender, interests) {
    // Object members
    this.name = {
        first: first,
        last: last,
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
    // Object methods
    this.bio = function() {
        output.textContent = `${this.name.first} ${this.name.last} is a ${this.age} year old ${this.gender} who likes ${this.interests[0]}.`;
    };
    this.greeting = function() {
        output.textContent = `${this.name.first} says "Hello."`;
    };
}

/* STEP 3b: Instantiate a new Person based on the above constructor */
let person4 = new Person("Lady", "Gaga", 35, "female", [
    "music",
    "politics",
    "theatre",
]);
let person5 = new Person("Bobby", "Orr", 75, "male", ["hockey", "fishing"]);

/* STEP 3c: Attempt to access the various properties of person1 using the console. */
// person1['age']
// person1.interests[1]
// person1.bio()

/* STEP 4a: Alternatively, you can use the Object() constructor to create an object. */
let car = new Object();

/* STEP 4b: Once 'car' is created, add various properties and methods… */
car.brand = "Honda";
car.model = "Civic";
car.year = "2022";
car.blurb = function() {
    output.textContent = `Introducing the all-new ${this.year} ${this.brand} ${this.model}. Available now at your local dealership.`;
};

/* STEP 4c: Change some of the properties of 'car' in the console, then invoke the car.blurb() function */

/* STEP 5a: Yet another approach is to use the create() method. Let's see how the above car object can be used to create another object */
let anotherCar = Object.create(car);
anotherCar.year = "2021";
anotherCar.brand = "Hyundai";
anotherCar.model = "EV6";

/* STEP 5b: Output to the paragraph anotherCar.brand - you will see that it has retained the properties of the original object. */

// That's it! Now on to Lab 8...

function Hamburger(
    bunType,
    toastedBun,
    cheeseType,
    pattyType,
    pattyCount,
    bacon,
    extraCheese,
    veggies,
    sauces
) {
    // Object members
    this.bun = {
        type: bunType,
        toasted: toastedBun,
    };
    this.cheese = {
        type: cheeseType,
        extra: extraCheese,
    };
    this.patty = {
        type: pattyType,
        count: pattyCount,
    };
    this.bacon = bacon;
    this.veggies = veggies;
    this.sauces = sauces;

    // Object methods
    this.bio = function() {
        let sentense = "";
        if (this.toastedBun) {
            sentense += `Your burger will be on a toasted ${bunType} bun. `;
        }
        if (!this.toastedBun) {
            sentense += `Your burger will be on an un-toasted ${bunType} bun. `;
        }
        if (this.patty.count > 1) {
            sentense += `It will have ${pattyCount} ${pattyType} patties, `;
        }
        if (this.patty.count == 1) {
            sentense += `It will have ${pattyCount} ${pattyType} patty, `;
        }
        if (this.extraCheese) {
            sentense += `with extra ${cheeseType} cheese`;
        }
        if (!this.extraCheese) {
            sentense += `with ${cheeseType} cheese`;
        }
        if (this.bacon) {
            sentense += ` and bacon.`;
        }
        if (!this.bacon) {
            sentense += `.`;
        }
        sentense += `
For veggies it will have: `;
        for (const vegtable in veggies) {
            sentense += `${veggies[vegtable]}, `;
        }

        sentense = sentense.slice(0, -2);
        sentense += `. 
For sauces it will have: `;
        for (const sauce in sauces) {
            sentense += `${sauces[sauce]}, `;
        }
        sentense = sentense.slice(0, -2);
        sentense += `.`;

        output.textContent = sentense;
    };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let hamburger1 = new Hamburger(
    "seasme seed",
    true,
    "Cheddar",
    "All Beef",
    2,
    true,
    true, ["lettuce", "pickles", "onions"], ["ketchup", "mayo"]
);
let hamburger2 = new Hamburger(
    "seasme seed",
    false,
    "Montere Jack",
    "All Beef",
    3,
    false,
    false, ["lettuce", "onions", "tomato"], ["relish", "Mayo", "Mustard"]
);
let hamburger3 = new Hamburger(
    "Brioche",
    false,
    "Mozerella",
    "Chicken",
    2,
    false,
    true, ["pickles", "onions"], ["mayo"]
);
let hamburger4 = new Hamburger(
    "Plain",
    false,
    "swiss",
    "Beyond Beef",
    1,
    true,
    false, ["lettuce", "tomato", "onions"], ["ketchup", "mustard"]
);

let main = async() => {
    hamburger1.bio();
    await delay(7500);
    title.textContent = "Lab 8 - burger 2";
    hamburger2.bio();
    await delay(7500);
    title.textContent = "Lab 8 - burger 3";
    hamburger3.bio();
    await delay(7500);
    title.textContent = "Lab 8 - burger 4";
    hamburger4.bio();
};
main();

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS