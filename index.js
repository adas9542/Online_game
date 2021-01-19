var item_colors = ["green","red","yellow","blue"]
let pattern_arr = [];
let user_pattern = [];
let playing = false;

new_game();

function new_game(){
  $("h1").text("Press Any Key on the Keyboard to Start");
  $(document).keydown(function(){
    if(!playing){
      $("h3").css("visibility","hidden");
      start();
      playing = true;
    }
  })
}

function gen_pattern(){ //generates a random color
  var num = Math.floor(Math.random()*4);
  return item_colors[num];
}

function level_counter(){ //increments the level by 1
  if($("h1").text().split(" ").includes("Level")){
    $("h1").text("Level " + String(parseInt($("h1").text().split(" ")[1])+1));
  }
  else{
    $("h1").text("Level 1");
  }
}

function start(){ //starts the game after the user has pressed a key
  let new_pattern_object = gen_pattern();
  output_sound(new_pattern_object);
  animate(new_pattern_object);
  pattern_arr.push(new_pattern_object);
  level_counter();
  user_pattern = [];
}

function animate(new_pattern_object){ //flashes the animation of a button
  $("#" + String(new_pattern_object)).addClass("pressed");
  setTimeout(function(){$("#" + String(new_pattern_object)).removeClass("pressed")},400);
}

function output_sound(element){ //plays the sound for the specific button
  var store = new Audio("sounds/" + String(element) + ".mp3");
  store.play();
}

function gameOver(){
  $("h1").text("Game Over, Press Any Key to Start a new Game");
  pattern_arr = [];
  setTimeout(function(){
    $("body").removeClass("game-over");
  },600);
}

$(".btn").click(function(){ //detects for any of the buttons being clicked
  user_pattern.push($(this).attr("id"));
  let element = pattern_arr[pattern_arr.length - 1];
  let user_element = user_pattern[user_pattern.length-1];
  if(user_pattern.length != pattern_arr.length && user_element == pattern_arr[user_pattern.length-1]){
      output_sound(user_element);
      animate(user_element);
  }
  if(user_element != pattern_arr[user_pattern.length-1] || (user_pattern.length == pattern_arr.length && JSON.stringify(user_pattern) !== JSON.stringify(pattern_arr))){
    $("h3").text("Simon requires you to to repeat every move the computer has performed since the beginning. You got this!");
    $("h3").css("visibility","visible");
    $("body").addClass("game-over");
    gameOver();
    playing = false;
    var gameOversound = new Audio("sounds/wrong.mp3");
    gameOversound.play();

  }
  if(user_pattern.length == pattern_arr.length && JSON.stringify(user_pattern) === JSON.stringify(pattern_arr)){
    output_sound(user_element);
    animate(user_element);
      setTimeout(function(){
        start();
      },600);
    }
})
