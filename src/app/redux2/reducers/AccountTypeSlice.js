import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    accountTypeData: null
}


export const AccountTypeSlice = createSlice({
    name: "accountType",
    initialState,
    reducers:{
        addAccountType: (state, action) =>{
            return {
                ...state,
                accountTypeData: action.payload.results
            }
        }
    }
})

export const { addAccountType } = AccountTypeSlice.actions

export default AccountTypeSlice.reducer;