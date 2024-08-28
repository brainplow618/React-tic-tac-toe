import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";

function App() {
 const [gameTurns, setGameTurns] = useState([]);
 const [activePlayer, SetActivePlayer] = useState('X');
 
 function handleSelectSquaer(rowIndex, colIndex){
  SetActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  
  setGameTurns((prevTurns) => {
    let currentPlayer = 'X'; 
    if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      currentPlayer = 'O';
    }
    const updateTurns = [
      { square: {row: rowIndex, col:colIndex}, player: currentPlayer },
      ...prevTurns,
    ];
    return updateTurns
  
  });

  
 }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'}/>
        <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquaer} turns={gameTurns}/>
      </div>
      <Log/>
    </main>
  );
}

export default App;
