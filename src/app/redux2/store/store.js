import { configureStore } from '@reduxjs/toolkit'
import  AuthSlice  from "../reducers/AuthSlice";
import  usersListSlice  from "../reducers/usersList";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    usersList: usersListSlice,
  },
  
})