
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
    formFeilds,
    passChange, 
    passValidation,
    // errorText,
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
                        {location.pathname.includes("edit") ? "Edit Company" : "Create Company"} 
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
                        {formFeilds.map((feildName, index)=>(
                           <FormControl key={index}>
                            <TextField
                                fullWidth
                                id={feildName}           
                                label={(feildName.charAt(0).toUpperCase() + feildName.slice(1)).replaceAll("_"," ")}             
                                defaultValue={data  ? (data[feildName]) : null}
                                name={feildName}
                            />
                            </FormControl>
                        ))}
                        <Div sx={{mx: 1}}>
                            <Button  variant={"contained"} type="submit">Create</Button>
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