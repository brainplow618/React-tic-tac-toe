import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  
  function handleChange(event){
    setPlayerName(event.target.value)
  }

  let editAblePlayerName = <span className="player-name">{playerName}</span>;
//   let btnCaption = "Edit";

  if (isEditing) {
    editAblePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    // btnCaption = "Save";
    
  }
  return (
    <li>
      <span className="player">
        {editAblePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save': 'Edit'}</button>
    </li>
  );
}
