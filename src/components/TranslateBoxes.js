import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';


export default function TranslateBoxes({input, handleInputChange, output, classes}){
    return(
        <Paper className={classes.paper}>
            <Grid container className={classes.basicGrid} spacing={0}>
                <Grid item xs={6}>
                    <Box className = {classes.box}>
                        <TextField
                        id="input-text-area"
                        label="Input Code"
                        multiline
                        fullWidth
                        value={input}
                        onChange={handleInputChange}
                        InputProps={{
                            style: {fontFamily: "monospace"},
                            disableUnderline: true
                        }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className = {classes.box} bgcolor="grey.300">
                        <TextField
                        id="standard-multiline-static"
                        label="Translation"
                        multiline
                        fullWidth
                        // variant="filled"
                        InputProps={{
                            style: {fontFamily: "monospace"},
                            disableUnderline: true
                        }}
                        value={output}
                        disabled
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>

    )
}