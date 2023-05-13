
// import {useTranslation} from "react-i18next";
import React, {useState, useEffect} from 'react';
import Div from "@jumbo/shared/Div";
import {Card, CardContent, TextField, Typography, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {useTranslation} from "react-i18next";

import AxiosApis from "../../../services/AxiosApis";
import { toast } from 'react-toastify';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Form from "../../../components/Form/Form";
import { addAccount } from "../../../redux2/reducers/AccountSlice";
import { addCompany } from "../../../redux2/reducers/CompanySlice";
import { addAccountType } from "../../../redux2/reducers/AccountTypeSlice";


const CreateAccount = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const CompaniesData = useSelector(state => state.Company.companiesData) 
    const accountTypeData = useSelector(state => state.accountType.accountTypeData)
    const dispatch = useDispatch();

    const [data , setData] = useState(null) 
    const [formFeildsArr , setFormFeildsArr] = useState(
        ["name","company","account_type","access_token","app_version","phone_number_id","url","active"]) 
    const Token = localStorage.getItem('token')
    const Refresh = localStorage.getItem('refresh')


    const getCompaniesDataFun = async (Token, refreshVal) => {

        try{
            await AxiosApis().getCompanyData(Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addCompany(data))
            })
        }
        catch(error){
            // console.log("list error =" ,error);
            toast.error("Network Error",{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const getAccountTypeDataFun = async (Token, refreshVal) => {

        try{
            await AxiosApis().listAccountType(Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addAccountType(data))
            })
           
        }
        catch(error){
            // console.log("list error =" ,error);
            toast.error("Network Error",{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    
    useEffect(async ()=>{

        if(CompaniesData === null)
        {
            getCompaniesDataFun(Token, Refresh)
        }

        if(accountTypeData === null)
        {
            getAccountTypeDataFun(Token, Refresh)
        }

        if(location.pathname.includes("edit"))
        {
            try
            {
                await AxiosApis().getEditAccountData(params.id, Token, Refresh)
                .then(res => {
                    if(res === false)
                        {
                            navigate("/user/login");
                            return false
                        }
                    setData(res[0])
                })
            }
            catch(error)
            {
                toast.error("Network Error",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }, [])


    const  handleSubmit  = async (e) =>{
        e.preventDefault()

    let accountData = {}

        Array.from(e.target).forEach(element => {

            if(element.name === "active")
            {
                accountData[element.name] = element.checked
            }
            else
            if((element.name  && element.value) && (element.name === "company" || element.name === "account_type"))
            {
                accountData[element.name] = Number(element.value)
            }
            else
            if(element.name  && element.value)
            {
                accountData[element.name] = element.value
            }
          });

        //   accountData["active"] = true


            // Edit user data
            if(location.pathname.includes("edit"))
            {
                try
                {
                    await AxiosApis().EditAccountData(params.id ,accountData, Token, Refresh)
                    .then( async (res) => {

                        if(res === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AxiosApis().listAccounts(Token, Refresh)
                                .then((data) => {
                                    if(data === false)
                                    {
                                        navigate("/user/login");
                                        return false
                                    }
                                    dispatch(addAccount(data.results))
                                })
                            }
                            catch(error){
                                toast.error("Network Error",{
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }

                            

                        toast.success("The Account Has Been Edited",{
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        navigate("/dashboards/listAccounts"); 
                    });
                }
                catch(error)
                {

                    toast.error("Network Error",{
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
            else
            {
                // create New Account 
                try
                {
                    await AxiosApis().createAccount(accountData, Token, Refresh)
                    .then(async (data) => {

                        if(data === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AxiosApis().listAccounts(Token, Refresh)
                                .then((data) => {
                                    if(data === false)
                                    {
                                        navigate("/user/login");
                                        return false
                                    }
                                    dispatch(addAccount(data.results))
                                })
                            }
                            catch(error){
                                toast.error("Network Error",{
                                    position: "top-center",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }
                        


                        toast.success("The Account Has Been Created",{
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
                }
                catch(error)
                {
                    toast.error("Network Error",{
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
        }
    }


    const checkboxChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }


    return(

        <div>
            {(location.pathname.includes("edit") && data !== null) && (
                <Form 
                data={data}  
                location={location} 
                handleSubmit={handleSubmit}
                formFeilds={formFeildsArr}
                formName="Account"
                Companies={CompaniesData}
                accountType={accountTypeData}
                checkboxChange={checkboxChange}
                />
            )}

            {(location.pathname.includes("createAccount") ) && (
                <Form  
                location={location} 
                handleSubmit={handleSubmit}
                formFeilds={formFeildsArr}
                formName="Account"
                Companies={CompaniesData}
                accountType={accountTypeData}
                />
            )}
        </div>
        
    )
}


export default CreateAccount;