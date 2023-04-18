import React from 'react';
import {useNavigate, useLocation } from "react-router-dom";
import {routesForAuthenticatedOnly, routesForNotAuthenticatedOnly} from "../../../app/routes";
import useRoutePathMatch from "@jumbo/hooks/useRoutePathMatch";
import {removeToken, storeToken} from "./authHelpers";
import {config} from "../../../app/config/main";
import {AuthContext} from "@jumbo/components/JumboAuthProvider/JumboAuthContext";

import { useDispatch } from 'react-redux';
import { addAuth } from "../../../app/redux2/reducers/AuthSlice";


const storedToken = localStorage.getItem("token");
let firstTimePageLoad = true;

const init = () => {
    let authUser = null;

    if (!config?.authSetting) {
        throw Error(`You are using JumboAuthProvider but you haven't setup authSetting inside /src/app/config/main.js's config object`);
    }

    if (storedToken) {
        storeToken(storedToken); // also sets axios header
    }

    

    return {
        authToken: storedToken ?? null,
        authUser: authUser,
        isLoading: false,
        fallbackPath: config.authSetting.fallbackPath,
    }
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "set-auth-data":
            return {
                ...state,
                ...action.payload,
            };

        case "start-loading":
            return {
                ...state,
                isLoading: true,
            };

        case "stop-loading":
            return {
                ...state,
                isLoading: false,
            };
    }
};

const JumboAuthProvider = ({children, ...restProps}) => {
    const [authOptions, setAuthOptions] = React.useReducer(authReducer, restProps, init);
    const [logout, setLogout] = React.useState(false);
    const navigate = useNavigate();
    const isAuthenticatedRouteOnly = useRoutePathMatch(routesForAuthenticatedOnly);
    const isNotAuthenticatedRouteOnly = useRoutePathMatch(routesForNotAuthenticatedOnly);

    const location = useLocation();


    React.useEffect(() => {
        if (logout) {
            removeToken();
            setAuthOptions({
                type: "set-auth-data",
                payload: {authToken: null, authUser: null, isLoading: false}
            });
            setLogout(false);
        }
    }, [logout]);

    const setAuthToken = React.useCallback(async (token) => {
        setAuthOptions({type: "start-loading"});
        if (!token) {
            setLogout(true);
            return;
        }

        storeToken(token);
        try {

            // const authUser = await config?.authSetting?.getAuthUserService();
            // if (authUser) {
                setAuthOptions({
                    type: "set-auth-data",
                    payload: {authToken: token, authUser: null,  isLoading: false}
                    // payload: {authToken: token, authUser: authUser, isLoading: false}
                });
                return;
            // }
            setLogout(true);

        } catch (error) {
            setLogout(true);
            // console.error(error);
        }
    }, []);

    //todo: maybe in next version
    const setRedirectPath = React.useCallback((redirectPath) => {
        setAuthOptions({type: "set-redirect-path", payload: {redirectPath}});
    }, []);

    const setAuthData = React.useCallback((data) => {
        setAuthOptions({type: "set-auth-data", payload: data});
    }, []);

    const contextValue = React.useMemo(() => {

        return {
            ...authOptions,
            setAuthData,
            setRedirectPath,
            setAuthToken,
            setAuthOptions,
        }
    }, [authOptions]);

    // React.useEffect(() => {
    //     if (!authOptions.authToken) {
           
    //         // if (isNotAuthenticatedRouteOnly) {               
    //         //     navigate(authOptions?.fallbackPath);  // login page
    //         // }

    //         if(location.pathname !== "/auth-pages/forgot-password" 
    //         && location.pathname !== "/auth-pages/reset-password" )
    //         {
    //             // console.log("in path");
    //             navigate(authOptions?.fallbackPath); 
    //         }
    //     } 
    //     else if (!authOptions.authUser) {
    //         setAuthToken(authOptions.authToken);
    //     } else if (isNotAuthenticatedRouteOnly) {
            
    //         if (!firstTimePageLoad){
    //             navigate(config.authSetting.redirectNotAuthenticatedPath ?? "/");   // are login in
    //         }
    //         else
    //             firstTimePageLoad = false;
    //     }
    // }, [authOptions.authUser]);

    const dispatch = useDispatch();

    React.useEffect(() => { 
        // if (!authOptions.authToken) {
            if (!storedToken) {
           
            // if (isNotAuthenticatedRouteOnly) {               
            //     navigate(authOptions?.fallbackPath);  // login page
            // }

            if(location.pathname !== "/auth-pages/forgot-password" 
            && location.pathname !== "/auth-pages/reset-password" 
            && location.pathname !== "/auth-pages/signup-2" )
            {
                // console.log("in path");
                navigate(authOptions?.fallbackPath); 
            }
        } 
        else 
        {
            // console.log("token in");

            // console.log("token2=", JSON.parse(atob(storedToken.split('.')[1])));
            const tokenVal = JSON.parse(atob(storedToken.split('.')[1]))
            dispatch(addAuth(tokenVal));
        }
        
    }, []);


    

   

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default JumboAuthProvider;