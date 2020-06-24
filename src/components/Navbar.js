import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navbar = () => {
    return (
        <AppBar position="static">
            <ToolBar>
                <Typography variant="h4" color="inherit">
                    CodeTranslate
                </Typography>
            </ToolBar>
        </AppBar>
    );
}

export default Navbar;