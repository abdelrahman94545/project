import React, {useState} from 'react';
import Div from "@jumbo/shared/Div";
import {Card, CardContent, TextField, Typography, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import {alpha} from "@mui/material/styles";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {useTranslation} from "react-i18next";

// import AuthAxios from "../../../services/auth-services";
import AuthAxios from "../../../services/auth-axios";
// import Textarea from "@mui/material/Textarea";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';


const Signup2 = () => {

    const navigate = useNavigate();

const  handleSubmit  = async (e) =>{
    e.preventDefault()
let userData = {}


    userData = {
        [e.target[0].name] : e.target[0].value,
        [e.target[2].name] : e.target[2].value,
        [e.target[4].name] : e.target[4].value,
        [e.target[6].name] : e.target[6].value,
        [e.target[8].name] : e.target[8].value,
        [e.target[10].name] : e.target[10].value,
    }

    try{
       await AuthAxios().register(userData)
        .then(res => {
            // console.log("res =", res);

            toast.success("Account Successfully Created",{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
        })
        .then(()=>{
            navigate("/user/login");
        })
    }
    catch (error)
    {
        console.log("error =", error.response);
        if( error.response && error.response.data.email )
            {
                toast.error(error.response.data.email[0],{
                // toast.error("Network Error",{
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
  

    console.log("resg =", userData);
}

    // const {t} = useTranslation();

    return (

        <React.Fragment>
            
            {/* <Div sx={{
            width: 720,
            maxWidth: '100%',
            margin: 'auto',
            p: 4
        }}> 
        <Card sx={{display: 'flex', mb: 3.5}}>
            <Div sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <CardContent>
                    <Typography component={"h2"}  variant="h1" mb={3}>Create User</Typography>
                    
                    <Box component="form"
                         sx={{
                             mx: -1,

                             '& .MuiFormControl-root:not(.MuiTextField-root)': {
                                 p: 1,
                                 mb: 2,
                                 width: {xs: '100%', sm: '50%'}
                             },

                             '& .MuiFormControl-root.MuiFormControl-fluid': {
                                 width: '100%'
                             }
                         }}
                         autoComplete="off"
                         onSubmit={handleSubmit}
                    >
                        
                        <FormControl>
                            <TextField
                                fullWidth
                                id="firstname"
                                label="Enter Name"
                                defaultValue="First name"
                                name="first_name"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                defaultValue="Last name"
                                name="last_name"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                defaultValue="Enter email address"
                                name="email"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id="phoneno"
                                label="Phone No."
                                defaultValue="Enter phone number"
                                name="phone_number"
                            />
                        </FormControl>

                        <FormGroup aria-label="position" row>
                            <FormControlLabel control={<Checkbox />} label="Active" value="Active"   name="is_active"/>
                            <FormControlLabel  control={<Checkbox/>} label="Staff" value="Staff" name="is_staff"/>
                            <FormControlLabel  control={<Checkbox/>} label="Admin" value="Admin"  name="is_admin"/>
                        </FormGroup>
                        <Div sx={{mx: 1}}>
                            <Button variant={"contained"} type="submit">Create</Button>
                        </Div>
                    </Box>
                </CardContent>
            </Div>
        </Card>
        </Div>
    </React.Fragment> */}



         <Div sx={{
            width: 720,
            maxWidth: '100%',
            margin: 'auto',
            p: 4
        }}>

            <Card
                sx={{
                    display: 'flex',
                    minWidth: 0,
                    flexDirection: {xs: 'column', md: 'row'}
                }}
            >
                <CardContent
                    sx={{
                        flex: '0 1 300px',
                        position: 'relative',
                        background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/widgets/keith-luke.jpg`, "640x428")}) no-repeat center`,
                        backgroundSize: 'cover',

                        '&::after': {
                            display: 'inline-block',
                            position: 'absolute',
                            content: `''`,
                            inset: 0,
                            backgroundColor: alpha('#0267a0', .65)
                        }
                    }}
                >
                    <Div
                        sx={{
                            display: 'flex',
                            minWidth: 0,
                            flex: 1,
                            flexDirection: 'column',
                            color: 'common.white',
                            position: 'relative',
                            zIndex: 1,
                            height: '100%'
                        }}
                    >
                        <Div sx={{mb: 2}}>
                            <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>Register</Typography>
                            <Typography variant={"body1"} mb={2}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the.
                            </Typography>
                            <Typography variant={"body1"}>
                                Already have an account? <Link href={"#/"} color={"inherit"} underline={'none'}>Sign
                                in</Link>
                            </Typography>
                        </Div>

                        <Div sx={{mt: 'auto'}}>
                            <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React"/>
                            </Link>
                        </Div>
                    </Div>
                </CardContent>
                <CardContent
                    sx={{
                        flex: 1,
                        p: 4
                    }}
                >
                    <Box component="form"
                         autoComplete="off"
                         onSubmit={handleSubmit}
                    >
                    <Div sx={{mt: 1, mb: 3}}>
                        <TextField
                            fullWidth
                            // id="email"
                            name="email"
                            label="Email"
                            // defaultValue="demo@example.com"
                        />
                    </Div>
                    <Div sx={{mt: 1, mb: 3}}>
                        <TextField
                            fullWidth
                            // id="first_name"
                            name="first_name"
                            label="First Name"
                        />
                    </Div>
                    <Div sx={{mt: 1, mb: 3}}>
                        <TextField
                            fullWidth
                            // id="last_name"
                            name="last_name"
                            label="Last Name"
                        />
                    </Div>
                    <Div sx={{mt: 1, mb: 2}}>
                        <TextField
                            fullWidth
                            // id="phone_number"
                            name="phone_number"
                            label="Phone Number"
                            // type="password"
                            // defaultValue="123456"
                        />
                    </Div>

                    
                    <Div sx={{mt: 1, mb: 3}}>
                        <TextField
                            fullWidth
                            // id="company_name"
                            name="company_name"
                            label="Company Name"
                            // defaultValue="demo@example.com"
                        />
                    </Div>
                    <Div sx={{mt: 1, mb: 3}}>
                        <TextField
                            fullWidth
                            // id="company_name"
                            name="details"
                            label="Details"
                            multiline
                            rows={4}
                            // variant="outlined"
                            // defaultValue="demo@example.com"
                        />
                    </Div>
                    <Button variant="contained" sx={{mb: 2}} type="submit">Register</Button>
                    </Box>
                </CardContent>
            </Card>

        </Div>

        </React.Fragment>
    );
};

export default Signup2;
