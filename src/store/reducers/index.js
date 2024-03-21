import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import employeeReducer from "./employeeReducer";

const reducers = combineReducers({
    auth: authReducer,
    company: companyReducer,
    employee: employeeReducer,
})
export default reducers