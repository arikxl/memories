import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { Avatar, Button, Paper, Typography, Grid, Container } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Icon from './icon';
import Input from './Input';
import useStyles from './styles';
import  { signUp, signIn } from '../../redux/actions/authActions';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {

    const classes = useStyles();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error)
        }

    }

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form}
                    onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name"
                                    handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name"
                                    handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address"
                            handleChange={handleChange} type="email" />
                        <Input name="password" label="Password"
                            handleChange={handleChange}
                            type={!showPassword ? "password" : "text"}
                            handleShowPassword={handleShowPassword} />
                        {isSignUp && (
                            <Input name="confirmPassword" label="Repeat Password"
                                handleChange={handleChange} type="password" />
                        )}
                    </Grid>
                    <Button className={classes.submit} type="submit"
                        variant="contained" color="primary" fullWidth>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="101920198328-oc7gqbm3s666fiaea39h8uobfehgj819.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary" fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? 'Already have an account? Sign In'
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
