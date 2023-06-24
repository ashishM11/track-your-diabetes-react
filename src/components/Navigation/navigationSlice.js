import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navigationObj:{
        currentTabValue: 0,
    }
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        tabValueChange: (state, action) => {
            state.navigationObj.currentTabValue = action.payload.tabValue;
        }
    },
})

// Action creators are generated for each case reducer function
export const { tabValueChange } = navigationSlice.actions

export default navigationSlice.reducer