import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    signUpObj: {
        userFirstNameFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        userLastNameFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        passwordFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        confirmPasswordFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        userEmailFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        userMobileNoFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        userDateOfBirthFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        userGenderFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        alert: {
            title: "",
            severity: "",
            description: ""
        },
        isFormSubmitted: false,
        showAlert: false
    }
}

export const registerNewUser = createAsyncThunk('users/registerNewUser', async (userRequestDTO) => {
    const response = await axios.post('http://tyd-user-module-alb-1944037695.ap-south-1.elb.amazonaws.com:9000/api/v1/user/register', userRequestDTO);
    return response.data;
});

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        fieldValueChanged: (state, action) => {
            state.signUpObj[action.payload.id].value = action.payload.value;
        },
        clearAlertMsg: (state,action) =>{
            state.signUpObj.alert.title = "";
            state.signUpObj.alert.severity = "";
            state.signUpObj.alert.description = "";
            state.signUpObj.showAlert = false;
            state.signUpObj.isFormSubmitted = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(registerNewUser.pending, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(registerNewUser.rejected, (state, action) => {
            state.signUpObj.alert.title = "Error";
            state.signUpObj.alert.severity = "error";
            state.signUpObj.alert.description = action.payload;
            state.signUpObj.showAlert = true;
        });
        builder.addCase(registerNewUser.fulfilled, (state, action) => {            
            state.signUpObj.alert.title = "Success";
            state.signUpObj.alert.severity = "success";
            state.signUpObj.alert.description = action.payload;
            state.signUpObj.showAlert = true;
            state.signUpObj.isFormSubmitted = true;
        });
    }
})

// Action creators are generated for each case reducer function
export const { fieldValueChanged, clearAlertMsg } = signUpSlice.actions

export default signUpSlice.reducer