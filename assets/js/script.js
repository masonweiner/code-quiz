// declare a variable storing a reference to the question <p>
var question = document.getElementById("question");

// declare a variable storing a reference to the answers ul
var answers = document.getElementById("answers");

// declare a variable storing a reference to the start button
var startbtn = document.getElementById("startButton");

//variable referring to the timer
var timer = document.getElementById("timer");

//variable referring to the game
var game = document.getElementsByClassName("game");

//time left variable
var timeLeft = 45;

//variable referring to the h1 element
var header = document.querySelector("h1");

//counter variable for recursion
var count = 0;

//score variable
var score = 0;

//variable referring to the li in the footer
var newScore = document.getElementById("score");

// declare object variables for each of the questions, giving each one a question, a correct answer, and three incorrect answers
var question1 = {
  question: "I can be true or false. I'm a...",
  answer: "boolean",
  fakeAnswer1: "string",
  fakeAnswer2: "number",
  fakeAnswer3: "liar",
};
var question2 = {
  question: "The * performs what?",
  answer: "multiplication",
  fakeAnswer1: "addition",
  fakeAnswer2: "subtraction",
  fakeAnswer3: "division",
};
var question3 = {
  question: "What does 51 % 10 equal?",
  answer: "1",
  fakeAnswer1: "0",
  fakeAnswer2: "5",
  fakeAnswer3: "5.1",
};

//an array containing the questions
var questions = [question1, question2, question3];

//start game function
function startGame() {
  //remove event listener on start button
  startbtn.removeEventListener("click", startGame);
  //create the timer
  var timeInterval = setInterval(function () {
    timer.textContent = timeLeft + " seconds left";
    timeLeft--;
    //if the timer runs out, end the game
    if (timeLeft < 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
  //display the question (recursive, so it runs 3 times)
  displayQuestion(questions[count]);
}

//the display question function
function displayQuestion(object) {
  //end case for recursion
  if (count > 3) {
    endGame();
    return;
  }
  //show the question we are on
  question.textContent = object.question;
  var li1 = document.createElement("li");
  li1.textContent = object.answer;
  answers.appendChild(li1);
  //display a false answer
  var li2 = document.createElement("li");
  li2.textContent = object.fakeAnswer1;
  answers.appendChild(li2);
  //display a false answer
  var li3 = document.createElement("li");
  li3.textContent = object.fakeAnswer2;
  answers.appendChild(li3);
  //display a false answer
  var li4 = document.createElement("li");
  li4.textContent = object.fakeAnswer3;
  answers.appendChild(li4);
  //add event listener for clicking on an answer
  answers.addEventListener("click", function (e) {
    //either add 10 points if they answer correctly, or take 15 seconds off if they do not
    if (e.target.textContent === object.answer) {
      score += 10;
    } else {
      timeLeft -= 15;
    }
    //get the answer elements to remove themselves before the recursion
    li1.remove();
    li2.remove();
    li3.remove();
    li4.remove();
    //increment count
    count += 1;
    //recursion
    displayQuestion(questions[count]);
  });
}
// a function to end the game
function endGame() {
  //change text to game over
  header.textContent = "Game Over";
  //set time to 0
  timer.textContent = "0";
  //call the display scores function
  displayScores();
  startbtn.addEventListener("click", startGame);
}

// a function to display the scoreboard after the game
function displayScores() {
  //your score variable referring to the h2 element
  var yourScore = document.createElement("h2");
  yourScore.textContent = "Your score: " + score;
  header.appendChild(yourScore);
  //get the value of the form when you click the submit button
  var initials = document.getElementById("initials");
  var submitbtn = document.getElementById("submit");
  function submit() {
    var scoreObj = { name: initials.value, score: score };
    localStorage.setItem("user", JSON.stringify(scoreObj));
    var scorer = JSON.parse(localStorage.getItem("user"));
    newScore.textContent = scorer.name + " " + scorer.score;
  }
  //add event listener for the submit button
  submitbtn.addEventListener("click", submit);
}

//create event listener for the start button that starts the game
startbtn.addEventListener("click", startGame);
