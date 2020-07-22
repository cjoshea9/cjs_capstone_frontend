import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LanguageBar from './components/LanguageBar';
import TranslateBoxes from './components/TranslateBoxes';
import Navbar from './components/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress'


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
    alignItems:"center",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent:"center",
    minHeight:180,
    overflow: 'auto',
  },
  box: {
    height: "100%",
    padding: theme.spacing(2),
  },
  loadingPage: {
    alignItems:"center",
    display: 'flex',
    height: '80vh',
    justifyContent:"center",
  }, 
  title: {
    flexGrow: 1,
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
  const BACKEND_URL = `https://cjsback.herokuapp.com/`
  const classes = useStyles();

    // set state
    const [timer, setTimer] = useState(null);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [inputLanguage, setInputLanguage] = useState("js");
    const [outputLanguage, setOutputLanguage] = useState("py");
    const [supportedLanguages, setSupportedLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getRequest() {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        setSupportedLanguages(data["supported_languages"]);
        setLoading(false);
    }

    useEffect(() => {
        getRequest() // send get request immediately to ping backend and populate frontend
        
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
        const response = await fetch(BACKEND_URL, requestOptions);    
        const translation = await response.json();
        
        // change in_lang only if it is defined
        if (translation['response_in_lang'] !== "undefined"){
          setInputLanguage(translation['response_in_lang'])
        }

        setOutput(translation["response"])
    }

    /**
     * Function accesses google search custom bar to add query from input 
     * text box directly into search bar which then searches google. 
     */
    function querySearch(inputValue, outputLanguageValue) {
      let query = inputValue + " in "
      query += supportedLanguages[outputLanguageValue]["name"] // get pretty name

      document.getElementById("gsc-i-id1").value = query;
      const buttons = document.getElementsByClassName("gsc-search-button gsc-search-button-v2")
      buttons[0].click();
    }

    const handleInputLanguageChange = (event, value) => {
        setInputLanguage(value)
        postRequest(input, value, outputLanguage)
    } 

    const handleOutputLanguageChange = (event, value) => {
        setOutputLanguage(value)
        postRequest(input, inputLanguage, value)
        querySearch(input, value)
    } 

    const handleInputChange = (event) => {
        allowTabs(); // TODO: move this to useEffect
        const value = event.target.value;
        setInput(value);

        clearTimeout(timer)
        setTimer(setTimeout(() => {
            postRequest(value, inputLanguage, outputLanguage)
            querySearch(value, outputLanguage)
        }, 500))
      }
    
    if (loading) {
      return (
        <React.Fragment>
            <Navbar/>
            <div className={classes.loadingPage}><CircularProgress size="100px"/></div>
        </React.Fragment>
      )
    }
    
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar/>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
                    { Object.keys(supportedLanguages).length > 0 &&
                      <LanguageBar 
                        supportedLanguages = {supportedLanguages}
                        inputLanguage={inputLanguage} 
                        outputLanguage={outputLanguage} 
                        handleInputLanguageChange= {handleInputLanguageChange} 
                        handleOutputLanguageChange= {handleOutputLanguageChange} 
                        classes={classes}
                    />}
                    <TranslateBoxes
                      input= {input}
                      handleInputChange={handleInputChange}
                      output={output}
                      classes={classes}
                    />
            </Container>
          </div>
          <div className="gcse-search"></div>
        </main>
      </React.Fragment>
    );
}
