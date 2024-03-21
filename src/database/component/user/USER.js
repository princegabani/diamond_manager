import { child, get, onValue, ref, set } from "firebase/database";
import { _GET_DATA } from "src/database/basicFuns";
import { database } from 'src/database/FIREBASE_CONFIG';
import { ACCOUNT } from "src/database/REFS";

export const getUserData = async () => {
    return await onValue(ref(database, 'users/'), (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        return data
        // updateStarCount(postElement, data);
    });
}

export const getUserDataById = async (uid) => {
    return await onValue(ref(database, 'users/' + uid), (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        return data
        // updateStarCount(postElement, data);
    });
}

export const getUserById = async (uid) => {
    const data = await _GET_DATA(ACCOUNT + uid)
    return data
}