
// import {useTranslation} from "react-i18next";
import React, {useState, useEffect} from 'react';
import Div from "@jumbo/shared/Div";
import {Card, CardContent, TextField, Typography, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {useTranslation} from "react-i18next";

import AuthAxios from "../../../../services/auth-axios";
import { toast } from 'react-toastify';
import { useLocation, useParams, useNavigate, useSearchParams  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Form from "../../../../components/Form/Form"; 
// import Form from "../Form/Form"; 
import { addUsers } from "../../../../redux2/reducers/usersListSlice";


const CreateUser = () => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const userDataStored = useSelector(state => state.usersList.users)
    const dispatch = useDispatch();

    const [data , setData] = useState(null) 
    const [passValidation , setPassValidation] = useState(false)
    const [passwordVal , setPasswordVal] = useState({password: "" , confirm_password: ""})
    const [formFeildsArr , setFormFeildsArr] = useState([
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "password",
        "confirm_password",
        "is_active",
        "is_staff",
        "is_admin"]) 

    const [errorText , setErrorText] = useState("Password and Confirm Password Dose not Match")
    const Token = localStorage.getItem('token')
    const Refresh = localStorage.getItem('refresh')

    
    useEffect(async ()=>{

        if(location.pathname.includes("edit"))
        {
            try
            {
                await AuthAxios().getEditUser(params.id, Token, Refresh)
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



    const passChange = (e) =>{

            setPasswordVal((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))

        if(e.target.name === "confirm_password")
        {
            if(e.target.value !== passwordVal["password"])
            {
                setPassValidation(true)
            }
            else
            {
                setPassValidation(false)
            }
        }

        if(e.target.name === "password")
        {
            if(e.target.value !== passwordVal["confirm_password"])
            {
                setPassValidation(true)
            }
            else
            {
                setPassValidation(false)
            }
        }
    }
 

    const checkboxChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }



    const  handleSubmit  = async (e) =>{
        e.preventDefault()

    let userData = {}

        Array.from(e.target).forEach(element => {
            if(element.name  && element.value)
            {
                if(element.name === "is_active" || element.name === "is_staff" || element.name === "is_admin")
                {
                    userData[element.name] = element.checked
                }
                else if(element.name !== "confirm_password")
                {
                    userData[element.name] = element.value
                }
                
            }
          });


            // Edit user data
            if(location.pathname.includes("edit"))
            {
                try
                {
                    await AuthAxios().editUser(params.id ,userData, Token, Refresh)
                    .then( async (res) => {

                        if(res === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                        toast.success("The user has been Edited",{
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                            try{
                                await AuthAxios().usersList(Token, Refresh)
                                .then((data) => {
                                    if(data === false)
                                    {
                                        navigate("/user/login");
                                        return false
                                    }
                                    dispatch(addUsers(data))
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

                        navigate("/list-views/users"); 
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
                // create New user
                try
                {
                    await AuthAxios().createUser(userData, Token, Refresh)
                    .then(async (data) => {

                        if(data === false)
                        {
                            navigate("/user/login");
                            return false
                        }

                            try{
                                await AuthAxios().usersList(Token, Refresh)
                                .then((data) => {
                                    if(data === false)
                                    {
                                        navigate("/user/login");
                                        return false
                                    }
                                    dispatch(addUsers(data))
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
                        


                        toast.success("The user has been created",{
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

                    if( error.response && error.response.data.email )
                    {
                        toast.error(error.response.data.email[0],{
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
                    else
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
    }


    return(

        <div>
            {(location.pathname.includes("edit") && data !== null) && (
                <Form 
                data={data}  
                location={location} 
                handleSubmit={handleSubmit}
                passChange={passChange}
                passValidation={passValidation}
                errorText={errorText}
                checkboxChange={checkboxChange}
                formFeilds={formFeildsArr}
                formName="Company"
                />
            )}

            {(location.pathname.includes("createUser") ) && (
                <Form  
                location={location} 
                handleSubmit={handleSubmit}
                formFeilds={formFeildsArr}
                formName="Company"
                />
            )}
        </div>
        
    )
}


export default CreateUser;