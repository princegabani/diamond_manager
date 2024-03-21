import { _GET_DATA, _PUSH_DATA, _GET_DATA_ } from 'src/database/basicFuns';
import { ACCOUNT, EMPLOYEE } from 'src/database/REFS';
import store from 'src/store/store';
import { REGISTER_USER } from '../auth/auth';

// export const redux = store.getState()

export const GET_EMPLOYEE_DATA = async () => {
    const redux = store.getState()
    console.log('11111 redux', redux)
    const data = await _GET_DATA(ACCOUNT + redux?.company?.cmUID + EMPLOYEE, true)
    console.log('data', data)
    return data
}

export const ADD_EMPLOYEE = async (data) => {
    const redux = store.getState()
    console.log(ACCOUNT + redux.company.cmUID + EMPLOYEE, data)
    await _PUSH_DATA(ACCOUNT + redux.company.cmUID + EMPLOYEE, data)
}

export const ACCESS_EMPLOYEE = async (data) => {
    console.log(data)
    const company = store.getState().company
    console.log('ACCESS_EMPLOYEE', company.cmUID, data)
    let firstWord = company.cmName.split(" ")[0]

    const ref = await REGISTER_USER(
        {
            email: data.email,
            password: firstWord + '@123',
            cmUID: company.cmUID,
            emID: data.id,
        })
    console.log('data added', ref)
}
