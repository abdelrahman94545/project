import React, {useEffect, useState} from 'react';
import AxiosApis from "../../../services/AxiosApis";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import ListData from "../../../components/ListData";
import {Typography, Card} from "@mui/material";
import { addCompany } from "../../../redux2/reducers/CompanySlice";
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import Filter from '../../../components/Filter'
import AuthAxios from "../../../services/AxiosApis";
import { addUsers } from "../../../redux2/reducers/usersListSlice";
import {useParams} from "react-router-dom";



const ListCompanies = () => {

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CompaniesData = useSelector(state => state.Company.companiesData) 
       const [filteredResult, setFilteredResult] = useState(null)
       const [companyUserData, setCompanyUserData] = useState(null)
       const {Id} = useParams();


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
                }
            })
        }
    })

    console.log("filteredResult =", filteredResult);
    console.log("companyUserData =", companyUserData);

    return (
        <React.Fragment>
            <Typography variant={'h2'} mb={3}>
                App Companies
            </Typography>

            {/* {(CompaniesData && CompaniesData !== null) ?
                CompaniesData.map((company, index) => (
                    console.log("with filter"),
                    Id == company.id ? */}
                    {companyUserData?
                        <Filter  setFilteredResult={setFilteredResult} reduxData={companyUserData? [companyUserData] : null} />
                    : null}
                    
                    {/* : null
                )) : null} */}
     
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
        </React.Fragment>
    )
}


export default ListCompanies