import { Platillo } from '@/types'; // Asegúrate de que Platillo esté definido en tu types.ts
// Define la estructura de un solo pedido
export interface Pedido {
  id: string; // Identificador único del platillo en el pedido
  nombre: string;
  cantidad: number;
  precio: number;
  // Puedes añadir más campos si son necesarios, como notas, imagen, etc.
}

// Define la estructura completa del estado de los pedidos
export interface PedidosState {
  pedido: Pedido[]; // Un arreglo de los platillos que conforman el pedido actual
  platillo: Platillo | null; // El platillo seleccionado actualmente, si es necesario
  total:number;

  // Podrías añadir más propiedades al estado si es necesario, por ejemplo:
  // totalPedido: number;
  idRestaurante: string | null;
}

// Estado inicial para los pedidos
export const initialPedidosState: PedidosState = {
  pedido: [],
  platillo: null, // Inicialmente no hay un platillo seleccionado
  total: 0, // Inicializamos el total en 0
  // totalPedido: 0,
  idRestaurante: null,
};