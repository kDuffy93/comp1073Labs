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
let defaultOption = document.getElementById('justSay');
let noun1ToSpeak;
let verbToSpeak;
let adjToSpeak;
let noun2ToSpeak;
let settingToSpeak;
const resetButton = document.getElementById('resetButton');
let randomButton = document.getElementById('randomButton');
let playbackButton = document.getElementById('playback');
const tableButtons = document.getElementsByClassName('tableButton');

/* Functions
-------------------------------------------------- */
//updates a buttons text dependent on the parameters passed
function populateVoiceList() {
    voices = synth.getVoices();
console.log(voices);
    for (i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
       

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
     }
     if(voices.length == 0){
         var option = document.createElement('option');
         option.textContent = 'No Other Voices';
         option.setAttribute('data-lang', 'no-Lang');
         option.setAttribute('data-name', 'no-Name');
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
    

const clickedTd = (evt) => {
    const clickedID = evt.currentTarget.id;
    const length = clickedID.length;
    const clickedCol = clickedID.slice(4, 5);
    const clickedRow = clickedID.slice(10, length);
    const workingCol = document.getElementById(`col:${clickedCol}-row:${clickedRow}`);
    
    
    switch (Number(clickedCol)) {
        case 0:
            currentNoun1Index = clickedRow;
            setCurrentWords('noun1', noun1Array, currentNoun1Index);
            CallUpdateButtonText('noun1');
            saySentense(currentNoun1);
            highlightSelectedColumn(workingCol, "activeNoun1");
            break;
        case 1:
            currentVerbIndex = clickedRow;
            setCurrentWords('verb', verbArray, currentVerbIndex);
            CallUpdateButtonText('verb');
            saySentense(currentVerb);
            highlightSelectedColumn(workingCol,"activeVerb");
            break;
        case 2:
            currentAdjIndex = clickedRow;
            setCurrentWords('adjective', adjArray, currentAdjIndex);
            CallUpdateButtonText('adjective');
            saySentense(currentAdj);
            highlightSelectedColumn(workingCol, "activeAdj");
            break;
        case 3:
            currentNoun2Index = clickedRow;
            setCurrentWords('noun2', noun2Array, currentNoun2Index);
            CallUpdateButtonText('noun2');
            saySentense(currentNoun2);
            highlightSelectedColumn(workingCol, "activeNoun2");
            break;
        case 4:
            currentSettingIndex = clickedRow;
            setCurrentWords('setting', settingArray, currentSettingIndex);
            CallUpdateButtonText('setting');
            saySentense(currentSetting);
            oldCell = document.getElementsByClassName("activeSetting").item(0);
            highlightSelectedColumn(workingCol, "activeSetting");
            break;
        default: break;
    }
    console.log(`noun1: ${currentNoun1} verb: ${currentVerb} Adjective: ${currentAdj} noun2: ${currentNoun2} setting: ${currentSetting}`)
}
//click functions for table cells
const clickedTdButton = (evt) => {
    const clickedId = evt.currentTarget.id;
    let word;
    let url;
    switch (String(clickedId))
    {
        case "nnoun1":
            word = document.getElementById("newNounTxt").value.toUpperCase();
         url = document.getElementById("newNounURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(noun1Array, word, url);
            buildTable();
            updateAllTableRowsHighlight();
            break;
        case "nverb":
             word = document.getElementById("newVerbTxt").value.toUpperCase();
             url = document.getElementById("newVerbURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(verbArray, word, url);
            buildTable();
            updateAllTableRowsHighlight();
            break;
        case "nadjective":
             word = document.getElementById("newAdjTxt").value.toUpperCase();
             url = document.getElementById("newAdjURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(adjArray, word, url);
            buildTable();
            updateAllTableRowsHighlight();
            break;
        case "nnoun2":
             word = document.getElementById("newNoun2Txt").value.toUpperCase();
             url = document.getElementById("newNoun2URL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(noun2Array, word, url);
            buildTable();
            updateAllTableRowsHighlight();
            break;
        case "nsetting":
             word = document.getElementById("newSettingTxt").value.toUpperCase();
             url = document.getElementById("newSettingURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(settingArray, word, url);
            buildTable();
            updateAllTableRowsHighlight();
            break;
        case "noun1": 
            currentNoun1Index ++;
            if (currentNoun1Index >= noun1Array.length) {
                currentNoun1Index=0;
            }
            setCurrentWords('noun1', noun1Array, currentNoun1Index);
            CallUpdateButtonText('noun1');
            saySentense(currentNoun1);
            updateHighlightedRow(currentNoun1Index, "activeNoun1",0);
            break;
        case "verb": 
        currentVerbIndex++;
            if (currentVerbIndex >= verbArray.length) {
                currentVerbIndex = 0;
            }
            setCurrentWords('verb', verbArray, currentVerbIndex);
            CallUpdateButtonText('verb');
            saySentense(currentVerb);
            updateHighlightedRow(currentVerbIndex, "activeVerb",1);
            break;
        case "adjective": currentAdjIndex++;
            if (currentAdjIndex >= adjArray.length) {
                currentAdjIndex = 0;
            }
            setCurrentWords('adjective', adjArray, currentAdjIndex);
            CallUpdateButtonText('adjective');
            saySentense(currentAdj);
            updateHighlightedRow(currentAdjIndex, "activeAdj",2);
            break;
        case "noun2": currentNoun2Index++;
            if (currentNoun2Index >= noun2Array.length) {
                currentNoun2Index = 0;
            }
            setCurrentWords('noun2', noun2Array, currentNoun2Index);
            CallUpdateButtonText('noun2');
            saySentense(currentNoun2);
            updateHighlightedRow(currentNoun2Index, "activeNoun2",3);
            break;
        case "setting": currentSettingIndex++;
            if (currentSettingIndex  >= settingArray.length) {
                currentSettingIndex = 0;
            }
            setCurrentWords('setting', settingArray, currentSettingIndex);
            CallUpdateButtonText('setting');
            saySentense(currentSetting);
            updateHighlightedRow(currentSettingIndex, "activeSetting",4);
            break;
        default:break;
    }
    
    console.log(`noun1: ${currentNoun1}, nounIndex: ${currentNoun1Index}
    verb: ${currentVerb}, verbIndex: ${currentVerbIndex}
    Adjective: ${currentAdj}, adjIndex: ${currentAdjIndex}
    noun2: ${currentNoun2}, noun2Index: ${currentNoun2Index}
    setting: ${currentSetting}, settingIndex: ${currentSettingIndex}`);

}
let updateHighlightedRow = (index, className, col)=> {
    workingCol = document.getElementById(`col:${col}-row:${index}`);
    highlightSelectedColumn(workingCol, className);
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
}
let updateAllTableRowsHighlight = () =>
{
    updateHighlightedRow(currentNoun1Index, "activeNoun1", 0);
    updateHighlightedRow(currentVerbIndex, "activeVerb", 1);
    updateHighlightedRow(currentAdjIndex, "activeAdj", 2);
    updateHighlightedRow(currentNoun2Index, "activeNoun2", 3);
    updateHighlightedRow(currentSettingIndex, "activeSetting", 4);
}
let Init = () => {
    populateVoiceList();
    buildTable();
    CallUpdateButtonText();
    updateAllTableRowsHighlight();
pitch.value = 1;
rate.value = 1;
defaultOption.checked = true;
}

let PlaybackClick = () => {
   outPutText();  
}
let buildSentenceElement = (phrase, index) => {
     let tempP = document.createElement("p");
     tempP.textContent = phrase;
     tempP.id=`para:${index}`
    return tempP;
}
let outPutText = async() =>{
    while(synth.pending){
        if(synth.speaking){

        
            synth.cancel();
             removeSpeakingClasses();
        }
             
    }
   
const radioButtons = document.querySelectorAll('input[name="say&HighLight"]');
  console.log(radioButtons);
let rbValue;
for (const radioButton of radioButtons) {
  if (radioButton.checked) {
    rbValue = radioButton.value;
    console.log(rbValue);
  }}
  let phrase1 = ` ${currentNoun1.slice(0, 1) + currentNoun1.slice(1, currentNoun1.length).toLowerCase()} `;
     let phrase2 = ` ${currentVerb.toLowerCase()} `;
     let phrase3 =` ${currentAdj.toLowerCase()} `;
     let phrase4 =` ${currentNoun2.toLowerCase()} `;
     let phrase5 =` ${currentSetting.toLowerCase()}`

  if(rbValue == 0){
      
       let sentense = `${phrase1} ${phrase2} ${phrase3} ${phrase4} ${phrase5}.`;
    output.textContent = sentense;
     saySentense(sentense);
  }
  if(rbValue ==1){
    let speechIndex =0;
    let mainP = document.getElementById("story");
     while (mainP.firstChild) {
        mainP.removeChild(mainP.firstChild);
    }
    
    
    let CurrentParagraph;
    let tempSection = document.createElement("section");
    tempSection.appendChild(buildSentenceElement(phrase1,0));
    tempSection.appendChild(buildSentenceElement(phrase2,1));
    tempSection.appendChild(buildSentenceElement(phrase3,2));
    tempSection.appendChild(buildSentenceElement(phrase4,3));
    tempSection.appendChild(buildSentenceElement(`${phrase5}.`,4));
    output.appendChild(tempSection);
    noun1ToSpeak = document.getElementById(`col:0-row:${currentNoun1Index}`);
    verbToSpeak = document.getElementById(`col:1-row:${currentVerbIndex}`);
    adjToSpeak = document.getElementById(`col:2-row:${currentAdjIndex}`);
    noun2ToSpeak = document.getElementById(`col:3-row:${currentNoun2Index}`);
    settingToSpeak = document.getElementById(`col:4-row:${currentSettingIndex}`);
    document.getElementById("para:0").style.backgroundColor = "limeGreen";
    noun1ToSpeak.classList.toggle(`${'speaking'}`);
    playbackButton.disabled = true;
    randomButton.disabled = true;

    saySentense(phrase1).then(() => { 
        noun1ToSpeak.classList.remove(`${'speaking'}`);
        document.getElementById("para:0").style.backgroundColor = "transparent";
        document.getElementById("para:1").style.backgroundColor = "limeGreen";
        verbToSpeak.classList.toggle(`${'speaking'}`);
        saySentense(phrase2).then(() => {
            verbToSpeak.classList.remove(`${'speaking'}`);
            document.getElementById("para:1").style.backgroundColor = "transparent";
            document.getElementById("para:2").style.backgroundColor = "limeGreen";
            adjToSpeak.classList.toggle(`${'speaking'}`);
            saySentense(phrase3).then(() =>{
                adjToSpeak.classList.remove(`${'speaking'}`);
                document.getElementById("para:2").style.backgroundColor = "transparent";
                document.getElementById("para:3").style.backgroundColor = "limeGreen";
                noun2ToSpeak.classList.toggle(`${'speaking'}`);
                    saySentense(phrase4).then(() => {
                    noun2ToSpeak.classList.remove(`${'speaking'}`);
                    document.getElementById("para:3").style.backgroundColor = "transparent";
                    document.getElementById("para:4").style.backgroundColor = "limeGreen";
                    settingToSpeak.classList.toggle(`${'speaking'}`);
                    saySentense(phrase5).then(() => {
                        settingToSpeak.classList.remove(`${'speaking'}`);
                        document.getElementById("para:4").style.backgroundColor = "transparent";
                         playbackButton.disabled = false;
    randomButton.disabled = false;
                    })
                })
            })
        })
    })

}}

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
    updateAllTableRowsHighlight();
    pitch.value = 1;
rate.value = 1;
pitchValue.textContent = 1;
rateValue.textContent = 1;
defaultOption.checked = true;
playbackButton.disabled = false;
    randomButton.disabled = false;
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
    updateAllTableRowsHighlight();


}
//
let saySentense = (sentense) => {
    return new Promise((resolve, reject) => {
        
         sentense = sentense.toLowerCase();
      let utterThis = new SpeechSynthesisUtterance(sentense);
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
        }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis); 
    utterThis.addEventListener("end", () => {
        console.log('speaking Done');
        resolve();
    }) 
    utterThis.addEventListener("cancel", () => {
   removeSpeakingClasses();
reject();
    })
    });     
}
let removeSpeakingClasses = () =>
{
    if(noun1ToSpeak)noun1ToSpeak.classList.remove(`${'speaking'}`);

         if(verbToSpeak)verbToSpeak.classList.remove(`${'speaking'}`);
         if(adjToSpeak)adjToSpeak.classList.remove(`${'speaking'}`);
         if(noun2ToSpeak)noun2ToSpeak.classList.remove(`${'speaking'}`);
         if(settingToSpeak) settingToSpeak.classList.remove(`${'speaking'}`);
}
     

pitch.onchange = function () {
    pitchValue.textContent = pitch.value;
}

rate.onchange = function () {
    rateValue.textContent = rate.value;
}


let addNewWord = (array, word, url, ) =>
{
    
let flatArray = array.flat();
let set = new Set(flatArray);
if(!set.has(word) && word)
{ 

array.push([word,url]);

}
}
let highlightSelectedColumn = (workingCol,className) => {
    oldCell = document.getElementsByClassName(`${className}`).item(0);
    if (oldCell) {
        oldCell.classList.remove(`${className}`);

    }
    workingCol.classList.toggle(`${className}`);
}


/* Event Listeners
-------------------------------------------------- */
for (let i = 0; i < tableButtons.length; i++) {
    console.log(tableButtons[i]);
    tableButtons[i].addEventListener('click', clickedTdButton, false);
}
playbackButton.addEventListener('click', PlaybackClick, false);

randomButton.addEventListener('click', randomStory, false);


resetButton.addEventListener('click', reset, false);


Init();