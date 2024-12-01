import React, { useEffect, useState } from 'react';
import './Style.css';

function Grid({ One, setView, setChoice, setScores }) {
  const [player, setPlayer] = useState(true);
  const [stroke, setStroke] = useState(['Tick', 'Cross']);
  const [label, setLabel] = useState(['.', '.', '.', '.', '.', '.', '.', '.', '.']);
  const [matrix, setMatrix] = useState([9, 9, 9, 9, 9, 9, 9, 9, 9]);
  const [modal, setModal] = useState({ visible: false, message: '' });

  const gameStroke = (e) => {
    const index = e.target.name;
    if (label[index] === '.') {
      setPlayer(!player);
      const updatedLabel = [...label];
      const updatedMatrix = [...matrix];
      if (player) {
        updatedLabel[index] = stroke[0];
        updatedMatrix[index] = 1;
      } else {
        updatedLabel[index] = stroke[1];
        updatedMatrix[index] = 0;
      }
      setLabel(updatedLabel);
      setMatrix(updatedMatrix);
    }
  };

  const setWin = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (matrix[a] === matrix[b] && matrix[b] === matrix[c] && matrix[a] !== 9) {
        const winner = matrix[a] === 1 ? stroke[0] : stroke[1];
        setScores((prev) => {
          const score = [...prev];
          score[matrix[a]] += 1;
          return score;
        });
        setModal({ visible: true, message: `Game won by ${winner}!` });
        setChoice('Tick');
        return;
      }
    }
    if (!matrix.includes(9)) {
      setModal({ visible: true, message: "It's a draw!" });
      setChoice('Tick');
    }
  };

  const resetGame = () => {
    setLabel(['.', '.', '.', '.', '.', '.', '.', '.', '.']);
    setMatrix([9, 9, 9, 9, 9, 9, 9, 9, 9]);
    setModal({ visible: false, message: '' });
    setView(false);
  };

  useEffect(() => {
    if (One === 'Cross') {
      setStroke(['Cross', 'Tick']);
    }
    setWin();
  }, [matrix]);

  return (
    <div className="grid-container">
      <div className="grid">
        {label.map((value, index) => (
          <button
            key={index}
            name={index}
            onClick={gameStroke}
            className="grid-cell"
          >
            {value === '.' ? '' : value}
          </button>
        ))}
      </div>
      {modal.visible && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modal.message}</h3>
            <button onClick={resetGame}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Grid;
