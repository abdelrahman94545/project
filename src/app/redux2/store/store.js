import { configureStore } from '@reduxjs/toolkit'
import  AuthSlice  from "../reducers/AuthSlice";
import  usersListSlice  from "../reducers/usersListSlice";
import  AccountTypeSlice  from "../reducers/AccountTypeSlice";
import  CompanySlice  from "../reducers/CompanySlice";
import  AccountSlice  from "../reducers/AccountSlice";
import  chatSlice  from "../reducers/chatSlice";
import  ContactsSlice  from "../reducers/ContactsSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    usersList: usersListSlice,
    accountType: AccountTypeSlice,
    Company: CompanySlice,
    Account: AccountSlice,
    Chat: chatSlice,
    Contacts: ContactsSlice
  },
  
})