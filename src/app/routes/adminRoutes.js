import React from "react";
import CryptoDashboard from "../pages/dashboards/crypto/CryptoDashboard";
import ListingDashboard from "../pages/dashboards/listing/ListingDashboard";
import CrmDashboard from "../pages/dashboards/crm/CrmDashboard";
import IntranetDashboard from "../pages/dashboards/intranet/IntranetDashboard";
import EcommerceDashboard from "../pages/dashboards/ecommerce/EcommerceDashboard";
import NewsDashboard from "../pages/dashboards/news/NewsDashboard";
import MiscDashboard from "../pages/dashboards/misc/MiscDashboard";
import Page from "@jumbo/shared/Page";

import CreateUser from "../pages/dashboards/Users/createUser/CreateUser";
import UsersList from "../pages/list-views/UsersList";
import ListAccountType from "../pages/dashboards/AccountType/ListAccountType";
import CreateAccountType from "../pages/dashboards/AccountType/CreateAccountType";

const adminRoutes = [
   
    {
        path: "/dashboards/createUser",
        element: <Page component={CreateUser} />,
    },
    {
        path: "/list-views/users/edit/:id",
        element: <Page component={CreateUser} />,
    },
    {
        path: "/list-views/users",
        element: <Page component={UsersList}/>,
    },
    {
        path: "/dashboards/accountType",
        element: <Page component={ListAccountType} />,   
    },
    {
        path: "/dashboards/createAccountType",
        element: <Page component={CreateAccountType} />,   
    },
    {
        path: "/dashboards/accountType/edit/:id",
        element: <Page component={CreateAccountType} />,
    },
];

export default adminRoutes;
