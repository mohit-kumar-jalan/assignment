import { Board } from "./boardInitialize";
import { Player } from "./player";
import { GameState } from './gameState'

export interface State {
    board: Board,
    playerTurn : Player,
    gameState : GameState | Player
  }