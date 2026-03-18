import React, { ReactNode, createContext, useState, useEffect, useContext, useReducer } from "react";
import { initialFirebaseState } from "./FirebaseState";
import firebaseReducer from "./FirebaseReducer";
import firebase from "@/firebase/index";
import { OBTENER_PRODUCTOS_EXITO } from "@/types";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Platillo } from "@/types";
import _ from "lodash";


interface FirebaseContextProps {
    menu: [] | { id: string;[key: string]: any }[]; // El menú puede ser un array vacío o un array de objetos
    dispatch: React.Dispatch<any>;
    firebase: typeof firebase;
    obtenerProductos: () => Promise<void>;
    /*
    La función está tipada para devolver una promesa (Promise<void>), indicando que realiza operaciones asíncronas pero no retorna un valor específico. Esto es útil en TypeScript para garantizar que los desarrolladores manejen la función como asíncrona (usando await o .then) y sepan que no deben esperar un valor directo.
    */


}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {

    console.log('FirebaseProvider', firebase);

    const [state, dispatch] = useReducer(firebaseReducer, initialFirebaseState)


    const obtenerProductos = async () => {
        // dispatch({
        //     type:OBTENER_PRODUCTOS,
        //     // payload:
        // })

        try {
            const productosCollectionRef = collection(firebase.db, 'platillos');

            // const q = query(productosCollectionRef, where('existencia', '==', false));
            const q = query(productosCollectionRef); // Traer todo sin restricciones

            const unsubscribe = onSnapshot(q, (snapshot) => {//Callback para cuando hay datos

                let platillos = snapshot.docs.map(doc => {
                    return {
                        
                        id: doc.id,
                        imagen: doc.data().imagen || '',
                        nombre: doc.data().nombre || '',
                        precio: doc.data().precio || 0,
                        categoria: doc.data().categoria || '',
                        descripcion: doc.data().descripcion || '',
                        existencia: doc.data().existencia || false,
                    } as Platillo;
                });
                
                // ordenar por categoria
                platillos = _.sortBy(platillos, 'categoria');
                // console.log('Platillos obtenidos:', platillos);
                dispatch({
                    type: OBTENER_PRODUCTOS_EXITO,
                    payload: platillos //
                })

            })
        } catch (error) {
            console.error('Error al obtener productos:', error);
            // dispatch({
            //     type: OBTENER_PRODUCTOS_ERROR, // Asumiendo que tienes este tipo
            //     payload: error.message 
            // });
        }




    }


    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                dispatch,
                firebase,
                obtenerProductos
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => { //evita el uso de useContext directamente en los componentes, encapsulando la lógica de acceso al contexto
    const context = useContext(FirebaseContext);
    if (!context) throw new Error('useFirebase debe ser usado dentro de un FirebaseProvider');
    return context;
}
