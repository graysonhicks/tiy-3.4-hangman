(function(){

var randomWord = commonWords[Math.floor(Math.random()*commonWords.length)].toUpperCase();
var hangmanScreen = document.getElementById("hangman-screen"); // var to hold screen
var totalGuessesMade = 0; //store total guess, when it hits ten, game over
var correctGuessesMade = 0; // store and compare to length of randomWord, when equal, you've won
var correctWordArray = []; // store randomWord letters in array so that can be looped over for match
var randomWordLength;  // when correctGuessesMade reaches this number, you've won
var letterGuessed; // stores value of the keyboard button pressed to compare to correctWordArray
var fullGuessButton = document.getElementById('guess-submit');
var wordGuessed; // stores value from full-guess input
var resetButton = document.getElementById('reset-button');
var turnsLeft; // will store turns amount and print to screen
var wordSpace = document.getElementById("word-space"); // will hold HTML container for randomWord
var letterSpaces; //letter that user has just guessed
var letterSpacesList; // ul to be appended to wordSpace when randomWord is generated
var keyboardDiv = document.getElementById("keyboard");   //get keyboard container
var keyboardButton; //alphabet buttons created during for loop
var keyboardButtonsForClicking; // var that grabs all buttons by class name after they have been created, for click handler
var keyboardLetters;
var keyboardLettersList;
var keyboardArray = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                    "A", "S", "D", "F", "G", "H", "J", "K", "L",
                    "Z", "X", "C", "V", "B", "N", "M"];

function buildKeyboard(keyboardArray) {
  keyboardLettersList = document.createElement('ul'); // create UL in container
  keyboardLettersList.setAttribute('class', 'list-inline'); // set class for bootstrap
  keyboardDiv.appendChild(keyboardLettersList); //append in container

  for (var i = 0; i < keyboardArray.length; i++) { // loop through word
    keyboardLettersList.setAttribute('id', 'keyboard-letters-list'); // set id for letterSpaceList for CSS
    keyboardLetters = document.createElement('li'); // for each letter in the word, create a li
    keyboardLetters.setAttribute('class', 'keyboard-letters'); // set a class on each letter for CSS
    keyboardButton = document.createElement('button'); // create button
    keyboardButton.setAttribute('class', 'keyboard-buttons btn btn-default');
    keyboardButton.innerHTML = keyboardArray[i]; // set innerHTML to whatever letter its on
    keyboardLetters.appendChild(keyboardButton); //append the button in the letter li
    keyboardLettersList.appendChild(keyboardLetters); // append the li with button in it, to the UL
  }
  keyboardButtonsForClicking = document.getElementsByClassName('keyboard-buttons');
}

buildKeyboard(keyboardArray);

function buildWordSpace(randomWord){
  letterSpacesList = document.createElement('ul'); // create a ul to hold the randomWord
  letterSpacesList.setAttribute('class', 'list-inline'); //bootstrap class added
  wordSpace.appendChild(letterSpacesList); //append to the UL

  for (var i = 0; i < randomWord.length; i++) { // loop through word
    letterSpacesList.setAttribute('id', 'letter-spaces-list'); // set id for letterSpaceList for CSS
    letterSpaces = document.createElement('li'); // for each letter in the word, create a li
    letterSpaces.setAttribute('class', 'letters'); // set a class on each letter for CSS
    letterSpaces.setAttribute('id', 'letter-' + i); // add id based on index so it can be grabbed by click handler if correct
    correctWordArray.push(randomWord[i]); // push current letter to correct word array so it can be looped over below
    letterSpaces.innerHTML = "_"; // for each letter in the randomWord print an underscore to the li
    letterSpacesList.appendChild(letterSpaces); // add li's to the UL
  }

  randomWordLength = randomWord.length; // this will be used to check if correct answer has been reached
}

buildWordSpace(randomWord);

// EVENT LISTENERS

function keyboardClickFunction(){
  for (i = 0; i < keyboardButtonsForClicking.length; i++) {
    keyboardButtonsForClicking[i].addEventListener("click", keyboardClickHandler);
}
}

keyboardClickFunction();

fullGuessButton.addEventListener('click', fullGuessChecker);

resetButton.addEventListener('click', resetGame);

function keyboardClickHandler(evt){
  letterGuessed = this.innerHTML; // grabs letter value that has been clicked
  console.log(randomWord);
  for (var i = 0; i < correctWordArray.length; i++) { // loops over randomWord to see if letter clicked is in it

    if(correctWordArray[i] == letterGuessed) { // if it matches
      var match = document.getElementById("letter-" + i); //grab that letter based on it index value set in buildWordSpace
      match.innerHTML = letterGuessed; // set value of matched to the letter guessed
      this.setAttribute('class', 'keyboard-letters btn btn-default correct');
      this.disabled = true;
      correctGuessesMade += 1; // once this matches randomWordLength, then you win
      youWin(); // check to see if total match
    }
    this.disabled = true; // disable button after its been clicked
  }

  totalGuessesMade += 1; // add to total guess counter
  printTurns();

  gameOver(); // check to see if too many guesses

}

function fullGuessChecker(){
  wordGuessed = document.getElementById('guess-text').value.toUpperCase();
    console.log(wordGuessed);
    if(wordGuessed == randomWord) { // if it matches
      youWin(); // check to see if total match
    } else {
      totalGuessesMade += 1;
      printTurns();
      gameOver();
    }

}

function printTurns(){
  turnsLeft = document.getElementById("turns-left"); // get span
  turnsLeft.innerHTML = 10 - totalGuessesMade; // subtract from 10 and print how many are left
}

function gameOver(){
  if(totalGuessesMade == 10) {
    hangmanScreen = document.getElementById("hangman-screen");
    hangmanScreen.setAttribute('class', 'hangman game-over');
    hangmanScreen.innerHTML = "<h1>You Lose</h1>";
    totalGuessesMade = 0;
    disableKeyboard();
  }
}

function youWin(){
  if(correctGuessesMade == randomWordLength) {
    hangmanScreen.setAttribute('class', 'hangman you-win');
    hangmanScreen.innerHTML = "<h1>You Win!</h1>";
    disableKeyboard();
    totalGuessesMade = 0;
  } else if(wordGuessed == randomWord){
    hangmanScreen.setAttribute('class', 'hangman you-win');
    hangmanScreen.innerHTML = "<h1>You Win!</h1>";
    totalGuessesMade = 0;
    for (var i = 0; i < correctWordArray.length; i++) {
      var match = document.getElementById("letter-" + i);
      console.log(match); //grab that letter based on it index value set in buildWordSpace
      match.innerHTML = correctWordArray[i];
    }
    disableKeyboard();
  }
}

function disableKeyboard(){
  for (i = 0; i < keyboardButtonsForClicking.length; i++) {
    keyboardButtonsForClicking[i].disabled = true;
}
}

function resetGame(){
  totalGuessesMade = 0;
  correctGuessesMade = 0;
  correctWordArray = [];
  hangmanScreen.setAttribute('class', 'hangman');
  keyboardDiv.removeChild(keyboardLettersList);
  buildKeyboard(keyboardArray);
  wordSpace.removeChild(letterSpacesList);
  randomWord = commonWords[Math.floor(Math.random()*commonWords.length)].toUpperCase();
  buildWordSpace(randomWord);
  hangmanScreen.innerHTML = "";
  turnsLeft.innerHTML = 10;
  keyboardClickFunction();
}

}());
