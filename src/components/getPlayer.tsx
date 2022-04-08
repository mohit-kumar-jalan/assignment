import { Player } from "./player"

export function getPrettyPlayer(player: Player){
  if(player === Player.None)
  return 'noplayer'
  if(player===Player.One)
  return 'playerOne'
  if(player===Player.Two)
  return 'playertwo'
}