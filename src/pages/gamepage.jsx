import React, { useState, useEffect } from 'react';

const GRID_SIZE = 20;

function GamePage() {
  const [snake, setSnake] = useState([[10, 10]]); // Initial snake position
  const [food, setFood] = useState([5, 5]); // Initial food position
  const [direction, setDirection] = useState('RIGHT'); // Initial direction
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [score, setScore] = useState(0); // Score state

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, 250);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    let newHead;
    switch (direction) {
      case 'UP':
        newHead = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        newHead = [head[0], head[1] + 1];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'RIGHT':
        newHead = [head[0] + 1, head[1]];
        break;
      default:
        return;
    }

    if (
      newHead[0] < 0 || newHead[1] < 0 || 
      newHead[0] >= GRID_SIZE || newHead[1] >= GRID_SIZE || 
      snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      setGameOver(true);
      return;
    }

    newSnake.push(newHead);

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
      setScore((prevScore) => prevScore + 1); // Increment score
    } else {
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  const restartGame = () => {
    setSnake([[10, 10]]);
    setFood([5, 5]);
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
  };

  return (
    <div style={styles.container}>
      <h1>Score: {score}</h1>
      {gameOver ? (
        <div style={styles.gameOverOverlay}>
          <h1 style={styles.gameOverText}>Game Over</h1>
          <button
            onClick={restartGame}
            style={styles.restartButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e64a19')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff5722')}
          >
            Restart Game
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
              const isSnake = snake.some(segment => segment[0] === col && segment[1] === row);
              const isFood = food[0] === col && food[1] === row;
              return (
                <div
                  key={`${row}-${col}`}
                  style={{
                    ...styles.cell,
                    backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white',
                  }}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
    gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
    gap: '2px',
  },
  cell: {
    width: '20px',
    height: '20px',
    border: '1px solid #ccc',
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: '3rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  restartButton: {
    padding: '15px 30px',
    backgroundColor: '#ff5722',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
  },
  restartButtonHover: {
    backgroundColor: '#e64a19',
  },
};

export default GamePage;
