// creer 2 tab
// 1 qui suit le chemin a faire et le garde en memoire
// l'autre qui suit le chemin du joueur et se reinitialise a chaque level


var tabpla = [];
var tabcpu = [];
var lvl = 1;
var count = 0;
function pathToFollow(){
  var randomNumber = Math.floor(Math.random()*4);
  $($(".btn")[randomNumber]).fadeOut(200);
  setTimeout(function(){$($(".btn")[randomNumber]).fadeIn(200);}, 200);
  return randomNumber;
}
// gerer la pause quand il y a une erreur:
function gameOff(){
  $("body").css("background-color", "red");
  setTimeout(function(){$("body").css("background-color", "#011F3F");}, 100)
  $(document).one("keydown", function(){
    $("#level-title").text("Level " + lvl);
    if (tabcpu.length === 0) {
      tabcpu.push(pathToFollow());
    }
    return;
  });
}

function gameOn(){
  // click event:
  $(".btn").on("click", function(){
    $(this).addClass("pressed");
    makeSound(this.id);
    for (var i = 0; i < 4; i++){
      if ($($(".btn")[i]).hasClass("pressed"))
        break;
      }
      tabpla.push(i);
      setTimeout(function(){$($(".btn")[i]).removeClass("pressed");}, 100);

      if (tabpla[count] !== tabcpu[count]){
        tabcpu = [];
        tabpla = [];
        lvl = 1;
        // la variable count compte literalement j'ensuis a ou sur mon chemin
        // reinitialise si je me trompe, et a la fin si j'ai reussi le lvl
        count = -1;
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        gameOff();
      }
      else if (tabcpu.length === tabpla.length){
        tabpla = [];
        lvl ++;
        $("#level-title").text("Level " + lvl);
        count = -1;
        setTimeout(function(){tabcpu.push(pathToFollow()); }, 100);
      }
      count ++;
    });
}

function makeSound(btn){
     var sound = new Audio("sounds/"+btn+".mp3");
     sound.play();
}

$(document).one("keydown", function(){
  $("#level-title").text("Level " + lvl);
  tabcpu.push(pathToFollow());
  gameOn();
});
