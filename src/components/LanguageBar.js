import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function LanguageBar({supportedLanguages, inputLanguage, outputLanguage, handleInputLanguageChange, handleOutputLanguageChange, classes}) {

    // Get input and output language codes
    const inputLangCodes = []
    const outputLangCodes = []
    for (const code in supportedLanguages){
        if (supportedLanguages[code]["is_input_lang"]){
            inputLangCodes.push(code);
        }
        if (supportedLanguages[code]["is_output_lang"]){
            outputLangCodes.push(code);
        }
    }
    
    return(
        <AppBar position="static" color="default">
            <Grid container className={classes.basicGrid} spacing={2}>
                <Grid item xs={6}>
                    <Tabs 
                      value={inputLanguage} 
                      onChange={handleInputLanguageChange} 
                      indicatorColor="primary" 
                      textColor="primary" 
                      variant="scrollable" 
                      scrollButtons="auto"
                    >
                        {inputLangCodes.map( code => (
                            <Tab key={code} value={code} label={supportedLanguages[code]["name"]} />
                        ))}
                    </Tabs>
                    {/* <Tabs
                        value={inputLanguage}
                        onChange={handleInputLanguageChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    > */}
                    {/* </Tabs> */}
                </Grid>
                {/* TODO: break up both sets of tabs */}
                <Grid item xs={6}>
                    <Tabs 
                      value={outputLanguage} 
                      onChange={handleOutputLanguageChange} 
                      indicatorColor="primary" 
                      textColor="primary" 
                      variant="scrollable" 
                      scrollButtons="auto"
                    >
                        {outputLangCodes.map( code => (
                            <Tab key={code} value={code} label={supportedLanguages[code]["name"]} />
                        ))}
                    </Tabs>

                </Grid>
            </Grid>
        </AppBar>
    );
}
