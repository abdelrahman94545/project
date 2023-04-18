
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
import Form from "./Form/Form";
import { addAccountType } from "../../../redux2/reducers/AccountTypeSlice";


const CreateAccountType = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const userDataStored = useSelector(state => state.usersList.users)
    const dispatch = useDispatch();

    const [data , setData] = useState(null) 
    const [passValidation , setPassValidation] = useState(false)
    const [passwordVal , setPasswordVal] = useState({password: "" , confirm_password: ""})

    const [errorText , setErrorText] = useState("Password and Confirm Password Dose not Match")
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



    // const passChange = (e) =>{

    //         setPasswordVal((prevState) => ({
    //             ...prevState,
    //             [e.target.name]: e.target.value
    //         }))

    //     if(e.target.name === "confirm_password")
    //     {
    //         if(e.target.value !== passwordVal["password"])
    //         {
    //             setPassValidation(true)
    //         }
    //         else
    //         {
    //             setPassValidation(false)
    //         }
    //     }

    //     if(e.target.name === "password")
    //     {
    //         if(e.target.value !== passwordVal["confirm_password"])
    //         {
    //             setPassValidation(true)
    //         }
    //         else
    //         {
    //             setPassValidation(false)
    //         }
    //     }
    // }
 

    // const checkboxChange = (e) => {
    //     setData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.checked
    //     }))
    // }



    const  handleSubmit  = async (e) =>{
        e.preventDefault()

    let accountTypeData = {}

        Array.from(e.target).forEach(element => {
            if(element.name  && element.value)
            {
                // if(element.name === "is_active" || element.name === "is_staff" || element.name === "is_admin")
                // {
                //     accountTypeData[element.name] = element.checked
                // }
                // else if(element.name !== "confirm_password")
                // {
                    accountTypeData[element.name] = element.value
                // }
                
            }
          });


            // Edit user data
            if(location.pathname.includes("edit"))
            {
                try
                {
                    await AxiosApis().EditAccountTypeData(params.id ,accountTypeData, Token, Refresh)
                    .then( (res) => {

                        if(res === false)
                        {
                            navigate("/user/login");
                            return false
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

                       
                        navigate("/dashboards/accountType"); 
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
                passValidation={passValidation}
                errorText={errorText}
                />
            )}

            {(location.pathname.includes("createAccountType") ) && (
                <Form  
                location={location} 
                handleSubmit={handleSubmit}
                />
            )}
        </div>
        
    )
}


export default CreateAccountType;