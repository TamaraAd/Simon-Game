var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var startedToToggle = false;

var level = 0;


$(document).keydown(function () {
    if (!startedToToggle) {
        startedToToggle = true;
        nextSequence();
    }

})

function nextSequence() {
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    $("h1").text("level " + ++level);

    $("#" + randomChosenColour).fadeIn(300).fadeOut(300).fadeIn(300);

    playSound(randomChosenColour);


}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000)
        }

    } else {
        lose();
    }



}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}



function lose() {
    var audio = new Audio("./sounds/wrong.mp3"); // Corrected file path
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
    gamePattern = [];
    startedToToggle = false;
}
