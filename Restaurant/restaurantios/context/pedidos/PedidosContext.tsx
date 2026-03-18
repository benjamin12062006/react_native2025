import { CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, PEDIDO_REALIZADO, PlatilloSeleccionado, SELECCIONAR_PRODUCTO } from '@/types'; // Asegúrate de que SELECCIONAR_PRODUCTO esté definido en tu types.ts
import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import { PedidosAction, pedidosReducer } from './PedidosReducer';
import { Pedido, PedidosState } from './PedidosState';
// Define las propiedades que el contexto de pedidos proveerá
interface PedidosContextProps {
  state: PedidosState; // El estado actual de los pedidos
  dispatch: React.Dispatch<PedidosAction>; // Función para despachar acciones al reducer
  seleccionarPlatillo: (platillo: PlatilloSeleccionado) => void; // Cambiar tipo
  platillo: PlatilloSeleccionado | null; // Cambiar tipo
  // agregarPlatillo: (platillo: Pedido) => void;
  confirmarPedido: (pedido: Pedido) => void; // Función para confirmar un pedido
  comstrarResumen: (total: number) => void; // Función para mostrar resumen
  pedidoRealizado: () => void; // Nueva función
  total: number; // Total del pedido

}

// Crea el contexto con un valor inicial undefined para forzar el uso dentro de un proveedor
const PedidosContext = createContext<PedidosContextProps | undefined>(undefined);

// Componente Proveedor que envolverá las partes de la app que necesitan acceso al contexto de pedidos
export const PedidosProvider = ({ children }: { children: ReactNode }) => {

  // Inicializa el estado de pedidos usando el reducer y el estado inicial
  const initialPedidosState:PedidosState= {
    pedido: [],
    platillo: null, 
    total: 0, // Inicializa el total en 0
    // Puedes añadir más propiedades iniciales si es necesario
    idRestaurante: null, // Inicialmente no hay un restaurante seleccionado
  }

  const [state, dispatch] = useReducer(pedidosReducer, initialPedidosState);// Usa el reducer para manejar el estado de pedidos

  // Aquí podrías definir funciones helper que usen dispatch si lo prefieres
  // const agregarPlatillo = (platillo: Pedido) => {
  //   dispatch({ type: 'AGREGAR_PLATILLO_PEDIDO', payload: platillo });
  // };


  const seleccionarPlatillo = (platillo: PlatilloSeleccionado) => {
    // Actualizar el estado con el platillo seleccionado
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: platillo
    });
    console.log('Seleccionando platillo:', platillo);
  }

  //cuando el usuario confirma un pedido
  const confirmarPedido = (pedido:Pedido) => {
    dispatch(
      { type: CONFIRMAR_ORDENAR_PLATILLO, payload: pedido } // Aquí podrías pasar el pedido completo si es necesario
    )
  }

  const comstrarResumen = (total: number) => {
    dispatch({
      type: MOSTRAR_RESUMEN,
      payload:total || 0 // Si no se pasa un total, se usa 0 por defecto
    })
  }

  const pedidoRealizado = () => {
    dispatch({
      type: PEDIDO_REALIZADO
    });
    console.log('Pedido realizado y estado limpiado');
  }


  return (
    <PedidosContext.Provider value={{ 
      state,
      dispatch,
      seleccionarPlatillo,
      platillo: state.platillo,
      comstrarResumen,
      confirmarPedido,
      pedidoRealizado, // Agregar la nueva función
      total: state.total,
    }}
      >
      {children}
    </PedidosContext.Provider>
  );
};

// Hook personalizado para usar el contexto de pedidos de forma sencilla y segura
export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (context === undefined) {
    throw new Error('usePedidos debe ser usado dentro de un PedidosProvider');
  }
  return context;
};