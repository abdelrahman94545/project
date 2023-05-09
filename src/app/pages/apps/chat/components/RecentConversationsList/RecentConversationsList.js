import React, {useEffect, useState} from 'react';
import Div from "@jumbo/shared/Div";
import {Typography} from "@mui/material";
import JumboRqList from "@jumbo/components/JumboReactQuery/JumboRqList";
import useChatApp from "../../hooks/useChatApp";
import ConversationItem from "../ConversationItem";
import {chatService} from "../../../../../services/chat-services";

import AxiosApisChat from "../../../../../services/AxiosApisChat";
import { useSelector, useDispatch } from 'react-redux';
import { addRooms } from "../../../../../redux2/reducers/chatSlice";

const RecentConversationsList = ({callInfiniteScrollFun, setTapName}) => {
    const {recentConversationsListRef} = useChatApp();
    const renderContact = React.useCallback((contact) => {
        return (
            <ConversationItem conversationItem={contact}/>
        );
    }, []);


    // const localStorageToken = localStorage.getItem('token')
    // const localStorageRefresh = localStorage.getItem('refresh')
    // // const [chatDataApi, setChatDataApi] = useState();
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    // const dispatch = useDispatch();
    const chateRooms = useSelector(state => state.Chat.rooms)
  

    // const getChatDataFun = async (page, pageSize, Token, refreshVal) => {

    //     try{
    //         await AxiosApisChat().getChatList(page, pageSize, Token, refreshVal)

    //         .then((data) => {

    //             if(data === false)
    //             {
    //                 // navigate("/user/login");
    //                 return false
    //             }

    //             // setChatDataApi(data.results)
    //             setPage(prevPage => prevPage + 1)
    //             setPageSize(prevPageSize => prevPageSize + 10)
    //             dispatch(addRooms(data.results))
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

    // const callInfiniteScrollFun = () => {
    //     getChatDataFun(page, pageSize, localStorageToken, localStorageRefresh)
    // }

    useEffect( async ()=>{
        setTapName("chat")
        if(chateRooms.length === 0)
        {
            // getChatDataFun(page, pageSize, localStorageToken, localStorageRefresh)
            callInfiniteScrollFun()
        }
    },[])

console.log("rooms =", chateRooms);

    return (
        <React.Fragment>
            <Div
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    p: theme => theme.spacing(1.5, 2),
                    bgcolor: theme => theme.palette.action.hover,
                }}
            >
                <Typography
                    sx={{letterSpacing: 1.5, textTransform: 'uppercase'}}
                    variant="h6"
                    color="text.secondary" mb={0}
                >
                    <small>Recent chats</small>
                </Typography>
            </Div>
            <JumboRqList
                ref={recentConversationsListRef}
                apiData={chateRooms}
                // callInfiniteScrollFun={callInfiniteScrollFun}
                // apiData={chatDataApi}
                // service={chatService.getRecentConversations}
                renderItem={renderContact}
                primaryKey={"id"}
                queryOptions={{
                    queryKey: "recent-conversations-list",
                    dataKey: "conversations"
                }}
                componentElement={"div"}
            />
        </React.Fragment>

    );
};

export default RecentConversationsList;
