import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function LanguageBar({supportedLanguages, inputLanguage, outputLanguage, handleInputLanguageChange, handleOutputLanguageChange, classes}) {
    const langCodes = Object.keys(supportedLanguages);
    
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
                        {langCodes.map( code => (
                            <Tab key={code} value={code} label={supportedLanguages[code]} />
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
                        {langCodes.map( code => (
                            <Tab key={code} value={code} label={supportedLanguages[code]} />
                        ))}
                    </Tabs>

                </Grid>
            </Grid>
        </AppBar>
    );
}
