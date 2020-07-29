import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Copyright() {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="http://obscure-stream-88552.herokuapp.com/">
                    CodeTranslate
                </Link>{' '}
                {new Date().getFullYear()}
                {'. '}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                Queries are logged to improve results.
            </Typography>
        </div>
    );
  }
  