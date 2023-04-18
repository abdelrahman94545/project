
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: null
}

export const usersListSlice = createSlice({
    name: 'usersList',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            return {
                ...state,
                users: action.payload
            }
        }
    }
})


export const  { addUsers } = usersListSlice.actions


export default usersListSlice.reducer