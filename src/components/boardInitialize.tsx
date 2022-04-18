import { Player } from "./player";

export type Board = Player[]
export function initializeBoard() {
    const board = [];
  for (let i = 0; i < 64; i++) {
    board.push(Player.None);
  }
  return board;
}