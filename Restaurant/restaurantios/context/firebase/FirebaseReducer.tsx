import { FirebaseState } from "./FirebaseState";
import { Platillo } from "@/types";
import { OBTENER_PRODUCTOS_EXITO  } from "@/types"; // Asume que tienes estos tipos de acción

type Action=
  | { type: typeof OBTENER_PRODUCTOS_EXITO; payload: Platillo[] } // payload es Platillo[]


export default (state: FirebaseState, action: Action): FirebaseState => {

    switch(action.type){

        case OBTENER_PRODUCTOS_EXITO:
            return {
                ...state,
                menu:action.payload, // Actualiza el menú con los productos obtenidos
                loading: false, // Puedes manejar el estado de carga si es necesario
                error: undefined // Resetea el error si es necesario
            }

        default:
            return state;
    }
}


