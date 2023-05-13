import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companiesData: null
}


export const CompanySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        addCompany: (state, action) => {
            return {
                ...state,
                companiesData: action.payload.results
            }
        }
    }
})



export const { addCompany } = CompanySlice.actions

export default CompanySlice.reducer