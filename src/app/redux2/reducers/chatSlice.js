import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [],
    contacts: []
}


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addRooms: (state, action) => {                 
            return {
                ...state,
                rooms: state.rooms.concat(action.payload)
            }
                   
        },

        addContacts: (state, action) => {                
            return {
                ...state,
                contacts: state.contacts.concat(action.payload)
            }
                   
        }
        
    }
})

export const {addRooms, addContacts} = chatSlice.actions

export default chatSlice.reducer