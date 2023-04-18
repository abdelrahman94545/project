import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp"
import Auth from "./Auth"

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        contactsApp: contactsApp,
        Auth: Auth
    });
};

export default exportReducers;

