import React from 'react'
import { auth, database } from 'src/database/FIREBASE_CONFIG';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, set } from "firebase/database";

export const Sign_up = (name, email, password, companyID) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const USERDATA = {
                email: user.email,
                uid: user.uid,
                username: name,
                companyID: companyID
            }
            set(ref(database, 'users/' + user.uid), USERDATA);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return error.code, error.message;
        });
}
