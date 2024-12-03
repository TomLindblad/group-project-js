import React, { useState, useEffect } from 'react';

const GRID_SIZE = 20;

function GamePage() {
  const [snake, setSnake] = useState([[10, 10]]); // Starting position of the snake
  const [food, setFood] = useState([5, 5]); // Initial food position
  const [direction, setDirection] = useState('RIGHT'); // Initial direction
  const [gameOver, setGameOver] = useState(false);

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

    // Determine the new head position based on the direction
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

    // Check for collisions (walls or self)
    if (
      newHead[0] < 0 || newHead[1] < 0 || 
      newHead[0] >= GRID_SIZE || newHead[1] >= GRID_SIZE || 
      snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      setGameOver(true);
      return;
    }

    // Add new head to the snake
    newSnake.push(newHead);

    // Check if the snake eats the food
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      // Place new food in a random position
      setFood([Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]);
    } else {
      // Remove the tail
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  return (
    <div style={styles.container}>
      {gameOver ? (
        <h1 style={styles.gameOverText}>Game Over</h1>
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
  gameOverText: {
    color: 'red',
    fontSize: '2rem',
  },
};

export default GamePage;
