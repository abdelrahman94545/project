import React, {useEffect, useState} from 'react';
import AxiosApis from "../../../services/AxiosApis";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import ListData from "../../../components/ListData";
import {Typography, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Card} from "@mui/material";
import { addCompany } from "../../../redux2/reducers/CompanySlice";
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import Filter from '../../../components/Filter'
import AuthAxios from "../../../services/auth-axios";
import { addUsers } from "../../../redux2/reducers/usersListSlice";
import {useParams, useLocation} from "react-router-dom";
import Form from "../../../components/Form/Form"; 



const ListCompanies = () => {

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CompaniesData = useSelector(state => state.Company.companiesData) 
       const [filteredResult, setFilteredResult] = useState(null)
       const [companyUserData, setCompanyUserData] = useState(null)
       const [companyData, setCompanyData] = useState(null)
       const {Id} = useParams();
       const [open, setOpen] = useState(false);
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
        const location = useLocation();
        const Token = localStorage.getItem('token')
        const Refresh = localStorage.getItem('refresh')


    const getUsersDataFun = async (Token, refreshVal) => {

        try{
            await AuthAxios().usersList(Token, refreshVal)
            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addUsers(data.results))
                // dispatch(addUsers(data))
            }) 
        }
        catch(error){
            // console.log("list error =" ,error);
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


    const DeleteFun = async (id) => {
        let newFilteredResult = filteredResult
        try
        {
            await AuthAxios().deleteUser(id, localStorageToken, localStorageRefresh)
            .then((res) => {

                if(res === false)
                {
                    navigate("/user/login");
                    return false
                }

                getUsersDataFun(localStorageToken, localStorageRefresh)

                // used for delete data when filter is on
                if(newFilteredResult !== null)
                {
                    newFilteredResult = newFilteredResult.filter(( newData ) => {
                        return newData.id !== id;
                    });
    
                    setFilteredResult(newFilteredResult)
                }
                

                toast.success("The user has been Deleted",{
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
        catch(error)
        {
            console.log("error =", error);
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



    useEffect(()=>{
        if(CompaniesData && CompaniesData !== null)
        {
            CompaniesData.map((company, index) => {
                if(Id == company.id)
                {
                    // console.log("data for filter =", company.user);
                    setCompanyUserData(company.user)
                    setCompanyData(company)
                }
            })
        }
    })



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
            // if(location.pathname.includes("edit"))
            // {
            //     try
            //     {
            //         await AuthAxios().editUser(params.id ,userData, Token, Refresh)
            //         .then( async (res) => {

            //             if(res === false)
            //             {
            //                 navigate("/user/login");
            //                 return false
            //             }

            //             toast.success("The user has been Edited",{
            //                 position: "top-center",
            //                 autoClose: 3000,
            //                 hideProgressBar: false,
            //                 closeOnClick: true,
            //                 pauseOnHover: true,
            //                 draggable: true,
            //                 progress: undefined,
            //                 theme: "light",
            //             });
            //                 try{
            //                     await AuthAxios().usersList(Token, Refresh)
            //                     .then((data) => {
            //                         if(data === false)
            //                         {
            //                             navigate("/user/login");
            //                             return false
            //                         }
            //                         dispatch(addUsers(data.results))
            //                     })
            //                 }
            //                 catch(error){
            //                     toast.error("Network Error",{
            //                         position: "top-center",
            //                         autoClose: 3000,
            //                         hideProgressBar: false,
            //                         closeOnClick: true,
            //                         pauseOnHover: true,
            //                         draggable: true,
            //                         progress: undefined,
            //                         theme: "light",
            //                     });
            //                 }

            //             navigate("/list-views/users"); 
            //         });
            //     }
            //     catch(error)
            //     {
            //         toast.error("Network Error",{
            //             position: "top-center",
            //             autoClose: 3000,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //             theme: "light",
            //         });
            //     }
            // }
            // else
            // {
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
                                    dispatch(addUsers(data.results))
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
                    console.log("error =", error);
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
        // }
    }



    console.log("filteredResult =", filteredResult);
    console.log("companyUserData =", companyUserData);
    console.log("companyData =", companyData);

    return (
        <React.Fragment>

             {companyData?
             <>
                <Typography variant={'h2'} mb={3}>
                    {companyData.name}
                </Typography>

                <ListItem sx={{
                        width: '100%',
                        // maxWidth: 500,
                        mb: 2,
                        justifyContent: "space-evenly"
                        // bgcolor: 'background.paper',
                        // borderRadius: "40px",
                        // boxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)"
                    }}>
                <ListItemText sx={{
                        width: '100%',
                        maxWidth: 300,
                        textAlign: "center",
                        bgcolor: 'background.paper',
                        borderRadius: "20px",
                        padding: "10px 0 10px 0",
                        boxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)"
                    }} primary="Admin User Limit" secondary={companyData.admin_user_limit}/>
                <ListItemText sx={{
                        width: '100%',
                        maxWidth: 300,
                        textAlign: "center",
                        bgcolor: 'background.paper',
                        borderRadius: "20px",
                        padding: "10px 0 10px 0",
                        boxShadow: "0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)"
                    }}  primary="System User Limit" secondary={companyData.system_user_limit}/>
                <Button variant={"contained"} onClick={() => setOpen(true)}>Add Member</Button>
                </ListItem>
                
                
                </>
            : null}

                    {companyUserData?
                        <Filter  setFilteredResult={setFilteredResult} reduxData={companyUserData? [companyUserData] : null} />
                    : null}
                    

     
            {/* data without filtering */}
            { 
            filteredResult === null ? (
                (CompaniesData && CompaniesData !== null) ?
                CompaniesData.map((company, index) => (
                    console.log("without filter"),
                    Id == company.id ? 
                    <Link key={index}  style={{color: "#fff"}} to={`${company.user? `/list-views/users/edit/${company.user.id}` : null} `}>
                        <ListData 
                         Data={company.user} 
                         DeleteFun={DeleteFun}
                         key={index}
                        />
                    </Link>
                    : null
                ))
            :null

             ) : 
            //   data with filtering 
              filteredResult !== null ?
                filteredResult.map((user, index) => (
                    
                    // Id == company.id ? 
                    // console.log("with filter =", company)
                    <Link key={index}  style={{color: "#fff"}} to={`/list-views/users/edit/${user.id}`}>
                        <ListData 
                         Data={user} 
                         DeleteFun={DeleteFun}
                         key={index}
                        />
                    </Link>
                    // : null
                    // <Link key={index}  style={{color: "#fff"}} to={`/list-views/users/edit/${users.id}`}>
                    //     <ListData 
                    //      Data={company} 
                    //      DeleteFun={DeleteFun}
                    //      key={index}
                    //     />
                    // </Link>
                ))
                
            :null
            }



                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <Form  
                        location={location} 
                        handleSubmit={handleSubmit}
                        formFeilds={formFeildsArr}
                        formName="User"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        {/* <Button onClick={() => setOpen(false)}>Subscribe</Button> */}
                    </DialogActions>
                </Dialog>

        </React.Fragment>
    )
}


export default ListCompanies