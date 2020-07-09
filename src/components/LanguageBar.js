import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default function LanguageBar({inputLanguage, outputLanguage, handleInputLanguageChange, handleOutputLanguageChange, classes}) {
    return(
        <AppBar position="static" className={classes.languageBar}>
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
                {/* TODO: break up both sets of tabs */}
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
    );
}
