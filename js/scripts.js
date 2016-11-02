/* Back End */

//Player constructor
function Player(playerName, playerNumber, score) {
  this.playerName = playerName;
  this.playerNumber = playerNumber;
  this.score = score;
}

//Player prototype method to score points
Player.prototype.scorePoints = function(points) {
  this.score += points;
};

//Method to reset score on new game
Player.prototype.resetScore = function() {
  this.score = 0;
};



//Function to add to the player index counter for turn alternation
function switchPlayer(currentPlayerNumber, numberOfPlayers) {
  numberOfPlayers -= 1;
  var nextPlayer = 0;

  if (currentPlayerNumber === numberOfPlayers) {
    nextPlayer = 0;
  } else {
    nextPlayer = currentPlayerNumber + 1;
  }
  return nextPlayer;
}

//Taken from stackoverflow: generate a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Simulate a roll of a 6 sided die
function rollD6() {
  var roll = getRandomInt(1, 6);
  return roll;
}


/* Front End */

function showDie(roll) {
  //Show image for current roll
  $("#dieRoll").html("<img src='img/" +roll+ ".png' />");
};


$(document).ready(function(){
  //Create player objects
  var player1 = new Player(prompt("Player 1 enter your name: "), 1, 0);
  var player2 = new Player(prompt("Player 2 enter your name: "), 2, 0);

  //Display player names on screen
  $("#player1Name").text(player1.playerName);
  $("#player2Name").text(player2.playerName);

  //Create array to hold player objects
  var players = [player1, player2];

  //Variable to hold number of players
  var numberOfPlayers = 2;

  //Initial variables player scores
  var playerTotal1 = 0;
  var playerTotal2 = 0;

  //Variables to track current player and turn score
  var currentPlayerIndex = 0;
  var turnTotal = 0;

  //Display starting active player and highlight their scorebox
  // $("#activePlayer").text(players[currentPlayerIndex].playerName);
  $("#player" + players[currentPlayerIndex].playerNumber + "Box").addClass("well2");

/* Roll button click */
  $("button#roll").click(function(){

    //Roll die
    var dieRoll = rollD6();
    //Display roll result to dieRoll span
    $("#dieRoll").text(dieRoll);
    showDie(dieRoll);

    //Add dieRoll to turnTotal unless a 1 is rolled
    if (dieRoll != 1) {
      //Add roll to turn total
      turnTotal += dieRoll;

    } else {

      //Display result to player1Total or player2Total span
      $("#player" + players[currentPlayerIndex].playerNumber + "Total").text(players[currentPlayerIndex].score);

      //Switch to next player's turn and unhighlight their scorebox
      $("#player" + players[currentPlayerIndex].playerNumber + "Box").removeClass("well2")
      currentPlayerIndex = switchPlayer(currentPlayerIndex, numberOfPlayers);


      //Display new current player
      $("#activePlayer").text(players[currentPlayerIndex].playerName);
      $("#player" + players[currentPlayerIndex].playerNumber + "Box").addClass("well2");

      //Reset turn total
      turnTotal = 0;
    }

    //Display result to turnTotal span
    $("#turnTotal").text(turnTotal);

  });

/*  Hold button click  */
  $("button#hold").click(function(){

    //Add turn total to player score
    players[currentPlayerIndex].scorePoints(turnTotal);

    //Display result to player1Total or player2Total span
    $("#player" + players[currentPlayerIndex].playerNumber + "Total").text(players[currentPlayerIndex].score);
    // check for win condition
    if (players[currentPlayerIndex].score > 99) {
      //Display end game message
      $("#gameEnd").show();
    } else {
      //Clear counters
      $("#dieRoll, #turnTotal").empty();
    }

    //Switch to next player's turn and unhighlight their scorebox
    $("#player" + players[currentPlayerIndex].playerNumber + "Box").removeClass("well2")
    currentPlayerIndex = switchPlayer(currentPlayerIndex, numberOfPlayers);


    //Display new current player and highlight their scorebox
    // $("#activePlayer").text(players[currentPlayerIndex].playerName);
    $("#player" + players[currentPlayerIndex].playerNumber + "Box").addClass("well2");

    //Reset turnTotal
    turnTotal = 0;



  });

/*  Reset button */

  $("button#reset").click(function(){
    //Reset player scores to 0
    players.forEach(function(player){
      player.resetScore();
    });
    //assigns turn total to 0
    turnTotal = 0;

    //Remove highlight to prepare for new game
    $("#player" + players[currentPlayerIndex].playerNumber + "Box").removeClass("well2")

    //Reset currentPlayerIndex and highlight current player again
    currentPlayerIndex = 0;
    $("#player" + players[currentPlayerIndex].playerNumber + "Box").addClass("well2");

    //clears values in display fields
    $("#dieRoll, #turnTotal, #player1Total, #player2Total").empty();

  });


});
