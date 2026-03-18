import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

class FIREBASE {
    db: Firestore;
    storage: FirebaseStorage;

    constructor() {
        if (!firebaseConfig) {
            throw new Error("Firebase configuration is not provided");
        }
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
        this.storage = getStorage(app);
    }

    // Método para subir imágenes al almacenamiento
    async uploadImage(file: File, path: string): Promise<string> {
        try {
            const storageRef = ref(this.storage, path); // Crea una referencia en el storage
            const snapshot = await uploadBytes(storageRef, file); // Sube el archivo
            const downloadURL = await getDownloadURL(snapshot.ref); // Obtiene la URL de descarga
            console.log(`Imagen subida correctamente: ${downloadURL}`);
            return downloadURL;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw error;
        }
    }
}

const firebase = new FIREBASE();
export default firebase;

