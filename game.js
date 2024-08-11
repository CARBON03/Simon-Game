const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(document).keypress(function(event){
    if(event.key === "x" && gamePattern.length === 0){
        $("#level-title").text("Level " + level);
        nextSequence()
    }
});

function playSound(colorName){
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play(); 
};

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");  


    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
};

function nextSequence(){
    level ++ ;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4) ;
    const randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    colorName = randomChosenColour;
    playSound(colorName);
};

$(".btn").click(function(){
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    colorName = userChosenColour;
    playSound(colorName);
    animatePress(colorName);
    checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }else{
        console.log("Fail");
        $("body").addClass("game-over");

        playSound("wrong");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          $("#level-title").text("Game Over, Press X to Restart");

          startOver()
    };
};



