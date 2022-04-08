import { Board } from "./boardInitialize";
import { GameState } from "./gameState";
import { Player } from "./player";
import { checkWinningSlice } from "./checkWinning";

export function getGameState(board: Board){
    for(let r=0;r<6;r++){
        for(let c=0;c<4;c++){
          const index=r*7+c
          //console.log(index)
        const boardSlice=board.slice(index,index+4)
        //console.log(boardSlice)
        const winningResult= checkWinningSlice(boardSlice)
        if(winningResult!==false) return winningResult
      }
      }
    
      for(let r=0;r<=3;r++){
        for(let c=0;c<=7;c++){
          const index=r*7+c
        const boardSlice=[board[index],board[index+7],board[index+7*2], board[index+7*3]]
        const winningResult= checkWinningSlice(boardSlice)
        if(winningResult!==false) return winningResult
      }
      }
    
      for(let r=0;r<=2;r++){
        for(let c=0;c<=7;c++){
          const index=r*7+c
    
          if(c >= 3){
        const boardSlice=[board[index],board[index+7-1],board[index+7*2-2], board[index+7*3-3]]
        const winningResult= checkWinningSlice(boardSlice)
        if(winningResult!==false) return winningResult
          }
    
          if(c<=3){
            const boardSlice=[board[index],board[index+7+1],board[index+7*2+2], board[index+7*3+3]]
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