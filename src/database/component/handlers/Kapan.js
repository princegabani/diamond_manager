import { baseFunction, _GET_DATA } from 'src/database/basicFuns';
import { ACCOUNT, KAPAN } from 'src/database/REFS';
import store from 'src/store/store';

export const GET_KAPAN_DATA = async () => {
    const redux = store.getState()
    const data = await _GET_DATA(ACCOUNT + redux?.company?.cmUID + KAPAN, true)
    console.log('GET_KAPAN_DATA', data)
    return data ?? []
}

export const ADD_KAPAN = async (data) => {
    const redux = store.getState()
    baseFunction.pushData(ACCOUNT + redux?.company?.cmUID + KAPAN, data)
        .then(success => { return { success, message: success.message } })
        .catch(error => { return { success: false, message: error.message } })
}

