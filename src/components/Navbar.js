import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function Navbar(){
    return(
        <AppBar position="relative">
            <ToolBar>
                <Typography variant="h6" color="inherit" noWrap>
                    CodeTranslate
                </Typography>
            </ToolBar>
        </AppBar>
    )
}