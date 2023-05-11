import React from 'react';
import {Card, CardContent, Checkbox, FormControlLabel, IconButton, Typography} from "@mui/material";
// import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import {Facebook, Google, Twitter} from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import {alpha} from "@mui/material/styles";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import * as yup from "yup";
import {Form, Formik} from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import authServices from "../../../services/auth-services";
import {useNavigate , Link} from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

import AuthAxios from "../../../services/auth-axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import {selectCount} from '../../../../app/redux/reducers/contactsApp'
import {ADD_AUTH} from "../../../utils/cases/cases";
import { addAuth } from "../../../redux2/reducers/AuthSlice";



const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

const Login2 = ({disableSmLogin}) => {
    const {setAuthToken} = useJumboAuth();
    const navigate = useNavigate();

    // const count = useSelector(state => state.auth.full_name);
    // console.log("rdux=",count );
    // const count = useSelector(state => state.Auth.full_name);

    

    // const count = useSelector(selectCount);
    const dispatch = useDispatch();

    // console.log("redux4=",count);

    // const onSignIn = (email, password) => {
    //     authServices.signIn({email, password})
    //         .then((data) => {
    //             setAuthToken(data?.token);
    //             navigate("/dashboards/misc");
    //         });
    // };

    const onLogIn = async (email, password) => {
        try{
            await AuthAxios().logIn({email, password})
            // await AuthAxios.logIn({email, password})
            .then(  (data) => {

                // let x= JSON.parse(data.access)
                // console.log("token=", JSON.parse(data));
                // console.log("token=", JSON.parse(atob(data.access.split('.')[1]))); 
                // setAuthToken(data?.access);
                localStorage.setItem('token', data?.access);
                localStorage.setItem('refresh', data?.refresh);
                localStorage.setItem('whatsAccount', JSON.stringify(data?.whatsAccount));
                

                // setAuthToken(data?.token);

                // dispatch({ type: ADD_AUTH ,payload: data});
                dispatch(addAuth(data));
                navigate("/dashboards/crypto");
                // navigate("/dashboards/misc");  
            })
        }
        catch(error){

            if(error.response && error.response.status === 401)
            {
                toast.error(error.response.statusText.toString(),{
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
            
             if( !error.response || error.response.status !== 401)
            {
                // console.log("login error =", error);
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
    };

    return (
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
                            <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>Sign In</Typography>
                            <Typography variant={"body1"} mb={2}>
                                By signing in, you can avail full features of the Jumbo.
                            </Typography>
                            <Typography variant={"body1"}>
                                {/* <Link
                                    href={"/auth-pages/forgot-password"}
                                    color={"inherit"}
                                    underline={'none'}
                                >Forgot your password? Recover Now
                                </Link> */}
                                <Link to={"/auth-pages/forgot-password"} style={{color: "#fff"}}>
                                    Forgot your password? Recover Now
                                </Link>
                            </Typography>
                            <Typography textAlign={"center"} variant={"body1"} mb={1}>Don't have an account?
                                    <Link  style={{color: "#fff"}} to={"/auth-pages/signup-2"}>Sign up now</Link>
                                </Typography>
                        </Div>

                        <Div sx={{mt: 'auto'}}>
                            {/* <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React"/>
                            </Link> */}
                        </Div>
                    </Div>
                </CardContent>
                <CardContent sx={{flex: 1, p: 4}}
                >
                    <Formik
                        validateOnChange={true}
                        // initialValues={{
                        //     email: 'demo@example.com',
                        //     password: 'ABC123DEF',
                        // }}
                        initialValues={{
                                email: '',
                                password: '',
                            }}
                        validationSchema={validationSchema}
                        onSubmit={(data, {setSubmitting}) => { 
                            setSubmitting(true);
                            onLogIn(data.email, data.password);
                            // onSignIn(data.email, data.password);
                            setSubmitting(false);
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                <Div sx={{mt: 1, mb: 3}}>
                                    <JumboTextField
                                        fullWidth
                                        name="email"
                                        label="Email"
                                    />
                                </Div>
                                <Div sx={{mt: 1, mb: 2}}>
                                    <JumboTextField
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Div>
                                <Div sx={{mb: 2}}>
                                    <FormControlLabel control={<Checkbox/>} label="Remember me"/>
                                </Div>
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{mb: 3}}
                                    loading={isSubmitting}
                                >Sign In</LoadingButton>
                                {
                                    !disableSmLogin && (
                                        <React.Fragment>
                                            <Typography variant={"body1"} mb={2}>Or sign in with</Typography>
                                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                                <IconButton sx={{
                                                    bgcolor: '#385196',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#385196',
                                                    }
                                                }} aria-label="Facebook">
                                                    <Facebook fontSize="small"/>
                                                </IconButton>
                                                <IconButton sx={{
                                                    bgcolor: '#00a8ff',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#00a8ff',
                                                    }
                                                }} aria-label="Twitter">
                                                    <Twitter fontSize="small"/>
                                                </IconButton>
                                                <IconButton sx={{
                                                    bgcolor: '#23272b',
                                                    color: 'common.white',
                                                    p: theme => theme.spacing(1.25),

                                                    '&:hover': {
                                                        backgroundColor: '#23272b',
                                                    }
                                                }} aria-label="Twitter">
                                                    <Google fontSize="small"/>
                                                </IconButton>
                                            </Stack>
                                        </React.Fragment>
                                    )
                                }

                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Div>
    );
};

export default Login2;
