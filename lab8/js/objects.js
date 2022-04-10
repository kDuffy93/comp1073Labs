const output = document.getElementById('output');

/* STEP 1: Create an object (looks a lot like declaring a variable, but with empty braces), then open this page in a browser and enter 'person' in the console */
let person = {
    name: {
        first: 'Rick',
        last: 'Astley'
    },
    age: 55,
    gender: 'male',
    address: {
        street: '124 Smith St.',
        town: 'Anytown',
        province: 'Ontario'
    },
    interests: ['80s pop music', 'Hawaiian shirts', 'big hair'],
    greeting: function(){
        alert(`Hi, my name is ${this.name.first} ${this.name.last}.`);
    },
    bio: function(){
        let result = `${this.name.first} ${this.name.last} is a ${this.age} year old person who likes ${this.interests[0]} and ${this.interests[2]}, who lives at ${this.address.street} ${this.address.town}, ${this.address.province}.`;
        return result;
    }
};

/* STEP 2a: Add other data items to the above object, like name, age, gender, and interests */

/* STEP 2b: Enter the following directly into the console:
    person.name[0]
    person.age
    person.gender
    person.interests[0]
*/

/* STEP 3: Add a simple function (now called a method in this context) to the above object called "greeting" that creates an alert dialog, then type person.greeting() into the console */

/* STEP 4: Add a more complicated function to the object that describes the person, their age, gender, and interests in a string that is output to an alert dialog */

// The object above is called an 'object literal' - in that we build each part of the object manually, rather than instatiating it from a class (which we will cover later). Objects can be easier to work with than arrays, as you can name each element

/* STEP 5a: Dot syntax allows you to access the parts of an object - the first part is the namespace, and subsequent parts are used to access things encapsulated within the object. Access the name, age, and gender of the person object, and put it inside the <p id="output"></p>. */
output.textContent = `${person.name.first} ${person.name.last} is a ${person.age} year old ${person.gender}.`;

/* STEP 5b: Update the above bio() function inside the person object to return the string, instead of the alert(). */
output.textContent = person.bio();

/* STEP 6a: An object can even contain another object - update object person above to include a name object. Note how this breaks the greeting and bio functions - update the greeting function to use this sub-namespace */

/* STEP 6b: Now fix the bio() function to use the sub-namespace of 'name' as well */

/* STEP 7: You can also use bracket notation, just like an array - objects that are built this way are often referred to as associative arrays */
output.textContent = `${person['name']['first']} ${person['name']['last']} is an eighties pop star.`;

/* STEP 8: You can also set members of an object - try changing the person's name, and age */
person.name.first = 'Scott';
person.name.last = 'McCrindle';
person.age = 50;
output.textContent = person.bio();

/* STEP 9a: It it also possible to add new members to an object - include eye color - and type person.eyes in the console */
person.eyes = 'green';

/* STEP 9b: Add a new function called 'goodbye' to the person object and try it by typing person.goodbye into the console */
person.goodbye = function(){
    output.textContent = `${this.name.first} says "Goodbye."`;
};

/* STEP 10: We can also dynamically set both names and values for objects… */
person.eyes = 'brown';
let newMemberName = 'height';
let newMemberValue = '155cm';
person[newMemberName] = newMemberValue;
//person.newMemberName = newMemberValue;

/* STEP 11a: 'this' is very useful - it allows us to refer to the object in question, specifically. This will become much clearer later in the course. Create two new objects, each with a name, and a function that outputs the name */
let person1 = {
    name: 'Steve',
    hello: function() {
        alert(`${this.name} says "Hello."`);
    }
};

let person2 = {
    name: 'Sara',
    hello: function() {
        alert(`${this.name} says "Hello."`);
    }
};

/* STEP 11b: Call up both person1.hello() and person2.hello() in the console to see how 'this' is specific to each object */

// You have already been using objects all along:
let myString = 'Words, words, words.'; // this creates an instance of the class String
const elem = document.getElementById('output'); // this accesses the Document object, which is created (instantiated) when the browser opens the HTML page

// Next, open up oop.html and we will delve a bit deeper into JavaScript objects.

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
