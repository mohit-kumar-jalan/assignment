let winner: number;
export function getGameState(
  freeCell: number,
  column: number,
  board: any[][],
  playerTurn: number
) {
  // console.log(playerTurn)
  if (checkHorizontal(freeCell, board, playerTurn, column)) {
    // console.log(playerTurn)
    return winner;
  } else if (checkVertical(column, board, playerTurn, freeCell)) {
    return winner;
  } else if (checkDiagonal(board, freeCell, column, playerTurn)) {
    return winner;
  } else return -1;
}
function checkVertical(
  column: number,
  board: any[][],
  playerTurn: number,
  row: number
) {
  let player;

  if (playerTurn === 1) player = 1;
  else player = 2;

  if (
    board[row][column] === player &&
    board[row + 1][column] === player &&
    board[row + 2][column] === player &&
    board[row + 3][column] === player
  ) {
    winner = player;
    return true;
  } else if (
    board[row][column] === player &&
    board[row - 1][column] === player &&
    board[row - 2][column] === player &&
    board[row - 3][column] === player
  ) {
    winner = player;
    return true;
  } else {
    winner = -1;
    return false;
  }
}

function checkHorizontal(
  row: number,
  board: any[][],
  playerTurn: number,
  column: number
) {
  let player;
  if (playerTurn === 1) player = 1;
  else player = 2;
  for (let j = 0; j < 5; j++) {
    if (
      board[row][j] === player &&
      board[row][j + 1] === player &&
      board[row][j + 2] === player &&
      board[row][j + 3] === player
    ) {
      winner = player;
      return true;
    }
  }

  winner = -1;
  return false;
}

function checkDiagonal(
  board: any[][],
  freeCell: number,
  column: number,
  playerTurn: number
): Boolean {
  let player;
  if (playerTurn === 1) player = 1;
  else player = 2;
  if (
    board[freeCell][column] === player &&
    board[freeCell - 1][column - 1] === player &&
    board[freeCell - 2][column - 2] === player &&
    board[freeCell - 3][column - 3] === player
  ) {
    winner = player;
    return true;
  } else if (
    board[freeCell][column] === player &&
    board[freeCell - 1][column + 1] === player &&
    board[freeCell - 2][column + 2] === player &&
    board[freeCell - 3][column + 3] === player
  ) {
    winner = player;
    return true;
  } else if (
    board[freeCell][column] === player &&
    board[freeCell + 1][column - 1] === player &&
    board[freeCell + 2][column - 2] === player &&
    board[freeCell + 3][column - 3] === player
  ) {
    winner = player;
    return true;
  } else if (
    board[freeCell][column] === player &&
    board[freeCell + 1][column + 1] === player &&
    board[freeCell + 2][column + 2] === player &&
    board[freeCell + 3][column + 3] === player
  ) {
    winner = player;
    return true;
  } else {
    winner = -1;
    return false;
  }
}
