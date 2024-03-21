import { _GET_DATA, _SET_DATA } from 'src/database/basicFuns';
import { EMPLOYEE } from 'src/database/REFS';


export const GET__DATA = async () => {
    let isArray
    const data = await _GET_DATA(EMPLOYEE, isArray = true)
    console.log('data', data)
    return data
}

export const ADD_ = async (data) => {
    await _SET_DATA(EMPLOYEE, data)
}
