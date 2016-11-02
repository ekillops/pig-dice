/* Back End */


//Taken from stackoverflow: generate a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Simulate a roll of a 6 sided die
function rollD6() {
  var roll = getRandomInt(1, 6);
  return roll;
}

function pigRoll(){

  if (pigRoll > 1) {}
};


/* Front End */



$(document).ready(function(){

  //Initial variables to hold turn score and player score
  var playerTotal = 0;

  var turnTotal = 0;



/* Roll button click */
  $("button#roll").click(function(){

    //Roll die
    var dieRoll = rollD6();
    //Display roll result to dieRoll span
    $("#dieRoll").text(dieRoll);


    //Add dieRoll to turnTotal unless a 1 is rolled
    if (dieRoll != 1) {
      turnTotal += dieRoll;
    } else {
      turnTotal = 0;
    }

    //Display result to turnTotal span
    $("#turnTotal").text(turnTotal);

  });

/*  Hold button click  */
  $("button#hold").click(function(){

    //Add turn total to player score
    playerTotal += turnTotal;

    //Display result to playerTotal span
    $("#playerTotal").text(playerTotal);

    //Reset turnTotal
    turnTotal = 0;

    if (playerTotal > 99) {
      //Display end game message
      $("#gameEnd").show();
    } else {
      //Clear counters
      $("#dieRoll, #turnTotal").empty();
    }

  });

/*  Reset button */

  $("button#reset").click(function(){
    //assigns player total to 0
    playerTotal = 0;
    //assigns turn total to 0
    turnTotal = 0;
    //clears values in display fields
    $("#dieRoll, #turnTotal, #playerTotal").empty();

  });


});
