import { Instance } from "./axios/axios";
import AuthAxios from "./auth-axios";

const AxiosApis = () => {

    const axiosApis = {};


    // Account Type Api
    axiosApis.listAccountType = async (Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get('/account/account-type/',
            { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
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
            const {data} = await Instance.post('/account/account-type/',{ 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            }, accountTypeData)
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
            const {data} = await Instance.get(`/account/account-type/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
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
            const {data} = await Instance.put(`/account/account-type/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            }, accountTypeData)
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
            const {data} = await Instance.delete(`/account/account-type/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }


    // Account Api
    axiosApis.listAccounts = async (Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get('/account/account/',{ 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.createAccount = async (accountData ,Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.post('/account/account/', { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            }, accountData)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.getEditAccountData = async (Id,Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/account/account/${Id}/`,{ 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.EditAccountData = async (Id, accountData, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.put(`/account/account/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            }, accountData)
            return data;
        }
        else
        {
            return false
        }
    }

    axiosApis.deleteAccount = async (Id, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.delete(`/account/account/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
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
            const {data} = await Instance.get('/account/company/company/', { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
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
            const {data} = await Instance.post('/account/company/company/', { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            }, companyData)
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
            const {data} = await Instance.get(`/account/company/company/${Id}/`,{ 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
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
            const {data} = await Instance.put(`/account/company/company/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            },companyData)
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
            const {data} = await Instance.delete(`/account/company/company/${Id}/`, { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
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