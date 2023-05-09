import { Instance } from "./axios/axios";
import AuthAxios from "./auth-axios";

const AxiosApisChat = () => {

    const axiosApisChat = {};


    // Contacts Data
    axiosApisChat.getContacts = async (page, pageSize, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/contact/condata?page=${page}&page_size=${pageSize}`,
             { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }


    // chat list Data
    axiosApisChat.getChatList = async (page, pageSize, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/rooms/rooms/?page=${page}&page_size=${pageSize}`,
             { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }


    // chat Room Data
    axiosApisChat.getChatRoomData = async (Id, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/rooms/roomschat/${Id}`,
             { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }


    // send chat message
    axiosApisChat.sendChatMess = async (messageData , Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.post('/rooms/chat/', messageData ,
             { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }




    // all contacts list Data
    axiosApisChat.getAllContacts = async (page, pageSize, Token, refreshVal) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/contact/contact/?page=${page}&page_size=${pageSize}`,
             { 
                headers: {
                    "Authorization" : `Bearer ${Token}`,
                    "Connection":"keep-alive",
                    "Content-Type":"application/json"
                }
            })
            return data;
        }
        else
        {
            return false
        }
    }






    return axiosApisChat;
}


export default AxiosApisChat;