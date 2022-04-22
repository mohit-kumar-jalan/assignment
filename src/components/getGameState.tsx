import { Board } from "./boardInitialize";
import { GameState } from "./gameState";
import { Player } from "./player";
import { checkWinningSlice } from "./checkWinning";
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
  }
  // if(checkVertical(column,board, playerTurn,freeCell) || checkHorizontal(freeCell,board, playerTurn, column) || checkDiagonal(board,freeCell,column,playerTurn)){
  //   return winner
  // }
  else return -1;
  // return checkVertical(column,board, playerTurn,freeCell) || checkHorizontal(freeCell,board, playerTurn, column) || checkDiagonal(board,freeCell,column,playerTurn)
}
//freeCell - row
function checkVertical(
  column: number,
  board: any[][],
  playerTurn: number,
  row: number
) {
  let player;
  // console.log(playerTurn)

  if (playerTurn === 1) player = 1;
  else player = 2;
  // console.log(row,column)
  // if(row <= 4){
  // for(let i= 7;i>3;i--){
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
  // console.log(playerTurn)
  let player;
  if (playerTurn === 1) player = 1;
  else player = 2;
  for (let j = 0; j < 5; j++) {
    // for(let i=0;i<8;i++){
    if (
      board[row][j] === player &&
      board[row][j + 1] === player &&
      board[row][j + 2] === player &&
      board[row][j + 3] === player
    ) {
      winner = player;
      return true;
      // }
    }
  }
  // console.log(row,column)
  // for (let i = 0; i <= 4; i++) {
  // if(column>=3){
  // console.log(board[row][column],board[row][column+1],board[row][column+2],board[row][column+3])
  // if (board[row][column] === player &&
  //     board[row][column - 1] === player &&
  //     board[row][column - 2] === player &&
  //     board[row][column - 3] === player) {
  //       console.log("this")
  //       winner=player
  //         return true;
  // }
  // else{
  // winner=-1
  //   return false;
  // }
  // }
  // else{
  //   else if (board[row][column] === player &&
  //     board[row][column + 1] === player &&
  //     board[row][column + 2] === player &&
  //     board[row][column + 3] === player) {
  //       console.log("true")
  //       winner=player
  //         return true;
  // }
  // else{
  winner = -1;
  return false;
  // }
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
  // for(let i=0;i<3;i++){
  // for(let j=0;j<=4;j++){
  if (
    board[freeCell][column] === player &&
    board[freeCell - 1][column - 1] === player &&
    board[freeCell - 2][column - 2] === player &&
    board[freeCell - 3][column - 3] === player
  ) {
    winner = player;
    return true;
  }
  // }
  // }
  // for(let i=7;i>=3;i--){
  else if (
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
  // }
  // return false
}
