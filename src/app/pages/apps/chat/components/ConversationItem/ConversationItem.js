import React from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import {ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {useNavigate, useParams} from "react-router-dom";

import useChatApp from "../../hooks/useChatApp";

const ConversationItem = ({conversationItem}) => {

    const {channelId} = useParams();

    const {setUserActiveConversationData} = useChatApp();

    const navigate = useNavigate();
    const handleConversationClick = () => {
        navigate(`/app/chats/${channelId}/conversation/${conversationItem?.id}`);
        // navigate(`/app/chats/conversation/${conversationItem?.id}`);


        setUserActiveConversationData(conversationItem);
        // console.log("conversationItem2 =", conversationItem);
    };

    return (
        <List disablePadding>
            <ListItemButton component="li">
                <ListItemAvatar>
                    <Badge
                        overlap="circular"
                        variant="dot"
                        sx={{
                            '& .MuiBadge-badge': {
                                height: 10,
                                width: 10,
                                border: 1,
                                borderColor: 'common.white',
                                borderRadius: '50%',
                                backgroundColor: (
                                    conversationItem?.contact?.status === 'offline'
                                        ? '#a89f9f'
                                        : conversationItem?.contact?.status === 'online' ? '#72d63a' : '#F7BB07'
                                )
                            }
                        }}
                    >
                        <Avatar alt={conversationItem?.contact?.name} src={conversationItem?.contact?.profile_pic}/>
                    </Badge>
                </ListItemAvatar>
                <ListItemText
                    onClick={handleConversationClick}
                    primary={
                        <Typography component="div" variant="body1" sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="h6" mb={.5}
                                        fontSize={15}>{conversationItem.name}</Typography>
                                        {/* fontSize={15}>{conversationItem?.contact?.name}</Typography> */}
                        </Typography>
                    }
                    secondary={
                        <Typography
                            component="div"
                            variant="body1"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography
                                noWrap
                                variant="body1"
                                color={"text.secondary"}
                                fontSize={13}
                            >{conversationItem?.last_message?.message}</Typography>
                        </Typography>
                    }
                />
            </ListItemButton>
            <Divider component="li"/>
        </List>
    );
};
/* Todo conversationItem prop define */
export default ConversationItem;
