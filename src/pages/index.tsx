import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;
    console.log(x, y);
    const newBoard = structuredClone(board);

    const directions = [
      [0, 1], // 下
      [0, -1], // 上
      [1, 1], // 右下
      [1, -1], // 右上
      [1, 0], // 右
      [-1, 0], // 左
      [-1, 1], // 左下
      [-1, -1], // 左上
    ];

    //８方向を確認してひっくり返す

    for (const direction of directions) {
      const [dx, dy] = direction;
      let X = x + dx;
      let Y = y + dy;
      let oppoment = false;
      while (board[Y] !== undefined && board[Y][X] !== undefined) {
        if (board[Y][X] === 2 / turnColor) {
          oppoment = true;
          X += dx;
          Y += dy;
        } else if (board[Y][X] === turnColor) {
          if (oppoment) {
            let changeX = x + dx;
            let changeY = y + dy;
            while (changeX !== X || changeY !== Y) {
              newBoard[changeY][changeX] = turnColor;
              changeX += dx;
              changeY += dy;
            }
            newBoard[y][x] = turnColor;
            setTurnColor(2 / turnColor);
          }
          break;
        } else {
          break;
        }
      }
    }
    setboard(newBoard);
  };

  const countStones = (board) => {
    let black = 0;
    let white = 0;

    for (const row of board) {
      for (const cell of row) {
        if (cell === 1) black++;
        if (cell === 2) white++;
      }
    }
    return { black, white };
  };
  const { black, white } = countStones(board);

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
      <div className={styles.scoreBoard}>
        <p>黒:{black}</p>
        <p>白:{white}</p>
      </div>
      <div className={styles.turn}>
        <p>{turnColor === 1 ? '黒' : '白'}のターン</p>
      </div>
    </div>
  );
};

export default Home;
