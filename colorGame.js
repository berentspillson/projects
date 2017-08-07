// NOTE: throughtout, use style.backgroundColor instead of style.background

var numSquares = 6;
var colors = [];
var colors = generateRandomColors(6);
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var clickCount = 0;
var guessDisplay = document.querySelector("#meanGuess");
var singleGuess = document.querySelector("#singular");
var countArray = [];



init();

function init() {
	singleGuess.textContent = "es";
	//mode buttons event listeners
	for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();
		});
	}
	for(var i = 0; i < squares.length; i++) {
	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		countClicks();
		//grab color of clicked square ('this' refers to item (square) clicked)
		var clickedColor = this.style.backgroundColor;
		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Colorific!";
			resetButton.textContent = "Play Again";
			changeColors(clickedColor);
			countArray.push(clickCount);
			meanScore();
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#333333";
			messageDisplay.textContent = "Nope - try again!";
		}

	});
}
	reset();
}


function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none"
		}
	}
	h1.style.backgroundColor = "#4576a0";
	// reset score counter
		clickCount = 0;
}


resetButton.addEventListener("click", function() {
	reset();
});


function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
	//change each color to match given color
		squares[i].style.backgroundColor = color;	
	}
}

function pickColor(){
	//pick a random number; Math.floor removes decimal places
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


// For score calculator & display: dont forget reset button sets clickCount = 0
function countClicks(){
		clickCount++;
}

// calculate average of countArray
function meanScore(){
	var total = 0;
	for(var i = 0; i < countArray.length; i++) {
		total += countArray[i];
	}
	var mean = total / countArray.length;
	guessDisplay.textContent =Math.round(10*mean) / 10;
	if(mean === 1) {
		singleGuess.textContent = "";
	} else {
		singleGuess.textContent = "es";
	}
}

