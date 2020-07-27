import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Typography, Tooltip } from '@material-ui/core';


export default function TranslateBoxes({input, handleInputChange, output, errors, classes}){
    function addErrorsToOutput(output, errors){
        console.log(output)
        if (errors && Object.entries(errors).length !== 0){
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

    function createOutputTypography(output, errors){
        const regexp = /\$\$E.\$\$/g
        const matches = [...output.matchAll(regexp)];
        if (matches.length == 0){
            return <Typography style={{whiteSpace: 'pre-line'}} display="inline">{output}</Typography>
        }

        if (errors && Object.entries(errors).length !== 0){
            let prev = 0;
            let finalOutput = []
            for (const match of matches){
                // non error
                let beforeText = output.substring(prev, match["index"])
                finalOutput.push(<Typography style={{whiteSpace: 'pre-line'}} key={prev} display="inline">{beforeText}</Typography>)

                // error
                let errorKey = match[0].substring(2).slice(0,-2)
                let errorMessage = errors[errorKey]["errorMessage"]
                finalOutput.push(<Tooltip style={{whiteSpace: 'pre-line'}} key={prev+1} title={errorMessage}><Typography display="inline">Error</Typography></Tooltip>)
                console.log("prev1", prev)
                prev = match["index"] + (errorKey.length) + 4;
                console.log("prev2", prev)
            }
            let afterText = output.substring(prev)
            finalOutput.push(<Typography style={{whiteSpace: 'pre-line'}} key={prev} display="inline">{afterText}</Typography>)
            return finalOutput
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
                        {/* <Typography >
                          {errors && output && addErrorsToOutput(output, errors)}
                        </Typography> */}
                        {errors && output && createOutputTypography(output, errors)}
                        {/* <Tooltip title="Hi"><Typography display="inline">Hello</Typography></Tooltip> */}
                    </Box>
                </Grid>
            </Grid>
        </Paper>

    )
}