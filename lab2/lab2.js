
		// Get all the list items for the various airports
		const airportListItems = document.getElementsByTagName('li');
		// Create a new array to hold just the text in the list items
		let airports = new Array();
		
		// Loop through the list items, and for each one, extract the text and add it to the airports array
		for(let i = 0; i < airportListItems.length; i++) {
				airports.push(airportListItems[i].textContent);
		}
		
		// Delete all the existing list items so we can create new ones
		const airportUL = document.querySelector('body ul');
		airportUL.innerHTML = '';
		let totalNameLength = 0;
		let NumberofListItems = 0;
		// Loop through the airports array
		for(let i = 0; i < airports.length; i++) {
				let input = airports[i];
				/* LAB 2: Put your own code here…
				-------------------------------------------------- */
				// 1. Find the character index of the comma (use the above variable, input), and assign it to a variable called commaLocation
			let commaLocation = input.indexOf(',');
			
				// 2. Obtain the full name of the airport using the comma character index number as a reference point, and store it in a new variable (called airportName)
				let airportName = input.slice(0, commaLocation);
				totalNameLength += airportName.length;
				NumberofListItems++;
			console.log(airportName);
				// 3. Capture the international airport code at the end of the string, and store it as a variable (called airportCode) (hint - you will need .length and .slice)
				let airportCode = input.slice(input.length - 3);
console.log(airportCode);
				// 4. Get the Google Maps short URL from the string, using the character index number of the comma (use above var, commaLocation), and store it as a variable, called googleUrl
			let googleUrl = input.slice(commaLocation +2, input.length -4);
			console.log(googleUrl);
				// 5. Build a new string that is an HTML hyperlink, using the Google Maps URL (googleUrl) as the href, the airport code (airportCode), a dash (-), the airport name (airportName), and set it as the value of the result variable (var result = ...) (hint - use concatenation to build out each part of the HTML anchor element, taking care to use the right quotes)
				if (airportName.indexOf('alert') != -1) {
				airportName = '<img src=x onerror="alert(\'Hacked\')">';
			}
				let result = document.createElement('a');
			result.href = googleUrl;
			result.innerText = `${airportCode} - ${airportName}`;
				/* ----------------------------------------------- */
				// Create a new list item element
				let listItem = document.createElement('li');
				
				// Inject the new anchor element inside the list item element
				listItem.appendChild(result);
				airportUL.appendChild(listItem);
				let body = document.querySelector('body');
				if(i === airports.length -1)
				{
					let paraElem = document.createElement('p');
					paraElem.textContent = `The average number of letters in all the Airport names listed rounded to two significant digits is: ${(totalNameLength / NumberofListItems).toFixed(2)}`;
					body.appendChild(paraElem);
				}
		}
