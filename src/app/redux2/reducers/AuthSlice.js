// import {ADD_AUTH} from "../../utils/cases/cases";
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    AuthData: null
    // token:'',
    // full_name: 'ali',
    // id: '',
    // is_active: '',
    // is_staff: '',
    // is_superuser: '',
    // refresh: ''
  }

  export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuth: (state,action) => {
            return {
                ...state,
                AuthData: action.payload
                // token: action.payload.access,
                // full_name: action.payload.full_name,
                // id: action.payload.id,
                // is_active: action.payload.is_active,
                // is_staff: action.payload.is_staff,
                // is_superuser: action.payload.is_superuser,
                // refresh: action.payload.refresh
            }
        },
      
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {addAuth } = AuthSlice.actions
  
  export default AuthSlice.reducer