import { Board } from "./boardInitialize"
import { Player } from "./player"

export function findLowestEmptyIndex(board: Board, column: number){
  //console.log(column)
    for ( let i = 35 + column; i>=0 ;i-=7){
     // console.log(board[i])
        if(board[i] === Player.None){
          //console.log(board[i]===Player.None)
          return i
        } 
      }
    return -1
}