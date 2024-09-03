import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


const PLAYER = { X: "Player 1", O: "Player 2" };


const  INITIAL_GAME_PLAYER = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function dervieActicePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}
function App() {
  const [players, setPlayers] = useState(PLAYER);
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = dervieActicePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  
  function driveGameBoard (gameTurns){
    let gameBoard = [...INITIAL_GAME_PLAYER.map((array) => [...array])];

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
  
      gameBoard[row][col] = player;
    }
    return gameBoard;
  }
  
  function driveWinner(gameBoard, player){
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];
  
      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = players[firstSquareSymbol];
      }
    }
    return winner;
  }
  function handleSelectSquaer(rowIndex, colIndex) {
    // SetActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns) => {
      const currentPlayer = dervieActicePlayer(gameTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  
  function handlePlayernameChange (symbol, newName){
    setPlayers(prevPlayer => {
      return{
        ...prevPlayer,
        [symbol] : newName
      }
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName = {handlePlayernameChange}
          />
          <Player
            initialName={PLAYER.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName = {handlePlayernameChange}
            
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquaer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
