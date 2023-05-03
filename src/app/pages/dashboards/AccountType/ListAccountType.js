import React, {useEffect, useState} from 'react';
import AxiosApis from "../../../services/AxiosApis";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import ListData from "../../../components/ListData";
import {Typography, Card} from "@mui/material";
import { addAccountType } from "../../../redux2/reducers/AccountTypeSlice";
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import Filter from '../../../components/Filter'



const ListAccountType = () => {

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accountTypeData = useSelector(state => state.accountType.accountTypeData)
    const [filteredResult, setFilteredResult] = useState(null)


    const getAccountTypeDataFun = async (Token, refreshVal) => {

        try{
            await AxiosApis().listAccountType(Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addAccountType(data.results))
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

    useEffect( async ()=>{
        if(accountTypeData === null)
        {
            getAccountTypeDataFun(localStorageToken, localStorageRefresh)
        }
    },[])


    const DeleteFun = async (id) => {
        let newFilteredResult = filteredResult
        try
        {
            await AxiosApis().DeleteAccountType(id, localStorageToken, localStorageRefresh)
            .then((res) => {

                if(res === false)
                {
                    navigate("/user/login");
                    return false
                }

                getAccountTypeDataFun(localStorageToken, localStorageRefresh)

                // used for delete data when filter is on
                if(newFilteredResult !== null)
                {
                    newFilteredResult = newFilteredResult.filter(( newData ) => {
                        return newData.id !== id;
                    });

                    setFilteredResult(newFilteredResult)
                }

                toast.success("The Account Type Has Been Deleted",{
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

            <Filter setFilteredResult={setFilteredResult} reduxData={accountTypeData} />
     
            {/* data without filtering */}
            { 
            filteredResult === null ? (
                (accountTypeData && accountTypeData !== null) ?
                accountTypeData.map((types, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/dashboards/accountType/edit/${types.id}`}>
                        <ListData 
                         Data={types} 
                         DeleteFun={DeleteFun}
                         key={index}
                        />
                    </Link>
                    
                ))
            :null

             ) : 
            //   data with filtering 
              filteredResult !== null ?
                filteredResult.map((types, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/dashboards/accountType/edit/${types.id}`}>
                        <ListData 
                         Data={types} 
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


export default ListAccountType