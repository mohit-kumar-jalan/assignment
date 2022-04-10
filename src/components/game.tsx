import { initializeBoard } from "./boardInitialize";
import { findLowestEmptyIndex } from "./findIndex";
import { GameState } from "./gameState";
import { getGameState } from "./getGameState";
import { getPrettyPlayer } from "./getPlayer";
import { Player } from "./player";
import { togglePlayerTurn } from "./playerTurn";
import "./App.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

//import PlayerContext from "./components/playerContext";

function Game() {
  const location = useLocation();
  const name: any = location.state;
  const firstName = name.fname;
  const secondName = name.sname;
  
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);

  let state = {
    board: initializeBoard(),
    playerTurn: Player.One,
    gameState: GameState.Ongoing,
  };
  function renderCells() {
    const board = state.board;
    
    return board.map((player, index) => renderCell(player, index));
  }
  function renderCell(player: Player, index: number) {
    return (
      <div
        className="cell"
        key={index}
        data-player={getPrettyPlayer(player)}
        onClick={() => handleOnClick(index)}
        
      ></div>
    );
  }

  function handleOnClick(index: number) {
    const gameState = state.gameState;
    if (gameState !== GameState.Ongoing) {
      return;
    }
    const column = index % 7;
    makeMove(column);
  }
  const makeMove = (column: number) => {
    const board = state.board;
    const playerTurn = state.playerTurn;
    const index = findLowestEmptyIndex(board, column);
    const newBoard = board.slice();
    newBoard[index] = playerTurn;

    const gamestate = getGameState(newBoard);
    console.log(gamestate);

    
    state.board = newBoard;
    state.playerTurn = togglePlayerTurn(playerTurn);
    if (gamestate === 1) {
      
      state.gameState = GameState.PlayerOneWin;
    } else if (gamestate === 2) {
      state.gameState = GameState.PlayerTwoWin;
    } else if (gamestate === 0) {
      state.gameState = GameState.Draw;
    } else if (gamestate === -1) {
      state.gameState = GameState.Ongoing;
    }
    renderGameStatus()
  };

  function restartGame() {
    const board = [];
    for (let i = 0; i < 42; i++) {
      board.push(Player.None);
    }
    return board;
  }

  function renderGameStatus() {
    /*let player1=PlayerContext
     let player2=PlayerContext
     console.log(player1,player2)*/
    const gameState = state.gameState;
    //console.log(gameState);
    let text;
    let text1;
    if (gameState === GameState.Draw) {
      text = "Game is draw";
      //console.log(text);
    } else if (gameState === GameState.PlayerOneWin) {
      setFirstPlayerScore(firstPlayerScore + 1);
      text = "Congratulation";
      text1 = "Player One";
      //console.log(text);
      //console.log(text1);
    } else if (gameState === GameState.PlayerTwoWin) {
      setSecondPlayerScore(secondPlayerScore + 1);
      text = "Congratulation";
      //console.log(text);
      text1 = "Player Two";
    }
    //console.log(this.firstPlayerScore,this.secondPlayerScore)
    //if(this.firstPlayerScore+this.secondPlayerScore !== 3){
    if (text1 === "Player One") {
      state.board = restartGame();
      state.playerTurn = Player.One;
      state.gameState = GameState.Ongoing;
    }
    if (text1 === "Player Two") {
      state.board = restartGame();
      state.playerTurn = Player.Two;
      state.gameState = GameState.Ongoing;
    }
    //}
    if (firstPlayerScore + secondPlayerScore === 3) {
      if (firstPlayerScore > secondPlayerScore) {
        text = "Player One won";
        setFirstPlayerScore(0);
        setSecondPlayerScore(0);
        state.gameState = GameState.PlayerOneWin;
      } else if (firstPlayerScore < secondPlayerScore) {
        text = "Player two won";

        setFirstPlayerScore(0);
        setSecondPlayerScore(0);
        state.gameState = GameState.PlayerTwoWin;
      }
    }
    return (
      <div className="game">
        <h3>Games Tournament</h3>
        {console.log("win",text1)}
        <h2>{text1}</h2>
        <div className="box1">
          <div className="rect1_2">
            <img src="./1.png" alt="" />
            <div>
              <p>Player01</p>
              <p className="firstName">{firstName}</p>
            </div>
            <div className="score1">Score</div>
            <h5>{firstPlayerScore}</h5>
          </div>
          <div className="rect2_1">
            <img src="./2.png" alt="" />
            <div>
              <p>Player02</p>
              <p className="secondName">{secondName}</p>
            </div>
            <div className="score2">Score</div>
            <h5>{secondPlayerScore}</h5>
          </div>
        </div>

        <Link to="/">
          <input
            type="button"
            value="End Game"
            className="startButton1"
          ></input>
        </Link>
      </div>
    );
  }
  /*{constructor(props){

  }}*/

  return (
    <div className="App">
      {/* <p>Text</p> */}
      <div>{renderGameStatus()}</div>
      <div className="board">{renderCells()}</div>
      {/* {console.log()}  */}
      {/* {console.log("str ",props.location.state)}  */}
    </div>
  );
}

export default Game;
