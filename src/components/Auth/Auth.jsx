import React from 'react';
import { Avatar, Button, Paper, Typography, Grid, Container } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const isSignedUp = false;

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign In
                </Typography>
            </Paper>
        </Container>
    )
}

export default Auth
