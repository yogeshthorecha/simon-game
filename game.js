var userClickedPattern=[];
var gamePattern=[];
var started=false;
var buttonColours=["red","blue","green","yellow"];
var level=0;

$(document).keypress(function(event){
  if(!started){
    $("h1").text("level "+level);
    nextSequence();
    started=true;
  }

  $(".btn").click(function(){
     var userChosenColour=$(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1);

  });

function checkAnswer(currentLevel){
 if (gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {
   if( userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
   }
 } else {
     playSound("wrong");
     $("body").addClass("game-over");
     $("body").text("Game Over, Press Any Key to Restart");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);

  startover();
}
}



function nextSequence(){
  userClickedPattern=[];
  level++;
    $("h1").text("Level " + level);
var randomNumber=Math.floor((Math.random()*4));
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}


function playSound(name){
  var audio=new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}


});
function startover(){
  level = 0;
  gamePattern = [];
  started = false;
}
