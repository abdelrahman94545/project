import React, {useEffect, useState} from 'react';
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import ContactItem from "./ContactItem";
import useChatApp from "../../hooks/useChatApp";
import {chatService} from "../../../../../services/chat-services";
import AxiosApisChat from "../../../../../services/AxiosApisChat";

import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from "../../../../../redux2/reducers/chatSlice";

const ContactsList = ({setTapName, callInfiniteScrollContactsFun}) => {
    const {contactConversationsListRef} = useChatApp();
    const renderContact = React.useCallback((contact) => {
        return (
            <ContactItem contactItem={contact}/>
        )
    }, []);

    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const [dataApi, setDataApi] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [contactsCount, setContactsCount] = useState();
    const contactesData = useSelector(state => state.Chat.contacts)
    const dispatch = useDispatch();

    // const getContactDataFun = async (page, pageSize,Token, refreshVal) => {

    //     try{
    //         await AxiosApisChat().getContacts(page, pageSize, Token, refreshVal)

    //         .then((data) => {

    //             if(data === false)
    //             {
    //                 // navigate("/user/login");
    //                 return false
    //             }

    //             // setDataApi(data.results)
    //             setPage(prevPage => prevPage + 1)
    //             setContactsCount(data.count)
    //             dispatch(addContacts(data.results))
    //         })
           
    //     }
    //     catch(error){
    //         console.log("list error =" ,error);
    //         // toast.error("Network Error",{
    //         //     position: "top-center",
    //         //     autoClose: 3000,
    //         //     hideProgressBar: false,
    //         //     closeOnClick: true,
    //         //     pauseOnHover: true,
    //         //     draggable: true,
    //         //     progress: undefined,
    //         //     theme: "light",
    //         // });
    //     }
    // }

    useEffect( async ()=>{
        setTapName("contact")
        if(contactesData.length === 0)
        {
            callInfiniteScrollContactsFun()
            // getContactDataFun(page, pageSize, localStorageToken, localStorageRefresh)
        }
    },[])


    // const results = [
    //     {
    //         "id": 1,
    //         "name": "JZDGZad",
    //         "phonenumber": "391",
    //         "email_address": null,
    //         "company": 1,
    //         "create_by": null
    //       }
    // ]



    return (
        <JumboRqList
            ref={contactConversationsListRef}
            // apiData={results}
            apiData={contactesData}
            // apiData={dataApi}
            // service={AxiosApisChat().getContacts(localStorageToken,localStorageRefresh)}
            service={chatService.getContacts}
            renderItem={renderContact}
            primaryKey={"id"}
            queryOptions={{
                queryKey: "contacts-list",
                dataKey: "contacts"
            }}
            componentElement={"div"}
        />
    );
};

export default ContactsList;
