import { Player } from "./player";

export function checkWinningSlice(miniBoard: Player[]) {
  if (miniBoard.some((cell) => cell === Player.None)) return false;
  //console.log(miniBoard[0],miniBoard[1])
  if (
    miniBoard[0] === miniBoard[1] &&
    miniBoard[1] === miniBoard[2] &&
    miniBoard[2] === miniBoard[3]
  ) {
    return miniBoard[1];
  }
  return false;
}
