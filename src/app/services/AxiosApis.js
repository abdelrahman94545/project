import { Instance } from "./axios/axios";
import AuthAxios from "./auth-axios";

const AxiosApis = () => {

    const axiosApis = {};


    // Account Type Api
    axiosApis.listAccountType = async (Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get('/account/account-type/')
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.createAccountType = async (accountTypeData ,Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.post('/account/account-type/', accountTypeData)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.getEditAccountTypeData = async (Id,Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/account/account-type/${Id}/`)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.EditAccountTypeData = async (Id, accountTypeData, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.put(`/account/account-type/${Id}/`, accountTypeData)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.DeleteAccountType = async (Id, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.delete(`/account/account-type/${Id}/`)
            return data;
        }
        else
        {
            return false
        }
    }


    // Company Api
    axiosApis.getCompanyData = async (Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get('/account/company/company/')
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.createCompany = async (companyData, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.post('/account/company/company/', companyData)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.getEditCompanyData = async (Id, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/account/company/company/${Id}/`)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.editCompanyData = async (Id, companyData, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.put(`/account/company/company/${Id}/`, companyData)
            return data;
        }
        else
        {
            return false
        }
    }


    axiosApis.deleteCompany = async (Id, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.delete(`/account/company/company/${Id}/`)
            return data;
        }
        else
        {
            return false
        }
    }





    

    return axiosApis;
}


export default AxiosApis;