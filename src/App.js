import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import NoteState from "./Context/notes/NoteState";

function App() {
  const [alert, setAlert] = useState({})

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      alertType: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }


  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={ <About /> } />
          <Route exact path="/login" element={ <Login showAlert={showAlert} /> } />
          <Route exact path="/signup" element={ <Signup showAlert={showAlert} /> } />
        </Routes>
        </div>
      </Router>
        </NoteState>
    </>
  );
}

export default App;
