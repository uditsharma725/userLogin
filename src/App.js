import React, { useState } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Alert from "./components/Alert";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    });
    setTimeout(() => setAlert(null), 2500);
  }

  return (
    <>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
          <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
