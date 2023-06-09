import React from 'react';
import ChatAppContext from "./ChatAppContext";

const ChatAppProvider = ({children}) => {
    const [activeConversation, setActiveConversation] = React.useState(null);
    const [userActiveConversationData, setUserActiveConversationData] = React.useState(null);
    const favoriteConversationsListRef = React.useRef();
    const recentConversationsListRef = React.useRef();
    const activeConversationRef = React.useRef();
    const contactConversationsListRef = React.useRef();

    const contextValue = React.useMemo(() => ({
        activeConversation,
        setActiveConversation,
        favoriteConversationsListRef,
        recentConversationsListRef,
        contactConversationsListRef,
        activeConversationRef,
        userActiveConversationData,
        setUserActiveConversationData
    }), [
        activeConversation,
        activeConversationRef,
        favoriteConversationsListRef,
        recentConversationsListRef,
        contactConversationsListRef,
        userActiveConversationData
    ]);

    return (
        <ChatAppContext.Provider value={contextValue}>
            {children}
        </ChatAppContext.Provider>
    );
};

export default ChatAppProvider;
