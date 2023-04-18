import React, {useState} from 'react';
import {Card, CardContent, IconButton, TextField, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import {Facebook, Google, Twitter} from "@mui/icons-material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import {alpha} from "@mui/material/styles";
import Div from "@jumbo/shared/Div";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

import AuthAxios from "../../../services/auth-axios";
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email, setEmail] = useState(null);


    const emailChangeFun = (e) =>{
        // console.log(e.target.value);

        setEmail({
            email: e.target.value
        })
    }

    const forgotPassFun = () =>{
        // console.log("done");

        try
        {
            AuthAxios().forgotPass(email)
            .then(res => {
                console.log("res =", res);
                console.log("res =", res.Success);

                toast.success(res.Success,{
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
    console.log(email);
    return (
        <Div sx={{
            flex: 1,
            flexWrap: 'wrap',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: theme => theme.spacing(4),
        }}>
            <Div sx={{mb: 3, display: 'inline-flex'}}>
                <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                    <img src={`${ASSET_IMAGES}/logo.png`} alt="Jumbo React"/>
                </Link>
            </Div>
            <Card sx={{maxWidth: '100%', width: 360, mb: 4}}>
                <Div sx={{position: 'relative', height: '200px'}}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="200"
                        image={getAssetPath(`${ASSET_IMAGES}/colin-watts.jpg`)}
                    />
                    <Div sx={{
                        flex: 1,
                        inset: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme => alpha(theme.palette.common.black, .5),
                        p: theme => theme.spacing(3),
                    }}>
                        <Typography
                            variant={"h2"}
                            sx={{
                                color: 'common.white',
                                fontSize: '1.5rem',
                                mb: 0
                            }}>
                            Forgot password
                        </Typography>
                    </Div>
                </Div>
                <CardContent>
                    <Div sx={{mb: 3, mt: 1}}>
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            // defaultValue="demo@example.com"
                            onChange={emailChangeFun}
                        />
                    </Div>
                    <Button fullWidth variant="contained" size="large" sx={{mb: 3}} onClick={forgotPassFun}>Reset Password</Button>
                    <Typography textAlign={"center"} variant={"body1"} mb={1}>Don't remember your email? <Link
                        underline="none" href="#">Contact Support</Link></Typography>
                </CardContent>
            </Card>
            <Typography variant={"body1"} mb={2}>Or sign up with</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                    sx={{
                        bgcolor: '#385196',
                        color: 'common.white',
                        p: theme => theme.spacing(1.25),

                        '&:hover': {
                            backgroundColor: '#385196',
                        }
                    }}
                    aria-label="Facebook"
                >
                    <Facebook fontSize="small"/>
                </IconButton>
                <IconButton
                    sx={{
                        bgcolor: '#00a8ff',
                        color: 'common.white',
                        p: theme => theme.spacing(1.25),

                        '&:hover': {
                            backgroundColor: '#00a8ff',
                        }
                    }}
                    aria-label="Twitter"
                >
                    <Twitter fontSize="small"/>
                </IconButton>
                <IconButton
                    sx={{
                        bgcolor: '#23272b',
                        color: 'common.white',
                        p: theme => theme.spacing(1.25),

                        '&:hover': {
                            backgroundColor: '#23272b',
                        }
                    }}
                    aria-label="Twitter"
                >
                    <Google fontSize="small"/>
                </IconButton>
            </Stack>
        </Div>
    );
};

export default ForgotPassword;
