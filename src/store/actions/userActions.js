export const SET_EMPLOYEE_DATA = 'SET_EMPLOYEE_DATA';
export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const SET_COMPANY_DATA = 'SET_COMPANY_DATA';

export const setAuth = (auth) => (
    {
        type: SET_AUTH_DATA,
        payload: auth,
    });

export const setCompanyData = (company) => (
    {
        type: SET_COMPANY_DATA,
        payload: company,
    });

export const setEmployeeData = (user) => (
    {
        type: SET_EMPLOYEE_DATA,
        payload: user,
    });
