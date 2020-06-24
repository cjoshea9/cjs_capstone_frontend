import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ""
    }
    this.getRequest = this.getRequest.bind(this)
  }
  
  getRequest() {
    fetch('https://cjsback.herokuapp.com/')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          value: data['hello']
        })
      })
  }

  render() {
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
            value={this.state.value}
          />
          <Button variant="contained" color="primary" onClick={this.getRequest}>
            Translate
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
