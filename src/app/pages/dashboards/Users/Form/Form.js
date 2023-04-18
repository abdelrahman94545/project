
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
                        {location.pathname.includes("edit") ? "Edit User" : "Create User"} 
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
                                id="firstname"
                                label="First Name"
                                // defaultValue="First name"
                                // defaultValue={data && (data.first_name)}
                                // value={data !== null && (data.first_name)}
                                
                                defaultValue={data  ? (data.first_name) : null}
                                name="first_name"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                defaultValue={data  ? ( data.last_name) : null}
                                name="last_name"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                defaultValue={data  ? ( data.email) : null}
                                name="email"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id="phoneno"
                                label="Phone No."
                                defaultValue={ data  ? ( data.phone_number ) : null}
                                name="phone_number"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                // id="phoneno"
                                label="Password"
                                name="password"
                                onChange={passChange}
                                helperText= {passValidation? errorText : ""}
                            />
                        </FormControl>

                        {location.pathname.includes("edit") && (
                            <FormControl>
                            <TextField
                                fullWidth
                                // id="phoneno"
                                label="Confirm Password"
                                name="confirm_password"  
                                helperText= {passValidation? errorText : ""}
                                onChange={passChange}
                            />
                        </FormControl>
                         )}
                        
                        <FormGroup aria-label="position" row>
                            <FormControlLabel 
                            control={<Checkbox />} 
                            label="Active" value="Active"   
                            name="is_active" 
                            checked={ data  && (data.is_active) } 
                            // checked={ data  ? data.is_active : false} 
                            
                            onChange={location.pathname.includes("edit") ? checkboxChange : null}/>

                            <FormControlLabel  
                            control={<Checkbox/>} 
                            label="Staff" 
                            value="Staff" 
                            name="is_staff" 
                            checked={  data  && (data.is_staff)}
                            // checked={  data  ? data.is_staff : false}
                            onChange={location.pathname.includes("edit") ? checkboxChange : null}/>

                            <FormControlLabel  
                            control={<Checkbox/>} 
                            label="Admin" 
                            value="Admin"  
                            name="is_admin" 
                            checked={  data && (data.is_admin)  }
                            // checked={  data ? data.is_admin : false }
                            onChange={location.pathname.includes("edit") ? checkboxChange : null}
                            />
                        </FormGroup>
                      
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