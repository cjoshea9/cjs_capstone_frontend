import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function LanguageBar({supportedLanguages, inputLanguage, outputLanguage, languageDetected, handleInputLanguageChange, handleOutputLanguageChange, classes}) {

    // Get input and output language codes
    const inputLangCodes = []
    const outputLangCodes = []
    // TODO Get detect language from the backend
    inputLangCodes.push("auto");
    for (const code in supportedLanguages){
        if (supportedLanguages[code]["is_input_lang"]){
            inputLangCodes.push(code);
        }
        if (supportedLanguages[code]["is_output_lang"]){
            outputLangCodes.push(code);
        }
    }

    function getLabel(code) {
        if (code === "auto") {
            console.log(languageDetected)
            if (languageDetected !== "" && languageDetected !== "auto") {
                return supportedLanguages[languageDetected]["name"] + " - detected"
            }
            return "Detect Language"
        }
        if (supportedLanguages[code]["is_beta"]) {
            return supportedLanguages[code]["name"] + " (beta)"
        }
        return supportedLanguages[code]["name"]
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
                            <Tab key={code} value={code} label={getLabel(code)} />
                        ))}
                    </Tabs>
                </Grid>
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
                            <Tab key={code} value={code} label={getLabel(code)} />
                        ))}
                    </Tabs>
                </Grid>
            </Grid>
        </AppBar>
    );
}
