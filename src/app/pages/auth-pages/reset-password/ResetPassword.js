import React, {useState} from 'react';
import {Card, CardContent, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import {alpha} from "@mui/material/styles";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

import {useSearchParams, useNavigate } from "react-router-dom";
import AuthAxios from "../../../services/auth-axios";
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const [passVal, setpassVal] = useState();
    let [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();

    const passChangeFun = (e) =>{

        setpassVal((prevState) =>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const forgotPassFun = () =>{
        
        try
        {
            AuthAxios().forgotPass(passVal,code)
            .then(res => {
                navigate('/user/login')
            })
        }
        catch (error)
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


    return (
        <Div sx={{width: 720, maxWidth: '100%', margin: 'auto', p: 4}}>
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
                        background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/widgets/keith-luke.jpg`)}) no-repeat center`,
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
                            height: '100%',
                            minHeight: {md: 320}
                        }}
                    >
                        <Div sx={{mb: 2}}>
                            <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>Reset
                                Password</Typography>
                            <Typography variant={"body1"} mb={1} sx={{maxWidth: 270}}>
                                By entering your registered email address you will receive reset password link, Kindly
                                follow instruction.
                            </Typography>
                        </Div>
                        <Div sx={{mt: 'auto'}}>
                            <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React"/>
                            </Link>
                        </Div>
                    </Div>
                </CardContent>
                <CardContent sx={{flex: 1, p: 4}}>
                    <Div
                        sx={{
                            display: 'flex',
                            minWidth: 0,
                            flex: 1,
                            flexDirection: 'column',
                            height: '100%'
                        }}
                    >
                        <Div sx={{mb: 2}}>
                            <Div sx={{mt: 1, mb: 3}}>
                                <TextField
                                    fullWidth
                                    // id="email-address"
                                    // label="Enter passeord"
                                    label="Password"
                                    name="password"
                                    onChange={passChangeFun}
                                />
                            </Div>
                            <Div sx={{mt: 1, mb: 3}}>
                                <TextField
                                    fullWidth
                                    // id="email-address"
                                    // label="Enter passeord"
                                    label="Confirm Password"
                                    name="re_password"
                                    onChange={passChangeFun}
                                />
                            </Div>
                            <Button variant="contained" onClick={forgotPassFun}>Send</Button>
                        </Div>
                        <Typography variant={"body1"} mt={'auto'}>
                            Already have an account? <Link href={"#/"} underline={'none'}>Login Now</Link> Or <Link
                            href={"#/"} underline={'none'}>Create New</Link>
                        </Typography>
                    </Div>
                </CardContent>
            </Card>

        </Div>
    );
};

export default ResetPassword;
