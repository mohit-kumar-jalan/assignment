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

function Game() {
  const location = useLocation();
  const name: any = location.state;
  const firstName = name.fname;
  const secondName = name.sname;
  const totalGame = name.totalgame;
  const i = parseInt(totalGame);
  //console.log(typeof totalGame)
  const [style1, setStyle1] = useState("");
  const [style2, setStyle2] = useState("");
  const [seq, setSeq] = useState(1);
  const [firstPlayerScore, setFirstPlayerScore] = useState(0);
  const [secondPlayerScore, setSecondPlayerScore] = useState(0);
  const [playerWon, setPlayerWon] = useState("");
  const [newGameState, setNewGameState] = useState({
    board: initializeBoard(),
    playerTurn: Player.One,
    gameState: GameState.Ongoing,
  });

  function renderCells() {
    return newGameState.board.map((player, index) => renderCell(player, index));
  }
  function renderCell(player: Player, index: number) {
    return (
      <div
        className="cell"
        key={index}
        data-player={getPrettyPlayer(player)}
        onClick={() => {
          handleOnClick(index);
        }}
      ></div>
    );
  }

  function handleOnClick(index: number) {
    const gameState = newGameState.gameState;
    if (gameState !== GameState.Ongoing) {
      return;
    }
    const column = index % 7;
    makeMove(column);
  }
  const makeMove = (column: number) => {
    const board = newGameState.board;
    const playerTurn = newGameState.playerTurn;
    const index = findLowestEmptyIndex(newGameState.board, column);
    const newBoard = board.slice();
    newBoard[index] = playerTurn;
    setNewGameState({ ...newGameState, board: newBoard });
    const gamestate = getGameState(newBoard);
    newGameState.board = newBoard;
    newGameState.playerTurn = togglePlayerTurn(playerTurn);
    //console.log(newGameState.playerTurn)
    if (newGameState.playerTurn === 1) {
      setStyle1("5px solid orange");

      setStyle2("none");
    } else if (newGameState.playerTurn === 2) {
      setStyle1("none");

      setStyle2("5px solid orange");
    }
    if (gamestate === 1) {
      setNewGameState({ ...newGameState, gameState: GameState.PlayerOneWin });
    } else if (gamestate === 2) {
      setNewGameState({ ...newGameState, gameState: GameState.PlayerTwoWin });
    } else if (gamestate === 0) {
      setNewGameState({ ...newGameState, gameState: GameState.Draw });
    } else if (gamestate === -1) {
      setNewGameState({ ...newGameState, gameState: GameState.Ongoing });
    }
  };

  function restartGame() {
    const board = [];
    for (let i = 0; i < 42; i++) {
      board.push(Player.None);
    }
    return board;
  }

  function renderGameStatus() {
    const gameState = newGameState.gameState;
    let text1;
    if (gameState === GameState.Draw) {
      setPlayerWon("Game Draw ");
    } else if (
      gameState === GameState.PlayerOneWin &&
      seq <= parseInt(totalGame)
    ) {
      setFirstPlayerScore(firstPlayerScore + 1);
      text1 = "Player One";
      setPlayerWon(firstName + " won the round " + seq);
      setSeq(seq + 1);
      //console.log(seq,typeof seq)
    } else if (
      gameState === GameState.PlayerTwoWin &&
      seq <= parseInt(totalGame)
    ) {
      setSecondPlayerScore(secondPlayerScore + 1);
      //console.log(text);
      text1 = "Player Two";
      setPlayerWon(secondName + " won the round " + seq);
      setSeq(seq + 1);
    }

    if (text1 === "Player One") {
      //seq+=1
      setNewGameState({
        board: restartGame(),
        playerTurn: Player.One,
        gameState: GameState.Ongoing,
      });
    }
    if (text1 === "Player Two") {
      setNewGameState({
        board: restartGame(),
        playerTurn: Player.Two,
        gameState: GameState.Ongoing,
      });
      

    }

    if (firstPlayerScore + secondPlayerScore === parseInt(totalGame)) {
      if (firstPlayerScore > secondPlayerScore) {
        setPlayerWon(firstName + " won the game");
        setFirstPlayerScore(0);
        setSecondPlayerScore(0);
      } else if (firstPlayerScore < secondPlayerScore) {
        setPlayerWon(secondName + " won the game");
        setFirstPlayerScore(0);
        setSecondPlayerScore(0);
      } else if (firstPlayerScore === secondPlayerScore) {
        setPlayerWon("Game Draw");
        setFirstPlayerScore(0);
        setSecondPlayerScore(0);
      }
    }
    //console.log(togglePlayerTurn)
    return (
      <div className="game">
        <h3>Games Tournament</h3>
        <h2>{playerWon}</h2>
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

  return (
    <div className="App">
      <div>{renderGameStatus()}</div>
      <div className="board">{renderCells()}</div>
    </div>
  );
}

export default Game;
