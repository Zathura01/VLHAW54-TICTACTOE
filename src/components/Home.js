import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import './Style.css';

function Home() {
  const [choice, setChoice] = useState('Tick');
  const [view, setView] = useState(false);
  const [scores, setScores] = useState([0, 0]);

  const handleSelect = (e) => {
    setChoice(e.target.value);
  };

  const handleView = () => {
    localStorage.setItem('flag', 1);
    setView(true);
  };

  const handleReset = () => {
    setScores([0, 0]);
  };

  return (
    <div className="home-container">
      {view ? (
        <div className="game-view">
          <Grid
            One={choice}
            setView={setView}
            setChoice={setChoice}
            setScores={setScores}
          />
          <div className="scores">
            <label>Player 1: {scores[0]}</label>
            <br />
            <label>Player 2: {scores[1]}</label>
            <button onClick={handleReset}>Reset Scores</button>
          </div>
        </div>
      ) : (
        <div className="selection-view">
          <div className="option-bar">
            <h3>Player 2 selects Tick or Cross</h3>
            <select onChange={handleSelect}>
              <option value="Tick">Tick</option>
              <option value="Cross">Cross</option>
            </select>
            <button onClick={handleView}>Start Game</button>
          </div>
          <div className="scores">
            <label>Player 1: {scores[0]}</label>
            <br />
            <label>Player 2: {scores[1]}</label>
            <button onClick={handleReset}>Reset Scores</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
