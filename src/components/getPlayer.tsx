import { Player } from "./player"

export function getPrettyPlayer(player: Player){
  //console.log(player)
  if(player === Player.None)
  return 'noplayer'
  if(player===Player.One)
  //console.log("One")
  return 'playerOne'
  if(player===Player.Two)
  return 'playertwo'
}