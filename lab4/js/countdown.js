// STEP 1: Open the Lab 4 HTML page in a browser tab and open up the console.
// STEP 2a: Build an HTML element of your choice inside the HTML file for this lab to display the value of the variable i (the counter inside the loop below) as it counts down from 10 to 0.
// STEP 2b: create a constant to refer to the HTML element that you just created using querySelector().
const output = document.getElementById("countdownDisplay");
const gameDisplay = document.getElementById('gameDisplay');
const newBackgroundCheckbox = document.getElementById("newBackground");
const backgroundChange = document.getElementById("changeBackground");
let imgs = document.getElementsByTagName("img");
let playerScoreParagraphs = document.getElementsByClassName("playerScore");
let playerScoreNameParagraphs = document.getElementsByClassName("playerName");
let rocket1 = document.getElementById("rocket1");
let rocket2 = document.getElementById("rocket2");
let rocket3 = document.getElementById("rocket3");
let rocket4 = document.getElementById("rocket4");
let rocket5 = document.getElementById("rocket5");
let rocket6 = document.getElementById("rocket6");
let rocket7 = document.getElementById("rocket7");
let selectedPlayerNum = document.getElementById("numPlayers");
let selectedRocket;
let rocket1Height = 0;
let rocket2Height = 0;
let rocket3Height = 0;
let rocket4Height = 0;
let rocket5Height = 0;
let rocket6Height = 0;
let rocket7Height = 0;
let globalPlayerNumber = 1;
let resetSelection = false;
let currentlySelectedRockets = [];
let playerCount = 1;
let playerScores = { player1: 0, player2: 0, player3: 0, player4: 0, player5: 0, player6: 0 };
selectedPlayerNum.value = 1;


let removeHoverClasses = () => {
    rocket1.classList.remove("hoverable");
    rocket2.classList.remove("hoverable");
    rocket3.classList.remove("hoverable");
    rocket4.classList.remove("hoverable");
    rocket5.classList.remove("hoverable");
    rocket6.classList.remove("hoverable");
    rocket7.classList.remove("hoverable");
};


let removeHoverClasses2 = (ver1, var2) => {
    for (const img of imgs) {
        img.classList.remove("hoverable");
    }
};

let addHoverClasses = () => {
    for (const img of imgs) {
        img.classList.add("hoverable");
    }

};
let countdown = async() => {

    for (let i = 10; i >= 0; i--) {
        setTimeout(function() {
            // STEP 4: Build a switch statement to change the background color of the page to yellow (from 8-5), to orange (from 4-1), and finally to red (at 0).
            switch (i) {
                case 8:
                case 7:
                case 6:
                case 5:
                    output.style.backgroundColor = "#f9ff45";
                    break;
                case 4:
                    output.style.backgroundColor = "#ff9c12";
                    break;
                case 3:
                case 2:
                case 1:
                    for (const img of imgs) {
                        img.src = "imgs/rocketshipAboutToLaunch.png";
                    };
                    break;
                case 0:
                    output.style.backgroundColor = "#ff1212";
                    break;
                default:
                    output.style.backgroundColor = "#32ff2b";
            }
            // STEP 3: Add a condition with an IF statement that checks if the variable i is equal to zero - and if it is, output "Blastoff" to the HTML element you created above, otherwise just output the value of i.
            if (i === 0) {
                output.innerText = `Blastoff`;
            } else {
                output.textContent = `${i}`;
            }
        }, 10000 - (1000 * i))
    }
};

// STEP 5: Add some other feature to this page to make it more interactive or interesting!

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delayInms);
    });
}

let switchImg = async(loopIteration) => {
    await delay(30);
    //	console.log(x);
    return new Promise(resolve => {
        if (loopIteration % 2 == 0) {
            for (const img of imgs) {
                img.src = "imgs/rocketLaunching.png";
                resolve();
            }
        } else {
            for (const img of imgs) {
                img.src = "imgs/rocketLaunching2.png";
                resolve();
            }
        }
    });
}

function getRandomNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

let increaseRocketHeights = async(iteration) => {
    return new Promise(resolve => {
        console.log(iteration);
        for (let i = 0; i < 8; i++) {
            let randomAmount = (getRandomNumBetween(.1 * iteration + 1, 10 * iteration + 1) / getRandomNumBetween(250, 1500 + i));
            console.log(`randomAmount${i}:${randomAmount}`);
            if (randomAmount < 0) randomAmount *= (-1);
            console.log(`randomAmount${i}Neg:${randomAmount}`);
            switch (i) {
                case 0:
                    rocket1Height += randomAmount;
                    console.log(rocket7Height);
                    rocket1.style.transform = `translate3d(0, -${Number(rocket1Height) * .8875}vh, 0)`;
                    break;
                case 1:
                    rocket2Height += randomAmount;
                    console.log(rocket2Height);
                    rocket2.style.transform = `translate3d(0, -${rocket2Height * .8875}vh, 0)`;
                    break;
                case 2:
                    rocket3Height += randomAmount;
                    console.log(rocket3Height);
                    rocket3.style.transform = `translate3d(0, -${rocket3Height * .8875}vh, 0)`;
                    break;
                case 3:
                    rocket4Height += randomAmount;
                    console.log(rocket4Height);
                    rocket4.style.transform = `translate3d(0, -${rocket4Height * .8875}vh, 0)`;
                    break;
                case 4:
                    rocket5Height += randomAmount;
                    console.log(rocket5Height);
                    rocket5.style.transform = `translate3d(0, -${rocket5Height * .8875}vh, 0)`;
                    break;
                case 5:
                    rocket6Height += randomAmount;
                    console.log(rocket6Height);
                    rocket6.style.transform = `translate3d(0, -${rocket6Height * .8875}vh, 0)`;
                    break;
                case 6:
                    rocket7Height += randomAmount;
                    console.log(rocket7Height);
                    rocket7.style.transform = `translate3d(0, -${rocket7Height * .8875}vh, 0)`;
                    break;
                default:
                    console.log(`default from switch`);
            }
        }
        resolve();
    })
};

let updateScores = () => {
    console.log(playerScoreParagraphs);
    for (const paragraph of playerScoreParagraphs) {
        if (Number(paragraph.id) == 1) {
            paragraph.textContent = playerScores.player1;
        }
        if (Number(paragraph.id) == 2) {
            paragraph.textContent = playerScores.player2;
        }
        if (Number(paragraph.id) == 3) {
            paragraph.textContent = playerScores.player3;
        }
        if (Number(paragraph.id) == 4) {
            paragraph.textContent = playerScores.player4;
        }
        if (Number(paragraph.id) == 5) {
            paragraph.textContent = playerScores.player5;
        }
        if (Number(paragraph.id) == 6) {
            paragraph.textContent = playerScores.player6;
        }
        if (Number(paragraph.id) == 7) {
            paragraph.textContent = playerScores.player7;
        }

    }
};







let blastoff = async() => {
    output.disabled = true;
    rocket1Height = 0;
    rocket2Height = 0;
    rocket3Height = 0;
    rocket4Height = 0;
    rocket5Height = 0;
    rocket6Height = 0;
    rocket7Height = 0;
    let currentWinner;
    let largestHeight;
    let doIteration = 0;
    do {
        await switchImg(doIteration);
        doIteration++;
        await increaseRocketHeights(doIteration);



        //redo this for all ships not 2
        for (let i = 0; i < 7; i++) {
            switch (i) {
                case 0:
                    currentWinner = rocket1;
                    largestHeight = rocket1Height;
                    break;
                case 1:
                    rocket2Height > largestHeight ? (currentWinner = rocket2, largestHeight = rocket2Height) : currentWinner = currentWinner;
                    break;
                case 2:
                    rocket3Height > largestHeight ? (currentWinner = rocket3, largestHeight = rocket3Height) : currentWinner = currentWinner;
                    break;
                case 3:
                    rocket4Height > largestHeight ? (currentWinner = rocket4, largestHeight = rocket4Height) : currentWinner = currentWinner;
                    break;
                case 4:
                    rocket5Height > largestHeight ? (currentWinner = rocket5, largestHeight = rocket5Height) : currentWinner = currentWinner;
                    break;
                case 5:
                    rocket6Height > largestHeight ? (currentWinner = rocket6, largestHeight = rocket6Height) : currentWinner = currentWinner;
                    break;
                case 6:
                    rocket7Height > largestHeight ? (currentWinner = rocket7, largestHeight = rocket7Height) : currentWinner = currentWinner;
                    break;
            }
        }
        for (const img of imgs) {
            img.classList.remove('winning');

        }
        for (const img of imgs) {

            img.classList.add('losing');
        }
        currentWinner.classList.remove('losing');
        currentWinner.classList.add('winning');
    } while (rocket1Height < 100 && rocket2Height < 100 && rocket3Height < 100 && rocket4Height < 100 && rocket5Height < 100 && rocket6Height < 100 && rocket7Height < 100);
    //remove all ships winning and losing classes
    for (const img of imgs) {
        img.classList.remove('winning');
        img.classList.remove('losing');
        if (currentlySelectedRockets.includes(img.id)) {
            console.log(`selected rocket id : ${img.id} currWinnerID: ${currentWinner.id}`)
            if (String(img.id) == String(currentWinner.id)) {
                let classList = String(img.classList);
                let indexOfSelected = classList.indexOf(`selected`);
                console.log(classList.charAt(indexOfSelected + 9));
                switch (Number(classList.charAt(indexOfSelected + 9))) {
                    case 1:
                        console.log(`increminenting player 1 count`);
                        playerScores.player1++;
                        updateScores();
                        break;
                    case 2:
                        console.log(`increminenting player 2 count`);
                        playerScores.player2++;
                        updateScores();
                        break;
                    case 3:
                        console.log(`increminenting player 3 count`);
                        playerScores.player3++;
                        updateScores();
                        break;
                    case 4:
                        console.log(`increminenting player 4 count`);
                        playerScores.player4++;
                        updateScores();
                        break;
                    case 5:
                        console.log(`increminenting player 5 count`);
                        playerScores.player5++;
                        updateScores();
                        break;
                    case 6:
                        console.log(`increminenting player 6 count`);
                        playerScores.player6++;
                        updateScores();
                        break;
                    case 7:
                        console.log(`increminenting player 7 count`);
                        playerScores.player7++;
                        updateScores();
                        break;
                }
            }
        }
    }

    //loop through all ships and make their src rocketshipLoss

    //redo this to make the right ship display win
    for (const img of imgs) {
        img.src = "imgs/rocketshipLoseEnd.png";
    }
    currentWinner.src = "./imgs/rocketshipWinEnd.png";

};

let getNewRocketElements = () => {
    imgs = document.getElementsByTagName("img");
    rocket1 = document.getElementById("rocket1");
    rocket2 = document.getElementById("rocket2");
    rocket3 = document.getElementById("rocket3");
    rocket4 = document.getElementById("rocket4");
    rocket5 = document.getElementById("rocket5");
    rocket6 = document.getElementById("rocket6");
    rocket7 = document.getElementById("rocket7");
};


let countdownCall = async() => {
    removeImgEvents();
    removeHoverClasses(); // not working??
    removeHoverClasses2(); // not working ??
    countdown();
    output.disabled = true;
    await delay(10250);
    setTimeout(() => {
        output.style.opacity = `0%`;
        gameDisplay.style.display = `0%`;
        output.style.transform = `translate3d(0, 30vh, 0)`;

        for (const paragraph in playerScoreParagraphs) {
            paragraph.style.opacity = "0%";
        }
        for (const paragraph in playerScoreNameParagraphs) {
            paragraph.style.opacity = "0%";
        }
    }, 5000);
    output.disabled = true;
    await blastoff();
    output.style.opacity = `100%`;
    gameDisplay.style.opacity = `100%`;
    for (const paragraph in playerScoreParagraphs) {
        paragraph.style.opacity = "100%";
    }
    for (const paragraph in playerScoreNameParagraphs) {
        paragraph.style.opacity = "100%";
    }
    output.removeEventListener("click", countdownCall);
    output.addEventListener("click", startNewGame);
    output.innerHTML = `click to reset`;
    output.disabled = false;
}

let startNewGame = () => {
    output.removeEventListener("click", startNewGame);
    output.style.transform = `translate3d(0, 0, 0)`;

    if (newBackgroundCheckbox.checked == true) getNewBackground();
    addImgEvents(1);
    resetRocketHeights();
    for (const img of imgs) {
        img.src = "imgs/rocketship.png";
    }
    removeAllrocketClasses();
    selectedRocket = undefined;
    output.textContent = `Click here after you pick a rocket`;
    output.addEventListener("click", countdownCall);
    addHoverClasses();
    resetAllSelections();
};


let removeAllrocketClasses = () => {
    for (const img of imgs) {
        img.classList.remove('selected');
    }
};

let resetRocketHeights = () => {
    for (const img of imgs) {
        img.style.transform = `translate3d(0, 0, 0)`;
    }
}


let getNewBackground = () => {

    let newUrl = String(`url(` + `'imgs/backgrounds/background (${Math.floor(Math.random() * 211)}).jpg')`);
    console.log(newUrl);
    document.body.style.backgroundImage = newUrl;
    console.log('should have just changed the background');
};
output.addEventListener("click", countdownCall);
backgroundChange.addEventListener("click", getNewBackground);
console.log('the event listner was just added to the h1');


let addImgEvents = (playerNumber) => {
    output.disabled = true;
    addHoverClasses();
    for (const img of imgs) {
        img.addEventListener("click", () => {
            selectThisRocket(img.id, playerNumber);
            output.disabled = false;
        });
    }
}
let resetAllSelections = () => {
    for (const img of imgs) {
        img.removeAttribute("class");
        img.classList.add(`rocket`);
        img.classList.add(`hoverable`);
    }

}
let noMorePlayers = () => {
    globalPlayerNumber = 0;
    resetSelection = true;

};


function selectThisRocket(id, playerNumber) {
    output.disabled = false;
    /*
if( all players have selected their rocket)
{
output.disabled = false;
and remove it below**
	}
	*/
    if (resetSelection) {
        resetSelection = false;
        resetAllSelections();

    }


    let tempEle = document.getElementById(id);
    switch (playerNumber) {
        case 1:
            currentlySelectedRockets = [];
            tempEle.classList.add(`selectedP${playerNumber}`);
            currentlySelectedRockets.push(id);
            if (playerCount == 1) {
                noMorePlayers();
            }
            break;
        case 2:
            tempEle.classList.add(`selectedP${playerNumber}`);
            currentlySelectedRockets.push(id);
            if (playerCount == 2) {
                noMorePlayers();
            }
            break;
        case 3:
            tempEle.classList.add(`selectedP${playerNumber}`);
            currentlySelectedRockets.push(id);
            if (playerCount == 3) {
                noMorePlayers();
            }
            break;
        case 4:
            tempEle.classList.add(`selectedP${playerNumber}`);
            currentlySelectedRockets.push(id);
            if (playerCount == 4) {
                noMorePlayers();
            }
            break;
        case 5:
            tempEle.classList.add(`selectedP${playerNumber}`);
            currentlySelectedRockets.push(id);
            if (playerCount == 5) {
                noMorePlayers();
            }
            break;
        case 6:
            tempEle.classList.add(`selectedP${playerNumber}`);
            currentlySelectedRockets.push(id);
            if (playerCount == 6) {
                noMorePlayers();
            }
            break;
    }

    //changing the static varibles of the event listner so it fires for the next player
    globalPlayerNumber += 1;
    //then remove the events off the imgs that are already selected
    if (currentlySelectedRockets.length < playerCount) {

        removeSelectedImgEvent(currentlySelectedRockets);

    } else {
        globalPlayerNumber = 1;
    }
    removeImgEvents();
    addImgEvents(globalPlayerNumber);

}

let removeSelectedImgEvent = (id) => {
    for (const img of imgs) {
        currentlySelectedRockets.forEach(rocketId => {
            if (img.id == rocketId) {
                tempImg = img.cloneNode(true);
                img.parentNode.replaceChild(tempImg, img);
            }
        });
    }
}
let removeImgEvents = () => {
    for (const img of imgs) {
        tempImg = img.cloneNode(true);
        img.parentNode.replaceChild(tempImg, img);
    }
    getNewRocketElements();
};


addImgEvents(1);
addHoverClasses();



let playerNumberFunction = () => {
    playerCount = selectedPlayerNum.selectedIndex + 1;
    currentlySelectedRockets = [];
    resetAllSelections();
    globalPlayerNumber = 1;
    removeImgEvents();
    addImgEvents(globalPlayerNumber);
    showProperScoreBoxes();
}


let showProperScoreBoxes = () => {
    for (const paragraph of playerScoreNameParagraphs) {
        if (String(paragraph.textContent).includes('Scores')) { console.log("continue"); continue; }

        switch (Number(String(paragraph.textContent).charAt(String(paragraph.textContent).indexOf(" ") + 1))) {
            case 1:
                break;
            case 2:
                playerCount > 1 ? (paragraph.style.opacity = "100%", document.getElementById("2").style.opacity = "100%") : (paragraph.style.opacity = "0%", document.getElementById("2").style.opacity = "0%");
                break;
            case 3:
                playerCount > 2 ? (paragraph.style.opacity = "100%", document.getElementById("3").style.opacity = "100%") : (paragraph.style.opacity = "0%", document.getElementById("3").style.opacity = "0%");
                break;
            case 4:
                playerCount > 3 ? (paragraph.style.opacity = "100%", document.getElementById("4").style.opacity = "100%") : (paragraph.style.opacity = "0%", document.getElementById("4").style.opacity = "0%");
                break;
            case 5:
                playerCount > 4 ? (paragraph.style.opacity = "100%", document.getElementById("5").style.opacity = "100%") : (paragraph.style.opacity = "0%", document.getElementById("5").style.opacity = "0%");
                break;
            case 6:
                playerCount > 5 ? (paragraph.style.opacity = "100%", document.getElementById("6").style.opacity = "100%") : (paragraph.style.opacity = "0%", document.getElementById("6").style.opacity = "0%");
                break;
        }
    }
};

selectedPlayerNum.addEventListener("change", playerNumberFunction);