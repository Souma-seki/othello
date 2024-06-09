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

    for (const direction of directions) {
      const [dx, dy] = direction;
      let X = x + dx;
      let Y = y + dy;
      let oppoment = false;

      // if (
      //   board[y + dy] !== undefined &&
      //   board[y + dy][x + dx] !== undefined &&
      //   board[y + dy][x + dx] === 2 / turnColor //もしその方向がundefindでないかつその方向が相手の色
      // ) {
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
              newBoard[Y][X] = turnColor;
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
      //     newBoard[y][x] = turnColor;
      //   } //上記の方向が定義されてる間かつ相手の色の間自分の色の時→終わり自分の色がこないままundefindのとき→置けないにしたい
      //   newBoard[y][x] = turnColor;
      if (newBoard[y][x] === turnColor) {
        setTurnColor(2 / turnColor); //白黒順番交代
      }
      // }
    }
    setboard(newBoard);
  };

  console.table(board);

  // setboard(newBoard);

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
    </div>
  );
};

export default Home;
