var randomWord = commonWords[Math.floor(Math.random()*commonWords.length)];
var letterSpaces; //letter that user has just guessed
var button; //alphabet buttons for user to click for guesses
var guessesLeft = 10;
var wordSpace; // will hold HTML container for randomWord
var letterSpacesList; // ul to be appended to wordSpace when randomWord is generated
var keyboardLetters;
var keyboardLettersList;
var keyboardArray = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                    "a", "s", "d", "f", "g", "h", "j", "k", "l",
                    "z", "x", "c", "v", "b", "n", "m"];



console.log(randomWord);

function buildKeyboard(keyboardArray) {
  keyboardDiv = document.getElementById("keyboard");
  keyboardLettersList = document.createElement('ul');
  keyboardDiv.appendChild(keyboardLettersList);

  for (var i = 0; i < keyboardArray.length; i++) { // loop through word
    keyboardLettersList.setAttribute('id', 'keyboard-letters-list'); // set id for letterSpaceList for CSS
    keyboardLetters = document.createElement('li'); // for each letter in the word, create a li
    keyboardLetters.setAttribute('class', 'keyboard-letters'); // set a class on each letter for CSS
    keyboardLetters.innerHTML = keyboardArray[i];
    keyboardLettersList.appendChild(keyboardLetters);
  }
}

buildKeyboard(keyboardArray);

function buildWordSpace(randomWord){
  wordSpace = document.getElementById("word-space"); // grab the word-space html container
  letterSpacesList = document.createElement('ul'); // create a ul to hold the randomWord
  wordSpace.appendChild(letterSpacesList);

  for (var i = 0; i < randomWord.length; i++) { // loop through word
    letterSpacesList.setAttribute('id', 'letter-spaces-list'); // set id for letterSpaceList for CSS
    letterSpaces = document.createElement('li'); // for each letter in the word, create a li
    letterSpaces.setAttribute('class', 'letters'); // set a class on each letter for CSS
    letterSpaces.innerHTML = "_";
    letterSpacesList.appendChild(letterSpaces);
  }
}

buildWordSpace(randomWord);
