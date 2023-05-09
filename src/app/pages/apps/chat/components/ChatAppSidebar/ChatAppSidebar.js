import React, {useEffect, useState} from 'react';
import Div from "@jumbo/shared/Div";
import AuthUserSummary from "../AuthUserSummary";
import ChatGlobalSearch from "../ChatGlobalSearch";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import {TabContext, TabPanel} from "@mui/lab";
import FavoriteConversationsList from "../FavoriteConverstionsList";
import RecentConversationsList from "../RecentConversationsList";
import ContactsList from "../ContactsList";

import AxiosApisChat from "../../../../../services/AxiosApisChat";
import { addRooms } from "../../../../../redux2/reducers/chatSlice";
import { useSelector, useDispatch } from 'react-redux';
import classes from "../../../../../Style/Style.module.scss";
import { toast } from 'react-toastify';
import { addContacts } from "../../../../../redux2/reducers/chatSlice";


const ChatAppSidebar = () => {
    const [activeTab, setActiveTab] = React.useState("chat");


    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    // const [chatDataApi, setChatDataApi] = useState();
    const [chatPage, setChatPage] = useState(1);
    const [chatPageSize, setChatPageSize] = useState(10);
    const [contactPage, setContactPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [rommsCount, setRommsCount] = useState();
    const [showAndHideChatLoader, setShowAndHideChatLoader] = useState(false);
    const [showAndHideContactLoader, setShowAndHideContactLoader] = useState(false);
    const [infinityScrollChatLock, setInfinityScrollChatLock] = useState(true);
    const [infinityScrollContactLock, setInfinityScrollContactLock] = useState(true);
    const [tapName, setTapName] = useState("");
    const [contactsCount, setContactsCount] = useState();
    const dispatch = useDispatch();
    

    const getContactDataFun = async (contactPage, pageSize,Token, refreshVal) => {

        setShowAndHideContactLoader(true)

        try{
            await AxiosApisChat().getContacts(contactPage, pageSize, Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    // navigate("/user/login");
                    return false
                }

                // setDataApi(data.results)
                setContactPage(prevPage => prevPage + 1)
                setContactsCount(data.count)
                dispatch(addContacts(data.results))
            }).then(()=>{

              
                setShowAndHideContactLoader(false)
            })
           
        }
        catch(error){
            // console.log("list error =" ,error);

            if(error.response.status === 404)
            {
                setShowAndHideContactLoader(false)
                setInfinityScrollContactLock(false)
            }
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



    const getChatDataFun = async (chatPage, chatPageSize, Token, refreshVal) => {

        setShowAndHideChatLoader(true)

        try{
            await AxiosApisChat().getChatList(chatPage, chatPageSize, Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    // navigate("/user/login");
                    return false
                }

                // setChatDataApi(data.results)
                
                setChatPage(prevPage => prevPage + 1)
                setRommsCount(data.count)
                // setPageSize(prevPageSize => prevPageSize + 10)
                dispatch(addRooms(data.results))
            }).then(()=>{

                
                setShowAndHideChatLoader(false)
            })
           
        }
        catch(error){
            // console.log("list error =" ,error.response);
            if(error.response.status === 404)
            {
                setShowAndHideChatLoader(false)
                setInfinityScrollChatLock(false)
            }
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

    const callInfiniteScrollChatFun = () => {
        
        if(infinityScrollChatLock && !showAndHideChatLoader)
        {
            setShowAndHideChatLoader(true)
            getChatDataFun(chatPage, chatPageSize, localStorageToken, localStorageRefresh)
        }
    }


    const callInfiniteScrollContactsFun = () => {

        if(infinityScrollContactLock && !showAndHideContactLoader)
        {
            setShowAndHideContactLoader(true)
            getContactDataFun(contactPage, pageSize, localStorageToken, localStorageRefresh)
        }
    }



    return (
        <React.Fragment>
            <Div sx={{p: 2, pb: 1.25}}>
                {/* <AuthUserSummary/> */}
                <ChatGlobalSearch/>
            </Div>
            <TabContext value={activeTab}>
                <Div sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList
                        variant="fullWidth"
                        onChange={(event, newTab) => setActiveTab(newTab)}
                    >
                        <Tab label="Chats" value={"chat"}/>
                        <Tab label="Contacts" value={'contact'}/>
                    </TabList>
                </Div>
                <JumboScrollbar
                    style={{minHeight: 200}}
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                    autoHeightMin={30}
                    callinfinitescrollchatfun={callInfiniteScrollChatFun}
                    callinfinitescrollcontactsfun={callInfiniteScrollContactsFun}
                    rommscount={rommsCount}
                    showAndHideChatLoader={showAndHideChatLoader}
                    showAndHideContactLoader={showAndHideContactLoader}
                    tapName={tapName}
                >
                    <TabPanel value={"chat"} sx={{p: 0}}  >
                        {/* <FavoriteConversationsList/> */}
                        <RecentConversationsList callInfiniteScrollFun={callInfiniteScrollChatFun} setTapName={setTapName}/>
                    </TabPanel>
                    <TabPanel value={"contact"} sx={{p: 0}}>
                        <ContactsList setTapName={setTapName} callInfiniteScrollContactsFun={callInfiniteScrollContactsFun}/>
                    </TabPanel>
                </JumboScrollbar>
                {showAndHideChatLoader || showAndHideContactLoader? 
                <div className={classes.loader} >
                    <div className={classes.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
                </div> 
                : null}
            </TabContext>
        </React.Fragment>
    );
};

export default ChatAppSidebar;
