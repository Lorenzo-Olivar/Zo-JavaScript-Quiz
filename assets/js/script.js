// starts the quiz
var startButtonEl = document.getElementById("startButton");
var startParagraphEl = document.getElementById("startingScreen");
var startQuiz = function() {
    startParagraphEl.setAttribute("style", 'display: none;');
    startButtonEl.setAttribute("style", 'display: none;');
    countdown();
    commenceQuiz();
}

startButtonEl.addEventListener('click', startQuiz)





// Timer code
var timer = document.querySelector(".timer");
var secondsLeft = 0;
timer.textContent = "Timer: " + secondsLeft;
var countdown = function() {
    
    // resets the timer to 75 seconds
    secondsLeft = 76;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Timer: " + secondsLeft;
        // Keeps the timer at 0 when it hits zero
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Timer: " + 0;
        }
    }, 1000);
};
// countdown();

// Quiz questions
var questionsList = [
    {
        question: "Commonly used data types DO NOT include:",
        answer: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        answer: [
            {text: "Quotes", correct: false},
            {text: "Curly Brackets", correct: true},
            {text: "Parentheses", correct: false},
            {text: "Square Brackets", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        answer: [
            {text: "Numbers and Strings", correct: false},
            {text: "Other Arrays", correct: false},
            {text: "Booleans", correct: false},
            {text: "All of the Above", correct: true},
        ]
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answer: [
            {text: "Commas", correct: false},
            {text: "Curly Brackets", correct: false},
            {text: "Quotes", correct: true},
            {text: "Parentheses", correct: false},
        ]
    },
    {
        question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
        answer: [
            {text: "JavaScript", correct: false},
            {text: "Terminal / Bash", correct: false},
            {text: "For Loops", correct: false},
            {text: "Console.log", correct: true},
        ]
    },
];


var questionEl = document.getElementById("question");
var answerButton = document.getElementById("answer-btn");
var nextButton = document.getElementById("nextbutton");

var currentQuestionIndex = 0;
var score = 0;

// starts the quiz with the first set of questions
var commenceQuiz = function () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
};

// clears the answers before new answers can appear
var resetQuestion = function() {
    nextButton.setAttribute("style", "display: none;");
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    };
};

// function needed to style the selected answers
var selectAnswer = function(event) {
    // console.log(event)
    var selectedBtn = event.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.setAttribute("id", "correct");
        score = score++ + secondsLeft;
    } else {
        selectedBtn.setAttribute("id", "incorrect");
        secondsLeft = secondsLeft - 10;
    };
    Array.from(answerButton.children).forEach (answerItem => {
        if (answerItem.dataset.correct === "true") {
            answerItem.setAttribute('id', 'correct');
        }
        answerItem.disabled = true;
    });
    nextButton.setAttribute('style', 'display: block;');
};

// displays the new questions and applies the style on the answer when clicked on
var showQuestion = function () {
    resetQuestion();
    var currentQuestion = questionsList[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    
    currentQuestion.answer.forEach(answerItem => {
        var newButton = document.createElement("button");
        newButton.textContent = answerItem.text;
        newButton.setAttribute('class', "btn");
        answerButton.appendChild(newButton);
        if (answerItem.correct) {
            newButton.dataset.correct = answerItem.correct;
        }
        newButton.addEventListener("click", selectAnswer);
    });
};

var saveInitials = document.getElementById("initials");
var saveScoreBtn = document.getElementById('saveScoreBtn');

// displays the save initial and save button after the quiz ends
var showScore = function() {
    resetQuestion();
    questionEl.textContent = "You scored " + score + ".";
    saveInitials.style.display = "inline";
    saveScoreBtn.style.display = "inline";
    secondsLeft = 0;
}

// displays the next questions
var cycleQuestion = function() {
    if (currentQuestionIndex+1 < questionsList.length) {
        currentQuestionIndex++;
        showQuestion();
    } else if (currentQuestionIndex = questionsList.length) {
        showScore();
    }
}

nextButton.addEventListener('click', cycleQuestion)

// commenceQuiz();

// saves the current highscore
var saveHighScore = function(event) {
    event.preventDefault();
    var scoreObj = {
        score: score,
        initials: saveInitials.value,
    };
    highScores.push(scoreObj);

    // console.log(highScores)

    highScores.sort( (a,b) => b.score - a.score);

    highScores.splice(5);

    localStorage.setItem('highscores', JSON.stringify(highScores));

    showHighScores();

};

var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
var restartQuiz = document.getElementById('restart')

// makes the 5 highest scores visable
var showHighScores = function() {

    for (let i = 0; i < highScores.length; i++) {
        var scoreList = document.createElement('li');
        scoreList.textContent = 'Player: ' + highScores[i].initials + ' | Score: ' + highScores[i].score;
        scoreList.setAttribute('class', 'scoreListings');
        highScoresList.appendChild(scoreList);
        scoreList.style.display = 'block';
        saveScoreBtn.style.display = "none";
        saveInitials.style.display = "none";
        restartQuiz.style.display = "block";
    };

};

var altViewHighcores = document.getElementById("viewHighscores");

var showViewHighscores = function() {
    startParagraphEl.setAttribute("style", 'display: none;');
    startButtonEl.setAttribute("style", 'display: none;');
    showHighScores();
    resetQuestion();
    questionEl.style.display = "none";
    altViewHighcores.style.visibility = "hidden";
    secondsLeft = 0;
}
altViewHighcores.addEventListener('click', showViewHighscores);

// console.log(secondsLeft - 5)
// console.log(currentQuestionIndex)
// console.log(questionsList.length)