import "./gameStart.css";

import { Link } from "react-router-dom";

import { useState } from "react";
//import { name } from './playerContext';
//import PlayerContext from './playerContext';

function StartGame() {

  var [firstName, setFirstName] = useState("");
  var [secondName, setSecondName] = useState("");

  /*let setPlayer1:any=useContext(PlayerContext);
    let setPlayer2:any=useContext(PlayerContext)*/
  //let fname=name.fname

  return (
    <div className="box">
      <div className="rect1">
        <img src="./1.png" alt="" />
        <div>
          <p>Player01</p>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </div>
      </div>
      <div className="rect2">
        <img src="./2.png" alt="" />
        <div>
          <p>Player02</p>
          <input type="text" onChange={(e) => setSecondName(e.target.value)} />
        </div>
      </div>
     {/* {console.log(firstName, secondName)}  */}
      {/* <Link to={{pathname: "/game", state: }} ><input type="button" value="Start Game" className='startButton'></input></Link> */}
      
      {/* <Link
        to={`/game`}
        state=
          //firstName,secondName
          "abcd"
        
        
      > */}
        {/* <input type="button" value="Start Game" className='startButton' onClick={() => }></input> */}
        <Link
        to={"/game"} state={{fname: firstName,sname: secondName }}><button className="startButton">Start Game</button></Link>
      
    </div>
  );
}

export default StartGame;
