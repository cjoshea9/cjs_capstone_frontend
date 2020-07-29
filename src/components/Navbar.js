import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default function Navbar({classes}){
    return(
        <AppBar position="relative">
            <ToolBar>
                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    CodeTranslate
                </Typography>
                <Button 
                  href="https://forms.gle/vq8c9qMXqgCConz98" 
                  target="_blank"
                  color="inherit"
                  >
                      Give Feedback
                </Button>
            </ToolBar>
        </AppBar>
    )
}