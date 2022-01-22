
			// STEP 1: Initialize game variables
    // STEP 1a: Pick random number
    let randomNumber = Math.floor(50 * Math.random())+51;
    let theRandomNumberImUsing = Math.floor(50 * Math.random()) + 1;
    // STEP 1b: Create variables to represent the three paragraphs above that will contain user feedback
    const guesses = document.querySelector('#guesses');

    // STEP 1c: Create variables to represent the guessing form
    const guessField = document.querySelector('#guessField');
    const guessSubmit = document.querySelector('button');
    const remainingGuessesElem = document.querySelector('#remainingGuesses');
    const lastResult = document.querySelector('#lastResult');
    const lowOrHi = document.querySelector('#lowOrHi');
    // STEP 1d: Create variables to initialize counter for number of guesses
    let guessCount = 0;
    // STEP 2: Put focus on the field that allows user to type in guesses
    guessField.value = '';
    guessField.focus();
    
    remainingGuessesElem.textContent = `Remaining Guesses: ${10 - guessCount}`;
    // STEP 3: Build a function to check the user's guess
function checkGuess() {
    
        function reset ()
        {
            while (guesses.lastChild) {
                guesses.removeChild(guesses.lastChild);
            }
            guessCount = 0;
            remainingGuessesElem.textContent = `Remaining Guesses: ${10 - guessCount}`;
            theRandomNumberImUsing = Math.floor(50 * Math.random()) + 1;
            lastResult.textContent = ``;
            lastResult.style.backgroundColor = `#FFFFFF`;
            guessField.disabled = false;
            guessSubmit.textContent = 'Submit guess';
            guessSubmit.removeEventListener('click', reset);
            guessSubmit.addEventListener('click', checkGuess);
            lowOrHi.textContent = '';
            return;
        }
        // STEP 3b: Create a variable to contain what number the user entered
        let userGuess = Number(guessField.value);
    if (userGuess == randomNumber)
    {
        guessField.value = '';
        guessField.focus();
        lastResult.textContent = `Hey, No cheating!`;
        lastResult.style.backgroundColor = `BlueViolet`;
        lowOrHi.textContent = `But if you really want to, try theRandomNumberImUsing instead.`;
        lowOrHi.style.color = `BlueViolet`;
        return;
    }
        if (userGuess < 1 || userGuess > 49) {
            guessField.value = '';
            guessField.focus(); 
              lastResult.textContent = `Incorrect Value Guessed`;
            lastResult.style.backgroundColor = `IndianRed`;
        lowOrHi.textContent = `your guess must be a number BETWEEN 0 and 50`;
            lowOrHi.style.color = `IndianRed`;
            return
        }
        //logic to check if entered value has already been guesses
      
        
        
        



    // STEP 3c: If this is the first guess, add some text to the screen as a label for listing previous guesses for reference
    if(guessCount === 0){
        guesses.textContent = `previous Guesses: `;	
					
				}
        let pArray = Array.from(guesses.childNodes);
        if (pArray) {
            pArray.forEach(element => {
                if (element.innerText == "previous Guesses: ") { return; }
                if (userGuess != 0) {
                    console.log(Number(String(element.innerText).replace(",", "")));

                    if (userGuess == Number(String(element.innerText).replace(",", ""))) {
                        guessField.value = '';
                        guessField.focus();
                        lastResult.textContent = `Youve already guessed the number ${userGuess}`;
                        lastResult.style.backgroundColor = `SlateBlue`;
                        lowOrHi.textContent = `Try again!`;
                        lowOrHi.style.color = `SlateBlue`;
                       throw("Duplicate Guess Error");
                    }
                }
            });
        }
				// STEP 3d: Add the user's current guess to that list, plus a space
				if(userGuess > theRandomNumberImUsing){
        let tempEle = document.createElement("p");
    tempEle.style = 'color:#ff0000;display:inline;';
    tempEle.textContent = ` ${Number(userGuess)},`;
    guesses.appendChild(tempEle);
    guessCount++;
    lastResult.textContent = `Nope!`;
    lastResult.style.backgroundColor = `red`;
    remainingGuessesElem.textContent = `Remaining Guesses: ${10 - guessCount}`;
                    lowOrHi.textContent = `Too high.`;
                    lowOrHi.style.color = `red`;
                    
    guessField.value = '';
    guessField.focus(); 
				}
    if(userGuess < theRandomNumberImUsing){
        let tempEle = document.createElement("p");
    tempEle.style = 'color:#0000ff;display:inline;'
    tempEle.textContent = ` ${Number(userGuess)} ,`;
    guesses.appendChild(tempEle);
    guessCount++;
    lastResult.textContent = `Nope!`;
    lastResult.style.backgroundColor = `blue`;
    remainingGuessesElem.textContent = `Remaining Guesses: ${10 - guessCount}`;
        lowOrHi.textContent = `Too low.`;
        lowOrHi.style.color = `blue`;
    guessField.value = '';
    guessField.focus(); 
				}
    // STEP 3e: Conditional - the user guessed correctly
    // Output a success message, then end the game
    if (userGuess === theRandomNumberImUsing) {
        let tempEle = document.createElement("p");
        tempEle.style = 'color:#00ff00;display:inline;'
        tempEle.textContent = ` ${Number(userGuess)} ,`;
        guesses.appendChild(tempEle);
        guessCount++;
        remainingGuessesElem.textContent = `Remaining Guesses: ${10 - guessCount}`;
    lastResult.textContent = `Correct! You Win`;
    lastResult.style.backgroundColor = `green`;
        lowOrHi.textContent = `Press the reset button or refresh the page to play again`;
        lowOrHi.style.color = `green`;
        guessField.disabled = true;
        guessSubmit.textContent ='RESET';
        guessSubmit.removeEventListener('click', checkGuess);
        guessSubmit.addEventListener('click', reset);
 
    
    guessField.value = '';
    guessField.focus(); 
					
				}
				// STEP 3f: Conditional - the user is all out of guesses
				if(guessCount >= 10 && userGuess != theRandomNumberImUsing)
    {
        // Output an appropriate message, then end the game
       
					
                    
                    lastResult.textContent = `Sorry you're out of guesses! refresh the page or click reset to play again`;
                    lastResult.style.backgroundColor = `orange`;
                    lowOrHi.textContent='';
                    guessField.disabled = true;
                    guessSubmit.textContent = 'RESET';
                    guessSubmit.removeEventListener('click', checkGuess);
                    guessSubmit.addEventListener('click', reset);
    while (guesses.lastChild) {
        guesses.removeChild(guesses.lastChild);
					}
    guessField.value = '';
    guessField.focus(); 
				}
                
			};
    // STEP 3a: Add an event listener for the guess form button that calls the checkGuess function, then test that the event listener is working and that it invokes the function
    guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});