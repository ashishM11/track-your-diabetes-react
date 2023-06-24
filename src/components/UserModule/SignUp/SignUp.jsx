import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Avatar, Typography, TextField, Button, Checkbox, Stack, Link, MenuItem, FormControlLabel, AlertTitle, Alert } from '@mui/material';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import UserModuleStyles from '../UserModuleSytle';
import { fieldValueChanged, registerNewUser, clearAlertMsg } from './signUpSlice'
import Constant from '../../../constants/Constants';

const SignUp = props => {

    const dispatch = useDispatch();
    const signUpObj = useSelector((state) => state.signUp.signUpObj);

    const handleFieldValueChange = (event) => {
        dispatch(fieldValueChanged({
            id: event.target.name,
            value: event.target.value
        }))
    }

    const handleAlreadyHavingAccount = () => {
        props.alreadyHavingAccount();
    }
    const handleCloseSignUpDialog = () => {
        props.closeSignUpDialog();
    }

    const handleFormSubmit = (event) => {
        const userRequestDTO = {
            userFName: signUpObj.userFirstNameFieldObj.value,
            userLName: signUpObj.userLastNameFieldObj.value,
            userEmail: signUpObj.userEmailFieldObj.value,
            userMobile: signUpObj.userMobileNoFieldObj.value,
            userGender: signUpObj.userGenderFieldObj.value,
            userDOB: signUpObj.userDateOfBirthFieldObj.value,
            password: {
                password: signUpObj.passwordFieldObj.value,
                retypePassword: signUpObj.confirmPasswordFieldObj.value
            }
        }
        dispatch(registerNewUser(userRequestDTO))
        event.preventDefault();
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearAlertMsg());
            if (signUpObj.isFormSubmitted) {
                props.closeSignUpDialog();
            }
        }, 5000);
    }, [signUpObj.showAlert, signUpObj.isFormSubmitted, dispatch, props]);

    return (
        <form>
            <Grid>
                <img alt="" src='images/close.png' style={UserModuleStyles.closeImg} onClick={handleCloseSignUpDialog} />
                <Paper elevation={24} style={UserModuleStyles.userSignUpPaperStyle} square={true}>
                    {
                        signUpObj.showAlert
                            ?
                            <Alert severity={signUpObj.alert.severity}>
                                <AlertTitle>{signUpObj.alert.title}</AlertTitle>
                                <strong>{signUpObj.alert.description}</strong>
                            </Alert>
                            : null
                    }

                    <Grid align='center'>
                        <Avatar style={UserModuleStyles.avatarStyle}>
                            <AddCircleOutlineOutlined />
                        </Avatar>
                        <h2 style={{ margin: 0 }}>Create Your Account</h2>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid>
                    <Stack direction={'row'} spacing={1}>
                        <TextField
                            style={UserModuleStyles.textFieldStyle}
                            required
                            name="userFirstNameFieldObj"
                            placeholder="First Name"
                            label="Enter your First Name"
                            fullWidth
                            size='small'
                            variant="outlined"
                            value={signUpObj.userFirstNameFieldObj.value}
                            error={signUpObj.userFirstNameFieldObj.error}
                            helperText={signUpObj.userFirstNameFieldObj.error ? signUpObj.userFirstNameFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                        <TextField
                            style={UserModuleStyles.textFieldStyle}
                            required
                            name="userLastNameFieldObj"
                            placeholder="Last Name"
                            label="Enter your Last Name"
                            fullWidth
                            size='small'
                            variant="outlined"
                            value={signUpObj.userLastNameFieldObj.value}
                            error={signUpObj.userLastNameFieldObj.error}
                            helperText={signUpObj.userLastNameFieldObj.error ? signUpObj.userLastNameFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                    </Stack>
                    <Stack spacing={1} direction={'row'}>
                        <TextField
                            style={UserModuleStyles.textFieldStyle}
                            required
                            name="userEmailFieldObj"
                            placeholder="Email"
                            label="Enter your Email ID"
                            fullWidth
                            size='small'
                            type='email'
                            variant="outlined"
                            value={signUpObj.userEmailFieldObj.value}
                            error={signUpObj.userEmailFieldObj.error}
                            helperText={signUpObj.userEmailFieldObj.error ? signUpObj.userEmailFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                        <TextField
                            style={UserModuleStyles.textFieldStyle}
                            required
                            name="userMobileNoFieldObj"
                            placeholder="Mobile Number"
                            label="Enter your Mobile Number"
                            fullWidth
                            size='small'
                            variant="outlined"
                            value={signUpObj.userMobileNoFieldObj.value}
                            error={signUpObj.userMobileNoFieldObj.error}
                            helperText={signUpObj.userMobileNoFieldObj.error ? signUpObj.userMobileNoFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            required
                            InputLabelProps={{ shrink: true }}
                            style={UserModuleStyles.textFieldStyle}
                            name="userDateOfBirthFieldObj"
                            type='date'
                            size='small'
                            label="Date Of Birth "
                            fullWidth
                            variant="outlined"
                            value={signUpObj.userDateOfBirthFieldObj.value}
                            error={signUpObj.userDateOfBirthFieldObj.error}
                            helperText={signUpObj.userDateOfBirthFieldObj.error ? signUpObj.userDateOfBirthFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                        <TextField
                            required
                            select={true}
                            style={UserModuleStyles.textFieldStyle}
                            name="userGenderFieldObj"
                            label="Gender"
                            fullWidth
                            size='small'
                            variant="outlined"
                            value={signUpObj.userGenderFieldObj.value}
                            error={signUpObj.userGenderFieldObj.error}
                            helperText={signUpObj.userGenderFieldObj.error ? signUpObj.userGenderFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        >
                            {
                                Constant.Gender.map(ele => {
                                    return <MenuItem key={ele.key} value={ele.key} >{ele.value}</MenuItem>
                                })
                            }
                        </TextField>
                    </Stack>
                    <Stack direction={'row'} spacing={20}>
                        <TextField
                            style={UserModuleStyles.textFieldStyle}
                            required
                            name="passwordFieldObj"
                            placeholder="Password"
                            label='Enter your Password'
                            fullWidth
                            type='password'
                            size='small'
                            variant="outlined"
                            value={signUpObj.passwordFieldObj.value}
                            error={signUpObj.passwordFieldObj.error}
                            helperText={signUpObj.passwordFieldObj.error ? signUpObj.passwordFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                        <TextField
                            style={UserModuleStyles.textFieldStyle}
                            required
                            name="confirmPasswordFieldObj"
                            label='Confirm Password'
                            placeholder="Confirm your password"
                            fullWidth
                            size='small'
                            type='password'
                            variant="outlined"
                            value={signUpObj.confirmPasswordFieldObj.value}
                            error={signUpObj.confirmPasswordFieldObj.error}
                            helperText={signUpObj.confirmPasswordFieldObj.error ? signUpObj.confirmPasswordFieldObj.helperText : ""}
                            onChange={handleFieldValueChange}
                        />
                    </Stack>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' onClick={handleFormSubmit} variant='contained' color='primary' style={UserModuleStyles.primaryButtons} fullWidth>Sign up</Button>
                    <Typography fontFamily={'inherit'} style={{ margin: '10px auto' }}>
                        <Link href='#' onClick={handleAlreadyHavingAccount}>Already having an Account? Then Sign In</Link>
                    </Typography>
                </Paper>
            </Grid >
        </form>
    )
}

export default SignUp