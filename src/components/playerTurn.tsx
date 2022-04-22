import { Player } from "./player";

export function togglePlayerTurn(player: Player) {
  return player === Player.One ? Player.Two : Player.One;
}
