import React from "react";
import MailApp from "../pages/apps/mail";
import ContactsApp from "../pages/apps/contacts/ContactsApp";
import ChatApp from "../pages/apps/chat";
import Page from "@jumbo/shared/Page";

import ListCompanies from "../pages/dashboards/AppCompanies/AppCompanies";

const appsRoutes = [
    // {
    //     path: [
    //         "/app/chats",
    //         "/app/chats/:chatBy/:id",
    //     ],
    //     element: <Page component={ChatApp}/>,
    // },
    {
        path: [
            "/app/chats/:channelId",
            "/app/chats/:channelId/:chatBy/:id",
        ],
        element: <Page component={ChatApp}/>,
    },
    {
        path: [
            "/app/company/:Id"
        ],
        element: <Page component={ListCompanies}/>,
    },
    {
        path: [
            "/app/contacts/:category",
            "/app/contacts/:category/:id",
        ],
        element: <Page component={ContactsApp}/>,
    },
    {
        path: [
            "/app/mails/:category",
            "/app/mails/:category/:id",
            "/app/mails/:category/message/:messageID",
            "/app/mails/:category/:id/message/:messageID"
        ],
        element: <Page component={MailApp}/>
    }
];

export default appsRoutes;
