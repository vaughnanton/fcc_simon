var squareSequence = [];
var counterDOM = document.getElementById("counter");
var gameInProgress = false;
var inStrictMode = false;
var gameRound = 1;
var synth = new Tone.Synth().toMaster();
var playerSequencePosition = 0;
var enableInput = false;

function startGame() {
  if (gameInProgress) {
    restart();
    return;
  }
  document.getElementById("start").innerHTML = "Reset";
  gameInProgress = true;
  runGame();
}

function strictMode() {
  console.log("strictMode");
  if (inStrictMode) {
    inStrictMode = false;
  } else {
    inStrictMode = true;
  }
  document.getElementById("strict").classList.toggle("on");
  return;
}

function restart() {
  squareSequence = [];
  playerSequencePosition = 0;
  gameRound = 1;
  window.setTimeout(function() {
    counterDOM.innerHTML = "0";
    runGame();
  }, 1000);
  return;
}

function runGame() {
  //get random number and add to sequence
  squareSequence.push(Math.floor((Math.random() * 4) + 1));
  //gameRound++;
  animateSequence();
}

function animateSequence() {
  var i = 0;
  var animationInterval = window.setInterval(function() {
    animate(squareSequence[i]);
    i++;
    if (i >= gameRound) {
      clearInterval(animationInterval);
      enableInput = true;
    }
  }, 1000);
}

function checkInput(sqr) {
  if( !enableInput ) {
    return;
  }
  animate(sqr);
  // repeat sequence for incorrect input in non-strict
  if (sqr != squareSequence[playerSequencePosition] && !inStrictMode) {
    enableInput = false;
    counterDOM.innerHTML = "Try Again";
    window.setTimeout(function() {
      animateSequence();
      counterDOM.innerHTML = gameRound;
    }, 2000);
  } else if (sqr != squareSequence[playerSequencePosition] && inStrictMode) {
    enableInput = false;
    counterDOM.innerHTML = "Try Again";
    window.setTimeout(function() {
      restart();
    }, 2000);
    return;
  } else if ((sqr == squareSequence[playerSequencePosition]) && ((playerSequencePosition + 1) == gameRound)) {
    eableInput = false;
    if (gameRound == 20) {
      window.setTimeout(function() {
        counterDOM.innerHTML = "You Win";
      }, 1000);
      window.setTimeout(restart, 2000);
      return;
    }
    gameRound++;
    console.log("gameround" + gameRound);
    playerSequencePosition = 0;
    window.setTimeout(function() {
      counterDOM.innerHTML = gameRound;
      runGame();
    }, 1000);
    return;
  } else {
    playerSequencePosition++;
  }
}

function animate(sqr) {
  var square = 0;
  switch (sqr) {
    case 1:
      square = document.getElementById("green");
      synth.triggerAttackRelease("C4", "8n");
      window.setTimeout(function() {
        square.classList.add("lighten-green");
      }, 100);
      window.setTimeout(function() {
        square.classList.remove("lighten-green");
      }, 600);
      break;
    case 2:
      square = document.getElementById("red");
      synth.triggerAttackRelease("A3", "8n");
      window.setTimeout(function() {
        square.classList.add("lighten-red");
      }, 100);
      window.setTimeout(function() {
        square.classList.remove("lighten-red");
      }, 600);
      break;
    case 3:
      square = document.getElementById("yellow");
      synth.triggerAttackRelease("E3", "8n");
      window.setTimeout(function() {
        square.classList.add("lighten-yellow");
      }, 100);
      window.setTimeout(function() {
        square.classList.remove("lighten-yellow");
      }, 600);
      break;
    case 4:
      square = document.getElementById("blue");
      synth.triggerAttackRelease("C3", "8n");
      window.setTimeout(function() {
        square.classList.add("lighten-blue");
      }, 100);
      window.setTimeout(function() {
        square.classList.remove("lighten-blue");
      }, 600);
      break;
  }
}

//Sources
//https://codeplanet.io/building-simon-says-javascript/
