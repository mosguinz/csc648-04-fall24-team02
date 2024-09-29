import './App.css';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Game from "./pages/Game";
import SignIn from "./pages/SignIn";
import CreateAcc from './pages/CreateAcc';
import Help from './pages/Help';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile'; // Import Profile page

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/Home' exact element={<Home />} />
            <Route path='/' exact element={<Home />} />
            <Route path='/About' exact element={<About />} />
            <Route path='/Game' exact element={<Game />} />
            <Route path='/SignIn' exact element={<SignIn />} />
            <Route path='/create-account' element={<CreateAcc />} />
            <Route path='/L' element={<Help />} />
            <Route path='/Welcome' element={<Welcome />} />
            <Route path='/Profile' element={<Profile />} /> {/* Add Profile Route */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
