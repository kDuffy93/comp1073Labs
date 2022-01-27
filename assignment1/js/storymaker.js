// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select');
var voices = [];
let noun1Array = [[`THE TURKEY`, `img/turkey.PNG`], [`MOM`, `img/mom.PNG`], [`DAD`, `img/dad.PNG`], [`THE DOG`, `img/dog.PNG`], [`MY TEACHER`, `img/teacher.PNG`], [`THE ELEPHANT`, `img/elephant.PNG`], [`THE CAT`, `img/cat.PNG`]];
let verbArray = [[`SAT ON`, `img/sat.PNG`], [`ATE`, `img/ate.PNG`], [`DANCED WITH`, `img/danced.PNG`], [`SAW`, `img/saw.PNG`], [`DOESN'T LIKE`, `img/doesnt-like.PNG`], [`KISSED`, `img/kissed.PNG`]];
let adjArray = [[`A FUNNY`, `img/funny.PNG`], [`A SCARY`, `img/scary.PNG`], [`A GOOFY`, `img/goofy.PNG`], [`A SLIMY`, `img/slimy.PNG`], [`A BARKING`, `img/barking.PNG`], [`A FAT`, `img/fat.PNG`]];
let noun2Array = [[`GOAT`, `img/goat.PNG`], [`MONKEY`, `img/monkey.PNG`], [`FISH`, `img/fish.PNG`], [`COW`, `img/cow.PNG`], [`FROG`, `img/frog.PNG`], [`BUG`, `img/bug.PNG`], [`WORM`, `img/worm.PNG`]];
let settingArray = [[`ON THE MOON`, `img/moon.PNG`], [`ON THE CHAIR`, `img/chair.PNG`], [`IN MY SPAGHETTI`, `img/spaghetti.PNG`], [`IN MY SOUP`, `img/soup.PNG`], [`ON THE GRASS`, `img/grass.PNG`], [`IN MY SHOES`, `img/shoe.PNG`]];
let output = document.getElementById('story');
let currentNoun1 = noun1Array[0][0];
let currentVerb = verbArray[0][0];
let currentAdj = adjArray[0][0];
let currentNoun2 = noun2Array[0][0];
let currentSetting = settingArray[0][0];
let currentNoun1Index = 0;
let currentVerbIndex = 0;
let currentAdjIndex = 0;
let currentNoun2Index = 0;
let currentSettingIndex = 0;


/* Functions
-------------------------------------------------- */
//updates a buttons text dependent on the parameters passed
function populateVoiceList() {
    voices = synth.getVoices();

    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}

let setCurrentWords = (which, array,index) => 
{
    switch (String(which))
    {
        case "noun1":
            currentNoun1 = array[index][0];
            break;
        case "verb":
            currentVerb = array[index][0];
            break;
        case 'adjective':
            currentAdj = array[index][0];
            break;
        case 'noun2':
            currentNoun2 = array[index][0];
            break;
        case 'setting':
            currentSetting = array[index][0];
            break;
        default:
            currentNoun1 = noun1Array[currentNoun1Index][0];
            currentVerb = verbArray[currentVerbIndex][0];
            currentAdj = adjArray[currentAdjIndex][0];
            currentNoun2 = noun2Array[currentNoun2Index][0];
            currentSetting = settingArray[currentSettingIndex][0];
            break;
    }

}
const UpdateButtonText = (buttonId, array, index) => {
    let currButton = document.getElementById(buttonId);
    currButton.textContent = array[index][0];
}
//call this to update one or all buttons text
const CallUpdateButtonText = (button) => {
switch (String(button))
{
    case "noun1": 
        UpdateButtonText('noun1', noun1Array, currentNoun1Index);
        break;
    case "verb":
        UpdateButtonText('verb', verbArray, currentVerbIndex);
        break;
    case 'adjective':
        UpdateButtonText('adjective', adjArray, currentAdjIndex);
        break;
    case 'noun2':
        UpdateButtonText('noun2', noun2Array, currentNoun2Index);
        break;
    case 'setting': 
        UpdateButtonText('setting', settingArray, currentSettingIndex);
        break;
    default:
        UpdateButtonText('noun1', noun1Array, currentNoun1Index);
        UpdateButtonText('verb', verbArray, currentVerbIndex);
        UpdateButtonText('adjective', adjArray, currentAdjIndex);
        UpdateButtonText('noun2', noun2Array, currentNoun2Index);
        UpdateButtonText('setting', settingArray, currentSettingIndex);
        break;
}
}
    
//click function for table buttons 
rate.onchange = function () {
    rateValue.textContent = rate.value;
}
const clickedTd = (evt) => {
    const clickedID = evt.currentTarget.id;
    const clickedCol = clickedID.slice(4, 5);
    const clickedRow = clickedID.slice(10, 11);
    switch (Number(clickedCol)) {
        case 0:
            currentNoun1Index = clickedRow;
            setCurrentWords('noun1', noun1Array, currentNoun1Index);
            CallUpdateButtonText('noun1');
            saySentense(currentNoun1);
            break;
        case 1:
            currentVerbIndex = clickedRow;
            setCurrentWords('verb', verbArray, currentVerbIndex);
            CallUpdateButtonText('verb');
            saySentense(currentVerb);
            break;
        case 2:
            currentAdjIndex = clickedRow;
            setCurrentWords('adjective', adjArray, currentAdjIndex);
            CallUpdateButtonText('adjective');
            saySentense(currentAdj);
            break;
        case 3:
            currentNoun2Index = clickedRow;
            setCurrentWords('noun2', noun2Array, currentNoun2Index);
            CallUpdateButtonText('noun2');
            saySentense(currentNoun2);
            break;
        case 4:
            currentSettingIndex = clickedRow;
            setCurrentWords('setting', settingArray, currentSettingIndex);
            CallUpdateButtonText('setting');
            saySentense(currentSetting);

            break;
        default: break;

    }
    console.log(`noun1: ${currentNoun1} verb: ${currentVerb} Adjective: ${currentAdj} noun2: ${currentNoun2} setting: ${currentSetting}`)
}
//click functions for table cells
const clickedTdButton = (evt) => {
    const clickedId = evt.currentTarget.id;
    switch (String(clickedId))
    {
        case "nnoun1":
            break;
        case "nverb":
            break;
        case "nadjective":
            break;
        case "nnoun2":
            break;
        case "nsetting":
            break;
        case "noun1": 
            currentNoun1Index ++;
            if (currentNoun1Index >= noun1Array.length) {
                currentNoun1Index=0;
            }
            setCurrentWords('noun1', noun1Array, currentNoun1Index);
            CallUpdateButtonText('noun1');
            saySentense(currentNoun1);
            break;
        case "verb": 
        currentVerbIndex++;
            if (currentVerbIndex >= verbArray.length) {
                currentVerbIndex = 0;
            }
            setCurrentWords('verb', verbArray, currentVerbIndex);
            CallUpdateButtonText('verb');
            saySentense(currentVerb);
            break;
        case "adjective": currentAdjIndex++;
            if (currentAdjIndex >= adjArray.length) {
                currentAdjIndex = 0;
            }
            setCurrentWords('adjective', adjArray, currentAdjIndex);
            CallUpdateButtonText('adjective');
            saySentense(currentAdj);
            break;
        case "noun2": currentNoun2Index++;
            if (currentNoun2Index >= noun2Array.length) {
                currentNoun2Index = 0;
            }
            setCurrentWords('noun2', noun2Array, currentNoun2Index);
            CallUpdateButtonText('noun2');
            saySentense(currentNoun2);
            break;
        case "setting": currentSettingIndex++;
            if (currentSettingIndex  >= settingArray.length) {
                currentSettingIndex = 0;
            }
            setCurrentWords('setting', settingArray, currentSettingIndex);
            CallUpdateButtonText('setting');
            saySentense(currentSetting);
            break;
        
        default:break;
    }
    
    console.log(`noun1: ${currentNoun1}, nounIndex: ${currentNoun1Index}
    verb: ${currentVerb}, verbIndex: ${currentVerbIndex}
    Adjective: ${currentAdj}, adjIndex: ${currentAdjIndex}
    noun2: ${currentNoun2}, noun2Index: ${currentNoun2Index}
    setting: ${currentSetting}, settingIndex: ${currentSettingIndex}`);

}


let buildElement = (array, iteration,colNum) => {
    let tempTd = document.createElement('td');
    tempTd.id = `col:${colNum}-row:${iteration}`;
    if (array[iteration]) {
        let currItrText = array[iteration][0];
        let currItrUrl = array[iteration][1];
        let tempImg = document.createElement('img');
        let tempP = document.createElement('p');
        tempP.textContent = currItrText;
        tempImg.src = currItrUrl;
        tempTd.appendChild(tempImg);
        tempTd.appendChild(tempP);
        tempTd.addEventListener('click', clickedTd, false);
    }
    return tempTd;
}
// figures out which of the arrays is largest and how many times to loop when building the table
const biggestArray = () => {
    let arrayLengths = [noun1Array.length, verbArray.length, adjArray.length, noun2Array.length, settingArray.length];
    currentLargest = 0;
    arrayLengths.forEach(element => {
        if (Number(element) > currentLargest) {
            currentLargest = Number(element);
        }
    });
    return currentLargest;
}
//builds the initial page
let buildTable = () => 
{
    //find which array had the longest length to set the length of the next loop by calling the biggestArray function.
     let biggestArrayInt = biggestArray();
    // loop, each iteration adding a new tr to the current body populating the row by calling the build element function
    let tBody = document.getElementById('tBody');
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    for (let i = 0; i < biggestArrayInt; i++)
    {
        let tRow = document.createElement('tr');
        tRow.appendChild(buildElement(noun1Array, i,0));
        tRow.appendChild(buildElement(verbArray, i,1));
        tRow.appendChild(buildElement(adjArray, i,2));
        tRow.appendChild(buildElement(noun2Array, i,3));
        tRow.appendChild(buildElement(settingArray, i,4));
        tBody.appendChild(tRow);
    } 
   
// had to add this in html, ask why?
}
let Init = () => {
    populateVoiceList();
    buildTable();
    CallUpdateButtonText();
}

let PlaybackClick = () => {
   outPutText();  
}
let outPutText = () =>{
    let sentense = `${currentNoun1.slice(0, 1) + currentNoun1.slice(1, currentNoun1.length).toLowerCase()} ${currentVerb.toLowerCase()} ${currentAdj.toLowerCase()} ${currentNoun2.toLowerCase()} ${currentSetting.toLowerCase()}.`;
    output.textContent = sentense;
    saySentense(sentense);
}
let reset = () => {
    currentNoun1Index = 0;
    currentVerbIndex = 0;
    currentAdjIndex = 0;
    currentNoun2Index = 0;
    currentSettingIndex = 0;
    setCurrentWords();
    CallUpdateButtonText();
    output.textContent = '';
    synth.cancel();
}
let randomNumber = (below) =>
{
return Math.floor(Math.random()*below);
}

let randomStory = () => {
    currentNoun1Index = randomNumber(noun1Array.length);
    currentVerbIndex = randomNumber(verbArray.length);
    currentAdjIndex = randomNumber(adjArray.length);
    currentNoun2Index = randomNumber(noun2Array.length);
    currentSettingIndex = randomNumber(settingArray.length);
    setCurrentWords();
    CallUpdateButtonText();
    outPutText();

}
//
let saySentense = (sentense) => {
    sentense = sentense.toLowerCase();
    var utterThis = new SpeechSynthesisUtterance(sentense);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
    output.blur();
}

pitch.onchange = function () {
    pitchValue.textContent = pitch.value;
}

rate.onchange = function () {
    rateValue.textContent = rate.value;
}


/* Event Listeners
-------------------------------------------------- */
let tableButtons = document.getElementsByClassName('tableButton');
for (let i = 0; i < tableButtons.length; i++) {
    console.log(tableButtons[i]);
    tableButtons[i].addEventListener('click', clickedTdButton, false);
}
let playbackButton = document.getElementById('playback');
playbackButton.addEventListener('click', PlaybackClick, false);

let randomButton = document.getElementById('randomButton');
randomButton.addEventListener('click', randomStory, false);

let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', reset, false);


Init();