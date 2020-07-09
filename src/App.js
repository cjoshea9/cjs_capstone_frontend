import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems:"center",
    justifyContent:"center",
    minHeight:180
  },
}));

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
    let timer = null;

    // set state
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [inputLanguage, setInputLanguage] = useState("js")
    const [outputLanguage, setOutputLanguage] = useState("py")

    // TODO: use get request to populate frontend
    async function getRequest() {
        const res = await fetch(`https://cjsback.herokuapp.com/`)
        const data = await res.json()
    }

    // deals with the fact that setting state is asynchronous
    useEffect(() => {
        autoTranslate(input)
    }, [input])

    async function postRequest(){
        const params = new URLSearchParams({
            input: input,
            in_lang: inputLanguage,
            out_lang: outputLanguage
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
    } 

    const handleOutputLanguageChange = (event, value) => {
        setOutputLanguage(value)
    } 

    function autoTranslate(value){
        setInput(value);

        clearTimeout(timer)
        timer = setTimeout(() => {
            postRequest()
        }, 500)   
    }

    const handleInputChange = (event) => {
        allowTabs();
        const value = event.target.value;
        autoTranslate(value)
      }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        CodeTranslate
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                            <AppBar position="static" color="white">
                                <Grid container className={classes.basicGrid} spacing={2}>
                                    <Grid item xs={6}>
                                        <Tabs
                                            value={inputLanguage}
                                            onChange={handleInputLanguageChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                        >
                                            <Tab value= "js" label="JavaScript" />
                                            <Tab value="py" label="Python" />
                                        </Tabs>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Tabs
                                            value={outputLanguage}
                                            onChange={handleOutputLanguageChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                        >
                                            <Tab value= "js" label="JavaScript" />
                                            <Tab value="py" label="Python" />
                                        </Tabs>
                                    </Grid>
                                </Grid>
                            </AppBar>
                            <Paper className={classes.paper}>
                                <Grid container className={classes.basicGrid} spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField
                                        id="input-text-area"
                                        label="Input Code"
                                        multiline
                                        fullWidth
                                        onChange={handleInputChange}
                                        InputProps={{ disableUnderline: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                        id="standard-multiline-static"
                                        label="Translation"
                                        multiline
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                        value={output}
                                        disabled
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}
