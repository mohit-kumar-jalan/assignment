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
import photo from "./1.png";
import photo1 from "./2.png";
var style1 = "";
var style2 = "";
var playerWon = "";
let roundWinner = "";
var temp = "";
var gameNo = 1;
var buttonStyle = "none";
var undoButtonStyle = "block";
var cp="";
function Game() {
  const location = useLocation();
  const name: any = location.state;
  const firstName = name.fname;
  const secondName = name.sname;
  const totalGame = name.totalgame;

  const [seq, setSeq] = useState(1);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [startGame, setStartGame] = useState(true);
  const [lastClickedRow, setLastClickedRow] = useState(-1);
  const [lastClickedColumn, setLastClickedColumn] = useState(-1);
  const [board, setBoard] = useState(createBoard());
  const [playerTurn, setPlayerTurn] = useState(Player.One);
  const [gameState, setGameState] = useState(GameState.Ongoing);
 
    // if(playerTurn===1) cp="playerOne"
    // else if(playerTurn===2) cp="playertwo"
    // else cp="noplayer"

  function createBoard() {
    let board = Array(8)
      .fill(0)
      .map(() => new Array(8).fill(0));
    return board;
  }

  function renderCells() {
    const cells = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        cells.push(renderCell(i, j, board[i][j]));
      }
    }
    return cells;
  }
  function renderCell(i: number, j: number, playerOccupied: number) {
    // console.log(playerTurn)
    
    return (
      
      <div
        className="cell"
        // key={index}
        
        data-player={getPrettyPlayer(playerOccupied)} // extract from current player
        onClick={() => {
          if (startGame) {
            buttonStyle = "none";
            handleOnClick(i, j);
          } else {
            return null;
          }
        }}
      ></div>
    );
  }
  function handleOnClick(row: number, column: number) {

    console.log(board[row][column])
    if(board[row][column]===1) cp="playerOne"
    else if(board[row][column]===2) cp="playertwo"
    else cp="noplayer"
    
    undoButtonStyle = "block";
    setLastClickedRow(row);
    setLastClickedColumn(column);
    if (gameState !== GameState.Ongoing) {
      return;
    }

    makeMove(column);
  }
  function availableCell(column: number) {
    for (let i = 7; i >= 0; i--) {
      if (board[i][column] === Player.None) {
        return i;
      }
    }
    return -1;
  }
  function updateCell(freeCell: number, column: number) {
    let tempBoard: any[][] = [];
    for (let i = 0; i < 8; i++) {
      tempBoard.push(board[i].slice());
    }
    tempBoard[freeCell][column] = playerTurn;
    return tempBoard;
  }
  const makeMove = (column: number) => {
    const freeCell = availableCell(column);
    const newBoard = updateCell(freeCell, column);
    setBoard(newBoard);
    setPlayerTurn(togglePlayerTurn(playerTurn));
    if (playerTurn === 1) {
      style2 = "5px solid orange";

      style1 = "none";
    } else if (playerTurn === 2) {
      style1 = "5px solid orange";

      style2 = "none";
    }
    const winner = getGameState(freeCell, column, newBoard, playerTurn);

    if (winner === 1) {
      setGameState(GameState.PlayerOneWin);
    } else if (winner === 2) {
      setGameState(GameState.PlayerTwoWin);
    } else if (winner === -1) {
      setGameState(GameState.Ongoing);
    }
    // return (
    //   <div className="player"
    //   data-player={playerTurn}
    //   ></div>
    // )
  };
  function undoClick(row: number, column: number) {
    let tempBoard: any[][] = [];
    for (let i = 0; i < 8; i++) {
      tempBoard.push(board[i].slice());
    }
    tempBoard[row][column] = Player.None;
    if (playerTurn === 1) {
      style2 = "5px solid orange";

      style1 = "none";
    } else if (playerTurn === 2) {
      style1 = "5px solid orange";

      style2 = "none";
    }
    return tempBoard;
  }
  function restartGame() {
    setBoard(createBoard());
  }

  function renderGameStatus() {
    if (seq <= parseInt(totalGame)) {
      if (gameState === GameState.PlayerOneWin && seq <= parseInt(totalGame)) {
        setFirstPlayerScore(firstPlayerScore + 1);
        roundWinner = "Player One";
        temp = "Won";
        playerWon ="Congratulation " + firstName + " you won the round " + seq;
        buttonStyle = "block";
        undoButtonStyle = "none";
        setSeq(seq + 1);
        setStartGame(false);
        setGameState(GameState.Ongoing);
      } else if (
        gameState === GameState.PlayerTwoWin &&
        seq <= parseInt(totalGame)
      ) {
        setSecondPlayerScore(secondPlayerScore + 1);
        roundWinner = "Player Two";
        temp = "Won";
        playerWon ="Congratulation " + secondName + " you won the round " + seq;
        buttonStyle = "block";
        undoButtonStyle = "none";
        setSeq(seq + 1);
        setGameState(GameState.Ongoing);
        setStartGame(false);
      }
    } else {
      if (firstPlayerScore + secondPlayerScore === parseInt(totalGame)) {
        if (firstPlayerScore > secondPlayerScore) {
          playerWon ="Congratulation " + firstName + " you won the game";
          buttonStyle = "none";
          undoButtonStyle = "none";
          setFirstPlayerScore(0);
          setSecondPlayerScore(0);
          setGameState(GameState.PlayerOneWin);
        } else if (firstPlayerScore < secondPlayerScore) {
          playerWon = "Congratulation " + secondName + " you won the game";
          buttonStyle = "none";
          undoButtonStyle = "none";
          setFirstPlayerScore(0);
          setSecondPlayerScore(0);
          setGameState(GameState.PlayerTwoWin);
        } else if (firstPlayerScore === secondPlayerScore) {
          playerWon = "Game Draw";
          buttonStyle = "none";
          undoButtonStyle = "none";
          setFirstPlayerScore(0);
          setSecondPlayerScore(0);
          setGameState(GameState.Draw);
        }
      }
      if (roundWinner === "Player One") {
        style1 = "5px solid orange";

        style2 = "none";
      }
      if (roundWinner === "Player Two") {
        style2 = "5px solid orange";
        style1 = "none";
      }
    }
    return (
      <div className="game">
        
        <h3>{totalGame} Games Tournament</h3>
        <h2>{playerWon}</h2>
        <h4>Playing game {gameNo}</h4>
        <div className="box1">
          <div className="rect1_2">
            <img
              src={photo}
              alt=""
              style={{ border: "" + style1, borderRadius: "40px" }}
            />
            <div>
              <p>Player01</p>
              <p className="firstName">{firstName}</p>
            </div>
            <div className="score1">Score</div>
            <h5>{firstPlayerScore}</h5>
          </div>
          <div className="rect2_1">
            <img
              src={photo1}
              alt=""
              style={{ border: "" + style2, borderRadius: "40px" }}
            />
            <div>
              <p>Player02</p>
              <p className="secondName">{secondName}</p>
            </div>
            <div className="score2">Score</div>
            <h5>{secondPlayerScore}</h5>
          </div>
        </div>
        <div>
          <button
            className="start"
            style={{ display: "" + buttonStyle }}
            onClick={() => {
              restartGame();
              setStartGame(true);
              if (gameNo < parseInt(totalGame)) {
                gameNo += 1;
              }
              buttonStyle = "none";
              undoButtonStyle = "block";
            }}
          >
            Start Game
          </button>
        </div>
        <div>
          <button
            className="start"
            style={{ display: "" + undoButtonStyle }}
            onClick={() => {
              setBoard(undoClick(lastClickedRow, lastClickedColumn));
              setPlayerTurn(togglePlayerTurn(playerTurn));
            }}
          >
            Undo Step
          </button>
        </div>

        <Link to="/">
          <input
            type="button"
            value="End Tournament"
            className="startButton1"
          ></input>
        </Link>
      </div>
    );
  }

  return (
    <div className="App">
      <div>{renderGameStatus()}</div>
      <div className="board">{renderCells()}</div>
     </div>
  );
}
export default Game;