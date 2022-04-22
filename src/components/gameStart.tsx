import "./gameStart.css";

import { Link } from "react-router-dom";
import photo from "./1.png";
import photo1 from "./2.png";
import { useState } from "react";

function StartGame() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [noOfGame, setNoOfGame] = useState("");

  return (
    <div className="box">
      <div className="rect1">
        <img src={photo1} alt="" />
        <div>
          <p>Player01</p>
          <input
            type="text"
            className="text1"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div className="rect2">
        <img src={photo} alt="" />
        <div>
          <p>Player02</p>
          <input type="text" onChange={(e) => setSecondName(e.target.value)} />
        </div>
      </div>
      <div className="total-game">
        <p>Number of Games to be played</p>
        <input type="text" onChange={(e) => setNoOfGame(e.target.value)} />
      </div>
      <hr />
      <Link
        to={"/game"}
        state={{ fname: firstName, sname: secondName, totalgame: noOfGame }}
      >
        <button className="startButton">Start Game</button>
      </Link>
    </div>
  );
}

export default StartGame;
