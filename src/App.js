import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: "",
      output: "",
      inputLanguage: "",
      outputLangauge: ""
    }
    this.postRequest = this.postRequest.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }
  
  postRequest() {
    // TODO: add error checking before post and get request
    const params = new URLSearchParams({
      input: this.state.input,
      in_lang: this.state.inputLanguage,
      out_lang: this.state.outputLangauge
    })

    // submit user query to search bar
    let query = this.state.input + " in "
    if (this.state.outputLangauge === "js") {
      query += "javascript";
    }
    if (this.state.outputLangauge === "py") {
      query += "python";
    }
    this.querySearch(query);

    fetch('https://cjsback.herokuapp.com/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: params.toString()
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

  updateInputLanguage = (input) => {
    this.setState({
        inputLanguage: input.target.value
    });
  }

  updateOutputLanguage = (input) => {
    this.setState({
        outputLangauge: input.target.value
    });
  }

  // Adds script for search bar
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=013104617978576650762:hrpvx9uejrs";
    script.async = true;
    document.body.appendChild(script);
  }

  querySearch(query) {
    document.getElementById("gsc-i-id1").value = query;
    const buttons = document.getElementsByClassName("gsc-search-button gsc-search-button-v2")
    buttons[0].click();
  }
  
  render() {
    return (
      <div>
        <Navbar/>
       <div class="selectlanguage">
       <FormControl>
        <InputLabel>Input</InputLabel>
       <Select
          value={this.inputLanguage}
          onChange={this.updateInputLanguage}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"js"}>JavaScript</MenuItem>
          <MenuItem value={"py"}>Python</MenuItem>
        </Select>
        </FormControl>
        
       
        <FormControl>
        <InputLabel>Output</InputLabel>
        <Select
          value={this.outputLangauge}
          onChange={this.updateOutputLanguage}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"js"}>JavaScript</MenuItem>
          <MenuItem value={"py"}>Python</MenuItem>
        </Select>
        </FormControl>
        </div>


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
      
        <div class="gcse-search"></div>
        
      </div>
    );
  }
}

export default App;
