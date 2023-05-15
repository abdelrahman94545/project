import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contactsData: null,
    contactsCount: null
}


export const ContactsSlice = createSlice({
    name: "Contacts",
    initialState,
    reducers: {
        addAllContacts: (state, action) => {
            return {
                ...state,
                contactsData: action.payload.results,
                contactsCount: action.payload.count
            }
        }
    }
})



export const {addAllContacts} = ContactsSlice.actions

export default ContactsSlice.reducer