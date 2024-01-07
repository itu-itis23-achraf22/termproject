//  Duration
const duration = 1000;

// Select  Container
const blocksContainer = document.querySelector(".memory-game-blocks");

// Create array  
const blocks = Array.from(blocksContainer.children);

//  name and transform it to an array
const myName = "ACHRAF";
const nameArray = myName.split('');

// Array to keep track of flipped letters
let flippedLetters = [];

// Variable to track the current letter index
let currentLetterIndex = 0;

// Function to set the order for each block and add click event listener
function setupGame() {
  let orderRange = Array.from(Array(blocks.length).keys());
  console.log(orderRange);
  shuffle(orderRange);
  console.log(orderRange);

  
  blocks.forEach((block, index) => {
    block.style.order=orderRange[index];
    block.addEventListener('click', function () {
      flipBlock(block);
    });
  });
}

// Function to start the game
function startGame() {
  setupGame()
  
  blocks.forEach(block => block.classList.add("is-flipped"));
  setTimeout(() => {
      blocks.forEach((block) => {
        block.classList.remove("is-flipped",);
      });
    }, 2000);
  ;
}

// Function to reset the game
function resetGame() {
  currentLetterIndex = 0;
  flippedLetters.length = 0; 
  blocks.forEach(block => block.classList.remove("is-flipped", "has-match"));
  
  score=0;
  document.getElementById("span").innerText=score;
  setupGame();
}
let score=0;

// Flip function
function flipBlock(selectedBlock) {
  // Check if the block is already flipped
  if (selectedBlock.classList.contains('is-flipped')) {
    return;
  }

  // Add class is flipped
  selectedBlock.classList.add('is-flipped');


  
  // Get the value of the 'letter' attribute
  let letterValue = selectedBlock.getAttribute('letter');
  console.log("Letter value:", letterValue);
  console.log(nameArray[currentLetterIndex]);
  console.log(nameArray)

  if (letterValue === nameArray[currentLetterIndex]) {
    selectedBlock.classList.add('has-match')
    flippedLetters.push(letterValue);
    currentLetterIndex++;
    score+=20;
    document.getElementById("span").innerText=score;

    if (currentLetterIndex === nameArray.length) {
      // All letters matched,
      alert("You found all letters! You won!");
      score+=100;
      document.getElementById("span").innerText=score;  

      
      resetGame();
    }
  } else {
    // Not matched! Flip the cards back
    setTimeout(() => {
      // Flip back all cards, including the  correct one
      blocks.forEach(block => block.classList.remove("is-flipped", "has-match"));
    }, duration);
    resetGame()
  }
}
// Shuffle Function
function shuffle(array) {

  // Settings Vars
  let current = array.length,
      temp,
      random;

  while (current > 0) {

    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;

  }
  return array;
}
// Start the game
startGame();
