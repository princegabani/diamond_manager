import { ref, set } from 'firebase/database';
import { _REGISTER_USER } from 'src/database/basicFuns';
import { database } from 'src/database/FIREBASE_CONFIG';
import { ACCOUNT } from 'src/database/REFS';
import { GET_COMPANY_LIST_DETAIL } from './auth';


// export const REGISTER_COMPANY = async (data) => {
//     const old_data = await GET_COMPANY_LIST_DETAIL()
//     const registered = old_data.find(element => element.companyName.toLowerCase() === data.companyName.toLowerCase())
//     if (registered) {
//         return 'Company already registered'
//     } else {
//         set(ref(database, 'company/'), [...old_data, data]);
//         return 'company added'
//     }
// }

// export const REGISTER_COMPANY_ = async (data) => {
//     const register = await _REGISTER_USER(ACCOUNT, data)
//     console.log(register)

// }


// export const COMPANY_LIST = async () => {
//     return await onValue(ref(database, 'company/'), (snapshot) => {
//         const data = snapshot.val();
//         console.log(data)
//         return data
//     });
// }
