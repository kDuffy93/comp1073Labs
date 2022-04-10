const output = document.querySelector('#output');

/* STEP 1: Instead of a constructor function, let's try a JavaScript class called 'Coffee' */
class Coffee {
    size;
    isDecaf;
    constructor(size, isDecaf) {
        this.size = size;
        this.isDecaf = isDecaf;
    };
    serveIt(imgUrl) {
        // Generate an IMG of the coffee ordered
        const cup = document.createElement("img");
        // Set the src path for the IMG element
        let cupImage = 'images/coffee-cup.svg';
        // Determine caffeine status of the coffee
        let decaf;
        if (this.isDecaf === true) {
            decaf = 'decaffeinated';
            cupImage = 'images/coffee-cup-green.svg';
        } else {
            decaf = 'caffeinated';
        };
        if (imgUrl) { cupImage = 'images/coffee-cup-blue.svg'; }

        // Set the src attribute of the new IMG element
        cup.setAttribute('src', cupImage);
        // Set the size of the cup SVG image based on this.size
        let cupSize;
        switch (this.size) {
            case 'small':
                cupSize = '100';
                break;
            case 'medium':
                cupSize = '125';
                break;
            case 'large':
                cupSize = '150';
                break;
            default:
                cupSize = '100';
        };
        // Size the IMG in terms of its height based on above number from the switch
        cup.setAttribute('height', cupSize);
        // Generate a description of the coffee and put it into the IMG title attribute
        let description = `A ${this.size} ${decaf} coffee.`;
        cup.setAttribute('title', description);
        // Insert the new IMG element into the paragraph
        output.appendChild(cup);
        // Output all object member values
        for (const [key, value] of Object.entries(this)) {
            console.log(`${key}: ${value}`);
        };
    };
};

/* STEP 2: Instatiate a coffee based on the above constructor function */
let scottsCoffee = new Coffee('large', false);

/* STEP 3: Add a method to the Coffee class called serveIt() */

/* STEP 4: Call up the serveIt() method */
scottsCoffee.serveIt();

/* STEP 5: Define a subclass of the Coffee class */
class Latte extends Coffee {
    milkType;
    constructor(size, isDecaf, milkType) {
        super(size, isDecaf);
        this.milkType = milkType;
    };
    latteDesc() {
        console.log(`A ${this.size} latte with steamed ${this.milkType} milk.`);
    };
};

// --------------lab 9 code ----------------

class coldBrew extends Coffee {
    milkType;
    sweetnerType;
    constructor(size, isDecaf, milkType, sweetnerType) {
        super(size, isDecaf);
        this.milkType = milkType;
        this.sweetnerType = sweetnerType;
    }
    coldBrewDesc() {
        console.log(
            `A ${this.size} Cold brewed coffee with ${this.milkType} and ${this.sweetnerType} as a sweetner.`
        );
    }
};
kylesColdBrew = new coldBrew("large", false, "10% cream", "Maple Syrup");
kylesColdBrew.coldBrewDesc();
kylesColdBrew.serveIt(true);

// --------------end of lab 9 code ------------





/* STEP 6: Create a new instance of the Latte object */
scottsLatte = new Latte('medium', true, 'almond');

/* STEP 7: Call up the latteDesc() method for the above created Latte instance */
scottsLatte.latteDesc();
scottsLatte.serveIt();

/* STEP 8: Create yet another instance of Latte using the console, and try the latteDesc() method from the subclass, as well as the serveIt() method from the parent class */


// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript

// Special thanks to https://openclipart.org/detail/293550/coffee-to-go for the very cool coffee cup SVG