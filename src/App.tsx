import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartGame from "./components/gameStart";
import Game from "./components/game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
