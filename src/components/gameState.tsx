import { Player } from "./player";

export enum GameState {
  Ongoing = -1,
  Draw = 0,
  PlayerOneWin = Player.One,
  PlayerTwoWin = Player.Two,
}
