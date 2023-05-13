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
import { updateRooms, addRooms, updateContacts,addContacts } from "../../../../../redux2/reducers/chatSlice";
import { useSelector, useDispatch } from 'react-redux';
import classes from "../../../../../Style/Style.module.scss";
import { toast } from 'react-toastify';
// import { updateContacts,addContacts } from "../../../../../redux2/reducers/chatSlice";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const ChatAppSidebar = () => {
    const [activeTab, setActiveTab] = React.useState("chat");


    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    // const [chatDataApi, setChatDataApi] = useState();
    const [chatPage, setChatPage] = useState(1);
    const [chatPageSize, setChatPageSize] = useState(5);
    const [contactPage, setContactPage] = useState(1);
    const [contactPageSize, setContactPageSize] = useState(10);
    const [rommsCount, setRommsCount] = useState();
    const [showAndHideChatLoader, setShowAndHideChatLoader] = useState(false);
    const [showAndHideContactLoader, setShowAndHideContactLoader] = useState(false);
    const [infinityScrollChatLock, setInfinityScrollChatLock] = useState(true);
    const [infinityScrollContactLock, setInfinityScrollContactLock] = useState(true);
    const [tapName, setTapName] = useState("");
    const [contactsCount, setContactsCount] = useState();
    const {channelId, id} = useParams();
    const [currentChannelId, setCurrentChannelId] = useState();
    const dispatch = useDispatch(); 
    const chateNextRoomsLink = useSelector(state => state.Chat.nextRooms)
    const chatPreviousRoomsLink = useSelector(state => state.Chat.previousRooms)
    const chatReduxData = useSelector(state => state.Chat)
    const chateRooms = useSelector(state => state.Chat.rooms)
    const navigate = useNavigate();




    useEffect(()=>{
        console.log("change");
        // setChatPage(1)
        // navigate(`/app/chats/${channelId}`);
    },[channelId])
    console.log("test =", chatPage);

    const getContactDataFun = async (contactPage, contactPageSize,Token, refreshVal) => {

        setShowAndHideContactLoader(true)

        try{
            await AxiosApisChat().getContacts(contactPage, contactPageSize, Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                console.log("currentChannelId6666 =",currentChannelId);
                console.log("channelId3333 =",channelId);

                if(currentChannelId !== channelId)
                {
                    console.log("reset state22");
                    setContactPage(1)
                    dispatch(addContacts(data))
                }
                
                if(currentChannelId === channelId)
                {
                    console.log("current state2222");
                    setContactPage(prevPage => prevPage + 1)
                     dispatch(updateContacts(data))

                }


                // setDataApi(data.results)
                // setContactPage(prevPage => prevPage + 1)
                setContactsCount(data.count)
                // dispatch(updateContacts(data.results))
            }).then(()=>{

                setCurrentChannelId(channelId)
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



    const getChatDataFun = async (channelIdVal,chatPage, chatPageSize, Token, refreshVal) => {
        
        let newRoomsLink = null
        if(currentChannelId !== channelId)
        {
             newRoomsLink = null
        }
        else
        {
             newRoomsLink = chateNextRoomsLink?.replace('http://62.171.166.157:9497','')
        }
        // const newRoomsLink = chateNextRoomsLink?.replace('http://62.171.166.157:9497','')
        console.log("new =", newRoomsLink);
        
        setShowAndHideChatLoader(true)

        try{
            await AxiosApisChat().getChatList(channelIdVal,chatPage, chatPageSize, Token, refreshVal, newRoomsLink)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                

                // setChatDataApi(data.results)

                if(currentChannelId !== channelId)
                {
                    console.log("reset state");
                    setChatPage(1)
                    dispatch(addRooms(data))
                }
                
                if(currentChannelId === channelId)
                {
                    console.log("current state");
                    setChatPage(prevPage => prevPage + 1)
                     dispatch(updateRooms(data))

                }
                
                
                // setChatPage(prevPage => prevPage + 1)
                setRommsCount(data.count)
                // setPageSize(prevPageSize => prevPageSize + 10)
                // dispatch(updateRooms(data.results))
            }).then(()=>{

                setCurrentChannelId(channelId)
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

    const callInfiniteScrollChatFun = (callApiWith) => {
        
         if(infinityScrollChatLock && !showAndHideChatLoader)
        {
            // setShowAndHideChatLoader(true)
            // check if the channel change or i use the Infinitescroll to call api
            if(callApiWith === "tabes")
            {
                console.log("tabes111 =");
                getChatDataFun(channelId, 1 , chatPageSize, localStorageToken, localStorageRefresh)
                setShowAndHideChatLoader(true)
            }
            else 
            if(callApiWith === "Infinitescroll" 
            && ((chatPreviousRoomsLink === null && chateNextRoomsLink !== null) || (chatPreviousRoomsLink !== null && chateNextRoomsLink !== null)))
            {
                console.log("Infinitescroll1111 =");
                getChatDataFun(channelId,chatPage + 1, chatPageSize, localStorageToken, localStorageRefresh)
                setShowAndHideChatLoader(true)
            }
            
        }
    }


    const callInfiniteScrollContactsFun = (callApiWith) => {

        if(infinityScrollContactLock && !showAndHideContactLoader)
        {
            // setShowAndHideContactLoader(true)

            // check if the channel change or i use the Infinitescroll to call api
            if(callApiWith === "tabes")
            { console.log("in tabes");
                getContactDataFun(1, contactPageSize, localStorageToken, localStorageRefresh)
                // getContactDataFun(contactPage, 1, localStorageToken, localStorageRefresh)
                setShowAndHideContactLoader(true)
            }
            else if(callApiWith === "Infinitescroll" 
            && ((chatReduxData.previousContacts === null && chatReduxData.nextContacts !== null) 
                || (chatReduxData.previousContacts !== null && chatReduxData.nextContacts !== null)))
            {
                console.log("in Infinitescroll =", contactPage);
                getContactDataFun( contactPage +1 , contactPageSize , localStorageToken, localStorageRefresh)
                setShowAndHideContactLoader(true)
            }

            // getContactDataFun(contactPage, contactPageSize, localStorageToken, localStorageRefresh)
        }
    }

     
    // console.log("currentChannelId =",currentChannelId);
    // console.log("channelId =", channelId);
    

   console.log("rommsCount7777 =",rommsCount);
   console.log("chateRooms.length7777 =",chateRooms.length);

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
                    showandhidechatloader={showAndHideChatLoader.toString()}
                    showandhidecontactloader={showAndHideContactLoader.toString()}
                    tapName={tapName}
                >
                    <TabPanel value={"chat"} sx={{p: 0}}  >
                        {/* <FavoriteConversationsList/> */}
                        <RecentConversationsList callInfiniteScrollFun={callInfiniteScrollChatFun} setTapName={setTapName} setChatPage={setChatPage}/>
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
