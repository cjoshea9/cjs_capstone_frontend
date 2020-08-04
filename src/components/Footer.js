import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Footer() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <Link color="inherit" href="https://github.com/jackdavidweber/cjs_capstone" target="_blank">
                Source Code
            </Link>{' '}
        </Typography>
    );
  }
  