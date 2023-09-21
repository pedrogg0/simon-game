var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColour;
var userClickedPattern = [];
var level = -1;
var gameStarted = false;
var userClicks = 0;

function nextSequence(){
    level++;
    $("h1").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}

function randomChosenColour() {
    return buttonColours[nextSequence()];
}

function playSound(currentColour){
    var audio = new Audio('sounds/' + currentColour + '.mp3');
    console.log(audio);
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log("user " + userClickedPattern);
    return (userClickedPattern[currentLevel] == gamePattern[currentLevel]);
}

function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press Any Key to Restart");
    startOver();
}

function startOver() {
    level = -1;
    gamePattern = [];
    userClickedPattern = [];
    userClicks = 0;
    gameStarted = false;
}

function startGame() {

    gamePattern.push(randomChosenColour());
    var currentColour = gamePattern[level];
    console.log("game " + gamePattern);
    $("#" + currentColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(currentColour);

    $(".btn").click(function(evt){
        if(gameStarted){
            evt.stopImmediatePropagation();
            userChosenColour = this.id;
            userClickedPattern.push(userChosenColour);
            var answer = checkAnswer(userClicks);
            if(answer && userClicks == level){
                playSound(userChosenColour);
                animatePress(userChosenColour);
                userClickedPattern = [];
                userClickedPattern.length = 0;
                userChosenColour = "";
                setTimeout(function() {
                    userClicks = 0;
                    startGame();
                }, 1000);
            }
            else if(answer){
                userClicks++;
                playSound(userChosenColour);
                animatePress(userChosenColour);
                userChosenColour = "";
    
            }
            else{
                gameOver();
            }
        }
    });

    
}
$(document).keydown(function(event){
    if(!gameStarted){
        gameStarted = true;
        startGame();
    }

});


