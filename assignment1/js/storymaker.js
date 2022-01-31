// Assignment 1 | COMP1073 Client-Side JavaScript

/* planned Features
1. text inputs when on WORDS game type for each column to type in a letter. only accepts a single letter. as soon as they type it the index changes, the input blanks out and focus goes to the next column. if its the last text input then change focus to the see n say my word. 

1. text input override for words. if this is selected, hide 4 table rows, table head and table foot, possibly the random button and change the onclick function of the table buttons to put the value of it into a textbox that also accepts normal typing. when say my word or random button are clicked use the input from the textbox as their word or phrase to check. 

3. build the math page and make it work

4. style an animation when the page loags so that it zooms in from a closed book to look like its being set down, then zoom in(pick it up) and transition(page flip) to the first page. the "story game". then change the story, words and math radio buttons to display in the top corners of the page as flip page icons. when on page one you can only flip to the right, when on page 3 only the left. 

*/

/* Variables
-------------------------------------------------- */
var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select');
var voices = [];
let letterArray = [[`blank`, `img/space.PNG`],[`space`, `img/space.PNG`],[`A`, `img/A.PNG`], [`B`, `img/B.PNG`], [`C`, `img/C.PNG`], [`D`, `img/D.PNG`], [`E`, `img/E.PNG`], [`F`, `img/F.PNG`], [`G`, `img/F.PNG`], [`H`, `img/H.PNG`], [`I`, `img/I.PNG`], [`J`, `img/J.PNG`], [`K`, `img/K.PNG`], [`L`, `img/L.PNG`], [`M`, `img/M.PNG`], [`N`, `img/N.PNG`], [`O`, `img/O.PNG`], [`P`, `img/P.PNG`], [`Q`, `img/Q.PNG`], [`R`, `img/R.PNG`], [`S`, `img/S.PNG`], [`T`, `img/T.PNG`], [`U`, `img/U.PNG`], [`V`, `img/V.PNG`], [`W`, `img/W.PNG`], [`X`, `img/X.PNG`], [`Y`, `img/Y.PNG`], [`Z`, `img/Z.PNG`]];

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
const defaultOption = document.getElementById('justSay');
const defaultGame = document.getElementById('storyRadio');
let noun1ToSpeak;
let verbToSpeak;
let adjToSpeak;
let noun2ToSpeak;
let settingToSpeak;
const resetButton = document.getElementById('resetButton');
const randomButton = document.getElementById('randomButton');
const playbackButton = document.getElementById('playback');
const tableButtons = document.getElementsByClassName('tableButton');
let currentType = 'story'
let returnresult = false;
let topSuggestion = '';
let topSuggestionDescription;
let defs = 'none';

/* Functions
-------------------------------------------------- */
//updates a buttons text dependent on the parameters passed


async function bingSpellCheck(query) {

// try returning a promis from here to make this async
returnresult = false;
    topSuggestion = '';
    defs = 'none';
//for bing search
    let queryWithoutSpaces =  query.replace(/\s/g, '');
    let key = '6bdc2537efc14c85a175ff46478264ca'//bingsearchkey
    var endpoint = "https://api.bing.microsoft.com/v7.0/spellcheck/";//bing endpoint
    let query_string = "?mode=proof&mkt=en-US&text=";//bing query string
//for datamuse
    let datamuseEndpoint = "https://api.datamuse.com";
    let datamusespanishVocabulary = '&v=es';
    let datamuseCloseRhymeQueryString = `/words?rel_nry=${queryWithoutSpaces}&max=10&md=fp`;// close rhymes to the word
    let datamuseHomophonesQueryString = `/words?rel_hom=${query}&max=10&md=fp`;// homophones of the entered text(sound-alike)
    let datamuseSoundsLikeQueryString = `/words?sl=${query}&max=30&md=fpd`;// words that sound like the query
    let datamuseSpelledLikeQueryString = `/words?sp=${query}&max=30&md=fpd`;// words that are spelled like the query
    let datamuseMatchingConstsQueryString = `/words?rel_cns=${queryWithoutSpaces}&max=10&md=fp`;// close words that have matching constnants

// datamuse fetches
    const datamuseSoundsLikeReq = await fetch(`${datamuseEndpoint}${datamuseSoundsLikeQueryString}`, {
        method: "GET",
        withCredentials: false,
    });
    const datamuseSpelledLikeReq = await fetch(`${datamuseEndpoint}${datamuseSpelledLikeQueryString}`, {
        method: "GET",
        withCredentials: false,
    });

    
    //if its a word this wil have a value
    const datamuseSoundsLikeJson = await datamuseSoundsLikeReq.json();
    //if not lets build a suggestions set, multiplying the scores together from each if theres a duplicate. 
    const datamuseSpelledLikeJson = await datamuseSpelledLikeReq.json();
     let wordSet = new Set();
     let wordDefs = new Set();
    for (let i = 0; i < datamuseSoundsLikeJson.length; i++) {
       
        console.log(`object ${i} - ${Object.keys(datamuseSoundsLikeJson[i])[0]}: ${Object.values(datamuseSoundsLikeJson[i])[0]} - ${Object.keys(datamuseSoundsLikeJson[i])[1]}: ${Object.values(datamuseSoundsLikeJson[i])[1]} -  ${Object.keys(datamuseSoundsLikeJson[i])[2]}: ${Object.values(datamuseSoundsLikeJson[i])[2]} -  ${Object.keys(datamuseSoundsLikeJson[i])[3]}: ${Object.values(datamuseSoundsLikeJson[i])[3]}-  ${Object.keys(datamuseSoundsLikeJson[i])[4]}: ${Object.values(datamuseSoundsLikeJson[i])[4]}`);


        let tags =  JSON.stringify(Object.values(datamuseSoundsLikeJson[i])[3]);
let indexOff = tags.indexOf(':');
let frequency = tags.slice(indexOff+1,indexOff+9);
        if (String(Object.values(datamuseSoundsLikeJson[i])[0]).toLowerCase() == String(query)){
                returnresult = true;
            return;
            }


       


        let tempObj = { [Object.values(datamuseSoundsLikeJson[i])[0]]: (Number(Object.values(datamuseSoundsLikeJson[i])[1]) * frequency)};
        if (wordSet.has(Object.values(datamuseSoundsLikeJson[i])[0]))
        {
            console.log('double');
            wordSet.Object.values(datamuseSoundsLikeJson[i])[0] *= ((1+Number(Object.values(datamuseSoundsLikeJson[i])[1])*frequency));
            
        }
        if (!wordSet.has(Object.values(datamuseSoundsLikeJson[i])[0])) {
            wordSet.add(tempObj);
        }
       
        }
  if (datamuseSpelledLikeJson.length > 0){
        for (let i = 0; i < datamuseSpelledLikeJson.length; i++) {

            let tags = JSON.stringify(Object.values(datamuseSpelledLikeJson[i])[2]);
            let indexOff = tags.indexOf(':');
            console.log(tags.slice(indexOff+1, indexOff+9));
            let frequency = tags.slice(indexOff+1, indexOff + 9);

          
            
console.log(query);

            if (String(Object.values(datamuseSpelledLikeJson[i])[0]).toLowerCase() == String(query).toLowerCase()) {
                returnresult = true;
                defs = Object.values(datamuseSpelledLikeJson[i])[3];
               return;
        }

            
            if (wordSet.has(Object.values(datamuseSpelledLikeJson[i])[0])) {
                console.log('double');
                wordSet.Object.values(datamuseSpelledLikeJson[i])[0] *= ((1 + Number(Object.values(datamuseSpelledLikeJson[i])[1])) * frequency);
               // wordSet[Object.values(datamuseSpelledLikeJson[i])[0]] *= (1+Number(Object.values(datamuseSpelledLikeJson[i])[1]));
            }
            if (!wordSet.has(Object.values(datamuseSoundsLikeJson[i])[0])) {
               // wordSet[Object.values(datamuseSpelledLikeJson[i])[0]] = Number(Object.values(datamuseSpelledLikeJson[i])[1]);
                wordSet.add({ [Object.values(datamuseSpelledLikeJson[i])[0]]: (Number(Object.values(datamuseSpelledLikeJson[i])[1]) * frequency)});
            }
    }

  }
    
        if(!returnresult){
    
      // find the biggest number in the word set and return the corrosponsing word. 
      
     
            /*
            wordSet.forEach(function (value, Key) {  
                console.log(`key:${key}value:${value[0]}`);
               if(Number(value) > largestNumber)
               {
                   topSuggestion = value.key;
                   largestNumber = value.values;
               } 
            });*/
            const iterator1 = wordSet.entries();
           let biggestScore = 0;
            for (const array of iterator1) {
                for (const obj of array) {
                    console.log(obj);
                   let currentWord = String(Object.keys(obj));
                   let currentScore = Number(Object.values(obj));

                    console.log(`${String(Object.keys(obj))}     ${Number(Object.values(obj))}`);
                   if(currentScore > biggestScore){
                       console.log(currentWord.length);
                       if (currentWord.length < 6){
                       biggestScore = currentScore;
                       topSuggestion = currentWord;
                       
                       
                       }
                     //  topSuggestionDescription = currentDescription;
                   }
            }
        }

    }

   
    /* //bing xml request
    var request = new XMLHttpRequest();
    
    try {
        request.open("get", endpoint + query_string + encodeURIComponent(query));
    }
    catch (e) {
        renderErrorMessage("Bad request");
    }

      request.setRequestHeader("Ocp-Apim-Subscription-Key", key);
    request.addEventListener("load", function () {
// this might be messed up
          if (this.status === 200) {
            let result = JSON.stringify(this.responseText);
            console.log('result' + result);
              returnresult = result;
         
        }
        else {
            if (this.status === 401) 
                console.log('failed');
            console.log(this.statusText+ '         ' + this.status);
        }
    });    
  
        
    });
    request.addEventListener("error", function () {
        renderErrorMessage("Network error");
    });

    request.addEventListener("abort", function () {
        renderErrorMessage("Request aborted");
    });

    request.send();   
    */
//bing fetch request
 /*   const response = await fetch(`${endpoint}${query_string}${encodeURIComponent(query)}`, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Ocp-Apim-Subscription-Key": key
        }});

    console.log('result' + JSON.stringify(response));

        if (response.status === 200) {
            let result = JSON.stringify(response.responseText);
            console.log('result' + result);
            returnresult = result;
        }
        else {
               if (response.status === 401)
                console.log('failed');
            console.log(response.statusText + '         ' + response.status);
               fetchReturn = false;
        } */
}



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
            if(currentType == 'story'){
            currentNoun1 = noun1Array[currentNoun1Index][0];
            currentVerb = verbArray[currentVerbIndex][0];
            currentAdj = adjArray[currentAdjIndex][0];
            currentNoun2 = noun2Array[currentNoun2Index][0];
            currentSetting = settingArray[currentSettingIndex][0];
            }
            if (currentType == 'word') {
                currentNoun1 = letterArray[currentNoun1Index][0];
                currentVerb = letterArray[currentVerbIndex][0];
                currentAdj = letterArray[currentAdjIndex][0];
                currentNoun2 = letterArray[currentNoun2Index][0];
                currentSetting = letterArray[currentSettingIndex][0];
            }
            
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
        
        if (currentType == 'story') {
        UpdateButtonText('noun1', noun1Array, currentNoun1Index);
        }
        if (currentType == 'word') {
            UpdateButtonText('noun1', letterArray, currentNoun1Index);
        }
        break;
    case "verb":
        if (currentType == 'story') {
            UpdateButtonText('verb', verbArray, currentVerbIndex);
        }
        if (currentType == 'word') {
            UpdateButtonText('verb', letterArray, currentVerbIndex);
        }
      
        break;
    case 'adjective':
        if (currentType == 'story') {
            UpdateButtonText('adjective', adjArray, currentAdjIndex);
        }
        if (currentType == 'word') {
            UpdateButtonText('adjective', letterArray, currentAdjIndex);
        }
        break;
    case 'noun2':
        if (currentType == 'story') {
            UpdateButtonText('noun2', noun2Array, currentNoun2Index);
        }
        if (currentType == 'word') {
            UpdateButtonText('noun2', letterArray, currentNoun2Index);
        }
        break;
    case 'setting': 
        if (currentType == 'story') {
            UpdateButtonText('setting', settingArray, currentSettingIndex);
                }
        if (currentType == 'word') {
            UpdateButtonText('setting', letterArray, currentSettingIndex);
        }
        
        break;
    default:

        if (currentType == 'story') {
            UpdateButtonText('noun1', noun1Array, currentNoun1Index);
            UpdateButtonText('verb', verbArray, currentVerbIndex);
            UpdateButtonText('adjective', adjArray, currentAdjIndex);
            UpdateButtonText('noun2', noun2Array, currentNoun2Index);
            UpdateButtonText('setting', settingArray, currentSettingIndex);
            break;
        }
        if (currentType == 'word') {
            UpdateButtonText('noun1', letterArray, currentNoun1Index);
            UpdateButtonText('verb', letterArray, currentVerbIndex);
            UpdateButtonText('adjective', letterArray, currentAdjIndex);
            UpdateButtonText('noun2', letterArray, currentNoun2Index);
            UpdateButtonText('setting', letterArray, currentSettingIndex);
            break;
        }
        
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
            if (currentType == 'word')
            {
                setCurrentWords('noun1', letterArray, currentNoun1Index);
            }
            if (currentType == 'story') {
 setCurrentWords('noun1', noun1Array, currentNoun1Index);
            }
            CallUpdateButtonText('noun1');
            saySentense(currentNoun1);
            highlightSelectedColumn(workingCol, "activeNoun1");
            break;
        case 1:
            currentVerbIndex = clickedRow;
            if (currentType == 'word') {
                setCurrentWords('verb', letterArray, currentVerbIndex);
            }
            if (currentType == 'story') {
                setCurrentWords('verb', verbArray, currentVerbIndex);
            }
            CallUpdateButtonText('verb');
            saySentense(currentVerb);
            highlightSelectedColumn(workingCol,"activeVerb");
            break;
        case 2:
            currentAdjIndex = clickedRow;
            if (currentType == 'word') {
                setCurrentWords('adjective', letterArray, currentAdjIndex);
            }
            if (currentType == 'story') {
                setCurrentWords('adjective', adjArray, currentAdjIndex);
            }
            CallUpdateButtonText('adjective');
            saySentense(currentAdj);
            highlightSelectedColumn(workingCol, "activeAdj");
            break;
        case 3:
            currentNoun2Index = clickedRow;
            if (currentType == 'word') {
                setCurrentWords('noun2', letterArray, currentNoun2Index);
            }
            if (currentType == 'story') {
                setCurrentWords('noun2', noun2Array, currentNoun2Index);
            }
            CallUpdateButtonText('noun2');
            saySentense(currentNoun2);
            highlightSelectedColumn(workingCol, "activeNoun2");
            break;
        case 4:
            currentSettingIndex = clickedRow;
            if (currentType == 'word') {
                setCurrentWords('setting', letterArray, currentSettingIndex);
            }
            if (currentType == 'story') {
                setCurrentWords('setting', settingArray, currentSettingIndex);
            }
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
           
            updateAllTableRowsHighlight();
            break;
        case "nverb":
             word = document.getElementById("newVerbTxt").value.toUpperCase();
             url = document.getElementById("newVerbURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(verbArray, word, url);
            buildTable(currentType);
            updateAllTableRowsHighlight();
            break;
        case "nadjective":
             word = document.getElementById("newAdjTxt").value.toUpperCase();
             url = document.getElementById("newAdjURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(adjArray, word, url);
            buildTable(currentType);
            updateAllTableRowsHighlight();
            break;
        case "nnoun2":
             word = document.getElementById("newNoun2Txt").value.toUpperCase();
             url = document.getElementById("newNoun2URL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(noun2Array, word, url);
            buildTable(currentType);
            updateAllTableRowsHighlight();
            break;
        case "nsetting":
             word = document.getElementById("newSettingTxt").value.toUpperCase();
             url = document.getElementById("newSettingURL").value;
            console.log(`name: ${word}   url: ${url}`);
            addNewWord(settingArray, word, url);
            buildTable(currentType);
            updateAllTableRowsHighlight();
            break;
        case "noun1": 
            currentNoun1Index ++;
            if (currentType == 'word') {
                if (currentNoun1Index >= letterArray.length) {
                    currentNoun1Index = 0;
                }
                setCurrentWords('noun1', letterArray, currentNoun1Index);
            }
            if (currentType == 'story') {
                if (currentNoun1Index >= noun1Array.length) {
                    currentNoun1Index = 0;
                }
                setCurrentWords('noun1', noun1Array, currentNoun1Index);
            }
            CallUpdateButtonText('noun1');
            saySentense(currentNoun1);
            updateHighlightedRow(currentNoun1Index, "activeNoun1",0);
            break;
        case "verb": 
        currentVerbIndex++;
            
            if (currentType == 'word') {
                if (currentVerbIndex >= letterArray.length) {
                    currentVerbIndex = 0;
                }
                setCurrentWords('verb', letterArray, currentVerbIndex);
            }
            if (currentType == 'story') {
                if (currentVerbIndex >= verbArray.length) {
                    currentVerbIndex = 0;
                }
                setCurrentWords('verb', verbArray, currentVerbIndex);
            }
        
            CallUpdateButtonText('verb');
            saySentense(currentVerb);
            updateHighlightedRow(currentVerbIndex, "activeVerb",1);
            break;
        case "adjective": currentAdjIndex++;
            

            if (currentType == 'word') {
                if (currentAdjIndex >= letterArray.length) {
                    currentAdjIndex = 0;
                }
                setCurrentWords('adjective', letterArray, currentAdjIndex);
            }
            if (currentType == 'story') {
                if (currentAdjIndex >= adjArray.length) {
                    currentAdjIndex = 0;
                }
                setCurrentWords('adjective', adjArray, currentAdjIndex);
            }

           
            CallUpdateButtonText('adjective');
            saySentense(currentAdj);
            updateHighlightedRow(currentAdjIndex, "activeAdj",2);
            break;
        case "noun2": currentNoun2Index++;
            if (currentType == 'word') {
                if (currentNoun2Index >= letterArray.length) {
                    currentNoun2Index = 0;
                }
                setCurrentWords('noun2', letterArray, currentNoun2Index);
            }
            if (currentType == 'story') {
                if (currentNoun2Index >= noun2Array.length) {
                    currentNoun2Index = 0;
                }
                setCurrentWords('noun2', noun2Array, currentNoun2Index);
            }
           
            CallUpdateButtonText('noun2');
            saySentense(currentNoun2);
            updateHighlightedRow(currentNoun2Index, "activeNoun2",3);
            break;
        case "setting": currentSettingIndex++;

            if (currentType == 'word') {
                if (currentSettingIndex >= letterArray.length) {
                    currentSettingIndex = 0;
                }
                setCurrentWords('setting', letterArray, currentSettingIndex);
            }
            if (currentType == 'story') {
                if (currentSettingIndex >= settingArray.length) {
                    currentSettingIndex = 0;
                }
                setCurrentWords('setting', settingArray, currentSettingIndex);
            }

          
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
const biggestArray = (type) => {
   let arrayLengths;
    if (type == 'story'){
         arrayLengths = [noun1Array.length, verbArray.length, adjArray.length, noun2Array.length, settingArray.length];
    } 
    if (type == 'word') { arrayLengths = [letterArray.length];}
   
    currentLargest = 0;
    arrayLengths.forEach(element => {
        if (Number(element) > currentLargest) {
            currentLargest = Number(element);
        }
    });
    return currentLargest;
}
//builds the initial page
let buildTable = (type) => 
{
    //find which array had the longest length that were working with to set the length of the next loop by calling the biggestArray function.
    let biggestArrayInt = biggestArray(type);
    let tBody = document.getElementById('tBody');
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    if(type=='story')
    {
    // loop, each iteration adding a new tr to the current body populating the row by calling the build element function
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
if (type == 'word'){
    for (let i = 0; i < biggestArrayInt; i++) {
        let tRow = document.createElement('tr');
        tRow.appendChild(buildElement(letterArray, i, 0));
        tRow.appendChild(buildElement(letterArray, i, 1));
        tRow.appendChild(buildElement(letterArray, i, 2));
        tRow.appendChild(buildElement(letterArray, i, 3));
        tRow.appendChild(buildElement(letterArray, i, 4));
        tBody.appendChild(tRow);
    } 
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
    if(currentType == 'word'){
         currentNoun1 = letterArray[0][0];
         currentVerb = letterArray[0][0];
         currentAdj = letterArray[0][0];
         currentNoun2 = letterArray[0][0];
         currentSetting = letterArray[0][0];
    }
    populateVoiceList();
    buildTable(currentType);
    CallUpdateButtonText();
    updateAllTableRowsHighlight();
pitch.value = 1;
rate.value = 1;
defaultOption.checked = true;
    defaultGame.checked = true;
}

let PlaybackClick = () => {
   outPutText();  
}
let buildSentenceElement = (phrase, index) => {
     let tempP = document.createElement("p");
     tempP.innerHTML = phrase;
     tempP.id=`para:${index}`
    return tempP;
}

let outPutText = async() =>{
 
        if(synth.speaking){
            synth.cancel();
             removeSpeakingClasses();
        }
             
    
   
const radioButtons = document.querySelectorAll('input[name="say&HighLight"]');
let rbValue;
for (const radioButton of radioButtons) {
  if (radioButton.checked) {
    rbValue = radioButton.value;
    console.log(rbValue);
  }}
  let phrase1 = `${currentNoun1.slice(0, 1) + currentNoun1.slice(1, currentNoun1.length).toLowerCase()}`;
     let phrase2 = `${currentVerb.toLowerCase()}`;
     let phrase3 =`${currentAdj.toLowerCase()}`;
     let phrase4 =`${currentNoun2.toLowerCase()}`;
     let phrase5 =`${currentSetting.toLowerCase()}`

for(let i = 1; i < 6; i++)
{
  console.log('infor'+i)
    if(this[`phrase${i}`] == 'space')
    {
        this[`phrase${i}`] = `&nbsp`;
    }
}

    let sentense = `${phrase1} ${phrase2} ${phrase3} ${phrase4} ${phrase5}.`;
    if (currentType === 'word') {
        sentense = String(phrase1 + phrase2 + phrase3 + phrase4 + phrase5 + '.');}

  if(rbValue == 0){
      console.log(currentType);
      if (currentType === 'story'){
          output.textContent = sentense;
          saySentense(sentense);
      }
      if (currentType === 'word') {
         
         
          phrase1 == `space` ? phrase1 = "&nbsp" : phrase1 = phrase1;
          phrase2 == `space` ? phrase2 = "&nbsp" : phrase2 = phrase2;
          phrase3 == `space` ? phrase3 = `&nbsp` : phrase3 = phrase3;
          phrase4 == `space` ? phrase4 = `&nbsp` : phrase4 = phrase4;
          phrase5 == `space` ? phrase5 = `&nbsp` : phrase5 = phrase5;
          phrase1 == `blank`  ? phrase1 = "" : phrase1 = phrase1;
          phrase2 == `blank` ? phrase2 = "" : phrase2 = phrase2;
          phrase3 == `blank` ? phrase3 = `` : phrase3 = phrase3;
          phrase4 == `blank` ? phrase4 = `` : phrase4 = phrase4;
          phrase5 == `blank`  ? phrase5 = `` : phrase5 = phrase5;

          
          sentense = String(phrase1 + phrase2 + phrase3 + phrase4 + phrase5 + '.'); 
        output.innerHTML = sentense;
          phrase1 == `&nbsp`? phrase1 = " " : phrase1 = phrase1;
          phrase2 ==  `&nbsp`? phrase2 = " " : phrase2 = phrase2;
          phrase3 ==  `&nbsp`? phrase3 = ` ` : phrase3 = phrase3;
          phrase4 ==  `&nbsp`? phrase4 = ` ` : phrase4 = phrase4;
          phrase5 ==  `&nbsp`? phrase5 = ` ` : phrase5 = phrase5;

         
      
           sentense = String(phrase1+phrase2+phrase3+phrase4+phrase5+'.'); 
          saySentense(sentense);   
                    
      }
      
       
  }
  if(rbValue ==1){
    let mainP = document.getElementById("story");
     while (mainP.firstChild) {
        mainP.removeChild(mainP.firstChild);
    }
    let tempSection = document.createElement("section");
 
    if(currentType == 'story'){
        tempSection.appendChild(buildSentenceElement(`${phrase1}  `, 0));
        tempSection.appendChild(buildSentenceElement(`${phrase2}  `, 1));
        tempSection.appendChild(buildSentenceElement(`${phrase3}  `, 2));
        tempSection.appendChild(buildSentenceElement(`${phrase4}  `, 3));
        tempSection.appendChild(buildSentenceElement(`${phrase5}.`, 4));
    }
      if (currentType == 'word') {
          phrase1 == `space` ? tempSection.appendChild(buildSentenceElement(`&nbsp`, 0)) : phrase1 == `blank` ? tempSection.appendChild(buildSentenceElement(``, 0)): tempSection.appendChild(buildSentenceElement(`${phrase1}`, 0));
          phrase2 == `space` ? tempSection.appendChild(buildSentenceElement(`&nbsp`, 1)) : phrase2 == `blank` ? tempSection.appendChild(buildSentenceElement(``, 1)) : tempSection.appendChild(buildSentenceElement(`${phrase2}`, 1));
          phrase3 == `space` ? tempSection.appendChild(buildSentenceElement(`&nbsp`, 2)) : phrase3 == `blank` ? tempSection.appendChild(buildSentenceElement(``, 2)) : tempSection.appendChild(buildSentenceElement(`${phrase3}`, 2));
          phrase4 == `space` ? tempSection.appendChild(buildSentenceElement(`&nbsp`, 3)) : phrase4 == `blank` ? tempSection.appendChild(buildSentenceElement(``, 3)) : tempSection.appendChild(buildSentenceElement(`${phrase4}`, 3));
          phrase5 == `space` ? tempSection.appendChild(buildSentenceElement(`&nbsp.`, 4)) : phrase5 == `blank` ? tempSection.appendChild(buildSentenceElement(`.`, 4)) : tempSection.appendChild(buildSentenceElement(`${phrase5}.`, 4));
      }
      
    output.appendChild(tempSection);
      phrase1 == 'blank' ? phrase1 = '': phrase1 = phrase1;
       phrase2 == 'blank' ? phrase2 = '': phrase2 = phrase2;
      phrase3 == 'blank' ? phrase3 = '': phrase3 = phrase3;
      phrase4 == 'blank' ? phrase4 = '': phrase4 = phrase4;
       phrase5 == 'blank' ? phrase5 = '': phrase5 = phrase5;
      
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
                        document.getElementById("para:4").style.backgroundColor = "orange";
                        document.getElementById("para:3").style.backgroundColor = "orange";
                        document.getElementById("para:2").style.backgroundColor = "orange";
                        document.getElementById("para:0").style.backgroundColor = "orange";
                        document.getElementById("para:1").style.backgroundColor = "orange";
                        if(currentType == "word"){
                           
                            phrase5 == `space` ? phrase5 = ` ` : phrase5 = phrase5;
                            phrase4 == `space` ? phrase4 = ` ` : phrase4 = phrase4;
                            phrase3 == `space` ? phrase3 = ` ` : phrase3 = phrase3;
                            phrase2 == `space` ? phrase2 = " " : phrase2 = phrase2;
                            phrase1 == `space` ? phrase1 = " " : phrase1 = phrase1;
                            sentense = String(phrase1 + phrase2 + phrase3 + phrase4 + phrase5);
                              bingSpellCheck(sentense).then(() => {
                            if (returnresult){
                                let tempPText = `Yep, it looks like ${sentense} is a word.`;
                                let tempP = document.createElement("p");
                                tempP.innerText = tempPText;
                                output.appendChild(tempP);
                                document.getElementById("para:4").style.backgroundColor = "limeGreen";
                                document.getElementById("para:3").style.backgroundColor = "limeGreen";
                                document.getElementById("para:2").style.backgroundColor = "limeGreen";
                                document.getElementById("para:0").style.backgroundColor = "limeGreen";
                                document.getElementById("para:1").style.backgroundColor = "limeGreen";
                                let tempDefinition ;
                              
                                if (typeof (defs) === "string" || typeof (defs) === "undefined"){
                                     tempDefinition = ` But I don't have any definitions for it.`;
                                }
                                if (typeof (defs) === "object") { 
                                     let wordTypeSentense = '' ;
                                   let randomDefIndex =  Math.floor(Math.random() * defs.length)
                                    console.log(`randomDefIndex: ${randomDefIndex}  defsLength: ${defs.length}`)
                                    let randomDef = defs[randomDefIndex];
                                    console.log(`randomDef: ${randomDef}`)
                                    let indexOfSeperator = randomDef.indexOf(`\t`);
                                    console.log(`indexOfSep:   ${indexOfSeperator}`);
                                    let randomDefinition = randomDef.slice(indexOfSeperator+1, randomDef.length);
                                    console.log(`rndm def: ${randomDefinition}`);
                                    wordType = randomDef.slice(0, indexOfSeperator);
                                    console.log(`wrd Type:    ${wordType}`);
                                    
                                    if(wordType.includes(',')){
                                        let indexOfComma = randomDef.indexOf(`,`);
                                        console.log(`indx Comma:  ${indexOfComma}`);
                                        wordType = randomDef.slice(0, indexOfComma - 1);
                                        console.log(`wrd Type no Comma:    ${wordType}`);
                                    }
                                    switch(wordType){
                                        case 'n': wordTypeSentense = `as a noun`; break;
                                        case 'v': wordTypeSentense = `as a verb`; break;
                                        case 'adj': wordTypeSentense = `as an adjective`; break;
                                        case 'adv': wordTypeSentense = `as an adverb`; break;
                                        case 'u': wordTypeSentense = ``; break;
                                    }
                                    console.log(`wrd Type after switch:   "${wordType}"`);
                                    defs.length == 1 ? tempDefinition = `I have ${defs.length} Definition for ${sentense}. used ${wordTypeSentense}. it means: ${randomDefinition}`: tempDefinition = `I have ${defs.length} Definitions for ${sentense}. ${wordTypeSentense}, One of them is: ${randomDefinition}`;

                                    
                                }
                                 saySentense(`Yep, it looks like ${sentense} is a word. ${tempDefinition}`).then(() => { 
                            document.getElementById("para:3").style.backgroundColor = "transparent";
                            document.getElementById("para:2").style.backgroundColor = "transparent";
                            document.getElementById("para:0").style.backgroundColor = "transparent";
                            document.getElementById("para:1").style.backgroundColor = "transparent";
                                     document.getElementById("para:4").style.backgroundColor = "transparent";
                            playbackButton.disabled = false;
                            randomButton.disabled = false;
                            })}
                            console.log('731:' + sentense);
                            if (!returnresult){
                                let tempPText = `Nope, ${ sentense } is not a word. Did you mean ${topSuggestion}?`;
                                let tempP = document.createElement("p");
                                tempP.innerText = tempPText;
                                output.appendChild(tempP);
                                console.log(topSuggestion);
                                    document.getElementById("para:3").style.backgroundColor = "red";
                                    document.getElementById("para:2").style.backgroundColor = "red";
                                    document.getElementById("para:0").style.backgroundColor = "red";
                                    document.getElementById("para:1").style.backgroundColor = "red";
                                    document.getElementById("para:4").style.backgroundColor = "red";

                                phrase1 == `space` ? phrase1 = " " : phrase1 = phrase1;
                                phrase2 == `space` ? phrase2 = " " : phrase2 = phrase2;
                                phrase3 == `space` ? phrase3 = ` ` : phrase3 = phrase3;
                                phrase4 == `space` ? phrase4 = ` ` : phrase4 = phrase4;
                                phrase5 == `space` ? phrase5 = ` ` : phrase5 = phrase5;
                                phrase1 == `blank` ? phrase1 = "" : phrase1 = phrase1;
                                phrase2 == `blank` ? phrase2 = "" : phrase2 = phrase2;
                                phrase3 == `blank` ? phrase3 = `` : phrase3 = phrase3;
                                phrase4 == `blank` ? phrase4 = `` : phrase4 = phrase4;
                                phrase5 == `blank` ? phrase5 = `` : phrase5 = phrase5;
                                sentense = String(phrase1 + phrase2 + phrase3 + phrase4 + phrase5 + '.');
                                  
                                saySentense(`Nope, ${sentense} is not a word. Did you mean ${topSuggestion}?`).then(() => {
                                        document.getElementById("para:3").style.backgroundColor = "transparent";
                                        document.getElementById("para:2").style.backgroundColor = "transparent";
                                        document.getElementById("para:0").style.backgroundColor = "transparent";
                                        document.getElementById("para:1").style.backgroundColor = "transparent";
                                        document.getElementById("para:4").style.backgroundColor = "transparent";
                                        playbackButton.disabled = false;
                                        randomButton.disabled = false;
                                    })
                                }
                            })
                        }
                        if (currentType == "story") {
                            document.getElementById("para:4").style.backgroundColor = "limegreen";
                            saySentense(`${sentense}`).then(() => {
                                document.getElementById("para:3").style.backgroundColor = "transparent";
                                document.getElementById("para:2").style.backgroundColor = "transparent";
                                document.getElementById("para:0").style.backgroundColor = "transparent";
                                document.getElementById("para:1").style.backgroundColor = "transparent";
                                document.getElementById("para:4").style.backgroundColor = "transparent";
                                playbackButton.disabled = false;
                                randomButton.disabled = false;
                            })
                        }
                        
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
playbackButton.disabled = false;
    randomButton.disabled = false;
}

let randomNumber = (below) =>
{
return Math.floor(Math.random()*below);
}

let randomStory = () => {
    if(currentType =='story'){
    currentNoun1Index = randomNumber(noun1Array.length);
    currentVerbIndex = randomNumber(verbArray.length);
    currentAdjIndex = randomNumber(adjArray.length);
    currentNoun2Index = randomNumber(noun2Array.length);
    currentSettingIndex = randomNumber(settingArray.length);
    }
    if (currentType == 'word') {
        currentNoun1Index = randomNumber(letterArray.length);
        currentVerbIndex = randomNumber(letterArray.length);
        currentAdjIndex = randomNumber(letterArray.length);
        currentNoun2Index = randomNumber(letterArray.length);
        currentSettingIndex = randomNumber(letterArray.length);
    }

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

let gameTypeRadio = document.getElementsByName("gameType");

gameTypeRadio.forEach(radioButton => {
    radioButton.addEventListener('change', function (e) {
        let mainTitle = document.getElementById("mainTitle");
        let secondaryTitle = document.getElementById("secondaryTitle");
        let myStoryButton = document.getElementById("playback"); 
        let randomStoryButton = document.getElementById("randomButton"); 

        let target = e.target;
        let tableFooter = document.getElementById("tFoot");
        let tableBody = document.getElementById("tBody");
        if (target.name == 'gameType') {
            currentType = target.value;
        }
        if (currentType == 'word') {
            tableFooter.style.display = "none";
            tableBody.style.maxHeight = "76vh";
            buildTable(currentType);
            reset();
            mainTitle.innerHTML =`<u>See-N-Say WORDmaker</u><br>Create Your own Words`;
            secondaryTitle.innerHTML = `<u>See-N-Say Your Word</u>`;
            myStoryButton.textContent = `See-N-Say My Word`;
            randomStoryButton.textContent = `See-N-Say Random Word`;
        }
        if (currentType == 'story') {
            tableFooter.style.display = "block";
            tableBody.style.maxHeight = "63vh";
            buildTable(currentType);
            reset();
            mainTitle.innerHTML = `<u>See-N-Say STORYmaker</u><br>Create Your own Stories`;
            secondaryTitle.innerHTML = `<u>See-N-Say Your Story</u>`;
            myStoryButton.textContent = `See-N-Say My Story`;
            randomStoryButton.textContent = `See-N-Say Random Story`;
        }
        if (currentType == 'math') {
            currentType = 'story'
            buildTable(currentType);
            reset();
        }
        if (target.name == 'gameType') {
            currentType = target.value;
        }

    })
});
    




Init();