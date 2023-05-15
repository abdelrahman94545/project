import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import {contactService} from "../../../../../services/contact-services";
import ContactItem from "./ContactItem";
import JumboListToolbar from "@jumbo/components/JumboList/components/JumboListToolbar";
import BulkActions from "./BulkActions";
import {Card} from "@mui/material";
import JumboSearch from "@jumbo/components/JumboSearch";
import useContactsApp from "../../hooks/useContactsApp";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ListIcon from '@mui/icons-material/List';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

import AxiosApisChat from "../../../../../services/AxiosApisChat";
import { toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";
import { addAllContacts } from "../../../../../redux2/reducers/ContactsSlice";
import { useSelector, useDispatch } from 'react-redux';

const ContactsList = () => {
    const params = useParams();
    const listRef = React.useRef();
    const {refreshContactsList, setContactsListRefresh, setSelectedContacts} = useContactsApp();
    const [view, setView] = React.useState("list");

    const [queryOptions, setQueryOptions] = React.useState({
        queryKey: "contacts",
        queryParams: {category: params.category, id: params.id},
        countKey: "count",
        dataKey: "contacts",
    });

    ///////////////
    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const allContacts = useSelector(state => state.Contacts.contactsData)
    const [page, setPage] = useState(0)


    /////////////

    React.useEffect(() => {
        setQueryOptions(state => ({
            ...state,
            queryParams: {...state.queryParams, category: params.category, id: params.id}
        }))
    }, [params]);

    const renderContact = React.useCallback((contact) => {
        return (<ContactItem contact={contact} view={view}/>)
    }, [view]);

    React.useEffect(() => {
        if (refreshContactsList) {
            listRef.current.refresh();
            setContactsListRefresh(false);
        }
    }, [refreshContactsList]);

    const handleOnChange = React.useCallback((keywords) => {
        setQueryOptions(state => ({
            ...state,
            queryParams: {
                ...state.queryParams,
                keywords: keywords,
            }
        }))
    }, []);


////////////////////

    const getContactsFun = async (page ,Token, refreshVal) => {

        try{
            await AxiosApisChat().getAllContacts(page + 1 ,Token, refreshVal)
            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                dispatch(addAllContacts(data))
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
    }


    useEffect( async ()=>{
        // if(usersListData === null)
        // {
            getContactsFun(page,localStorageToken, localStorageRefresh)
        // }
    },[page])


    const paginationChangeFun = (nextPageNumber) => {
        setPage(nextPageNumber)
        // getContactsFun(page,localStorageToken, localStorageRefresh)
    }
    

console.log("page num =", page);


    return (
        <JumboRqList
            ref={listRef}
            wrapperComponent={Card}
            apiData={allContacts}
            service={contactService.getContacts}
            primaryKey={"id"}
            queryOptions={queryOptions}
            itemsPerPage={8}
            itemsPerPageOptions={[8, 15, 20]}
            renderItem={renderContact}
            componentElement={"div"}
            // sx={view === 'grid' && {p: theme => theme.spacing(1, 3, 3)}}
            wrapperSx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
            toolbar={
                <JumboListToolbar
                    hideItemsPerPage={true}
                    page={page}
                    paginationChangeFun={paginationChangeFun}
                    // bulkActions={
                    //     <BulkActions/>
                    // }
                    // actionTail={
                    //     <ButtonGroup
                    //         variant="outlined"
                    //         disableElevation
                    //         sx={{
                    //             '& .MuiButton-root': {
                    //                 px: 1,
                    //             }
                    //         }}
                    //     >
                    //         <Button variant={view === "list" ? "contained" : "outlined"}
                    //                 onClick={() => setView("list")}><ListIcon/></Button>
                    //         <Button variant={view === "grid" ? "contained" : "outlined"}
                    //                 onClick={() => setView("grid")}><ViewComfyIcon/></Button>
                    //     </ButtonGroup>
                    // }
                >
                    <JumboSearch
                        onChange={handleOnChange}
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                    />
                </JumboListToolbar>
            }
            onSelectionChange={setSelectedContacts}
            view={view}
        />
    );
};

export default ContactsList;
