import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Mynotes";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/notestates";
import Alert from "./components/Alert";
import Login from './components/Login';
import Signup from './components/Signup';
import Mynotes from './components/Mynotes';
function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Mynotes />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mynotes" element={<Mynotes/>} />
          <Route exact path="*" element={<Home />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
