import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: "",
      output: ""
    }
    this.postRequest = this.postRequest.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }
  
  postRequest() {
    fetch('https://cjsback.herokuapp.com/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "input="+ this.state.input
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          output: data['response']
        })
      })
  }

  updateInput(input) {
    this.setState({
      input: input.target.value
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
            onChange={this.updateInput}
          />
          <TextField
            className="filled-textarea"
            label="Translate"
            multiline
            variant="filled"
            value={this.state.output}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.postRequest}
            >
            Translate
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
