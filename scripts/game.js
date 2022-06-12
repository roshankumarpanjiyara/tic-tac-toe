function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = "Your won, <span id=\"winner-name\">Player Name</span>!";
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;
    for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = "";
            gameBoardItemElement.classList.remove("disabled");
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if(players[0].name === '' || players[1].name === ''){
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;

    gameAreaElement.style.display = "block";
    editPlayer1BtnElement.style.display = "none";
    editPlayer2BtnElement.style.display = "none";
}


function switchPlayer() {
    if(activePlayer == 0){
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event){
    if(event.target.tagName !== "LI" || gameIsOver){
        return;
    }
    const selectedField = event.target;

    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0){
        // alert("Please select empty field!");
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();
    // console.log(winnerId);
    if(winnerId !== 0){
        endGame(winnerId);
    }

    currentRound++;

    switchPlayer();
}

function checkForGameOver() {
    for(let i = 0;i < 3;i++){
        if(gameData[i][0] > 0 && gameData[i][0] == gameData[i][1] &&  gameData[i][1] == gameData[i][2]){
            return gameData[i][0];
        }
    }
    for(let i = 0;i < 3;i++){
        if(gameData[0][i] > 0 && gameData[0][i] == gameData[1][i] &&  gameData[1][i] == gameData[2][i]){
            return gameData[0][i];
        }
    }

    if(gameData[0][0] > 0 && gameData[0][0] == gameData[1][1] &&  gameData[1][1] == gameData[2][2]){
        return gameData[0][0];
    }
    if(gameData[2][0] > 0 && gameData[0][2] == gameData[1][1] &&  gameData[1][1] == gameData[2][0]){
        return gameData[2][0];
    }

    if(currentRound === 9){
        return -1;
    }
    return 0;
}

function endGame(winnerId){
    gameIsOver = true;
    gameOverElement.style.display = "block";
    const winCountPlayer = document.getElementById("player-"+winnerId+"-win");

    
    if(winnerId > 0){
        const winnername = players[winnerId-1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnername;
        let winCount = players[winnerId-1].win += 1;
        winCountPlayer.firstElementChild.textContent = winCount;
        // console.dir(winnerId-1);
        
    }else{
        gameOverElement.firstElementChild.textContent = "It's a Draw!";
    }
    
}

function resetGame(){
    activePlayer = 0;
    editedPlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = "Your won, <span id=\"winner-name\">Player Name</span>!";
    gameOverElement.style.display = "none";
    gameAreaElement.style.display = "none";

    formElement.firstElementChild.lastElementChild.value = '';

    const player1data = document.getElementById("player-1-data");
    player1data.children[1].innerHTML = "Player Name";
    player1data.children[3].firstElementChild.textContent = 0;

    const player2data = document.getElementById("player-2-data");
    player2data.children[1].innerHTML = "Player Name";
    player2data.children[3].firstElementChild.textContent = 0;

    players[0].name="";
    players[0].win=0;
    players[1].name="";
    players[1].win=0;

    let gameBoardIndex = 0;
    for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = "";
            gameBoardItemElement.classList.remove("disabled");
            gameBoardIndex++;
        }
    }
    editPlayer1BtnElement.style.display = "inline";
    editPlayer2BtnElement.style.display = "inline";
}