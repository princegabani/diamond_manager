import react, { useEffect } from 'react'
import { child, get, onValue, ref, set, update } from "firebase/database";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { database, auth } from "src/database/FIREBASE_CONFIG";
import { _GET_DATA, _GET_ERROR, _REGISTER_USER } from "src/database/basicFuns";
import { USER, ACCOUNT, COMPANY, EMPLOYEE } from "../../REFS";


export const REGISTER_COMPANY = async (data) => {
    return await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            let DATA = {
                cmEmail: data.email ?? '',
                timestamp: user.metadata.createdAt ?? '',
                cmUID: user.uid ?? '',
                isCompany: true
            }

            // store company data to account/uid(company)/company
            set(ref(database, ACCOUNT + user?.uid + COMPANY), {
                ...DATA,
                cmName: data.companyName,
                ownerName: data.ownerName,
                password: data.password,
            });

            // store company data to user/uid(company)
            set(ref(database, USER + user?.uid), DATA);

            return { success: 'Success', message: 'Company added' }
        })
        .catch((error) => {
            return _GET_ERROR(error)
        });
}

export const REGISTER_USER = async (data) => {
    return await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;

            // store company data to user/uid(employee)
            set(ref(database, USER + user?.uid), {
                cmUID: data.cmUID,
                emEmail: data.email ?? '',
                emID: data.emID,
                timestamp: user.metadata.createdAt ?? '',
                emUID: user.uid ?? '',
                isCompany: false
            });

            // store company data to account/uid(company)/company/
            update(ref(database, ACCOUNT + data.cmUID + EMPLOYEE + data.emID), {
                isAccess: true,
                emUID: user.uid
            });


            return { uid: user.uid, success: 'Success', message: 'User added' }
        })
        .catch((error) => {
            return _GET_ERROR(error)
        });
}

export const SIGNIN = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        if (userCredential) {
            const user = userCredential.user;
            console.log('SIGNIN', user)
            return { success: true, message: 'Retrieved data', data: user }
        } else {
            return { success: false, message: 'Unsuccess in Retrieved data' }
        }
    }).catch((error) => {
        console.log('errrrrr', error)
        return { success: false, code: error.code, message: error.message }
    });

}

export const INITSIGNIN = async (user) => {
    console.log('user sign in')
    const data = await _GET_DATA(USER + user?.uid).catch((error) => { return { message: error.message } })
    console.log('data from init', data)
    const dataRef = await _GET_DATA(ACCOUNT + data?.cmUID).catch((error) => { return { message: error.message } })
    console.log('data from init', dataRef)
    const returnData = {
        auth: { ...user?.reloadUserInfo, ...user?.stsTokenManager },
        company: dataRef?.company,
    }
    if (!data?.isCompany) {
        console.log(!data?.isCompany)
        console.log(ACCOUNT + data?.cmUID + EMPLOYEE + data?.emID)
        const employeeData = await _GET_DATA(ACCOUNT + data?.cmUID + EMPLOYEE + data?.emID).catch((error) => { return { message: error.message } })
        console.log('got employee', employeeData)
        return {
            "success": true,
            "message": "Data retrieved successfully",
            "data": { ...returnData, employee: employeeData }
        }
    } else {

        console.log('data from init ot employee', returnData)
        return {
            "success": true,
            "message": "Data retrieved successfully",
            "data": returnData
        }
    }

}

export const SIGNOUT = () => {
    return signOut(auth).then(() => {
        console.log("Sign-out successful.")
        // localStorage.removeItem('persist:root');
        console.log('remove data from local storage')
        return true
    }).catch((error) => {
        return error
    });
}

export const GET_COMPANY_LIST = async () => {
    return await get(child(ref(database), `company/`)).then((snapshot) => {
        if (snapshot.exists()) {
            let list = []
            snapshot.val().forEach(element => {
                list.push(element.companyName)
            });
            return list;
        } else {
            console.log("No data available");
            return "No data available"
        }
    }).catch((error) => {
        console.error(error);
    });
}

export const GET_COMPANY_LIST_DETAIL = async () => {
    return await get(child(ref(database), `company/`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return []
        }
    }).catch((error) => {
        console.error(error);
    });
}


export const InitAuthView = () => {
    console.log('InitAuthView')
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            INITSIGNIN(user)
        } else {
            console.log('user sign out')
            SIGNOUT()
        }
    })
}
