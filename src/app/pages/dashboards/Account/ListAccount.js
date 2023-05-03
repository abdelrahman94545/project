import React, {useEffect, useState} from 'react';
import AxiosApis from "../../../services/AxiosApis";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import ListData from "../../../components/ListData";
import {Typography, Card} from "@mui/material";
import { addAccount } from "../../../redux2/reducers/AccountSlice";
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import Filter from '../../../components/Filter'



const ListAccount = () => {

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accountData = useSelector(state => state.Account.accountData)
    const [filteredResult, setFilteredResult] = useState(null)


    const getAccountDataFun = async (Token, refreshVal) => {

        try{
            await AxiosApis().listAccounts(Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addAccount(data.results))
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
        if(accountData === null)
        {
            getAccountDataFun(localStorageToken, localStorageRefresh)
        }
    },[])


    const DeleteFun = async (id) => {
        let newFilteredResult = filteredResult
        try
        {
            await AxiosApis().deleteAccount(id, localStorageToken, localStorageRefresh)
            .then((res) => {

                if(res === false)
                {
                    navigate("/user/login");
                    return false
                }

                getAccountDataFun(localStorageToken, localStorageRefresh)

                // used for delete data when filter is on
                if(newFilteredResult !== null)
                {
                    newFilteredResult = newFilteredResult.filter(( newData ) => {
                        return newData.id !== id;
                    });

                    setFilteredResult(newFilteredResult)
                }

                toast.success("The Account Has Been Deleted",{
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
                {/* Account */}
            </Typography>

            <Filter setFilteredResult={setFilteredResult} reduxData={accountData}  filterKey="AccountFilter"/>
     
            {/* data without filtering */}
            { 
            filteredResult === null ? (
                (accountData && accountData !== null) ?
                accountData.map((account, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/dashboards/Account/edit/${account.id}`}>
                        <ListData 
                         Data={account} 
                         DeleteFun={DeleteFun}
                         key={index}
                        />
                    </Link>
                    
                ))
            :null

             ) : 
            //   data with filtering 
              filteredResult !== null ?
                filteredResult.map((account, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/dashboards/Account/edit/${account.id}`}>
                        <ListData 
                         Data={account} 
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


export default ListAccount