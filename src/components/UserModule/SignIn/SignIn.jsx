import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, InputAdornment, Button, Link, } from '@mui/material';
import { LockOutlined, AccountCircle, PasswordOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fieldValueChanged, authenticate } from './signInSlice'
import UserModuleStyles from '../UserModuleSytle';

const SignIn = props => {

    const dispatch = useDispatch();
    const signInObj = useSelector((state) => state.signIn.signInObj);    


    const handleFieldValueChange = (event) => {
        dispatch(fieldValueChanged({
            id: event.currentTarget.id,
            value: event.currentTarget.value
        }))
    }

    const authenticateUser = (event) => {
        dispatch(authenticate({
            "userEmailOrMobile": signInObj.userEmailOrMobileFieldObj.value,
            "userPassword": signInObj.passwordFieldObj.value
        }))
        event.preventDefault();
    }

    const handleForgetPasswordLinkClicked = () =>{
        props.displayForgetPasswordDialog();
    }

    const handleCreateAccountLinkClicked = () => {
        props.displaySignUpDialog();
    }

    const handleCloseSignInDialog=()=>{
        props.closeSignInDialog();
    }

    return (
        <Grid>
            <img alt="" src='images/close.png' style={UserModuleStyles.closeImg} onClick={handleCloseSignInDialog} />
            <Paper elevation={24} style={UserModuleStyles.userSignInPaperStyle}>
                <Grid align={'center'}>
                    <Avatar style={UserModuleStyles.avatarStyle} ><LockOutlined /></Avatar>
                    <Typography variant="h3" fontFamily={'inherit'}> Sign In </Typography>
                </Grid>
                <hr />
                <br />
                <TextField
                    style={UserModuleStyles.textFieldStyle}
                    required
                    id="userEmailOrMobileFieldObj"
                    placeholder="Email Id or Mobile Number"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    label='Enter your registered Email Id or Mobile Number'
                    fullWidth
                    variant="outlined"
                    value={signInObj.userEmailOrMobileFieldObj.value}
                    error={signInObj.userEmailOrMobileFieldObj.error}
                    helperText={signInObj.userEmailOrMobileFieldObj.error ? signInObj.userEmailOrMobileFieldObj.helperText : ""}
                    onChange={handleFieldValueChange}
                />
                <TextField
                    style={UserModuleStyles.textFieldStyle}
                    required
                    id="passwordFieldObj"
                    placeholder="Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PasswordOutlined />
                            </InputAdornment>
                        ),
                    }}
                    label='Enter your Password'
                    fullWidth
                    type='password'
                    variant="outlined"
                    value={signInObj.passwordFieldObj.value}
                    error={signInObj.passwordFieldObj.error}
                    helperText={signInObj.passwordFieldObj.error ? signInObj.passwordFieldObj.helperText : ""}
                    onChange={handleFieldValueChange}
                />
                <Button variant='contained' fullWidth size='large' onClick={authenticateUser} style={UserModuleStyles.primaryButtons}>
                    Sign In
                </Button>
                <Typography fontFamily={'inherit'} style={{ margin: '10px auto' }}>
                    <Link href='#' onClick={handleForgetPasswordLinkClicked}>forgot Password?</Link>
                </Typography>
                <Typography fontFamily={'inherit'} style={{ margin: '10px auto' }}>
                    Do you have an Account?
                    <Link href='#' onClick={handleCreateAccountLinkClicked}>Create Account</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}

export default SignIn;