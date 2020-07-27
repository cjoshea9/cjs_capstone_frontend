import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Typography, Tooltip, Link } from '@material-ui/core';


export default function TranslateBoxes({input, handleInputChange, output, errors, classes}){

    /**
     * Function takes output and errors and returns a list of typography and tooltip
     * elements to be displayed in the output area. Errors are found in the output and replaced
     * with "<err>" as well as a tooltip explaining the error.
     * @param {response translation from backend} output 
     * @param {response errors from backend} errors 
     */
    function createOutputTypography(output, errors){
        if (!(errors && output)){
            return [
                <Typography key={0} className={classes.outTextTranslation}>
                    <p>Translation</p>
                </Typography>  
            ]
        }

        const regexp = /\$\$E\d+\$\$/g
        const matches = [...output.matchAll(regexp)];

        if (matches.length<=0 || !errors || Object.entries(errors).length == 0){
            return [
                <Typography key={0} className={classes.outText}>
                    {output}
                </Typography>
            ]
        }

        let prev = 0;
        let finalOutput = []
        for (const match of matches){
            // Add text before error
            let beforeText = output.substring(prev, match["index"])
            finalOutput.push(
                <Typography className={classes.outText} key={prev}>
                    {beforeText}
                </Typography>
            )

            // Add error text
            let errorKey = match[0].substring(2).slice(0,-2)
            let errorMessage = errors[errorKey]["errorMessage"]
            finalOutput.push(
                <Tooltip key={prev+1} title={errorMessage} arrow>
                    <Typography className={classes.outErrorText}>
                        <Link color="inherit">{"<"}err{">"}</Link>
                    </Typography>
                </Tooltip>
            )
            prev = match["index"] + (errorKey.length) + 4;
        }
        let afterText = output.substring(prev)
        finalOutput.push(
            <Typography className={classes.outText} key={prev}>
                {afterText}
            </Typography>
        )
        return finalOutput
        
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
                            style: {fontFamily: "monospace", fontSize: 18},
                            disableUnderline: true
                        }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className = {classes.box} bgcolor="grey.200">
                        <p>{createOutputTypography(output, errors)}</p>
                    </Box>
                </Grid>
            </Grid>
        </Paper>

    )
}