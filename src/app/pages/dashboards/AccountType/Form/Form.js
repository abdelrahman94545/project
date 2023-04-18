
// import {useTranslation} from "react-i18next";
import React, {useState, useEffect} from 'react';
import Div from "@jumbo/shared/Div";
import {Card, CardContent, TextField, Typography, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

const Form = ({
    data, 
    location, 
    handleSubmit, 
    passChange, 
    passValidation,
    errorText,
    checkboxChange
    }) => {
   
    return(
            <React.Fragment>
                
            <Div sx={{
            width: 720,
            maxWidth: '100%',
            margin: 'auto',
            p: 4
        }}> 
        {/* <Typography variant="h1" mb={3}>{t('pages.title.contactUs')}</Typography> */}
        {/* <Typography variant="h1" mb={3}>Create User</Typography> */}
        <Card sx={{display: 'flex', mb: 3.5}}>
            <Div sx={{display: 'flex', flexDirection: 'column', flex: '1'}}>
                <CardContent>
                    {/* <Typography variant="h6" color={"text.secondary"}>Send Message</Typography> */}
                    <Typography component={"h2"}  variant="h1" mb={3}>
                        {location.pathname.includes("edit") ? "Edit Account Type" : "Create Account Type"} 
                        </Typography>
                        {/* {data && ( */}
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
                                id="name"
                                label="Name"
                                // defaultValue="First name"
                                // defaultValue={data && (data.first_name)}
                                // value={data !== null && (data.first_name)}
                                
                                defaultValue={data  ? (data.name) : null}
                                name="name"
                            />
                        </FormControl>
                      
                       
            
                        <Div sx={{mx: 1}}>
                            <Button disabled={passValidation} variant={"contained"} type="submit">Create</Button>
                        </Div>
                    </Box>
                     {/* )} */}
                </CardContent>
            </Div>
            
        </Card>
        </Div>
    </React.Fragment>
    )
}


export default Form;