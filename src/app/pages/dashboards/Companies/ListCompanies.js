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



const ListCompanies = () => {

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const CompaniesData = useSelector(state => state.Company.companiesData) 
       const [filteredResult, setFilteredResult] = useState(null)


    const getCompaniesDataFun = async (Token, refreshVal) => {

        try{
            await AxiosApis().getCompanyData(Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addCompany(data))
            })
        }
        catch(error){
            console.log("list error =" ,error);
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

    useEffect( async ()=>{
        if(CompaniesData === null)
        {
            getCompaniesDataFun(localStorageToken, localStorageRefresh)
        }
    },[])


    const DeleteFun = async (id) => {
        try
        {
            await AxiosApis().deleteCompany(id, localStorageToken, localStorageRefresh)
            .then((res) => {
                if(res === false)
                {
                    navigate("/user/login");
                    return false
                }

                getCompaniesDataFun(localStorageToken, localStorageRefresh)

                toast.success("The Company Has Been Deleted",{
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
        <React.Fragment>
            <Typography variant={'h2'} mb={3}>
                {/* Users2 */}
            </Typography>

            <Filter setFilteredResult={setFilteredResult} reduxData={CompaniesData} />
     
            {/* data without filtering */}
            { 
            filteredResult === null ? (
                (CompaniesData && CompaniesData !== null) ?
                CompaniesData.map((company, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/dashboards/Companies/edit/${company.id}`}>
                        <ListData Data={company} 
                         DeleteFun={DeleteFun}
                         key={index}
                        />
                    </Link>
                    
                ))
            :null

             ) : 
            //   data with filtering 
              filteredResult !== null ?
                filteredResult.map((company, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/dashboards/Companies/edit/${company.id}`}>
                        <ListData Data={company} 
                         DeleteFun={DeleteFun}
                         key={index}
                        />
                    </Link>
                ))
                
            :null
            }
        </React.Fragment>
    )
}


export default ListCompanies