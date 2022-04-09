import { Player } from "./player";

export function togglePlayerTurn(player : Player){
    //console.log("toggle")
    return player===Player.One ? Player.Two : Player.One
}