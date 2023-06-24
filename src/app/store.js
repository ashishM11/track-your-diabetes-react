import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from '../components/Navigation/navigationSlice';
import signInReducer from '../components/UserModule/SignIn/signInSlice';
import signUpReducer from '../components/UserModule/SignUp/signUpSlice';
import forgetPasswordReducer from '../components/UserModule/ForgetPassword/forgetPasswordSlice';

export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        signIn: signInReducer,
        signUp: signUpReducer,
        forgetPassword: forgetPasswordReducer
    },
})