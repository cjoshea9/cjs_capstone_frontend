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
                  href="https://docs.google.com/forms/d/e/1FAIpQLSen6Nw4-2D1LdhCMgSlVB1rAjMPlThTlSQ4mAqeRYHm-XStMw/viewform?usp=sf_link" 
                  target="_blank"
                  color="inherit"
                  >
                      Give Feedback
                </Button>
            </ToolBar>
        </AppBar>
    )
}