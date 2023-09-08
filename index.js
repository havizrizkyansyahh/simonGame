let buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keydown", function (event) {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    console.log("user clicked pattern: " + userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    let randomizer = Math.floor(Math.random() * 4);
    let randomChosenColour = randomizer;
    gamePattern.push(buttonColours[randomChosenColour]);
    console.log("game pattern: " + gamePattern);

    let btnColour = buttonColours[randomChosenColour];

    playSound(btnColour);

    level++;
    $("#level-title").text("Level " + level);
}

function playSound(key) {
    let audio;
    switch (key) {
        case "green":
            audio = new Audio("./sounds/green.mp3");
            $(".btn." + key).addClass("pressed");
            break;
        case "red":
            audio = new Audio("./sounds/red.mp3");
            $(".btn." + key).addClass("pressed");
            break;
        case "yellow":
            audio = new Audio("./sounds/yellow.mp3");
            $(".btn." + key).addClass("pressed");
            break;
        case "blue":
            audio = new Audio("./sounds/blue.mp3");
            $(".btn." + key).addClass("pressed");
            break;
    }

    setTimeout(function () {
        $(".btn." + key).removeClass("pressed");
    }, 100);

    audio.play();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct answer");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Wrong answer");

        $("body").addClass("game-over");

        setTimeout(function () {
            let audio = new Audio("./sounds/wrong.mp3");
            audio.play();
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}





