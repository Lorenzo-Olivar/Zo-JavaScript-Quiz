// Timer code
var timer = document.querySelector(".timer");
var secondsLeft = 0;
timer.textContent = "Timer: " + secondsLeft;
var countdown = function() {
    // resets the timer to 75 seconds
    secondsLeft = 76;
    var timerInterval = setInterval(function(params) {
        secondsLeft--;
        timer.textContent = "Timer: " + secondsLeft;
        // Keeps the timer at 0 when it hits zero
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Timer: " + 0;
        }
    }, 1000);
};
countdown();

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
        question: "Commonly used data types DO NOT include:",
        answer: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false},
        ]
    },
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
        question: "Commonly used data types DO NOT include:",
        answer: [
            {text: "Strings", correct: false},
            {text: "Booleans", correct: false},
            {text: "Alerts", correct: true},
            {text: "Numbers", correct: false},
        ]
    },
];

var questionEl = document.getElementById("question");
var answerButton = document.getElementById("answer-btn");
var nextButton = document.getElementById("nextbutton");

var currentQuestionIndex = 0;
var score = 0;

var startQuiz = function () {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showquestion();
};

var showquestion = function () {
    currentQuestion = questionsList[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    
    currentQuestion.answer.forEach(answerItem => {
        var newButton = document.createElement("button");
        newButton.textContent = answerItem.text;
        newButton.setAttribute('class', "btn");
        answerButton.appendChild(newButton);
    });

};

startQuiz();