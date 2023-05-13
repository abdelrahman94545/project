
// import {useTranslation} from "react-i18next";
import React, {useState, useEffect} from 'react';
import Div from "@jumbo/shared/Div";
import {Card, CardContent, TextField, Typography, InputLabel, Select, FormHelperText, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const Form = ({
    data, 
    location, 
    handleSubmit, 
    formFeilds,
    formName,
    Companies,
    accountType,
    passChange, 
    passValidation,
    errorText,
    checkboxChange
    }) => {
        
        const [companyVal, setCompanyVal] = useState(data && data.company ? data.company : "");
        const [accountTypeVal, setAccountTypeVal] = useState(data && data.account_type ? data.account_type : "");
        // const [companyVal, setCompanyVal] = useState("");
        // const [accountTypeVal, setAccountTypeVal] = useState("");
        
        console.log("companyVal =", companyVal);
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
                        {location.pathname.includes("edit") ? `Edit ${formName}` : `Create ${formName}`} 
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
 
                           feildName !== "company" 
                        && feildName !== "account_type" 
                        && feildName !== "confirm_password" 
                        && feildName !== "is_active" 
                        && feildName !== "is_staff" 
                        && feildName !== "is_admin" 
                        && feildName !== "active" 
                        && feildName !== "password" ?
                                <FormControl key={index}>
                                <TextField
                                    fullWidth
                                    id={feildName}           
                                    label={(feildName.charAt(0).toUpperCase() + feildName.slice(1)).replaceAll("_"," ")}             
                                    defaultValue={(data && feildName !== "password") ? (data[feildName]) : null}
                                    name={feildName}
                                />
    
                                </FormControl>

                                : (feildName === "password") ?

                                    <FormControl key={index}>
                                    <TextField
                                        fullWidth
                                        id={feildName}           
                                        label={(feildName.charAt(0).toUpperCase() + feildName.slice(1)).replaceAll("_"," ")} 
                                        name={feildName}
                                        onChange={ passChange }
                                        helperText= {passValidation  ? errorText : ""}
                                    />
        
                                    </FormControl>

                                : (feildName === "company") ?
                            
                                 <FormControl  key={index}>
                                    <InputLabel id="demo-simple-select-helper-label">{(feildName.charAt(0).toUpperCase() + feildName.slice(1)).replaceAll("_"," ")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    // value={age}
                                    value={companyVal}
                                    // value={data  ? (data.company) : companyVal}
                                    label="Company"
                                    name={feildName}
                                    onChange={(event) => setCompanyVal(event.target.value)}
                                >
                                    {Companies && Companies !== null ? Companies.map((company,index)=>(
                                        <MenuItem key={index} value={company.id}>{company.name}</MenuItem>
                                    )): null}
                                </Select>
                                </FormControl> 

                                :  (feildName === "account_type") ?

                                <FormControl key={index}>
                                    <InputLabel id="demo-simple-select-helper-label">{(feildName.charAt(0).toUpperCase() + feildName.slice(1)).replaceAll("_"," ")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        // value={age}
                                        // value={accountTypeVal}
                                        value={accountTypeVal}
                                        // value={data  ? (data.account_type) : accountTypeVal}
                                        label="Account type"
                                        name={feildName}
                                        onChange={(event) => setAccountTypeVal(event.target.value)}
                                    >
                                        {accountType !== null ? accountType.map((accType,index)=>(
                                            // console.log("accType =", accType),
                                            <MenuItem key={index} value={accType.id}>{accType.name}</MenuItem>
                                        )): null}
                                    </Select>
                                </FormControl> 
                                
                            : (feildName === "confirm_password" &&  location.pathname.includes("edit")) ? 
                                <FormControl key={index}>
                                <TextField
                                    fullWidth
                                    id={feildName}           
                                    label={(feildName.charAt(0).toUpperCase() + feildName.slice(1)).replaceAll("_"," ")}             
                                    // defaultValue={data  ? (data[feildName]) : null}
                                    name={feildName}
                                    helperText= {passValidation? errorText : ""}
                                    onChange={passChange}
                                />
    
                                </FormControl>
                            : (feildName === "active" ) ?
                                <FormGroup aria-label="position" row key={feildName}>
                                    <FormControlLabel  
                                    control={<Checkbox/>} 
                                    label={feildName.charAt(0).toUpperCase() + feildName.slice(1)}
                                    value={feildName.charAt(0).toUpperCase() + feildName.slice(1)}
                                    name={feildName}
                                    checked={  data  && (data[feildName])}
                                    // checked={  data  ? data.is_staff : false}
                                    onChange={location.pathname.includes("edit") ? checkboxChange : null}
                                    />
                                </FormGroup>
                            


                        : (feildName === "is_active" || feildName === "is_staff" || feildName === "is_admin" )  && (
                            <FormGroup aria-label="position" row key={feildName}>
                                <FormControlLabel  
                                control={<Checkbox/>} 
                                label={(feildName.replace("is", "").replace("_","")).charAt(0).toUpperCase() + feildName.slice(4)}
                                value={(feildName.replace("is", "").replace("_","")).charAt(0).toUpperCase() + feildName.slice(4)}
                                name={feildName}
                                checked={  data  && (data[feildName])}
                                // checked={  data  ? data.is_staff : false}
                                onChange={location.pathname.includes("edit") ? checkboxChange : null}/>
                            </FormGroup>
                        )
                            
                        )
                        )}


                        <Div sx={{mx: 1}}>
                            <Button disabled={passValidation ? passValidation : null}  variant={"contained"} type="submit">Create</Button>
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