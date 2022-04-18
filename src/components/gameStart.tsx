import "./gameStart.css";

import { Link } from "react-router-dom";
import photo from './1.png'
import photo1 from './2.png'
import { useState } from "react";
//import { name } from './playerContext';
//import PlayerContext from './playerContext';

function StartGame() {

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [noOfGame,setNoOfGame] = useState("")
  /*let setPlayer1:any=useContext(PlayerContext);
    let setPlayer2:any=useContext(PlayerContext)*/
  //let fname=name.fname

  return (
    <div className="box">
      <div className="rect1">
        <img src={photo1} alt="" />
        <div>
          <p>Player01</p>
          <input type="text" className="text1" onChange={(e) => setFirstName(e.target.value)} />
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
        <input type="text" onChange={(e) => setNoOfGame(e.target.value)}/>
      </div>
      <hr />
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
        to={"/game"} state={{fname: firstName,sname: secondName,totalgame: noOfGame }}><button className="startButton">Start Game</button></Link>
      
    </div>
  );
}

export default StartGame;
