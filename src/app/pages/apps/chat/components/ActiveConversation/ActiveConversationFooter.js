import React, {useEffect} from 'react';
import {useMutation} from "react-query";
import Div from "@jumbo/shared/Div";
import {TextField} from "@mui/material";
import useChatApp from "../../hooks/useChatApp";
import {chatService} from "../../../../../services/chat-services";

import AxiosApisChat from "../../../../../services/AxiosApisChat";
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

const ActiveConversationFooter = () => {

    const authData = useSelector(state => state.auth.AuthData)
    const {id} = useParams();
    const localStorageToken = localStorage.getItem('token')
    const localStorageRefresh = localStorage.getItem('refresh')
    const navigate = useNavigate();
    // const socket = io.connect("ws://10.0.0.9:8000/")
    // const socket = io.connect("ws://10.0.0.9:8000/ws/rooms/chatroom/GGdCKyGjNLougvbHj6ZkmL/")

    // const chatSocket = new WebSocket("ws://10.0.0.9:8000/ws/rooms/chatroom/GGdCKyGjNLougvbHj6ZkmL/");

    // chatSocket.onmessage = function(e) {
    //     console.log(`data ${e.data}`)
         
    //    };

    const sendChatMessageFun = async (messageData ,Token, refreshVal) => {

        try{
            await AxiosApisChat().sendChatMess(messageData,Token, refreshVal)

            .then((data) => {

                if(data === false)
                {
                    navigate("/user/login");
                    return false
                }

                
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



    const {
        activeConversation,
        activeConversationRef,
        favoriteConversationsListRef,
        recentConversationsListRef,
        contactConversationsListRef,
    } = useChatApp();
    const [message, setMessage] = React.useState('');
    const addMessageMutation = useMutation(chatService.addConversationMessage, {
        onSuccess: () => {
            activeConversationRef?.current?.refresh();
            favoriteConversationsListRef?.current?.refresh();
            recentConversationsListRef?.current?.refresh();
            contactConversationsListRef?.current?.refresh();
        }
    });
    const onSendMessage = (event) => {
        const message = event.target.value.trim();
        let messageVal = {}
       

        messageVal["message"] = message
        messageVal["company"] = 1
        // messageVal["company"] = authData.company
        messageVal["account"] = 1
        messageVal["chat"] = +id
        messageVal["user"] = authData.id

        // console.log("message 2 =", messageVal);


        if (event.key === 'Enter' && message) {
            sendChatMessageFun(messageVal, localStorageToken, localStorageRefresh)
            // addMessageMutation.mutate({conversationID: activeConversation.id, message: message})
            setMessage('');
        }



        // socket.emit("onmessage",{message})
    };


    // useEffect(()=>{
    //     socket.on((data)=>{
    //         console.log("recive Data =", data);
    //     })
    // },[socket])

    

    return (
        <Div
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: theme => theme.spacing(2, 3),
                borderTop: 1,
                borderTopColor: 'divider',
                bgcolor: theme => theme.palette.action.hover,
            }}
        >
            <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size={'small'}
                placeholder={"Type message...."}
                onKeyPress={onSendMessage}
                fullWidth
                sx={{
                    backgroundColor: theme => theme.palette.background.paper
                }}
            />
        </Div>
    );
};

export default ActiveConversationFooter;
