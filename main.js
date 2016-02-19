(function(){

var randomWord = commonWords[Math.floor(Math.random()*commonWords.length)].toUpperCase();
var totalGuessesMade = 0;
var correctGuessesMade = 0;
var randomWordLength;
var letterGuessed;
var wordSpace; // will hold HTML container for randomWord
var letterSpaces; //letter that user has just guessed
var letterSpacesList; // ul to be appended to wordSpace when randomWord is generated
var keyboardButton; //alphabet buttons created during for loop
var keyboardButtonsForClicking; // var that grabs all buttons by class name after they have been created, for click handler
var keyboardLetters;
var keyboardLettersList;
var keyboardArray = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                    "A", "S", "D", "F", "G", "H", "J", "K", "L",
                    "Z", "X", "C", "V", "B", "N", "M"];

function buildKeyboard(keyboardArray) {
  keyboardDiv = document.getElementById("keyboard"); //get keyboard container
  keyboardLettersList = document.createElement('ul'); // create UL in container
  keyboardLettersList.setAttribute('class', 'list-inline'); // set class for bootstrap
  keyboardDiv.appendChild(keyboardLettersList); //append in container

  for (var i = 0; i < keyboardArray.length; i++) { // loop through word
    keyboardLettersList.setAttribute('id', 'keyboard-letters-list'); // set id for letterSpaceList for CSS
    keyboardLetters = document.createElement('li'); // for each letter in the word, create a li
    keyboardLetters.setAttribute('class', 'keyboard-letters'); // set a class on each letter for CSS
    keyboardButton = document.createElement('button'); // create button
    keyboardButton.setAttribute('class', 'keyboard-buttons');
    keyboardButton.innerHTML = keyboardArray[i]; // set innerHTML to whatever letter its on
    keyboardLetters.appendChild(keyboardButton); //append the button in the letter li
    keyboardLettersList.appendChild(keyboardLetters); // append the li with button in it, to the UL
  }
  keyboardButtonsForClicking = document.getElementsByClassName('keyboard-buttons');
}

buildKeyboard(keyboardArray);

function buildWordSpace(randomWord){
  wordSpace = document.getElementById("word-space"); // grab the word-space html container
  letterSpacesList = document.createElement('ul'); // create a ul to hold the randomWord
  letterSpacesList.setAttribute('class', 'list-inline'); //bootstrap class added
  wordSpace.appendChild(letterSpacesList); //append to the UL

  for (var i = 0; i < randomWord.length; i++) { // loop through word
    letterSpacesList.setAttribute('id', 'letter-spaces-list'); // set id for letterSpaceList for CSS
    letterSpaces = document.createElement('li'); // for each letter in the word, create a li
    letterSpaces.setAttribute('class', 'letters'); // set a class on each letter for CSS
    letterSpaces.innerHTML = "_"; // for each letter in the randomWord print an underscore to the li
    letterSpacesList.appendChild(letterSpaces); // add li's to the UL
    correctWord.push(randomWord[i]);
    console.log(correctWord);
  }
  randomWordLength = randomWord.length; // this will be used to check if correct answer has been reached
  console.log(randomWord);
}

buildWordSpace(randomWord);

for (i = 0; i < keyboardButtonsForClicking.length; i++) {
  keyboardButtonsForClicking[i].addEventListener("click", keyboardClickHandler);
}

function keyboardClickHandler(evt){
  letterGuessed = this.innerHTML; // grabs letter value that has been clicked
  console.log(letterGuessed);
  console.log(randomWord);
  for (var i = 0; i < randomWord.length; i++) { // loops over randomWord to see if letter clicked is in it
    if(randomWord[i] == letterGuessed) {
      console.log("yes");
      correctGuessesMade += 1;
    }
  }
  this.disabled = true;
  totalGuessesMade += 1;
  console.log(totalGuessesMade);
}



function guessChecker() {

}

}());
