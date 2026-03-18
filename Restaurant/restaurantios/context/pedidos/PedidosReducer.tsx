import { CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, PEDIDO_ORDENADO, PEDIDO_REALIZADO, Platillo, SELECCIONAR_PRODUCTO } from '@/types';
import { Pedido, PedidosState } from './PedidosState';
// Define los tipos de acciones que se pueden despachar para modificar el estado de los pedidos
export type PedidosAction =
  | { type: 'AGREGAR_PLATILLO_PEDIDO'; payload: Pedido }
  | { type: 'ELIMINAR_PLATILLO_PEDIDO'; payload: { idPlatillo: string } }
  | { type: 'AUMENTAR_CANTIDAD_PLATILLO'; payload: { idPlatillo: string } }
  | { type: 'DISMINUIR_CANTIDAD_PLATILLO'; payload: { idPlatillo: string } }
  | { type: 'SELECCIONAR_PLATILLO'; payload: Platillo }
  | { type:  'SELECCIONAR_PRODUCTO'; payload: Platillo }
  | { type: 'CONFIRMAR_PEDIDO' } // Podría limpiar el pedido actual
  | { type: 'CONFIRMAR_ORDENAR_PLATILLO'; payload: Pedido } // Asumiendo que esto confirma un pedido
  // | { type: 'LIMPIAR_PEDIDO' };
  | { type: 'MOSTRAR_RESUMEN'; payload: number } // Asumiendo que esto muestra un resumen del total
| { type: 'PEDIDO_ORDENADO'; payload: Pedido } // Asumiendo que esto marca un pedido como ordenado
| { type: 'PEDIDO_REALIZADO' }; // Asumiendo que esto marca un pedido como realizado

export const pedidosReducer = (state: PedidosState, action: PedidosAction): PedidosState => {
  switch (action.type) {
    case 'AGREGAR_PLATILLO_PEDIDO':
      // Lógica para agregar un platillo o actualizar su cantidad si ya existe
      const platilloExistente = state.pedido.find(p => p.id === action.payload.id);
      if (platilloExistente) {
        return {
          ...state,
          pedido: state.pedido.map(p =>
            p.id === action.payload.id
              ? { ...p, cantidad: p.cantidad + action.payload.cantidad }
              : p
          ),
        };
      } else {
        return {
          ...state,
          pedido: [...state.pedido, action.payload],
        };
      }

    case 'ELIMINAR_PLATILLO_PEDIDO':
      return {
        ...state,
        // pedido: state.pedido.filter(p => p.id !== action.payload.idPlatillo),
        pedido:state.pedido.filter(p => p.id !== action.payload.idPlatillo)
      };

    case 'AUMENTAR_CANTIDAD_PLATILLO':
      return {
        ...state,
        pedido: state.pedido.map(p =>
          p.id === action.payload.idPlatillo
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        ),
      };
    
    case 'DISMINUIR_CANTIDAD_PLATILLO':
      return {
        ...state,
        pedido: state.pedido.map(p =>
          p.id === action.payload.idPlatillo && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        ).filter(p => p.cantidad > 0), // Opcional: eliminar si la cantidad llega a 0
      };
    case SELECCIONAR_PRODUCTO:
      return {
        ...state,
        platillo: action.payload, // Actualiza el platillo seleccionado
      };

    case CONFIRMAR_ORDENAR_PLATILLO:
      return{
        ...state,
        pedido: [...state.pedido, action.payload], // Agrega el platillo al pedido
        platillo: null, // Limpia el platillo seleccionado después de confirmar
      }

    
    case MOSTRAR_RESUMEN:
      return{
        ...state,
        total: action.payload // Actualiza el total del pedido
      };

      case PEDIDO_ORDENADO:
      return {
        ...state,
        pedido: [...state.pedido, action.payload], // Agrega el pedido ordenado
        platillo: null, // Limpia el platillo seleccionado después de ordenar
        total: 0, // Resetea el total del pedido
      };

      case PEDIDO_REALIZADO:
      return {
        ...state,
        pedido: [], // Limpia todos los pedidos
        platillo: null, // Limpia el platillo seleccionado
        total: 0, // Resetea el total
      };

    // case 'LIMPIAR_PEDIDO':
    case 'CONFIRMAR_PEDIDO': // Asumiendo que confirmar limpia el pedido actual para uno nuevo
      return {
        ...state,
        pedido: [],
        // podrías resetear otras propiedades del estado aquí también
      };

    default:
      return state;
  }
};