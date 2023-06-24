import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    signInObj: {
        userEmailOrMobileFieldObj: {
            value: "",
            helperText: "",
            error: false
        },
        passwordFieldObj: {
            value: "",
            helperText: "",
            error: false
        }
    }
}

export const authenticate = createAsyncThunk('users/authenticate', async (UserSignInRequestDTO) => {
    const response = await axios.post('http://localhost:9000/api/v1/user/auth',UserSignInRequestDTO);
    return response.data;
});

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        fieldValueChanged: (state, action) => {
            state.signInObj[action.payload.id].value = action.payload.value;
        }
    },
    extraReducers(builder){
        builder.addCase(authenticate.pending,(state,action) => {
            console.log(action.payload)
        });
        builder.addCase(authenticate.rejected,(state,action) => {        
            console.log(action.payload)
        });
        builder.addCase(authenticate.fulfilled,(state,action) => {            
            console.log(action.payload)
            localStorage.setItem("TOKEN",action.payload)
        });
    }
})

// Action creators are generated for each case reducer function
export const { fieldValueChanged } = signInSlice.actions

export default signInSlice.reducer