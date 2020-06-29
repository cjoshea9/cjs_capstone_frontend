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

    // sends get request with user query
    const query = this.state.input + " in " + this.state.outputLangauge;
    this.getRequest(query)

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

  // Get request using rest API - returns all data (links, titles, summary etc)
  getRequest(query) {
    console.log(query);
    fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAU-3jbW41Be4Vj_1fI4kr6yf3hsOpCAbw&cx=013104617978576650762:hrpvx9uejrs&q=' + query, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }).then(res => res.json()).then((data) => {
      for (const currElm of data.items) {
        //html formatted has tags in it
        const url = currElm.link;
        const title = currElm.htmlTitle;
        // div to hold individual result
        const elm = document.createElement("a");
        elm.classList.add("links");
        elm.setAttribute("href", url);
        elm.innerHTML = title;
        document.body.appendChild(elm)
      }
    })
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
