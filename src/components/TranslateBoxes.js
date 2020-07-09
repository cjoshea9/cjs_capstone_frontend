import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';


export default function TranslateBoxes({input, handleInputChange, output, classes}){
    return(
        <Paper className={classes.paper}>
            <Grid container className={classes.basicGrid} spacing={1}>
                <Grid item xs={6}>
                    <TextField
                    id="input-text-area"
                    label="Input Code"
                    multiline
                    fullWidth
                    value={input}
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

    )
}