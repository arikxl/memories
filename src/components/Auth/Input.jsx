import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import {Visibility, VisibilityOff} from '@mui/icons-material';
const Input = ({ half, name, label, type, handleChange, autoFocus, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name} required fullWidth
                onChange={handleChange} variant="outlined"
                label={label} type={type}
                autoFocus={autoFocus}
                inputProps={name === "password" && {
                    endadornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}

            />
        </Grid>
    )
};

export default Input;