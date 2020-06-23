import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"

function App() {

  async function getRequest() {
    const res = await fetch('https://cjsback.herokuapp.com/')
    const data = await res.json()
    console.log(data)
  }
  
  getRequest()
  return (
    <Navbar/>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
