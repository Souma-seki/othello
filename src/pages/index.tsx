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

    //上下左右確認

    if (board[y + 1] !== undefined && board[y + 1][x] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
    }
    if (board[y - 1] !== undefined && board[y - 1][x] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
    }

    if (board[x + 1] !== undefined && board[y][x + 1] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
    }
    if (board[x - 1] !== undefined && board[y][x - 1] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
    }

    if (
      board[x - 1] !== undefined &&
      board[y][x - 1] !== undefined &&
      board[y][x - 1] === 2 / turnColor
    ) {
      newBoard[y][x] = turnColor;
    }

    if (
      board[x + 1] !== undefined &&
      board[y][x + 1] !== undefined &&
      board[y][x + 1] === 2 / turnColor
    ) {
      newBoard[y][x] = turnColor;
    }

    if (
      board[y - 1] !== undefined &&
      board[y - 1][x] !== undefined &&
      board[y - 1][x] === 2 / turnColor
    ) {
      newBoard[y][x] = turnColor;
    }

    if (
      board[y + 1] !== undefined &&
      board[y + 1][x] !== undefined &&
      board[y + 1][x] === 2 / turnColor
    ) {
      newBoard[y][x] = turnColor;
    }

    // 上下のマスが相手の色の場合、自分の色に変更する関数
    const flipVertical = (y: number, x: number) => {
      // 上方向をチェックして色を変更
      let i = y - 1;
      while (i >= 0 && board[i] !== undefined && board[i][x] === 2 / turnColor) {
        newBoard[i][x] = turnColor;
        i--;
      }

      // 下方向をチェックして色を変更
      i = y + 1;
      while (i < board.length && board[i] !== undefined && board[i][x] === 2 / turnColor) {
        newBoard[i][x] = turnColor;
        i++;
      }
    };

    // オセロボードを更新するメインの部分
    if (board[y + 1] !== undefined && board[y + 1][x] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
      flipVertical(y, x);
    }
    if (board[y - 1] !== undefined && board[y - 1][x] === 2 / turnColor) {
      newBoard[y][x] = turnColor;
      flipVertical(y, x);
    }

    setTurnColor(2 / turnColor);

    setboard(newBoard);
  };
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
