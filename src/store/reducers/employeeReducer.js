import { SET_EMPLOYEE_DATA } from '../actions/userActions';

const initialState = {
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE_DATA:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export default employeeReducer;