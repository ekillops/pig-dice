/*Back End*/


//Taken from stackoverflow: generate a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollD6() {
  roll = getRandomInt(1, 6);
  return roll;
}



/*Front End*/



$(document).ready(function(){

  //Initial variables to hold turn score and player score
  var playerTotal = 0;

  var turnTotal = 0;



  //Roll button click
  $("button#roll").click(function(){

    //Roll die
    var dieRoll = rollD6();
    //Display roll result to dieRoll span
    $("#dieRoll").text(dieRoll);


    //Add dieRoll to turnTotal
    turnTotal += dieRoll;
    //Display result to turnTotal span
    $("#turnTotal").text(turnTotal);

  });

  //Hold button click
  $("button#hold").click(function(){

    //Add turn total to player score
    playerTotal += turnTotal;
    //Display result to playerTotal span
    $("#playerTotal").text(playerTotal);

    $("#dieRoll, #turnTotal").empty();


  });


});
