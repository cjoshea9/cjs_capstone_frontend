import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import TextField from '@material-ui/core/TextField';

function App() {
  async function getRequest() {
    const res = await fetch('https://cjsback.herokuapp.com/')
    const data = await res.json()
    console.log(data)
  }
  
  getRequest()
  return (
    <div>
      <Navbar/>
      <div className="textfields">
        <TextField
          className="filled-textarea"
          label="Enter Text"
          multiline
          variant="filled"
        />
        <TextField
          className="filled-textarea"
          label="Translate"
          multiline
          variant="filled"
        />
      </div>
    </div>

  );
}

export default App;
