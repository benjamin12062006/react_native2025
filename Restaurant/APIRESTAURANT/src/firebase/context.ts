import { createContext } from "react";
import { FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';


interface FirebaseContextProps {
    firebaseApp: FirebaseApp | null;
    db: Firestore | null
}

const FirebaseContext = createContext<FirebaseContextProps>({
  firebaseApp: null,
  db: null,
});

export default FirebaseContext;