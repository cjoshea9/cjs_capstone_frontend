import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LanguageBar from './components/LanguageBar';
import TranslateBoxes from './components/TranslateBoxes';
import Navbar from './components/Navbar';


const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  basicGrid: {
    flexGrow: 1,
  },
  languageBar: {
      background: "white"
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems:"center",
    justifyContent:"center",
    minHeight:180
  },
  box: {
    padding: theme.spacing(2),
    height: "100%",
  }
}));

// TODO: Use refs instead of this method
function allowTabs() {
    const textbox = document.getElementById("input-text-area")
    textbox.onkeydown = function(key) {
      if (key.code === "Tab") {
        const val = this.value
        const start = this.selectionStart
        const end = this.selectionEnd
        this.value = val.substring(0, start) + '\t' + val.substring(end)
        this.selectionStart = this.selectionEnd = start + 1
        return false
      }
    }
}

export default function App() {
    const classes = useStyles();

    // set state
    const [timer, setTimer] = useState(null);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [inputLanguage, setInputLanguage] = useState("js");
    const [outputLanguage, setOutputLanguage] = useState("py");

    // TODO: use get request to populate frontend
    async function getRequest() {
        const res = await fetch(`https://cjsback.herokuapp.com/`)
        const data = await res.json()
    }

    // deals with the fact that setting state is asynchronous
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://cse.google.com/cse.js?cx=013104617978576650762:hrpvx9uejrs";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }

    }, [])

    async function postRequest(inputValue, inputLanguageValue, outputLanguageValue ){
        const params = new URLSearchParams({
            input: inputValue,
            in_lang: inputLanguageValue,
            out_lang: outputLanguageValue
        })

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: params.toString()
        };
        const response = await fetch('https://cjsback.herokuapp.com/', requestOptions);    
        const translation = await response.json();

        setOutput(translation["response"])
    }

    const handleInputLanguageChange = (event, value) => {
        setInputLanguage(value)
        postRequest(input, value, outputLanguage)
    } 

    const handleOutputLanguageChange = (event, value) => {
        setOutputLanguage(value)
        postRequest(input, inputLanguage, value)
    } 

    const handleInputChange = (event) => {
        allowTabs(); // TODO: move this to useEffect
        const value = event.target.value;
        setInput(value);

        clearTimeout(timer)
        setTimer(setTimeout(() => {
            postRequest(value, inputLanguage, outputLanguage)
        }, 500))
      }

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar/>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                            <LanguageBar 
                              inputLanguage={inputLanguage} 
                              outputLanguage={outputLanguage} 
                              handleInputLanguageChange= {handleInputLanguageChange} 
                              handleOutputLanguageChange= {handleOutputLanguageChange} 
                              classes={classes}
                            />
                            <TranslateBoxes
                              input= {input}
                              handleInputChange={handleInputChange}
                              output={output}
                              classes={classes}
                            />
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}
