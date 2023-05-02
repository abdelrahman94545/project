
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
import { useLocation, useParams, useNavigate, useSearchParams  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Form from "../../../components/Form/Form";
// import Form from "./Form/Form";
import { addAccountType } from "../../../redux2/reducers/AccountTypeSlice";


const CreateAccountType = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const userDataStored = useSelector(state => state.usersList.users)
    const dispatch = useDispatch();

    const [data , setData] = useState(null) 
    const [formFeildsArr , setFormFeildsArr] = useState(["name"]) 
    const Token = localStorage.getItem('token')
    const Refresh = localStorage.getItem('refresh')

    
    useEffect(async ()=>{

        if(location.pathname.includes("edit"))
        {
            try
            {
                await AxiosApis().getEditAccountTypeData(params.id, Token, Refresh)
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

    let accountTypeData = {}

        Array.from(e.target).forEach(element => {
            if(element.name  && element.value)
            {
                accountTypeData[element.name] = element.value
            }
          });


            // Edit user data
            if(location.pathname.includes("edit"))
            {
                try
                {
                    await AxiosApis().EditAccountTypeData(params.id ,accountTypeData, Token, Refresh)
                    .then( async (res) => {

                        if(res === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AxiosApis().listAccountType(Token, Refresh)
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

                            

                        toast.success("The Account Type Has Been Edited",{
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        navigate("/dashboards/listAccountType"); 
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
                // create New Account Type
                try
                {
                    await AxiosApis().createAccountType(accountTypeData, Token, Refresh)
                    .then(async (data) => {

                        if(data === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AxiosApis().listAccountType(Token, Refresh)
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
                        


                        toast.success("The Account Type Has Been Created",{
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


    return(

        <div>
            {(location.pathname.includes("edit") && data !== null) && (
                <Form 
                data={data}  
                location={location} 
                handleSubmit={handleSubmit}
                formFeilds={formFeildsArr}
                formName="AccountType"
                />
            )}

            {(location.pathname.includes("createAccountType") ) && (
                <Form  
                location={location} 
                handleSubmit={handleSubmit}
                formFeilds={formFeildsArr}
                formName="AccountType"
                />
            )}
        </div>
        
    )
}


export default CreateAccountType;