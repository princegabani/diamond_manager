import { SET_COMPANY_DATA } from '../actions/userActions';

const initialState = {
};

const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANY_DATA:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export default companyReducer;