import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseApp from './config';
import { initializeApp } from 'firebase/app';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    onSnapshot,
    setDoc,
    orderBy,
    limit,
    startAfter
} from 'firebase/firestore'; // Importar funciones de Firestore



class Firebase {

    db: Firestore; // significa que:
    

    constructor(){
        if (!firebaseApp) {
            throw new Error("Firebase configuration is not provided");
        }
        const app = initializeApp(firebaseApp);
        this.db = getFirestore(app);
    }
}

const firebase = new Firebase();

export default firebase;


// export const db = getFirestore(firebaseApp);
// export const auth = getAuth(firebaseApp);
