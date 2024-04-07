import logo from './logo.svg';
import './App.css';
import Home from './componets/Home';
import About from './componets/About';
import Navbar from './componets/Navbar';
import NotesState from './context/notes/NotesState';
import React from "react";
import Alert from './componets/Alert';
import Login from './componets/Login';
import Signup from './componets/Signup';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
      <>
     < NotesState>
      <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home showAlert={showAlert} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
    </Router>
    </NotesState>
      </>
    
  );
}

export default App;
