import React , {useEffect, useState} from 'react';
import useChatApp from "../../hooks/useChatApp";
import ContentPlaceholder from "./ActiveConversationChat/ContentPlaceholder";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import ActiveConversationHeader from "./ActiveConversationHeader";
import ActiveConversationFooter from "./ActiveConversationFooter";
import ConversationChatGroupByDate from "./ActiveConversationChat/ConversationChatGroupByDate";
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "react-query";
import {chatService} from "../../../../../services/chat-services";
import Div from "@jumbo/shared/Div";
import {CircularProgress, Typography} from "@mui/material";

import AxiosApisChat from "../../../../../services/AxiosApisChat";
import { toast } from 'react-toastify';

const ActiveConversation = React.forwardRef(({onRefresh}, ref) => {
    const {setActiveConversation, activeConversation} = useChatApp();
    const [queryKey, setQueryKey] = React.useState(["active-conversation"]);
    const scrollbarRef = React.useRef();
    const {chatBy, id} = useParams();

    const {data: conversationQuery, isLoading} = useQuery(
        queryKey, chatBy === "contact" ?
            chatService.getConversationByContactID
            : chatService.getConversation
    );
    const queryClient = useQueryClient();



    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const [chatRoomData ,setChatRoomData] = useState()

    const getChatRommDataFun = async (Id,Token, refreshVal) => {

        try{
            await AxiosApisChat().getChatRoomData(Id,Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    // navigate("/user/login");
                    return false
                }

                setChatRoomData(data.results)
                // dispatch(addAccount(data.results))
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
        // if(accountData === null)
        // {
            if(id)
            {
            getChatRommDataFun(id, localStorageToken, localStorageRefresh)
            }
        // }
    },[id])



    React.useEffect(() => {
        setActiveConversation(chatRoomData);
        // setActiveConversation(conversationQuery?.conversation);
        if (scrollbarRef)
            scrollbarRef.current?.scrollToBottom();
    }, [chatRoomData, scrollbarRef]);
// }, [conversationQuery, scrollbarRef]);

// console.log("activeConversation 1=", activeConversation);

    React.useEffect(() => {
        if (id) {
            setQueryKey(["active-conversation", {id: id}]);
        } else
            setQueryKey(["active-conversation"]);
    }, [id]);

    React.useImperativeHandle(ref, () => ({
        async refresh() {
            await queryClient.invalidateQueries(["active-conversation"]);
            await conversationQuery.refetch();
            onRefresh();
        },
    }));
    if (isLoading) {
        return (
            <Div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: theme => theme.spacing(3),
                    m: 'auto',
                }}
            >
                <CircularProgress/>
                <Typography variant={'h6'} color={'text.secondary'} mt={2}>Loading messages</Typography>
            </Div>
        )
    }
    if (!id) {
        return (
            <React.Fragment>
                <ContentPlaceholder/>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <ActiveConversationHeader/>
                <JumboScrollbar
                    ref={scrollbarRef}
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                    autoHeightMin={30}
                    style={{minHeight: 200}}
                >
                    <ConversationChatGroupByDate/>
                </JumboScrollbar>
                <ActiveConversationFooter/>
            </React.Fragment>
        );
    }

});

ActiveConversation.defaultProps = {
    onRefresh: () => {
    }
};
export default ActiveConversation;
