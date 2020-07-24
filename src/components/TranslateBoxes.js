import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';


export default function TranslateBoxes({input, handleInputChange, output, errors, classes}){
    function addErrorsToOutput(output, errors){
        if (Object.entries(errors).length !== 0){
            let finalOutput = output

            // go through output text and find any strings with pattern $$E_$$
            const regexp = /\$\$E.\$\$/g

            const matches = [...output.matchAll(regexp)];

            for (const match of matches){
                const errorKey = match[0].substring(2).slice(0,-2)
                const errorMessage = errors[errorKey]["errorMessage"]
                finalOutput = finalOutput.replace(match, errorMessage)
            }
            return finalOutput

        } else {
            return output
        }
    }

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
                    <Box className = {classes.box} bgcolor="grey.200">
                        <TextField
                        id="standard-multiline-static"
                        label="Translation"
                        multiline
                        fullWidth
                        // TODO: create more contrast in output text font color
                        InputProps={{
                            style: {fontFamily: "monospace"},
                            disableUnderline: true
                        }}
                        value={addErrorsToOutput(output, errors)}
                        disabled
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>

    )
}