import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [],
    nextRooms: null,
    previousRooms: null,
    contacts: [],
    nextContacts: null,
    previousContacts: null,
    activeChat: null,
}


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateRooms: (state, action) => {                 
            return {
                ...state,
                rooms: state.rooms.concat(action.payload.results),
                nextRooms: action.payload.links.next,
                previousRooms: action.payload.links.previous,
                nextContacts: null,
                previousContacts: null
            }
                   
        },

        addRooms: (state, action) => {                 
            return {
                ...state,
                rooms: action.payload.results,
                nextRooms: action.payload.links.next,
                previousRooms: action.payload.links.previous,
                nextContacts: null,
                previousContacts: null
            }
                   
        },

        updateContacts: (state, action) => {                
            return {
                ...state,
                contacts: state.contacts.concat(action.payload.results),
                nextRooms: null,
                previousRooms: null,
                nextContacts: action.payload.links.next,
                previousContacts: action.payload.links.previous
            }
                   
        },
        addContacts: (state, action) => {                 
            return {
                ...state,
                contacts: action.payload.results,
                nextRooms: null,
                previousRooms: null,
                nextContacts: action.payload.links.next,
                previousContacts: action.payload.links.previous
            }
                   
        },

        addActiveChatData: (state , action) => {
            return {
                ...state,
                activeChat: action.payload.results
            }
        },

        updateActiveChatData: (state , action) => {
            return {
                ...state,
                activeChat: state.activeChat.concat(action.payload),
            }
        }
        
    }
})

export const {updateRooms, addRooms, updateContacts, addContacts, addActiveChatData, updateActiveChatData} = chatSlice.actions

export default chatSlice.reducer