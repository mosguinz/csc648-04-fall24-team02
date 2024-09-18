import './App.css';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Game from "./pages/Game";
import Katy from "./pages/Katy";
import Kevin from "./pages/Kevin";
import Niko from "./pages/Niko";
import Arjun from "./pages/Arjun";
import Matthew from "./pages/Matthew";
import Mos from "./pages/Mos";
import Arizza from "./pages/Arizza";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/Home' exact element={<Home />} />
          <Route path='/' exact element={<Home />} />
          <Route path='/About' exact element={<About />} />
          <Route path='/Game' exact element={<Game />} />
          <Route path='/Katy' exact element={<Katy />} />
          <Route path='/Kevin' exact element={<Kevin />} />
          <Route path='/Niko' exact element={<Niko />} />
          <Route path='/Arjun' exact element={<Arjun />} />
          <Route path='/Matthew' exact element={<Matthew />} />
          <Route path='/Mos' exact element={<Mos />} />
          <Route path='/Arizza' exact element={<Arizza />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
