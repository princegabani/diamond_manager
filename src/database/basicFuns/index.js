import { createUserWithEmailAndPassword } from "firebase/auth";
import { child, get, onValue, push, ref, remove, set, update } from "firebase/database";
import store from "src/store/store";
import { auth, database } from "../FIREBASE_CONFIG";

export const _GET_DATA = async (reference, isArray) => {
    console.log('reference', reference)
    return await get(child(ref(database), reference)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val())
            if (isArray) {
                const DATA = [];
                snapshot.forEach((childSnapshot) => {
                    const gotData = childSnapshot.val();
                    const dataKey = childSnapshot.key;
                    // Add the key to the post data
                    gotData.id = dataKey;
                    DATA.push(gotData);
                });
                return DATA;
            }
            return snapshot.val();
        } else {
            console.log("No data available");
            return null
        }
    }).catch((error) => {
        console.log(error);
        return error
    });
}

export const _SET_DATA = async (reference, data) => {
    console.log('reference', reference)
    try {
        const arrayRef = ref(database, reference);
        const snapshot = await get(arrayRef);
        const array = snapshot.val() || [];
        console.log('aarray', array)
        array.push({ ...data, id: array.length });
        await set(arrayRef, array);
        console.log('length', array.length)
        console.log('Array manipulated successfully...');
    } catch (error) {
        console.error('Error manipulating array:', error);
    }
}

export const _PUSH_DATA = async (reference, data) => {
    console.log('push array')
    // await set(push(ref(database, reference)), data);


    // Reference to the 'posts' list in your database
    const dataRef = ref(database, reference);

    // Push new data to the 'posts' list and store the key
    const newDataRef = push(dataRef);
    const postId = newDataRef.key;

    // Set the data, including the key, for the new post
    set(newDataRef, {
        ...data, id: postId
    });
}

// export const _GET_DATA_ = async (reference) => {
//     return await get(child(ref(database), reference)).then((snapshot) => {
//         if (snapshot.exists()) {
//             // console.log(snapshot.val())
//             const DATA = [];
//             snapshot.forEach((childSnapshot) => {
//                 const gotData = childSnapshot.val();
//                 const dataKey = childSnapshot.key;
//                 // Add the key to the post data
//                 // console.log('gotData', gotData, dataKey)
//                 gotData.id = dataKey;
//                 DATA.push(gotData);
//             });
//             // console.log('aaaaa', DATA);
//             return DATA;

//         } else {
//             console.log("No data available");
//             return []
//         }
//     }).catch((error) => {
//         console.log(error);
//         return error
//     });

//     // const postListRef = ref(database, reference);

//     // // Listen for changes to the 'posts' list
//     // console.log('postListRef', postListRef)
//     // const d = await onValue(postListRef, (snapshot) => {
//     //     if (snapshot.exists()) {
//     //         const posts = [];
//     //         snapshot.forEach((childSnapshot) => {
//     //             const postData = childSnapshot.val();
//     //             const postKey = childSnapshot.key;
//     //             // Add the key to the post data
//     //             console.log('postData', postData, postKey)
//     //             postData.id = postKey;
//     //             posts.push(postData);
//     //         });
//     //         console.log('aaaaa', posts);
//     //         return posts
//     //     } else return []
//     //     // Use the posts array in your application
//     // });
//     // console.log('d', d)
// }



export const _GET_ERROR = (error) => {
    if (error.code == "auth/email-already-in-use") {
        return {
            error: "auth/email-already-in-use",
            message: "The email address is already in use"
        };

    } else if (error.code == "auth/invalid-email") {
        return {
            error: "auth/invalid-email",
            message: "The email address is not valid."
        };

    } else if (error.code == "auth/operation-not-allowed") {
        return {
            code: "auth/operation-not-allowed",
            message: "Operation not allowed."
        };
    } else if (error.code == "auth/weak-password") {
        return {
            code: "auth/weak-password",
            message: "The password is too weak."
        };
    } else if (error.code == "auth/too-many-requests") {
        return {
            code: "auth/too-many-requests",
            message: "Too many attempts."
        };
    }
}

export const baseFunction = {
    getData: async (reference, isArray) => {
        return get(child(ref(database), reference)).then((snapshot) => {
            if (snapshot.exists()) {
                if (isArray) {
                    const DATA = [];
                    snapshot.forEach((childSnapshot) => {
                        const gotData = childSnapshot.val();
                        const dataKey = childSnapshot.key;
                        // Add the key to the post data
                        gotData.id = dataKey;
                        DATA.push(gotData);
                    });
                    return DATA;
                }
                return snapshot.val();
            } else return { data: 'No data available' }
        }).catch((error) => {
            console.log(error);
            return error
        });
    },
    setData: async (reference, data) => {
        await set(ref(database, reference), data).then(() => {
            return { success: true, message: 'data stored' }
        }).catch(error => {
            return { error: error.code, message: error.message }
        })
    },
    addData: async (reference, data) => {
        try {
            const arrayRef = ref(database, reference);
            const snapshot = await get(arrayRef);
            const array = snapshot.val() || [];
            array.push({ ...data, id: array.length });
            await set(arrayRef, array);
            console.log('Array manipulated successfully...');
        } catch (error) {
            console.error('Error manipulating array:', error);
            return { error: error.code, message: error.message }
        }
    },
    pushData: async (reference, data) => {
        await set(push(ref(database, reference)), data).then(() => {
            return { success: true, message: 'data stored' }
        }).catch(error => {
            return { success: false, error: error.code, message: error.message }
        })
    },
    updateData: async (reference, data) => {
        update(ref(database, reference), data).then(() => {
            return { success: true, message: 'Data updated' };
        }).catch((error) => {
            return { error: error.code, message: error.message }
        });
    },
    deleteData: async (reference, id) => {
        remove(ref(reference)).then(() => {
            return { success: true, message: 'Data removed' };
        }).catch((error) => {
            return { error: error.code, message: error.message }
        });

    }
}