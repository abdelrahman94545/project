import React from 'react';
import Div from "@jumbo/shared/Div";
import Chip from "@mui/material/Chip";
import SentMessageContent from "./SentMessageContent";
import ReceivedMessageContent from "./ReceivedMessageContent";

import moment from 'moment';
// import useChatApp from "../../../hooks/useChatApp";
// import useChatApp from "../../hooks/useChatApp";

const ActiveConversationChat = ({conversation}) => {

    // const {userActiveConversationData} = useChatApp();
// console.log("conversation =", conversation);


    return (
        <React.Fragment>
            <Div sx={{
                position: 'relative',
                textAlign: 'center',
                mb: 2,

                '&:after': {
                    display: 'inline-block',
                    content: "''",
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'divider',
                },
            }}>
                <Chip
                    label={moment(conversation?.timestamp).format('DD MMMM')}
                    // label={conversation?.timestamp}
                    // label={conversation?.sent_date}
                    variant="outlined"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        bgcolor: theme => theme.palette.background.paper,
                        borderColor: 'divider',
                        borderRadius: 2
                    }}
                />
            </Div>

            {
                
                        <React.Fragment >
                            {
                                conversation.method === "Send" ? (
                                    // console.log("in =", message),
                                    <SentMessageContent message={conversation}/>
                                ) : (
                                    // console.log("in2 =", message),
                                    <ReceivedMessageContent message={conversation}/>
                                )
                            }
                        </React.Fragment>
                   
            }

            {/* {
                    conversation?.messages?.map((message, index) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                    message?.sent_by === 1 ? (
                                    <SentMessageContent message={message}/>

                                ) : (
                                    <ReceivedMessageContent message={message}/>
                                )
                            }
                        </React.Fragment>
                    )
                })
            } */}
        </React.Fragment>
    );
};
/* Todo conversation prop define */
export default ActiveConversationChat;
