import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountData: null
}

export const AccountSlice = createSlice({
    name: "account",
    initialState,
    reducers:{
        addAccount: (state, action) =>{
            return {
                ...state,
                accountData: action.payload
            }
        }
    }
})

export const { addAccount } = AccountSlice.actions


export default AccountSlice.reducer