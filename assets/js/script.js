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

// 