import React, {useEffect, useState} from 'react';
import {users} from "./data";
import UserItem from "./UserItem";
import {Typography, Card} from "@mui/material";

import AuthAxios from "../../../../services/auth-axios";
import { useSelector, useDispatch } from 'react-redux';
import { addUsers } from "../../../../redux2/reducers/usersListSlice";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import Filter from '../../../../components/Filter'
import ListData from "../../../../components/ListData";
import {Link} from "react-router-dom";


const UsersList = () => {

    const usersListData = useSelector(state => state.usersList.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const [filteredData, setFilteredData] = useState(null)
    const [filteredResult, setFilteredResult] = useState(null)


    const getUsersDataFun = async (Token, refreshVal) => {

        try{
            await AuthAxios().usersList(Token, refreshVal)
            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addUsers(data))
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
        if(usersListData === null)
        {
            getUsersDataFun(localStorageToken, localStorageRefresh)
        }
    },[])

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

    return (
        <React.Fragment>
            <Typography variant={'h2'} mb={3}>
                {/* Users2 */}
            </Typography>

            <Filter setFilteredResult={setFilteredResult}  reduxData={usersListData}/>
     
            {/* data without filtering */}
            { filteredResult === null ? (
                (usersListData && usersListData !== null) ?
                usersListData.map((users, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/list-views/users/edit/${users.id}`}>
                        <ListData Data={users} key={index}  DeleteFun={DeleteFun} />
                        {/* // <UserItem userData={users} key={index}  DeleteFun={DeleteFun}/> */}
                    </Link>
                ))
            :null

             ) : 
            //   data with filtering 
              filteredResult !== null ?
                filteredResult.map((users, index) => (
                    <Link key={index}  style={{color: "#fff"}} to={`/list-views/users/edit/${users.id}`}>
                        <ListData Data={users} key={index}  DeleteFun={DeleteFun} />
                        {/* // <UserItem userData={users} key={index}  DeleteFun={DeleteFun}/> */}
                    </Link>
                ))
                
            :null
            }
        </React.Fragment>
    );
};

export default UsersList;
