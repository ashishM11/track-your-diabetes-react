import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Tab, Tabs, Toolbar, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { tabValueChange } from './navigationSlice';


const Navigation = props => {

    const dispatch = useDispatch();
    const navigationObj = useSelector((state) => state.navigation.navigationObj);

    const handleTabChageEvent = (value) => {
        dispatch(tabValueChange({
            tabValue: value
        }))
    }

    const showAuthenticateDialog = () => {
        props.displaySignInDialog();
    }

    return (
        <React.Fragment>
            <AppBar sx={{ backgroundColor: '#334F64' }}>
                <Toolbar>
                    <img alt='' src="images/logo.png" height='50px' style={{ marginRight: 10 }} />
                    <Typography variant="h3" fontFamily={'inherit'}>Track Your Diabetes</Typography>
                    <Tabs sx={{ marginLeft: 'auto' }} onChange={(event, value) => handleTabChageEvent(value)} textColor='inherit' value={navigationObj.currentTabValue} indicatorColor='primary'>
                        <Tab label="Home" sx={{ fontFamily: 'inherit' }} />
                        <Tab label="Dashboard" sx={{ fontFamily: 'inherit' }} />
                        <Tab label="About Us" sx={{ fontFamily: 'inherit' }} />
                    </Tabs>
                    <Button variant="contained" style={{ backgroundColor: '#DD573F' }} startIcon={<LoginIcon />} size='small' onClick={showAuthenticateDialog}>SignIn / SignUp</Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );

};

export default Navigation;