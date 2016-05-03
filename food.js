var dogCall = new XMLHttpRequest();
var catCall = new XMLHttpRequest();

// Cleaning up strings
// if a space already exists in the string, split
// capitalize the first letter of each word
// join back into one string


function display (string) {
  string = string.replace(/_/g, " ");  // Remove underscores (g is for global) and replace with spaces
  if (string.indexOf(" ") !== -1) {
    string = string.split(" ").map(function(element){
      return element.charAt(0).toUpperCase() + element.slice(1);
    }).join(" ");
  } else {
    // If there's only one word, Capitalize the first letter
    string = string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};


// function display (string) {
// 	string = string.replace(/_/g, " ");  // Remove underscores (g is for global) and replace with spaces

// 	string = string.split(" ").map(function(element){
//   element.charAt(0).toUpperCase() + element.slice(1);
// 	}).join(" ");

// 	return string;
// };

function executeThisCodeAfterFileIsLoaded () {

	// JSON has to be all caps because of reasons
  // parse, this, and responseText are all ways of manipulating
  // JSON retrieved info in a manageable way
	var data = JSON.parse(this.responseText);

	var dogContainer = document.getElementById("puppyTime");


	var productInfo = ""; //have to initialize it
	var currentProduct; // don't have to initialize it this is for both puppy and kitty loops

  //***************************************************
  // Puppy Food Loopidy Loop
  //***************************************************

	if (data.dog_brands) {
		for (var i = 0; i < data.dog_brands.length; i++) { //variable names start w/ i and go on for some reason

			currentProduct = data.dog_brands[i];

      productInfo += `<div class="brandBlock">`;
      productInfo += `<h2>${currentProduct.name}</h2>`;
      productInfo += `<h3>${(currentProduct.breeds)}</h3>`; // not needed here but here if needed
      // Loop through the types array in dog_brands
      for (var j = 0; j < currentProduct.types.length; j++) {
        var currentTypes = currentProduct.types[j];
        productInfo += `<div class="productBlock">`;
        productInfo += `<h4>${display(currentTypes.type)}</h4>`; //here we implement the clean up function

        // Display name and price that are in the Volume thing
        for (var k = 0; k < currentTypes.volumes.length; k++) {
          var currentVolumes = currentTypes.volumes[k];
          productInfo += `<div class="volumeBlock">`;
          productInfo += `Size: ${currentVolumes.name} `;
          productInfo += `$${currentVolumes.price}`;
          productInfo += `</div>`; // Closing volumeBlock
				}
			productInfo += `</div>`; //Closing productBlock
			}
		productInfo += `</div>`; //Closing brandBlock
		}
		// Fill puppy container with html string
		dogContainer.innerHTML = productInfo;

	} else if (data.cat_brands) {
  //***************************************************
  // Kitty Food Loopidy Loop
  //***************************************************
	var catContainer = document.getElementById("kittyTime");

		// Loop through the cat_brands array
		for (var i = 0; i < data.cat_brands.length; i++) {
			currentProduct = data.cat_brands[i];

			productInfo += `<div class="brandBlock">`;
			productInfo += `<h2>${currentProduct.name}</h2>`;
			productInfo += `<h4>${(currentProduct.breeds)}</h4>`;
			// Loop through the types array in cat_brands
			for (var j = 0; j < currentProduct.types.length; j++) {
				var currentTypes = currentProduct.types[j];
				productInfo += `<div class="productBlock">`;
				productInfo += `<h4>${display(currentTypes.type)}</h4>`; //here we implement the clean up function

				// Display name and price that are in the Volume thing
				for (var k = 0; k < currentTypes.volumes.length; k++) {
					var currentVolumes = currentTypes.volumes[k];
					productInfo += `<div class="volumeBlock">`;
					productInfo += `Size: ${currentVolumes.name} `;
					productInfo += `$${currentVolumes.price}`;
					productInfo += `</div>`; // Closing volumeBlock
				}
			productInfo += `</div>`; //Closing productBlock
			}
		productInfo += `</div>`; //Closing brandBlock
		}
		// Fill kitty container with html string
		catContainer.innerHTML = productInfo;
	};
}

dogCall.addEventListener("load", executeThisCodeAfterFileIsLoaded);
catCall.addEventListener("load", executeThisCodeAfterFileIsLoaded);

dogCall.open("GET", "dog.json");
catCall.open("GET", "cat.json");
dogCall.send();
catCall.send();

