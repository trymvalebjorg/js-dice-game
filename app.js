/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlayin, diceHistory, winningScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number for both dices
        var dice1 = randomIntFromInterval(1, 6);
        var dice2 = randomIntFromInterval(1, 6);
        diceHistory.push(dice1, dice2); 
        
        // 2. Display the result of both dices
        var diceEl1 = document.querySelector('#dice-1');
        diceEl1.style.display = 'block';
        diceEl1.src = 'img/dice-' + dice1 + '.png'; 

        var diceEl2 = document.querySelector('#dice-2');
        diceEl2.style.display = 'block';
        diceEl2.src = 'img/dice-' + dice2 + '.png'; 
        
        //3. Update the round score IF the rolled number is NOT 1 or a second 6 in a row
        if(dice1 !== 1 || dice2 !== 1 ) {
            if (dice1 === 6 && diceHistory[diceHistory.length - 1] === diceHistory[diceHistory.length - 2]) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else {
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            roundScore = 0;
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //1. Add current score to global score
        scores[activePlayer] += roundScore;
        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //3. Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
        //4. Reset current score to 0
        roundScore = 0; 
    }
})

function nextPlayer() {
        //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundSCore = 0;
        diceHistory = [];

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('#dice-1').style.display = 'none';
        document.querySelector('#dice-2').style.display = 'none';

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    //Reset scores
    scores = [0, 0];
    activePlayer = 0; 
    roundScore = 0;
    gamePlaying = true;
    diceHistory = [];
    winningScore = 100;

    // Hide the dices
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';


    //Reset scores in the UI
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function setWinningScore() {
    var input = document.querySelector('#input');
    winningScore = input.value;
}