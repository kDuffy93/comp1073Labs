// STEP 1: Open the Lab 4 HTML page in a browser tab and open up the console.
// STEP 2a: Build an HTML element of your choice inside the HTML file for this lab to display the value of the variable i (the counter inside the loop below) as it counts down from 10 to 0.
// STEP 2b: create a constant to refer to the HTML element that you just created using querySelector().
const output = document.getElementById("countdownDisplay");
const imgs = document.getElementsByTagName("img");
let rocket1 = document.getElementById("rocket1");
let rocket2 = document.getElementById("rocket2");
let rocket3 = document.getElementById("rocket3");
let rocket4 = document.getElementById("rocket4");
let rocket5 = document.getElementById("rocket5");
let rocket6 = document.getElementById("rocket6");
let rocket7 = document.getElementById("rocket7");
let selectedRocket;
let rocket1Height = 0;
let rocket2Height = 0;
let rocket3Height = 0;
let rocket4Height = 0;
let rocket5Height = 0;
let rocket6Height = 0;
let rocket7Height = 0;
const newBackgroundCheckbox = document.getElementById("newBackground");
const backgroundChange = document.getElementById("changeBackground");

// The below for loop counts down every second from 10 to 0, using the setTimeout() function.
let countdown = async () => {

	for (let i = 10; i >= 0; i--) {
		setTimeout(function () {
			// STEP 4: Build a switch statement to change the background color of the page to yellow (from 8-5), to orange (from 4-1), and finally to red (at 0).
			switch (i) {
				case 8: case 7: case 6: case 5: output.style.backgroundColor = "#f9ff45"; break;
				case 4: output.style.backgroundColor = "#ff9c12"; break;
				case 3: case 2: case 1: for (const img of imgs) {	
					img.src = "imgs/rocketshipAboutToLaunch.png" ;
				};break;
				case 0: output.style.backgroundColor = "#ff1212"; break;
				default: output.style.backgroundColor = "#32ff2b";
			}
			// STEP 3: Add a condition with an IF statement that checks if the variable i is equal to zero - and if it is, output "Blastoff" to the HTML element you created above, otherwise just output the value of i.
			if (i === 0) {
				output.innerText = `Blastoff`;
			}
			else {
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

let switchImg = async (loopIteration) => {
	await delay(30);
	//	console.log(x);
	return new Promise(resolve => {
		if (loopIteration % 2 == 0) {
			for (const img of imgs) {
				img.src = "imgs/rocketLaunching.png";
				resolve();
			}
		}
		else {
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
let increaseRocketHeights = async (iteration) => {
	return new Promise(resolve => {
		 console.log(iteration);
		for (let i = 0; i < 8; i++) {
			let randomAmount = (getRandomNumBetween(.1*iteration+1, 10*iteration+1) / getRandomNumBetween(250, 1500+i));
			console.log(`randomAmount${i}:${randomAmount}`);
			if (randomAmount < 0) randomAmount *= (-1);
			console.log(`randomAmount${i}Neg:${randomAmount}`);
		switch (i) {
			case 0: rocket1Height += randomAmount; console.log(rocket7Height); rocket1.style.transform = `translate3d(0, -${Number(rocket1Height) * .7996065}vh, 0)`;break;
			case 1: rocket2Height += randomAmount; console.log(rocket2Height); rocket2.style.transform = `translate3d(0, -${rocket2Height * .7996065}vh, 0)`; break;
			case 2: rocket3Height += randomAmount; console.log(rocket3Height); rocket3.style.transform = `translate3d(0, -${rocket3Height * .7996065}vh, 0)`; break;
			case 3: rocket4Height += randomAmount; console.log(rocket4Height); rocket4.style.transform = `translate3d(0, -${rocket4Height * .7996065}vh, 0)`; break;
			case 4: rocket5Height += randomAmount; console.log(rocket5Height); rocket5.style.transform = `translate3d(0, -${rocket5Height * .7996065}vh, 0)`; break;
			case 5: rocket6Height += randomAmount; console.log(rocket6Height); rocket6.style.transform = `translate3d(0, -${rocket6Height * .7996065}vh, 0)`; break;
			case 6: rocket7Height += randomAmount; console.log(rocket7Height); rocket7.style.transform = `translate3d(0, -${rocket7Height * .7996065}vh, 0)`;  break;
			default: console.log(`default from switch`); 
		}
	}		
		resolve();
	})	
};









let blastoff = async () => {
	output.disabled = true;
	rocket1Height = 0;  rocket2Height = 0;  rocket3Height = 0;  rocket4Height = 0;  rocket5Height = 0;  rocket6Height =0; rocket7Height = 0;
	let doIteration = 0;
	do {
		await switchImg(doIteration);
		doIteration++;
		await increaseRocketHeights(doIteration);
			rocket1Height > rocket2Height ? (rocket1.classList.add('winning'), rocket2.classList.remove('winning'), rocket2.classList.add('losing'), rocket1.classList.remove('losing')) : (rocket2.classList.add('winning'), rocket1.classList.remove('winning'), rocket1.classList.add('losing'), rocket2.classList.remove('losing'));
	} while (rocket1Height < 100 && rocket2Height < 100 && rocket3Height < 100 && rocket4Height < 100 && rocket5Height < 100 && rocket6Height < 100 && rocket7Height < 100);

	rocket1.classList.remove('winning');
	rocket1.classList.remove('losing');
	rocket2.classList.remove('winning');
	rocket2.classList.remove('losing');




	if (rocket1Height >= 100 && rocket1Height > rocket2Height) {
		for (const img of imgs) {
			img.id == "rocket1" ? img.src = "imgs/rocketshipWinEnd.png" : img.src = "imgs/rocketshipLoseEnd.png";

		}
	}
	if (rocket2Height >= 100 && rocket2Height > rocket1Height) {
		for (const img of imgs) {
			console.log(img.id);
			console.log(img.src);
			img.id == "rocket2" ? img.src = "imgs/rocketshipWinEnd.png" : img.src = "imgs/rocketshipLoseEnd.png";
			console.log(img.src);
		}
	}




};



let countdownCall = async () => {
	removeImgEvents();
	rocket1 = document.getElementById("rocket1");
	rocket2 = document.getElementById("rocket2");
	rocket3 = document.getElementById("rocket3");
	rocket4 = document.getElementById("rocket4");
	rocket5 = document.getElementById("rocket5");
	rocket6 = document.getElementById("rocket6");
	rocket7 = document.getElementById("rocket7");
	output.disabled = true;
	countdown();
	await delay(10250);
	await blastoff();
	output.removeEventListener("click", countdownCall);
	output.addEventListener("click", startNewGame);
	output.innerHTML = `click to reset`;
	output.disabled = false;
}
let startNewGame = () => {
	output.removeEventListener("click", startNewGame);
	if (newBackgroundCheckbox.checked == true) getNewBackground();
	addImgEvents2();
	rocket1.style.transform = `translate3d(0, 0, 0)`;
	rocket2.style.transform = `translate3d(0, 0, 0)`;
	rocket3.style.transform = `translate3d(0, 0, 0)`;
	rocket4.style.transform = `translate3d(0, 0, 0)`;
	rocket5.style.transform = `translate3d(0, 0, 0)`;
	rocket6.style.transform = `translate3d(0, 0, 0)`;
	rocket7.style.transform = `translate3d(0, 0, 0)`;

	for (const img of imgs) {
		img.src = "imgs/rocketship.png";

	}

	


	removeAllrocketClasses();
	selectedRocket = undefined;
	
	output.textContent = `Click here after you pick a rocket`;
	output.style.backgroundColor = "unset";
	//output.style.setProperty('background-color', 'initial');
	output.addEventListener("click", countdownCall);
};


let removeAllrocketClasses = () => {
	rocket1.classList.remove('selected');
	rocket2.classList.remove('selected');
	rocket3.classList.remove('selected');
	rocket4.classList.remove('selected');
	rocket5.classList.remove('selected');
	rocket6.classList.remove('selected');
	rocket7.classList.remove('selected');
};



let getNewBackground = () => {

	let newUrl = String(`url(` + `'imgs/backgrounds/background (${Math.floor(Math.random() * 211)}).jpg')`);
	console.log(newUrl);
	document.body.style.backgroundImage = newUrl;
	console.log('should have just changed the background');
}
output.addEventListener("click", countdownCall);
backgroundChange.addEventListener("click", getNewBackground);
console.log('the event listner was just added to the h1');







/*
let addImgEvents = () =>{
	for (const img of imgs) {
		img.addEventListener("click", () => {
			selectedRocket = img.id;
			console.log(selectedRocket);
			output.disabled = false;
		});
}
}
*/

let addImgEvents2 = () => {
	output.disabled = true;
	for (const img of imgs) {
		img.addEventListener("click", () => {
			selectThisRocket(img.id);
		});
	}
}







let selectThisRocket = (id) => {
	output.disabled = false;
	for (const img of imgs) {
		img.removeAttribute('class');
		img.classList.add('rocket');
	}
	let tempEle = document.getElementById(id);
	tempEle.classList.add('selected');
}








let removeImgEvents = () => {
	for (const img of imgs) {
		var tempImg = img.cloneNode(true);
		img.parentNode.replaceChild(tempImg, img);
	}
}


addImgEvents2();
















