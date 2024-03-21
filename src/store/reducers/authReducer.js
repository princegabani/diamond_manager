import { SET_AUTH_DATA } from '../actions/userActions';

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;