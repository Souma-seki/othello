import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setboard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

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

  // 候補地を３に設定する
  const choice = () => {
    const newBoard = structuredClone(board);
    for (let y = 0; y < newBoard.length; y++) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (newBoard[y][x] !== 1 && newBoard[y][x] !== 2) {
          let choicePrace = false;
          for (const direction of directions) {
            const [dx, dy] = direction;
            let preX = x + dx;
            let preY = y + dy;
            let opponent = false;
            while (newBoard[preY] !== undefined && newBoard[preX] !== undefined) {
              if (newBoard[preY][preX] === 2 / turnColor) {
                opponent = true;
                preX += dx;
                preY += dy;
              } else if (newBoard[preY][preX] === turnColor) {
                if (opponent) {
                  choicePrace = true;
                }
                break;
              } else {
                break;
              }
            }
          }
          newBoard[y][x] = choicePrace ? 3 : 0;
        }
      }
    }
    setboard(newBoard);
  };

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0 && board[y][x] !== 3) return;
    console.log(x, y);
    const newBoard = structuredClone(board);

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
    choice;
  };

  // 各石の数を数える
  const countStones = () => {
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
  const { black, white } = countStones();

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && color !== 3 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
              {color !== 1 && color !== 2 && (
                <div
                  className={styles.choiceStyle}
                  style={{ background: color === 3 ? '#ff0000' : '' }}
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
