import { Board } from "./boardInitialize";
import { GameState } from "./gameState";
import { Player } from "./player";
import { checkWinningSlice } from "./checkWinning";

export function getGameState(board: Board){
  //horizontal
    for(let r=0;r<8;r++){
        for(let c=0;c<4;c++){
          const index=r*8+c
          //console.log(index)
        const boardSlice=board.slice(index,index+4)
        //console.log(boardSlice)
        const winningResult= checkWinningSlice(boardSlice)
        //console.log(winningResult)
        if(winningResult!==false) return winningResult
      }
      }
    //vertical
      for(let r=0;r<=4;r++){
        for(let c=0;c<=8;c++){
          const index=r*8+c
        const boardSlice=[board[index],board[index+8],board[index+8*2], board[index+8*3]]
        const winningResult= checkWinningSlice(boardSlice)
        if(winningResult!==false) return winningResult
      }
      }
    
      for(let r=0;r<=4;r++){
        for(let c=0;c<=8;c++){
          const index=r*8+c
    
          if(c >= 4){
        const boardSlice=[board[index],board[index+8-1],board[index+8*2-2], board[index+8*3-3]]
        const winningResult= checkWinningSlice(boardSlice)
        if(winningResult!==false) return winningResult
          }
    
          if(c<=4){
            const boardSlice=[board[index],board[index+8+1],board[index+8*2+2], board[index+8*3+3]]
        const winningResult= checkWinningSlice(boardSlice)
        if(winningResult!==false) return winningResult
          }
    
          
      }
      }
    
      if(board.some(cell => cell===Player.None)){
        return GameState.Ongoing
      }
      else
      return GameState.Draw
    
}