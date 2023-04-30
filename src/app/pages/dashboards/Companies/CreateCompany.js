
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
import { useDispatch } from 'react-redux';
import Form from "../../../components/Form/Form";
// import Form from "./Form/Form";
import { addCompany } from "../../../redux2/reducers/CompanySlice";



const CreateCompany = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [data , setData] = useState(null) 
    const [formFeildsArr , setFormFeildsArr] = useState(["name","admin_user_limit","system_user_limit","create_by"]) 
    // const [passValidation , setPassValidation] = useState(false)


    // const [errorText , setErrorText] = useState("Password and Confirm Password Dose not Match")
    const Token = localStorage.getItem('token')
    const Refresh = localStorage.getItem('refresh')

    
    // call data which i need to edit it
    useEffect(async ()=>{
        if(location.pathname.includes("edit"))
        {
            try
            {
                await AxiosApis().getEditCompanyData(params.id, Token, Refresh)
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

    let companyData = {}

        Array.from(e.target).forEach(element => {
            if(element.name  && element.value)
            {
                companyData[element.name] = element.value
            }
          });


            // Edit user data
            if(location.pathname.includes("edit"))
            {
                try
                {
                    await AxiosApis().editCompanyData(params.id ,companyData, Token, Refresh)
                    .then( async (res) => {

                        if(res === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AxiosApis().getCompanyData(Token, Refresh)
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

                        toast.success("The Company Has Been Edited",{
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        navigate("/dashboards/listCompanies"); 

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
                    await AxiosApis().createCompany(companyData, Token, Refresh)
                    .then(async (data) => {

                        if(data === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AxiosApis().getCompanyData(Token, Refresh)
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
                        


                        toast.success("The Campany Has Been Created",{
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
                />
            )}

            {(location.pathname.includes("createCompanies") ) && (
                <Form  
                location={location} 
                handleSubmit={handleSubmit}
                formFeilds={formFeildsArr}
                />
            )}
        </div>
        
    )
}


export default CreateCompany;