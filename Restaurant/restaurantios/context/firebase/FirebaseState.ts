import { Platillo } from "@/types";

export interface FirebaseState {
  menu: Platillo[]; // El menú es un array de objetos Platillo
  loading?: boolean; // Opcional, para manejar el estado de carga
  error?: string; // Opcional, para manejar errores
}

export const initialFirebaseState: FirebaseState ={
  menu: [], // Inicialmente el menú es un array vacío
  loading: false, // Estado de carga inicial
  error: undefined, // No hay error inicial
 // null significa que no hay usuario
}

