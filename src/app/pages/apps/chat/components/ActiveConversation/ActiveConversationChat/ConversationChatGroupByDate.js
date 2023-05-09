import React from 'react';
import ActiveConversationChat from "./ActiveConversationChat";
import useChatApp from "../../../hooks/useChatApp";

const chatGroupedByDate = (array, key) =>
    Object.entries(
        array.reduce((result, {[key]: k, ...rest}) => {
            (result[k] = result[k] || []).push(rest);
            return result;
        }, {})
    ).map(([sent_date, messages]) => ({
        sent_date,
        messages
    }));
const ConversationChatGroupByDate = () => {
    const {activeConversation} = useChatApp();
    // const conversationMessages = React.useMemo(() => {
    //     if(activeConversation)
    //         return chatGroupedByDate(activeConversation?.messages, 'sent_date');

    //     return [];
    // }, [activeConversation]);


    // console.log("activeConversation 22=", activeConversation);
    return (
        <React.Fragment>

            {
                activeConversation?.sort((a, b) => { return a.id - b.id })
                .map((messagesGroupByDate, index) => (
                    // conversationMessages?.map((messagesGroupByDate, index) => (
                    <ActiveConversationChat key={index} conversation={messagesGroupByDate}/>
                ))
            }

            {/* {
                activeConversation?.map((messagesGroupByDate, index) => (
                    // conversationMessages?.map((messagesGroupByDate, index) => (
                    <ActiveConversationChat key={index} conversation={messagesGroupByDate}/>
                ))
            } */}
        </React.Fragment>
    );
};

export default ConversationChatGroupByDate;
