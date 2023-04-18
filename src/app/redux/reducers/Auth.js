// import {ADD_AUTH} from "../../utils/cases/cases";



// const INIT_STATE = {
//     token:'',
//     full_name: 'ali',
//     id: '',
//     is_active: '',
//     is_staff: '',
//     is_superuser: '',
//     refresh: ''
// };


// const reducerFunc = (state = INIT_STATE, action) => {
//     switch (action.type) {
//         case ADD_AUTH: {
//             return {
//                 ...state,
//                 token: action.payload.access,
//                 full_name: action.payload.full_name,
//                 id: action.payload.id,
//                 is_active: action.payload.is_active,
//                 is_staff: action.payload.is_staff,
//                 is_superuser: action.payload.is_superuser,
//                 refresh: action.payload.refresh
//             }
//         }

//         default: {
//             return state;
//         }
//     }
// };



// export default reducerFunc;