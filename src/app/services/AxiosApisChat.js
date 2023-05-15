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


    // chat list rooms Data
    axiosApisChat.getChatList = async (Id ,page, pageSize, Token, refreshVal, newRoomsLink) => {
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            if((newRoomsLink === undefined || newRoomsLink === null))
            {  console.log("first =");
                const {data} = await Instance.get(`/account/accountrooms/${Id}?page=1&page_size=5`,
                // const {data} = await Instance.get(`/account/accountrooms/${Id}?page=${page}&page_size=${pageSize}`,
                // const {data} = await Instance.get(`/rooms/rooms/?page=${page}&page_size=${pageSize}`,
                { 
                    headers: {
                        "Authorization" : `Bearer ${Token}`,
                        "Connection":"keep-alive",
                        "Content-Type":"application/json"
                    }
                })
                return data;
            }
            
            if(newRoomsLink !== undefined || newRoomsLink !== null)
            {  console.log("seconde =");
                const {data} = await Instance.get(newRoomsLink,
                // const {data} = await Instance.get(`/rooms/rooms/?page=${page}&page_size=${pageSize}`,
                { 
                    headers: {
                        "Authorization" : `Bearer ${Token}`,
                        "Connection":"keep-alive",
                        "Content-Type":"application/json"
                    }
                })
                return data;
            }

                // const {data} = await Instance.get(`/account/accountrooms/${Id}?page=${page}&page_size=${pageSize}`,
                // // const {data} = await Instance.get(`/rooms/rooms/?page=${page}&page_size=${pageSize}`,
                // { 
                //     headers: {
                //         "Authorization" : `Bearer ${Token}`,
                //         "Connection":"keep-alive",
                //         "Content-Type":"application/json"
                //     }
                // })
                // return data;
            
            
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
    axiosApisChat.getAllContacts = async (page, Token, refreshVal) => {  
        // axiosApisChat.getAllContacts = async (page, pageSize, Token, refreshVal) => {  
        const status = await AuthAxios().verifyAndRefreshToken(Token, refreshVal)
        if(status === 200)
        {
            const {data} = await Instance.get(`/contact/contact/?page=${page}&page_size=10`,
            // const {data} = await Instance.get(`/contact/contact/?page=${page}&page_size=${pageSize}`,
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